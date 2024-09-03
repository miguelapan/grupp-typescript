import { FormEvent, useState } from "react";
import CreateUserModal from "../modals/CreateUserModal";

function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);



  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    //FORM LOGIC

    
  };

//   ÖPPNA MODAL 

  const handleModalOpen = () => {
    setIsCreateUserModalOpen((prevState) => !prevState);
  }

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
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
      <button type="submit">LOGIN</button>
      <button onClick={handleModalOpen}>CREATE USER</button>
        {isCreateUserModalOpen && <CreateUserModal onClose={handleModalOpen}/>}
    </form>
  );
}

export default LoginForm;