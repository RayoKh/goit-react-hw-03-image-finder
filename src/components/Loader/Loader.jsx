import { Audio } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const Loader = () => {
  return (
    <div className="loader">
      <Audio type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

// export default CustomLoader;
