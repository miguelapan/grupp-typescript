
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

  // FORMATERA DATUM 

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extracts the YYYY-MM-DD part
  };

  // MODALHANDLER 

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
          <p>ANVÄNDARE: {thread.creator.userName}</p>
          <p>skapad: {formatDate(thread.creationDate)}</p>
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
