import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onClick }) => {
  const { webformatURL, largeImageURL } = images;

  return (
    <GalleryItem
      onClick={e => {
        e.preventDefault();
        onClick({ largeImageURL });
      }}
    >
      <GalleryItemImg src={webformatURL} alt="LargeImage" />
    </GalleryItem>
  );
};
