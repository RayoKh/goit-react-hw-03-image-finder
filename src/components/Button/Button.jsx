import { LoadBtn } from './Button.styled';

export const Button = ({ onCLick }) => {
  return (
    <LoadBtn type="button" onClick={onCLick}>
      Load more
    </LoadBtn>
  );
};
