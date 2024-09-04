import { Thread, Comment } from "../types/types"; 
import { useAuth } from "../services/authProvider";
import { FC, useState } from "react";
import { createComment, getCommentsById } from "../services/crudService";

interface ThreadListProps {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

const ThreadList: FC<ThreadListProps> = ({ threads, loading, error }) => {
  const { isAuth, user } = useAuth();

  const [comment, setComment] = useState<string>("");
  const [selectedThread, setSelectedThread] = useState<string | null>(null); 
  const [commentsByThreadId, setCommentsByThreadId] = useState<{[key: string]: Comment[]}>({});


  const fetchComments = async (threadId: string) => {
    try {
      const comments = await getCommentsById(threadId); 
      setCommentsByThreadId((prev) => ({
        ...prev,
        [threadId]: comments,
      }));
    } catch (err) {
      console.error("Error fetching comments: ", err);
    }
  };

  const handleComment = async (threadId: string) => {
    if (comment.trim() && user) {
      const newComment: Omit<Comment, "id"> = {
        thread: threadId,
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
        fetchComments(threadId); 
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
          <div className="thread-header">

          <h2 className="thread-title">{thread.title}</h2>
          <span className="username-timestamp-span">
          <p className="thread-username">created by: {thread.creator.userName}</p>
          <p className="thread-timestamp">skapad: {formatDate(thread.creationDate)}</p>
          </span>
          </div>
          <p className="thread-description">{thread.description}</p>
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
            <p className="thread-login">Logga in om du vill lämna kommentar</p>
          )}
       {commentsByThreadId[thread.id] && commentsByThreadId[thread.id].length > 0 ? (
            <div className="comments-section">
              {commentsByThreadId[thread.id].map((comment) => (
                <div key={comment.id} className="comment-container">
                  <p className="comments-section">{comment.creator.userName}: {comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="thread-nocomments">No comments available for this thread.</div> 
          )}
      
        </div>
        
      ))}
      <div>

      </div>
    </div>
  );
};

export default ThreadList;
