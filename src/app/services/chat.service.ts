import { Injectable } from '@angular/core';

import  { 
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy
} from '@angular/fire/firestore'

import { Observable } from 'rxjs';

export interface Message {
  user:String;
  content:String;
  createdAt:Number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore) { }

  getMessages(): Observable<Message[]> {
    const messageRef = collection(this.firestore, 'messages');
    const q = query(messageRef, orderBy('createdAt'))
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>; 
  }
  sendMessage(content:string, user: string) {
    const messagesRef = collection(this.firestore, 'messages');
    const message: Message = {
      user,
      content,
      createdAt: Date.now()
    }
    return addDoc(messagesRef, message);
  }
}
