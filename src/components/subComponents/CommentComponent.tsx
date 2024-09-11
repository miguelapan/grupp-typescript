import { Comment, Thread, QNAThread } from "../../types/types";
import { FC } from "react";
import { useAuth } from "../../services/authProvider";
import CommentReplyForm from "../forms/commentReplyForm";

interface CommentProps {
  comment: Comment;
  thread: Thread & { isAnswered?: boolean }; 
  handleComment: (threadId: string, comment: string, parentCommentId?: string) => void;
  handleIsCorrectAnswer: (threadId: string, commentId: string) => void;
  level: number;
}

const CommentComponent: FC<CommentProps> = ({ comment, thread, handleIsCorrectAnswer, handleComment, level }) => {
  const { user, isModerator } = useAuth();

  return (
    <div className="comment-container" style={{ paddingLeft: level * 20+ 'px'}}>
      <p className="comments-section">
        {comment.creator.userName}: {comment.content}
      </p>
      {/* RÄTT SVAR KNAPPEN  */}
      {(user && user.userName === thread.creator.userName || isModerator) &&
        !(thread as QNAThread).isAnswered &&
        thread.category === "QNA" && (
          <button onClick={() => handleIsCorrectAnswer(thread.id, comment.id)}>Välj som svar</button>
      )}

      {/* RÄTT SVAR */}
      {(thread as QNAThread).answerId === comment.id &&(
        <p className="selected-answer-p">Detta är det valda svaret</p>
      )}
      {/* REPLY FORM */}
      {thread && !thread.isAnswered && (
    
        <CommentReplyForm 
          threadId={thread.id}
          parentCommentId={comment.id}
          handleComment={handleComment}
        />
      )}
    </div>
  );
};

export default CommentComponent;
