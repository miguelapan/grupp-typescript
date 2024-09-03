import { FormEvent, useState } from "react";
import CreateUserModal from "../modals/CreateUserModal";
import { loginUser } from "../../services/crudService";
import { User } from "../../types/types";

function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try{
        const user: User | null = await loginUser(username, password);

        if(user) {
          setError("");
          setSuccess("You are logged in as : " + username);
        }else {
          console.log(user);
          setError("Invalid username or password");
        }
    }catch(err: any) {
      console.error("Error logging in: ", err);
      setError(err.message);
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