import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { DatabaseReference, off, onValue, query } from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/interfaces/user';
import { ChatRoom } from 'src/app/interfaces/chat-room';
import { ChatService } from 'src/app/services/chat/chat.service'; 

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  users = signal<User[] | null>([]);
  chatrooms = signal<ChatRoom[] | null>([]);
  currentUserId = computed(() => this.auth.uid());

  private api = inject(ApiService);
  private auth = inject(AuthService);
  private chatService = inject(ChatService); // <-- Inject ChatService

  private chatroomsRef: DatabaseReference | null = null;
  private chatRoomsListener: any;
  private usersRef: DatabaseReference | null = null;
  private usersListener: any;

  constructor() {}

  init(){
    this.auth.getId();
    this.getChatRooms();
  }

  getUsers() {
    this.usersRef = this.api.getRef('users');

    this.usersListener = onValue(this.usersRef, (snapshot) =>{
      if(snapshot?.exists()){
        const users = snapshot.val();
        const usersArray: User[] = Object.values(users);
        const filteredUsers: User[] = usersArray.filter((user) => user.uid !== this.currentUserId());
        this.users.set(filteredUsers);
      } else {
        this.users.set([]);
      }
    },
    (error) => {
      console.error('Error fetching real-time users list:', error);
    });
  }

  async createChatRoom(userIds: string[], roomName: string, type: string = 'private'): Promise<any> {
    try {
      const chatRoomRef = this.api.getRef('chatrooms');
      const usersList = [this.currentUserId(), ...userIds];
      const sortedUsersList = usersList.sort();
      const usersHash = sortedUsersList.join(',');

      const existingChatRoomQuery = query(
        chatRoomRef,
        this.api.orderByChild('usersHash'),
        this.api.equalTo(usersHash)
      );

      const existingChatRoomSnapshot = await this.api.getData(existingChatRoomQuery);

      if(existingChatRoomSnapshot?.exists()) {
        const chatRooms = existingChatRoomSnapshot.val();
        const privateChatRoom = Object.values(chatRooms).find((chatRoom: any) => chatRoom.type === 'private');
        if(privateChatRoom) return privateChatRoom;
      }

      const newChatRoom = this.api.pushData(chatRoomRef);
      const ChatRoomId = newChatRoom.key;
      const chatRoomData = {
        id: ChatRoomId,
        users: sortedUsersList,
        usersHash,
        name: roomName,
        type,
        createdAt: new Date().toISOString(),
      };

      await this.api.setRefData(newChatRoom, chatRoomData);
      return chatRoomData;

    } catch(e) {
      throw(e);
    }
  }

  getChatRooms(){
    this.chatroomsRef = this.api.getRef('chatrooms');

    this.chatRoomsListener = onValue(
      this.chatroomsRef,
      (snapshot) => {
        if(snapshot?.exists()) {
          const chatrooms = snapshot.val();
          const chatroomkeys = Object.keys(chatrooms);

          const chatroomData = chatroomkeys.map((roomId) => {
            const room = chatrooms[roomId];

            if(room.type == 'private' && room.users.includes(this.currentUserId())){
              const otherUserId = room.users.find((userId: string) => userId !== this.currentUserId());

              return this.getOtherUserDataAndLastMessage(
                otherUserId,
                roomId,
                room,
                room.messages
              );
            }
            return null;
          });

          Promise.all(chatroomData).then((chatroomsWithDetails) => {
            const validChatrooms = chatroomsWithDetails.filter((room) => room !== null);
            this.chatrooms.set(validChatrooms as ChatRoom[]);
          }).catch(e => {
            console.error(e);
          });

        } else {
          this.chatrooms.set([]);
        }
    });
  }

  private async getOtherUserDataAndLastMessage(
    otherUserId: string,
    roomId: string,
    room: any,
    messages: any
  ) {
    try {
      const userRef = this.api.getRef(`users/${otherUserId}`);
      const snapshot = await this.api.getData(userRef);
      const user = snapshot?.exists() ? snapshot.val() : null;

      let lastMessage: any = null;
      if(messages){
        const messagesArray = Object.values(messages);
        const sortedMessages = messagesArray.sort((a: any, b: any) => b.timestamp - a.timestamp);
        lastMessage = sortedMessages[0];
      }

      const roomUserData: ChatRoom = {
        roomId,
        name: user?.name || null,
        photo: user?.photo || null,
        room,
        lastMessage: lastMessage ? this.chatService.decrypt(lastMessage.message) : null, // <-- Decrypted message
        lastMessageTimestamp: lastMessage?.timestamp || null,
      };

      return roomUserData;

    } catch(e){
      console.error(e);
      return null;
    }
  }

  unsubscribeChatrooms(){
    if(this.chatroomsRef){
      off(this.chatroomsRef, 'value', this.chatRoomsListener);
      this.chatroomsRef = null;
      this.chatRoomsListener = null;
    }
  }

  unsubscribeUsers(){
    if(this.usersRef){
      off(this.usersRef, 'value', this.usersListener);
      this.usersRef = null;
      this.usersListener = null;
    }
  }

  cleanup(){
    this.unsubscribeChatrooms();
    this.unsubscribeUsers();
    this.users.set(null);
    this.chatrooms.set(null);
  }

}
