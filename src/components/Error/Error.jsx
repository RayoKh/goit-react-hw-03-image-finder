import { CiFaceFrown } from 'react-icons/ci';
import { Wrapper } from './Error.styled';

export const Error = ({ message }) => {
  return (
    <Wrapper>
      <h2>{message}</h2>
      <CiFaceFrown size="120" color="#3f51b5" />
    </Wrapper>
  );
};
