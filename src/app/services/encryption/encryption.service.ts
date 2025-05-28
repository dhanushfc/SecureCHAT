import { Injectable } from '@angular/core';
import * as sodium from 'libsodium-wrappers';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private sodiumReady: Promise<void>;

  constructor() {
    this.sodiumReady = sodium.ready;
  }

  async generateKeyPair() {
    await this.sodiumReady;
    const keyPair = sodium.crypto_box_keypair();
    return {
      publicKey: sodium.to_base64(keyPair.publicKey),
      privateKey: sodium.to_base64(keyPair.privateKey),
    };
  }

  async encryptMessage(message: string, recipientPublicKey: string, senderPrivateKey: string) {
    await this.sodiumReady;

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    const ciphertext = sodium.crypto_box_easy(
      message,
      nonce,
      sodium.from_base64(recipientPublicKey),
      sodium.from_base64(senderPrivateKey)
    );

    return {
      ciphertext: sodium.to_base64(ciphertext),
      nonce: sodium.to_base64(nonce),
    };
  }

  async decryptMessage(ciphertext: string, nonce: string, senderPublicKey: string, recipientPrivateKey: string) {
    await this.sodiumReady;

    const decrypted = sodium.crypto_box_open_easy(
      sodium.from_base64(ciphertext),
      sodium.from_base64(nonce),
      sodium.from_base64(senderPublicKey),
      sodium.from_base64(recipientPrivateKey)
    );

    return sodium.to_string(decrypted);
  }

}
