import { Thread, QNAThread, Comment } from "../../types/types";
import { FC, useState } from "react";
import CommentList from "./../lists/CommentList";
import { useAuth } from "../../services/authProvider";

interface ThreadProps {
  thread: Thread;
  handleComment: (threadId: string, comment: string, parentCommentId?: string) => void;
  handleIsCorrectAnswer: (threadId: string, commentId: string) => void;
  comments: Comment[];
}

const ThreadComponent: FC<ThreadProps> = ({
  thread,
  handleComment,
  handleIsCorrectAnswer,
  comments,
}) => {
  const { isAuth, isModerator } = useAuth();
  const [comment, setComment] = useState<string>("");

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="thread-container">
      <div className="thread-header">
        <h2 className="thread-title">{thread.title}</h2>
        <span className="username-timestamp-span">
          {thread.category === "QNA" && (
            <div>
              <p className="thread-answered">
                Besvarad: {(thread as QNAThread).isAnswered ? "Ja" : "Nej"}
              </p>
            </div>
          )}
          <p className="thread-username">created by: {thread.creator.userName}</p>
          <p className="thread-timestamp">skapad: {formatDate(thread.creationDate)}</p>
          <p className="thread-category">kategori: {thread.category}</p>
        </span>
      </div>
      <p className="thread-description">{thread.description}</p>

{/* INPUT FOR NEW COMMENT  */}
      {(isAuth || isModerator) ? (
        <div>
          {(thread as QNAThread).isAnswered ? (
            <p className="thread-answered">TRÅDEN ÄR LÅST</p>
          ) : (
            <div>
              <input
                placeholder="KOMMENTAR"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={() => handleComment(thread.id, comment)} disabled={!comment.trim()}>
                SVARA
              </button>
            </div>
          )}
          {/* Render COMMENTS */}
          <CommentList
            comments={comments}
            thread={thread}
            handleIsCorrectAnswer={handleIsCorrectAnswer}
            handleComment={handleComment}
          />
        </div>
      ) : (
        <p className="thread-login">Logga in om du vill lämna kommentar</p>
      )}


      
    </div>
  );
};

export default ThreadComponent;
