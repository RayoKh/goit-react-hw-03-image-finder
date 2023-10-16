import { Audio } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="loader">
      <Audio type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
};
