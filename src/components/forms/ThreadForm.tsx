// import React, { useState } from "react";
// import { createThread } from "../../services/crudService";
// import { Thread, ThreadCategory } from "../../types/types"; 
// import FormInput from "../ui/FormInput";
// import TextArea from "../ui/FormTextArea";

// function ThreadForm() {
//   const [title, setTitle] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [category, setCategory] = useState<ThreadCategory>("THREAD"); 

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault(); 

//     const newThread: Thread = {
//       id: Math.random(), //ÄNDRA TILL FIREBASE ID
//       title,
//       description,
//       category,
//       creationDate: new Date().toISOString(),
//       creator: {
//         // FIXA USERS SEEEEN
//         userName: "User name",
//         password: "Password", 
//       },
//     };

//     // ÅTERSTÄLLER FORMULÄRET
//     createThread(newThread).then(() => {
//       setTitle("");
//       setDescription("");
//       setCategory("THREAD");
//     }).catch((error) => {
//       console.error("Error creating thread:", error);
//     });
//   };

//   return (
//     <form className="form-thread-question" onSubmit={handleSubmit}>
//       <h2>HÄR KAN MAN DISKUTERA</h2>
//       <FormInput
//       value={title}
//       onChange={(e) => setTitle(e.target.value)}
//       placeholder="TITLE"
//        />
//       <TextArea
//       placeholder="DESCRIPTION"
//       value={description}
//       onChange={(e) => setDescription(e.target.value)} 
//       />
//       <select
//         name="CATEGORY"
//         id="category"
//         value={category} 
//         onChange={(e) => setCategory(e.target.value as ThreadCategory)} 
//         required
//       >
//         <option value="THREAD">THREAD</option>
//         <option value="QNA">QNA</option>
//       </select>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default ThreadForm;

import React, { useState } from "react";
import { Thread, ThreadCategory } from "../../types/types"; 
import FormInput from "../ui/FormInput";
import TextArea from "../ui/FormTextArea";

interface ThreadFormProps {
  onAddThread: (newThread: Thread) => void; 
}

const ThreadForm: React.FC<ThreadFormProps> = ({ onAddThread }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<ThreadCategory>("THREAD"); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const newThread: Thread = {
      id: Math.random(), //ÄNDRA TILL FIREBASE ID
      title,
      description,
      category,
      creationDate: new Date().toISOString(),
      creator: {
        userName: "User name",
        password: "Password", 
      },
    };

    onAddThread(newThread); 
    setTitle("");
    setDescription("");
    setCategory("THREAD");
  };

  return (
    <form className="form-thread-question" onSubmit={handleSubmit}>
      <h2>HÄR KAN MAN DISKUTERA</h2>
      <FormInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="TITLE"
      />
      <TextArea
        placeholder="DESCRIPTION"
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
      />
      <select
        name="CATEGORY"
        id="category"
        value={category} 
        onChange={(e) => setCategory(e.target.value as ThreadCategory)} 
        required
      >
        <option value="THREAD">THREAD</option>
        <option value="QNA">QNA</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ThreadForm;