import { FormEvent, useState } from "react";
import CreateUserModal from "../modals/CreateUserModal";
import { useAuth } from "../../services/authProvider";

function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);

  // USE AUTH HOOK 
  const { login } = useAuth();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const { success, message } = await login(username, password);
    if(success) {
      setError("");
      setSuccess(message);
    } else {
      setSuccess("");
      setError(message);
    }
  };

//   ÖPPNA MODAL 

  const handleModalOpen = () => {
    setIsCreateUserModalOpen((prevState) => !prevState);
  }

  return (
<div>
    {isCreateUserModalOpen ? (
      <CreateUserModal onClose={handleModalOpen}/>
    ) : (
      <form className="login-form" onSubmit={handleFormSubmit}>
        <p>Login</p>
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
      <button type="button" onClick={handleModalOpen}>CREATE USER</button>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
    </form>
      )}
        </div>
  );
}

export default LoginForm;