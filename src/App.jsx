import { useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { fetchImages } from "./utils/images-api";
import { GridLoader } from "react-spinners";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "transparent",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
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
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loader && <GridLoader />}
      {error && <p>Something went wrong... Please try again later</p>}
      {images.length > 0 && (
        <ImageGallery images={images} onImagesClick={handleOpenModal} />
      )}
      {images.length > 0 && !loader && !error && page < totalPage && (
        <button type="button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
      {selectedImage && isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={customStyles}
          contentLabel="Image Modal"
        >
          <img
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
