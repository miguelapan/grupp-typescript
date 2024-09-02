
import { Thread } from "../types/types";
import { db } from "../../firebase/config";
import { addDoc, collection, getDocs, DocumentReference, QuerySnapshot, DocumentData } from "firebase/firestore";

const threadCollection = collection(db, "threads");

export const getThreads = async (): Promise<Thread[]> => {
  try {
    const threadsSnapshot: QuerySnapshot<DocumentData> = await getDocs(threadCollection);
    const threadsArray: Thread[] = threadsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id, 
    }) as Thread);
    return threadsArray;
  } catch (error) {
    console.error("Error fetching threads: ", error);
    throw error;
  }
};

export const createThread = async (thread: Omit<Thread, "id">): Promise<Thread> => {
  try {
    const docRef: DocumentReference<DocumentData> = await addDoc(threadCollection, thread);
    const createdThread: Thread = {
      ...thread,
      id: docRef.id,  
    };
    return createdThread;
  } catch (error) {
    console.error("Error creating thread: ", error);
    throw error;
  }
};
