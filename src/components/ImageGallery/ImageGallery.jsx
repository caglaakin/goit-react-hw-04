import { ImageCard } from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

export const ImageGallery = ({ images , onImagesClick}) => {
  return (
    <ul className={css.imageGallery}>
      {images.map((image,index) => (
        <li key={image.id} className={css.imageGalleryItem}>
              <ImageCard image={image} onClick={() => onImagesClick(index)}/>
        </li>
      ))}
    </ul>
  );
};
