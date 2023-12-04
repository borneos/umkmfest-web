import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
  const showToast = (type, message, options = {}) => {
    if(type) {
      toast[type](message, options);
    }else{
      toast(message, options);
    }
  };

  return {
    showToast
  };
};

export default useToast;
