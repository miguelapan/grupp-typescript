// import { useContext, useState, useEffect, createContext, FC, ReactNode } from "react";
// import { getThreads, createThread as createThreadService } from "../services/crudService";
// import { Thread } from "../types/types";

// interface ThreadContextType {
//     threads: Thread[];
//     isLoading: boolean;
//     error: string | null;
//     createThread: (thread: Thread) => Promise<void>;
// }

// export const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

// export const ContextProvider: FC<{children: ReactNode }> =  ({ children })
//     const [threads, setThreads] = useState<Thread[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchThreads = async () => {
//             try{
//                 const fetchThreads = await getThreads();
//                 setThreads(fetchThreads);
//             }catch(err){
//                 console.error("Error fetching threads:", err);
//                 setError("Failed to load threads.");
//             }finally{
//                 setIsLoading(false);
//             }
//         }
//         fetchThreads();
//     },[])

//     const createThread = async (thread: Thread) => {
//         try{
//             await createThreadService(thread);
//             setThreads((prevThreads) => [...prevThreads, thread]);
//     }catch(err){
//         console.error("Error creating thread:", err);
//         setError("Failed to create thread.");
//     }
// }
// }

// return (
//     <ThreadContext.Provider value={{ threads, isLoading, error, createThread }}>
//       {children}
//     </ThreadContext.Provider>
// );
// };