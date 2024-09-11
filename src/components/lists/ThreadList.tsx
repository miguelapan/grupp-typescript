import { Thread, Comment, QNAThread } from "../../types/types";
import { useAuth } from "../../services/authProvider";
import { FC, useState, useEffect } from "react";
import { createComment, getCommentsById, updateQNA } from "../../services/crudService";
import ThreadComponent from "../subComponents/ThreadComponent";

interface ThreadListProps {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

const ThreadList: FC<ThreadListProps> = ({ threads, loading, error }) => {
  const { user } = useAuth();
  const [commentsByThreadId, setCommentsByThreadId] = useState<{ [key: string]: Comment[] }>({});

  // FETCHING ALL COMMENTS 
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
  useEffect(() => {
    threads.forEach((thread) => {
      fetchComments(thread.id);
    });
  }, [threads]);

// HANTERAR NYA KOMMENTARRER 
  const handleComment = async (threadId: string, comment: string, parentCommentId?: string ) => {
    if (comment.trim() && user) {
      const newComment: Omit<Comment, "id"> = {
        thread: threadId,
        creator: {
          userName: user.userName,
          password: user.password,
          id: user.id || "",
          isModerator: user.isModerator,
        },
        content: comment,
        parentCommentId,
      };

      try {
        await createComment(newComment);
        fetchComments(threadId);
        fetchComments(threadId); 
      } catch (err) {
        console.error("Error adding comment: ", err);
      }
    } else {
      console.error("Cannot add comment without valid input or user.");
      if(!comment.trim()) {
        alert("Cannot add empty comment");
      }
      if(!user) {
        alert("Cannot add comment without being logged in");
      }
    }
  };

      // HANDLE ANSWER  // UPPDATERAR QNA TRÅD
  const handleIsCorrectAnswer = async (threadId: string, commentId: string) => {
    try {
      await updateQNA(threadId, true, commentId);
      threads.forEach((thread) => {
        if (thread.id === threadId && "isAnswered" in thread) {
          (thread as QNAThread).isAnswered = true;
          (thread as QNAThread).answerId = commentId;
        }
      });
    } catch (err) {
      console.error("Error updating QNA thread: ", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // REVERSE TRHEADS 
  const reversedThreads = [...threads].reverse();

  return (
    
    <div>
      {reversedThreads.map((thread) => (
        <ThreadComponent
          key={thread.id}
          thread={thread}
          handleComment={(threadId: string, comment: string, parentCommentId?: string) => handleComment(threadId, comment, parentCommentId)}
          handleIsCorrectAnswer={handleIsCorrectAnswer}
          comments={commentsByThreadId[thread.id] || []}
        />
      ))}
    </div>

  );
};

export default ThreadList;