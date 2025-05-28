<<<<<<< HEAD
import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Chat } from 'src/app/interfaces/chat';
import { AuthService } from '../auth/auth.service';
import { DatabaseReference, off, onValue } from '@angular/fire/database';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  chatMessages = signal<Chat[] | null>([]);
  currentUserId = computed(() => this.auth.uid());

  private chatsRef: DatabaseReference | null = null;
  private chatsListener: any = null;

  private api = inject(ApiService);
  private auth = inject(AuthService);

  private encryptionKey = 'my-secret-key-123';

  constructor() { }

  init(chatroomId: string){
    this.auth.getId();
    this.getChatMessages(chatroomId);
  }

  async sendMessage(chatroomId: string, message: string){
    try{
      const chatsRef = this.api.getRef(`chatrooms/${chatroomId}/messages`);

      // Encrypt the message before sending
      const encryptedMessage = this.encrypt(message);
  
      const chatData: Chat = {
        senderId: this.currentUserId()!,
        message: encryptedMessage,
        timestamp: Date.now(),
      };
  
      const newMessageRef = this.api.pushData(chatsRef);
      await this.api.setRefData(newMessageRef, chatData);
    }catch(e){
      throw(e);
    }
  }

  getChatMessages(chatroomId: string){
    this.chatsRef = this.api.getRef(`chatrooms/${chatroomId}/messages`);

    this.chatsListener = onValue(this.chatsRef, (snapshot) => {
      if (snapshot?.exists()) {
        const messages = snapshot.val();
        
        const messagesArray: Chat[] = Object.keys(messages).map(messageId => {
          const encryptedMessage = messages[messageId].message;
          const decryptedMessage = this.decrypt(encryptedMessage);

          return {
            id: messageId,
            ...messages[messageId],
            message: decryptedMessage,
            isCurrentUser: messages[messageId].senderId === this.currentUserId(),
          };
        });

        this.chatMessages.set(messagesArray);
      } else {
        this.chatMessages.set([]);
      }
    }, (error) => {
      console.error(error);
    });
  }

  unsubscribeChats(){
    if(this.chatsRef){
      off(this.chatsRef, 'value', this.chatsListener);
      this.chatsRef = null;
      this.chatsListener = null;

      this.chatMessages.set(null);
    }
  }

  private encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.encryptionKey).toString();
  }

  public decrypt(ciphertext: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.encryptionKey);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText || '[Decryption failed]';
    } catch (err) {
      console.error('Decryption error:', err);
      return '[Decryption error]';
    }
  }
  
}
=======
import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Chat } from 'src/app/interfaces/chat';
import { AuthService } from '../auth/auth.service';
import { DatabaseReference, off, onValue } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  chatMessages = signal<Chat[] | null>([]);
  currentUserId = computed(() => this.auth.uid());

  private chatsRef: DatabaseReference | null = null;
  private chatsListener: any = null;

  private api = inject(ApiService);
  private auth = inject(AuthService);

  constructor() { }

  init(chatroomId: string){
    this.auth.getId();
    this.getChatMessages(chatroomId);
  }

  async sendMessage(chatroomId: string, message: string){
    try{
      const chatsRef = this.api.getRef(`chatrooms/${chatroomId}/messages`);
  
      const chatData: Chat = {
        senderId: this.currentUserId()!,
        message,
        timestamp: Date.now(),
      };
  
      const newMessageRef = this.api.pushData(chatsRef);
      await this.api.setRefData(newMessageRef, chatData);
    }catch(e){
      throw(e);
    }
  }

  getChatMessages(chatroomId: string){

    this.chatsRef = this.api.getRef(`chatrooms/${chatroomId}/messages`);

    this.chatsListener = onValue(this.chatsRef, (snapshot)=>{
      if(snapshot?.exists()) {
        const messages = snapshot.val();
        const messagesArray: Chat[] = Object.keys(messages).map(messageId => ({
          id: messageId,
          ...messages[messageId],
          isCurrentUser: messages[messageId].senderId == this.currentUserId() ? true : false,
        }));

        this.chatMessages.set(messagesArray);
      } else{
        this.chatMessages.set([]);
      }
    }, (error) => {
      console.error(error);
    });
  }

  unsubscribeChats(){
    if(this.chatsRef){
      off(this.chatsRef, 'value', this.chatsListener);
      this.chatsRef = null;
      this.chatsListener = null;

      this.chatMessages.set(null);
    }
  }

}
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
