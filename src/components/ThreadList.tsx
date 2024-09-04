// import { Thread } from "../types/types";
// import { useAuth } from "../services/authProvider";
// import { FC, useState } from "react";
// import { createComment } from "../services/crudService";

// interface ThreadListProps {
//   threads: Thread[];
//   loading: boolean;
//   error: string | null;
// }

// const ThreadList: FC<ThreadListProps> = ({ threads, loading, error }) => {
//   const { isAuth, user } = useAuth();

//   const [comment, setComment] = useState<string>("");
//   const [selectedThread, setSelectedThread] = useState<string>("");



//   // KOMMENTERA 

//     const handleComment = async () => {
//       if (selectedThread && comment.trim()) {
//         const newComment: Omit<Comment, "id">: parseInt(selectedThread),
//           creator: {
//             userName: user?.userName, 
//             userId: user?.password
//           },
//           creationDate: new Date().toISOString(),
//           content: comment,
//         };
//         try {
//           await createComment(newComment);
//           setComment(""); 
//         } catch (err) {
//           console.error("Error adding comment: ", err);
//         }
//       }
//     };

//   // FORMATERA DATUM 

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toISOString().split("T")[0]; 
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const reversedThreads = threads.reverse();

//   return (
//     <div>
//       {reversedThreads.map((thread) => (
//         <div className="thread-container" key={thread.id}>
//           <p>ANVÄNDARE: {thread.creator.userName}</p>
//           <p>skapad: {formatDate(thread.creationDate)}</p>
//           <h2>{thread.title}</h2>
//           <p>{thread.description}</p>
//           {isAuth ? (
//             <div>
//               <input 
//               placeholder="KOMMENTAR"
//               onChange={(e) => setComment(e.target.value)}></input>  
//             <button onClick={handleComment}>SVARA</button>
//             </div>
//               ) : (
//               <p>Logga in om du vill lämna kommentar</p>)}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ThreadList;


import { Thread, Comment } from "../types/types"; 
import { useAuth } from "../services/authProvider";
import { FC, useState } from "react";
import { createComment } from "../services/crudService";

interface ThreadListProps {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

const ThreadList: FC<ThreadListProps> = ({ threads, loading, error }) => {
  const { isAuth, user } = useAuth();

  const [comment, setComment] = useState<string>("");
  const [selectedThread, setSelectedThread] = useState<string | null>(null); 

  const handleComment = async (threadId: string) => {
    if (comment.trim() && user) {
      const newComment: Omit<Comment, "id"> = {
        thread: Number(threadId), 
        creator: {
          userName: user.userName, 
          password: user.password, 
          id: user.id || "", 
        },
        content: comment,
      };
      
      try {
        await createComment(newComment); 
        setComment(""); 
        setSelectedThread(null);
      } catch (err) {
        console.error("Error adding comment: ", err);
      }
    } else {
      console.error("Cannot add comment without valid input or user.");
    }
  };

  // Format Date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const reversedThreads = [...threads].reverse(); 

  return (
    <div>
      {reversedThreads.map((thread) => (
        <div className="thread-container" key={thread.id}>
          <p>ANVÄNDARE: {thread.creator.userName}</p>
          <p>skapad: {formatDate(thread.creationDate)}</p>
          <h2>{thread.title}</h2>
          <p>{thread.description}</p>
          {isAuth ? (
            <div>
              <input
                placeholder="KOMMENTAR"
                value={selectedThread === thread.id ? comment : ""} 
                onChange={(e) => {
                  setComment(e.target.value);
                  setSelectedThread(thread.id); 
                }}
              />
              <button
                onClick={() => handleComment(thread.id)}
                disabled={!comment.trim()}
              >
                SVARA
              </button>
            </div>
          ) : (
            <p>Logga in om du vill lämna kommentar</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
