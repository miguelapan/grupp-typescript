import React, { useState } from "react";
import { createThread } from "../../services/crudService";
import { ThreadCategory } from "../../types/types"; 

function ThreadForm() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<ThreadCategory>("THREAD"); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const newThread = {
      id: Math.random(), //ÄNDRA TILL FIREBASE ID
      title,
      description,
      category,
      creationDate: new Date().toISOString(),
      creator: {
        // FIXA USERS SEEEEN
        userName: "User name",
        password: "Password", 
      },
    };

    // ÅTERSTÄLLER FORMULÄRET
    createThread(newThread).then(() => {
      setTitle("");
      setDescription("");
      setCategory("THREAD");
    }).catch((error) => {
      console.error("Error creating thread:", error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TITLE"
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required
      />
      <textarea
        name="description"
        id="description"
        placeholder="DESCRIPTION"
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required
      ></textarea>
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
}

export default ThreadForm;