import { FormEvent, MouseEvent, useState } from 'react'
import { createUser } from '../../services/crudService';

interface CreateUserModalProps {
    onClose: () => void;
}

function CreateUserModal({onClose}: CreateUserModalProps) {

    const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleCreateUserClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const newUser = await createUser({ userName: username, password, isModerator: false });
      console.log("User created:", newUser);
      setSuccess(true);
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
    {success && <p>User created successfully!</p>}
  </form>
    </div>
  )
}

export default CreateUserModal