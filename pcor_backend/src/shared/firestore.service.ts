import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
@Injectable()
export class FirestoreService {
  private firestore: Firestore;

  constructor() {
    this.firestore = new Firestore();
  }

  async getDocument(collection: string, documentId: string): Promise<object> {
    console.log(collection);
    console.log(documentId);
    //   const docRef = this.firestore.collection(collection).doc(documentId);
    //   const doc = await docRef.get();
    //   if (!doc.exists) {
    //     throw new Error('Document not found');
    //   }
    //   return doc.data();
    return { id: 1, name: 'Test Test' };
  }
}
