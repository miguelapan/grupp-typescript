import React, { useState } from "react";
import { Thread, ThreadCategory } from "../../types/types"; 
import FormInput from "../ui/FormInput";
import TextArea from "../ui/FormTextArea";

interface ThreadFormProps {
  onAddThread: (newThread: Omit<Thread, "id">) => Promise<Thread>;  
}

const ThreadForm: React.FC<ThreadFormProps> = ({ onAddThread }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<ThreadCategory>("THREAD"); 
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (title.trim() === "" || description.trim() === "" || category.trim() === "") {
      setError("Fyll i alla fält");
      return;
    }

    const newThread: Omit<Thread, "id"> = {
      title,
      description,
      category,
      creationDate: new Date().toISOString(),
      creator: {
        userName: "User name",
        password: "Password", 
      },
    };

    try {
      const createdThread = await onAddThread(newThread);  
      console.log('Thread created successfully:', createdThread);

// RESETS 
      setTitle("");
      setDescription("");
      setCategory("THREAD");
    } catch (err) {
      console.error("Error when creating thread:", err);
    }
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
      {error && <p>{error}</p>}
    </form>
  );
};

export default ThreadForm;
