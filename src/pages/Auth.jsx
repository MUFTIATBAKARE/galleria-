import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(`/gallery`);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div className="auth_container">
      {error && <div>{`${error}`}</div>}

      <h2>Image Gallery</h2>
      <div className="auth_content">
        <p>Please, signin here</p>

        <input
          type="email"
          placeholder="Please enter email address..."
          onChange={(event) => setEmail(event.target.value)}
          className="auth-box"
        />
        <input
          type="password"
          placeholder="Please enter a unique password..."
          onChange={(event) => setPassword(event.target.value)}
          className="auth-box"
        />
      </div>
      <button className="auth-btn" onClick={signIn}>
        Signin
      </button>
    </div>
  );
}
export default Auth;
