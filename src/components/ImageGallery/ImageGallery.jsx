import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    isShowModal: false,
    largeImageURL: null,
  };

  handleimage = largeImage => {
    this.setState({ largeImage, isShowModal: true });
  };

  handleModalClose = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { isShowModal, largeImage } = this.state;

    return (
      <>
        <GalleryList>
          {this.props.images.map(img => (
            <ImageGalleryItem
              key={img.id}
              images={img}
              onClick={this.handleimage}
            />
          ))}
        </GalleryList>
        {isShowModal && (
          <Modal largeImage={largeImage} onModalClose={this.handleModalClose} />
        )}
      </>
    );
  }
}
