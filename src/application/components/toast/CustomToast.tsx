import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomToastContainer = () => {
  return (
    <ToastContainer
      theme="colored"
      autoClose={3000}
      toastClassName="custom-toast"
      // toastComponent={CustomToast}
    />
  );
};

interface CustomToastProps {
  closeToast: () => void;
  toastProps: any;
}

const CustomToast: React.FC<CustomToastProps> = ({closeToast, toastProps}) => {
  const {message, type} = toastProps;

  const getToastStyles = (): React.CSSProperties => {
    if (type === 'error') {
      return {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
    }

    // Default style
    return {};
  };

  return (
    <div style={getToastStyles()}>
      {message}
      <button onClick={closeToast}>Close</button>
    </div>
  );
};
