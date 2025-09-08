import css from './ImageCard.module.css';

export const ImageCard = ({ image, onClick }) => {
  const handleClick = () => { 
    onClick(image);
  };

  return (
    <div onClick={handleClick}>
      <img className={css.ImageCard} src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};
