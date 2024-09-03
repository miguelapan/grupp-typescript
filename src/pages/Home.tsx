import { useState, useEffect } from "react";
import { getThreads, createThread as createThreadService } from "../services/crudService";
import { Thread } from "../types/types";
import ThreadForm from "../components/forms/ThreadForm";
import ThreadList from "../components/ThreadList";

function Home() {
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

  const handleAddThread = async (newThreadData: Omit<Thread, "id">): Promise<Thread> => {
    try {
      const createdThread = await createThreadService(newThreadData); 
      setThreads((prevThreads) => [...prevThreads, createdThread]);
      return createdThread; 
    } catch (error) {
      console.error("Error creating thread:", error);
      setError("Failed to create thread.");
      throw error; 
    }
  };

  return (
    <>
      <ThreadForm onAddThread={handleAddThread} />
      <ThreadList threads={threads} loading={loading} error={error} />
    </>
  );
}

export default Home;
