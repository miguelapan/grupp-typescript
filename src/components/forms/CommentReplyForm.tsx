interface CommentReplyFormProps {
  threadId: string;
  parentCommentId: string | undefined;
  handleComment: (threadId: string, replyContent: string, parentCommentId?: string) => void;
}

const CommentReplyForm: React.FC<CommentReplyFormProps> = ({ threadId, parentCommentId, handleComment }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const replyContent = form.reply.value;
    handleComment(threadId, replyContent, parentCommentId);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="reply" placeholder="Reply to this comment" />
      <button type="submit">Reply</button>
    </form>
  );
};

export default CommentReplyForm;
