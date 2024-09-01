import { Thread } from "../types/types";
import { db } from "../../firebase/config";
import { addDoc, collection, getDocs } from "firebase/firestore";

const threadCollection = collection(db, "threads");

export const getThreads = async (): Promise<Thread[]> => {
    const threads = await getDocs(threadCollection);
    const threadsArray = threads.docs.map(doc => doc.data() as Thread);
    return threadsArray;

}

export const createThread = async (thread: Thread): Promise<Thread[]> => {
    await addDoc(threadCollection, thread);
    return [thread]; 
}