import { Thread, User, Comment, QNAThread } from "../types/types";
import { db } from "../../firebase/config";
import { addDoc, collection, getDocs, DocumentReference, QuerySnapshot, DocumentData, query, where, updateDoc, doc, getDoc } from "firebase/firestore";

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
      return { ...userData, id: userSnapshot.docs[0].id, isModerator: userData.isModerator  ?? false }; 
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
};

// CREATE COMMENT 
const removeUndefinedFields = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
};

export const createComment = async (comment: Omit<Comment, "id">): Promise<Comment> => {
  try {
    const commentCollection = collection(db, `threads/${comment.thread}/comments`);
    const sanitizedComment = removeUndefinedFields(comment);
    const docRef: DocumentReference<DocumentData> = await addDoc(commentCollection, sanitizedComment);
    const createdComment: Comment = {
      ...comment,
      id: docRef.id,
    };

    return createdComment;
  } catch (err) {
    console.error("Error creating comment: ", err);
    throw err;
  }
};


// KOLLA SEN 
// KOLLA SEN 
// KOLLA SEN 
// KOLLA SEN 
// KOLLA SEN 
// KOLLA SEN 
// KOLLA SEN 

export const getCommentsById = async (threadId: string): Promise<Comment[]> => {
  try {
    const commentsCollection = collection(db, `threads/${threadId}/comments`);
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(commentsCollection);
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      thread: threadId,
      content: doc.data().content as string,
      creator: doc.data().creator as User,
      parentCommentId: doc.data().parentCommentId as string | undefined,
    })) as Comment[];

    // Krpngel kolla sen... 
    const commentMap: { [key: string]: Comment } = {};
    const rootComments: Comment[] = [];

    comments.forEach(comment => {
      commentMap[comment.id] = { ...comment, comments: [] };
    });

    comments.forEach(comment => {
      if (comment.parentCommentId) {
        const parent = commentMap[comment.parentCommentId];
        if (parent) {
          parent.comments!.push(commentMap[comment.id]);
        }
      } else {
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  } catch (error) {
    console.error("Error fetching comments: ", error);
    throw error;
  }
};

// POST QNA

export const createQNA = async (qna: Omit<QNAThread, "id">): Promise<QNAThread> => {
  try{
    const QNACategory: Omit<QNAThread, "id"> = {
      ...qna,
      category: "QNA",
    };

    const docRef: DocumentReference<DocumentData> = await addDoc(threadCollection, QNACategory);
    const createdQNA: QNAThread = {
      ...QNACategory,
      id: docRef.id,
    };
    return createdQNA;
  }catch(err){
    console.error("Error creating QNA: ", err);
    throw err;
  }
}

// UPDATE QNA IS ANSWERED

export const updateQNA = async (threadId: string, isAnswered: boolean, answerCommentId?: string): Promise<void> => {
  try{
    const threadRef = doc(db, "threads", threadId);
    const updateData = { isAnswered, ...(answerCommentId && { answerId: answerCommentId }) };
    await updateDoc(threadRef, updateData);
    console.log("QNA updated successfully");
  }catch(err){
    console.error("Error updating QNA: ", err);
    throw err;
  }
};

