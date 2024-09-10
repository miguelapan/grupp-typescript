import { Comment, Thread } from "../../types/types";
import { FC } from "react";
import CommentComponent from "../CommentComponent";

interface CommentListProps {
  comments: Comment[];
  thread: Thread;
  handleIsCorrectAnswer: (threadId: string, commentId: string) => void;
  handleComment: (threadId: string, comment: string, parentCommentId?: string) => void;
}

const forbiddenWords = ["dum", "fet", "ful", "idiot", "korkad", "långsam", "trög", "töntig"];

const filterComment = (comment: string): string => {
  let filteredComment = comment;

  forbiddenWords.forEach((word) => {
    filteredComment = filteredComment.replace(word, "****");
  });

  return filteredComment;
}


const CommentList: FC<CommentListProps> = ({ comments, thread, handleIsCorrectAnswer, handleComment }) => {
  return (
    <div className="comments-section">
      {comments.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={{
            ...comment,
            content: filterComment(comment.content)
          }}
          // comment={comment}
          thread={thread}
          handleIsCorrectAnswer={handleIsCorrectAnswer}
          handleComment={handleComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
