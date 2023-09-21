import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Gallery from "./pages/Gallery";
import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  const handleUserId = (uid) => {
    console.log(uid);
    setUserId(uid);
  };

  useEffect(() => {
    console.log("Id:", userId);
  }, [userId]);

  return (
    <Routes>
      <Route path="/" element={<Auth id={handleUserId} />} />
      <Route
        path="/gallery/:userId"
        element={<Gallery authenticated={userId} />}
      />
    </Routes>
  );
}

export default App;
