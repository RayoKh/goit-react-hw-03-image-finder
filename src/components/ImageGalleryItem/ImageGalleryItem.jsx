/* <li class="gallery-item">
<img src="" alt="" />
</li>; */

import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <GalleryItem onClick={() => onClick(image.largeImageURL)}>
      <GalleryItemImg src={image.webformatURL} alt={image.id} />
    </GalleryItem>
  );
};
