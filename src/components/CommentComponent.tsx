import { Comment, Thread, QNAThread } from "../types/types";
import { FC } from "react";
import { useAuth } from "../services/authProvider";

interface CommentProps {
  comment: Comment;
  thread: Thread;
  handleComment: (threadId: string, comment: string, parentCommentId?: string) => void;
  handleIsCorrectAnswer: (threadId: string, commentId: string) => void;
}

const CommentComponent: FC<CommentProps> = ({ comment, thread, handleIsCorrectAnswer, handleComment }) => {
  const { user, isModerator } = useAuth();

  return (
    <div className="comment-container">
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const replyContent = form.reply.value;
          handleComment(thread.id, replyContent, comment.id); 
          e.currentTarget.reset();
        }}
      >
        <input type="text" name="reply" placeholder="Reply to this comment" />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default CommentComponent;
