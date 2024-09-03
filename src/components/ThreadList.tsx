
import React, { useState } from "react";
import { Thread } from "../types/types";
import ModalDiscussions from "./modals/ModalDiscussions";

interface ThreadListProps {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

const ThreadList: React.FC<ThreadListProps> = ({ threads, loading, error }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function modalHandler() {
    setIsModalOpen(!isModalOpen);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const reversedThreads = threads.reverse();

  return (
    <div>
      {reversedThreads.map((thread) => (
        <div className="thread-container" key={thread.id}>
          <h2>{thread.title}</h2>
          <p>{thread.description}</p>
          <button onClick={() => modalHandler()}>SVARA</button>
          {isModalOpen && <ModalDiscussions modalHandler={modalHandler} />}
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
