import { FormEvent, MouseEvent, useState } from 'react'
import { createUser } from '../../services/crudService';

interface CreateUserModalProps {
    onClose: () => void;
}

function CreateUserModal({onClose}: CreateUserModalProps) {

    const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleCreateUserClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const newUser = await createUser({ userName: username, password });
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  };

  return (
    <div className="modal">
      <p>Create user</p>
    <form className="create-user-form" onSubmit={handleFormSubmit}>
    <input
      type="text"
      placeholder="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)} 
    />
    <input
      type="password"
      placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)} 
    />
    <button onClick={handleCreateUserClick}>SAVE USER</button>
    <button type='button' onClick={onClose}>CLOSE</button>
  </form>
    </div>
  )
}

export default CreateUserModal