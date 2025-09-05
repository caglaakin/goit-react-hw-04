import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ images , onImagesClick}) => {
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
              <ImageCard image={image} onClick={onImagesClick}/>
        </li>
      ))}
    </ul>
  );
};
