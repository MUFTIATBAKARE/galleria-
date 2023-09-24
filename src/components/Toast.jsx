import { useState } from "react";

function Toast() {
  const [toastMessage, setToastMessage] = useState(true);
  const closeToastMessage = () => {
    setToastMessage(false);
  };
  return (
    <>
      {toastMessage && (
        <div className="toast">
          <h6>Login Credentials for all users</h6>
          <span className="toast-content">
            <p>Email: user@example.com</p>
            <p>Password: 1Password</p>
          </span>
          <button className="toast-btn" onClick={closeToastMessage}>
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default Toast;
