// import { useState, useEffect } from "react";
// import { getThreads } from "../services/crudService";
// import { Thread } from "../types/types";
// import ModalDiscussions from "./modals/ModalDiscussions";

// function ThreadList() {
//   const [threads, setThreads] = useState<Thread[]>([]); 
//   const [loading, setLoading] = useState<boolean>(true); 
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchThreads = async () => {
//       try {
//         const fetchedThreads = await getThreads(); 
//         setThreads(fetchedThreads); 
//       } catch (err) {
//         console.error("Error fetching threads:", err);
//         setError("Failed to load threads.");
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchThreads(); 
//   }, []); 

//   function modalHandler() {
//     setIsModalOpen(!isModalOpen);
//     if(isModalOpen) {
//       setIsModalOpen(false);
//     }
//   }



//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>; 

//   return (
//     <div>
//       {threads.map((thread) => (
//         <div className="thread-container" key={thread.id}>
//           <h2>{thread.title}</h2>
//           <p>{thread.description}</p>
//           <button onClick={() => modalHandler()}>SVARA</button>
//           {isModalOpen && (
//             <ModalDiscussions modalHandler={modalHandler}/>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ThreadList;

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

  return (
    <div>
      {threads.map((thread) => (
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
