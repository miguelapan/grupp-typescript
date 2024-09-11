import { FC } from "react";
import { Comment, Thread } from "../../types/types";
import CommentComponent from "../subComponents/CommentComponent";

interface CommentListProps {
  comments: Comment[];
  thread: Thread;
  handleIsCorrectAnswer: (threadId: string, commentId: string) => void;
  handleComment: (threadId: string, comment: string, parentCommentId?: string) => void;
}

const CommentList: FC<CommentListProps> = ({ comments, thread, handleIsCorrectAnswer, handleComment }) => {

  const renderComments = (comments: Comment[], level: number = 0) => {
    return comments.map(comment => (
      <div key={comment.id} style={{ marginLeft: level * 20 + 'px' }}>
        <CommentComponent
          comment={comment}
          thread={thread}
          handleIsCorrectAnswer={handleIsCorrectAnswer}
          handleComment={handleComment}
          level={level}
        />
        {renderComments(comment.comments || [], level + 1)}
      </div>
    ));
  };

  return (
    <div className="comments-section">
      {renderComments(comments)} 
    </div>
  );
};

export default CommentList;
