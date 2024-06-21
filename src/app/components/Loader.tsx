import { MutatingDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <MutatingDots
        height="80"
        width="80"
        color="#3498db"
        secondaryColor="#3498db"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
