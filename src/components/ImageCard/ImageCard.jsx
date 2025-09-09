import css from './ImageCard.module.css';

export const ImageCard = ({ image, onClick, index }) => {
  const handleClick = () => { 
    onClick(index);
  };

  return (
    <div onClick={handleClick}>
      <img className={css.ImageCard} src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};
