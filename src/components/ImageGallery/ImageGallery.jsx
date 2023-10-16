// {/* <ul class="gallery">{/* Набір <li> із зображеннями */}</ul>; */}
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ children }) => {
  return <GalleryList>{children}</GalleryList>;
};
