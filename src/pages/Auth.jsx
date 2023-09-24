import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(auth?.currentUser?.email);

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/gallery");
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <>
      <Toast />
      <div className="auth_container">
        {error && <div>{`${error}`}</div>}
        <h2>Image Gallery</h2>
        <div className="auth_content">
          <p>Please, sign in here</p>

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
          Sign in
        </button>
      </div>
    </>
  );
}

export default Auth;
