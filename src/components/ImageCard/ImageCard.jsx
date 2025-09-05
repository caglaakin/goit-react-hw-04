export const ImageCard = ({ image, onClick } ) => {
  const handleClick = () => { 
    onClick(image);
  };

  return (
    <div onClick={handleClick}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};
