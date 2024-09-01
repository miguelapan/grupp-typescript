

import { useState, useEffect } from "react";
import { getThreads } from "../services/crudService";
import { Thread } from "../types/types";

function ThreadList() {
  const [threads, setThreads] = useState<Thread[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const fetchedThreads = await getThreads(); 
        setThreads(fetchedThreads); 
      } catch (err) {
        console.error("Error fetching threads:", err);
        setError("Failed to load threads.");
      } finally {
        setLoading(false); 
      }
    };

    fetchThreads(); 
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>; 

  return (
    <div>
      {threads.map((thread) => (
        <div key={thread.id}>
          <h2>{thread.title}</h2>
          <p>{thread.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ThreadList;