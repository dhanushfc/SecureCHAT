import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

// 🔐 Import EncryptionService
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid = signal<string | null>(null);

  private fireAuth = inject(Auth);
  private router = inject(Router);
  private api = inject(ApiService);

  // 🔐 Inject EncryptionService
  private encryptionService = inject(EncryptionService);

  constructor() {}

  setData(uid: string | null){
    this.uid.set(uid);
  }

  getId() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid || null;
    this.setData(uid);
    return uid;
  }

  async register(data: {name: string, email: string, password: string}): Promise<{ id: string }> {
    try {
      const register = await createUserWithEmailAndPassword(
        this.fireAuth,
        data.email,
        data.password
      );

      const id = register.user.uid;

      // 🔐 Generate Libsodium key pair
      const keyPair = await this.encryptionService.generateKeyPair();

      // 🧠 Save private key locally (later move to secure storage)
      localStorage.setItem('privateKey', keyPair.privateKey);

      // 👤 Save public key with user data in Firestore
      const userData = {
        name: data.name,
        email: data.email,
        uid: id,
        publicKey: keyPair.publicKey, // 🔐 Public key added
        photo: 'https://i.pravatar.cc/' + this.randomIntFromInterval(200, 400),
      };

      await this.api.setData(`users/${id}`, userData);
      this.setData(id);

      return { id };

    } catch(e) {
      console.error('Registration error:', e);
      throw e;
    }

  }

  randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async login(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(this.fireAuth, email, password);
      if(response?.user){
        this.setData(response.user.uid);
      }
    } catch(e) {
      console.error('Login error:', e);
      throw e;
    }

  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.fireAuth, email);
    } catch(e) {
      console.error('Password reset error:', e);
      throw e;
    }
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, (user) => {
        resolve(user);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  navigateByUrl(path: string) {
    this.router.navigateByUrl(path, { replaceUrl: true });
  }

  async getUserData(id: string) {
    try {
      const userRef = this.api.getRef(`users/${id}`);
      const snapshot = await this.api.getData(userRef);
      if(snapshot?.exists()){
        return snapshot.val();
      } else {
        throw new Error('No such user exists');
      }

    } catch(e){
      console.error('Error fetching the user data', e);
      throw e;
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();

      this.uid.set(null);
      this.navigateByUrl('/login');
      return true;
    } catch(e) {
      console.error('Logout error:',e);
      throw e;
    }
  }

}
