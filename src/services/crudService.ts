
import { Thread, User } from "../types/types";
import { db } from "../../firebase/config";
import { addDoc, collection, getDocs, DocumentReference, QuerySnapshot, DocumentData } from "firebase/firestore";

              // COLLECTIONS 
const threadCollection = collection(db, "threads");
const userCollection = collection(db, "users");

// GET THREADS 

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

// POST THREAD 

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

            // CREATE USERS

  export const createUser = async (user: User): Promise<User> => {
  try{
    const docRef: DocumentReference<DocumentData> = await addDoc(userCollection, user);
    const createdUser: User = {
      ...user,
      id: docRef.id,
    };
    return createdUser;
  }catch(err) {
    console.error("Error creating user: ", err);
    throw err;
  } 
}

//CHECK IF USER EXISTS
