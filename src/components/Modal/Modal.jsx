/* <div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>; */

import { Overlay, ModalWrapper } from './Modal.styled';

export const Modal = ({ largeImageURL, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalWrapper>
        <img src={largeImageURL} alt="Large" />
      </ModalWrapper>
    </Overlay>
  );
};
