import { useState, useEffect } from "react";
import { getThreads, createThread as createThreadService } from "../services/crudService";
import { Thread } from "../types/types";
import ThreadForm from "../components/forms/ThreadForm";
import ThreadList from "../components/ThreadList";
import { useAuth } from "../services/authProvider";

function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuth } = useAuth();


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
      {isAuth ? (
        <ThreadForm onAddThread={handleAddThread} />
      ) : (
        <p className="header-padding">Logga in för att skapa en ny tråd.</p>
      )}
      <ThreadList threads={threads} loading={loading} error={error} />
    </>
  );
}

export default Home;
