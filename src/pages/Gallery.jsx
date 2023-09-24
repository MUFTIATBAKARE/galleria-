import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Data from "../components/Data";
import SearchTag from "../components/SearchTag";
function Gallery() {
  const [data, setData] = useState(Data);
  const [thisTag, setThisTag] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("imageId", id);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event, targetId) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("imageId");
    const updatedImages = [...data];
    const srcIndex = updatedImages.findIndex((img) => img.id === sourceId);
    const targetIndex = updatedImages.findIndex((img) => img.id === targetId);
    const [draggedImage] = updatedImages.splice(srcIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedImage);
    setData(updatedImages);
  };
  const filterByTag = data.filter((image) => {
    return image.tag.toLowerCase().includes(thisTag.toLowerCase());
  });
  return (
    <div className="gallery-container">
      {error && <div>{`${error}`}</div>}
      <div className="nav-bar">
        <SearchTag thisTag={thisTag} setThisTag={setThisTag} />
        <button className="gallery-btn" onClick={logOut}>
          Logout
        </button>
      </div>
      <ul className="gallery_content">
        {filterByTag.map((image) => {
          return (
            <li
              key={image.id}
              className="gallery_content_list"
              data-image-id={image.id}
              onDragStart={(e) => handleDragStart(e, image.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, image.id)}
              draggable="true"
            >
              <p>{image.tag}</p>
              <img src={image.url} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Gallery;
