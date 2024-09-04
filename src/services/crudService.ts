import { Thread, User, Comment } from "../types/types";
import { db } from "../../firebase/config";
import { addDoc, collection, getDocs, DocumentReference, QuerySnapshot, DocumentData, query, where, doc } from "firebase/firestore";

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
    // KOLALR OM DEN FINNS 
    const userQuery = query(userCollection, where("username", "==", user.userName));
    const userQuerySnapshot: QuerySnapshot<DocumentData> = await getDocs(userQuery);

    if(!userQuerySnapshot.empty) {
      throw new Error("User already exists");
    }
    
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

// LOGIN A USER 

export const loginUser = async (username: string, password: string): Promise<User | null> => {
  try {
    const usersQuery = query(userCollection, where("userName", "==", username), where("password", "==", password));
    const userSnapshot: QuerySnapshot<DocumentData> = await getDocs(usersQuery);

    if (userSnapshot.empty) {
      console.log("User does not exist or invalid credentials.");
      return null;
    } else {
      const userData = userSnapshot.docs[0].data() as User;
      return { ...userData, id: userSnapshot.docs[0].id }; 
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
};

// CREATE COMMENT 

export const createComment = async (comment: Omit<Comment, "id">): Promise<Comment> => {
  try{
    const threadRef = doc(db, "threads", comment.thread.toString());
    const commentCollection = collection(threadRef, "comments");
    const docRef: DocumentReference<DocumentData> = await addDoc(commentCollection, comment);
    // const docRef: DocumentReference<DocumentData> = await addDoc(commentCollection, {
    //   ...comment,
    //   thread: comment.thread.toString(), 
    // });
    const createdComment: Comment = {
      ...comment,
      id: docRef.id,
    };
    return createdComment;
  }catch(err) {
    console.error("Error creating comment: ", err);
    throw err;
  }
}