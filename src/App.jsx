import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { fetchImages } from "./utils/images-api";
import { GridLoader } from "react-spinners";
import Modal from "react-modal";
import "./App.css";
import { PiX } from "react-icons/pi";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    margin: "0 auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
    padding: "0",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "90%",
    maxHeight: "90vh",
    flexDirection: "column",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
};

function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleSearch = async (newQuery) => {
    try {
      setImages([]);
      setQuery(newQuery);
      setPage(1);
      setError(false);
      setLoader(true);
      const data = await fetchImages(newQuery, 1);
      setImages(data.results);
      setTotalPage(data.total_pages);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleLoadMore = async () => {
    setLoader(true);
    try {
      const nextPage = page + 1;
      const response = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...response.results]);
      setPage(nextPage);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loader && (
        <div className="loader">
          <GridLoader margin={8} size={40} color="#470c7eb9" />
        </div>
      )}
      {error && <p>Something went wrong... Please try again later</p>}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImagesClick={(index) => handleOpenModal(index)}
        />
      )}
      {images.length > 0 && !loader && !error && page < totalPage && (
        <button
          type="button"
          onClick={handleLoadMore}
          className="loadMoreButton"
        >
          Load More
        </button>
      )}
      {isModalOpen && images.length > 0 && selectedImageIndex !== null && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
          contentLabel="Image Modal"
        >
          <button onClick={handleCloseModal} className="closeModalButton">
            &times;
          </button>
          {images.length > 1 && (
            <button className="navButton prevButton" onClick={handlePrev}>
              &#10094;
            </button>
          )}
          <img
            src={images[selectedImageIndex].urls.regular}
            alt={images[selectedImageIndex].alt_description}
          />
          {images.length > 1 && (
            <button className="navButton nextButton" onClick={handleNext}>
              &#10095;
            </button>
          )}
          <div className="imageDescription">
            {images[selectedImageIndex].alt_description && (
              <p>{images[selectedImageIndex].alt_description}</p>
            )}
            {images[selectedImageIndex].user && (
              <p>by {images[selectedImageIndex].user.name}</p>
            )}
            {images[selectedImageIndex].user.location && (
              <p>{images[selectedImageIndex].user.location}</p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default App;
