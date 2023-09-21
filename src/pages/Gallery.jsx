import { useNavigate, useParams } from "react-router-dom";
import Data from "../components/Data";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import interact from "interactjs";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchTag from "../components/SearchTag";
function Gallery({ authenticated }) {
  const [data, setData] = useState(Data);
  const [thisTag, setThisTag] = useState("");
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated && authenticated === userId) {
      setAuthorized(true);
    }
  }, [authenticated, userId]);
  if (!authorized) {
    navigate("/");
  }
  useEffect(() => {
    if ("ontouchstart" in window) {
      const galleryContent = document.querySelector(".gallery_content_list");
      if (galleryContent) {
        interact(galleryContent)
          .draggable({
            onstart: (event) => {
              const target = event.target;
              const isDraggableList =
                target.getAttribute("draggable") === "true";
              if (isDraggableList) {
                event.preventDefault();
                const id = target.getAttribute("data-image-id");
                event.dataTransfer.setData("imageId", id);
              }
            },
            onmove: (event) => {
              console.log(event);
            },
            onend: (event) => {
              event.preventDefault();
            },
            // Add more touch-specific configurations as needed
          })
          .dropzone({
            ondrop: (event) => {
              event.preventDefault();
              const sourceId = event.dataTransfer.getData("imageId");
              const targetId = event.target.getAttribute("data-image-id");
              const updatedImages = [...data];
              const srcIndex = updatedImages.findIndex(
                (img) => img.id === sourceId
              );
              const targetIndex = updatedImages.findIndex(
                (img) => img.id === targetId
              );
              const [draggedImage] = updatedImages.splice(srcIndex, 1);
              updatedImages.splice(targetIndex, 0, draggedImage);
              setData(updatedImages);
            },
          });
      }
    }
  }, [data]);
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
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
Gallery.propTypes = {
  authenticated: PropTypes.string,
};
export default Gallery;
