import { Component } from 'react';
import { Overlay, ModalWrapper } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === `Escape`) {
      this.props.onModalClose();
    }
  };

  handleBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL } = this.props.largeImage;

    return (
      <Overlay onClick={this.handleBackdropeClick}>
        <ModalWrapper>
          <img src={largeImageURL} alt="LargeImage" />
        </ModalWrapper>
      </Overlay>
    );
  }
}
