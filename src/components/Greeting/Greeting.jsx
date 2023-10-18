import { CiImageOn } from 'react-icons/ci';
import { Wrapper } from './Greeting.styled';

export const Greeting = () => {
  return (
    <Wrapper>
      <h2>Please, enter your data in searchbar input</h2>
      <CiImageOn size="120" color="#3f51b5" />
    </Wrapper>
  );
};
