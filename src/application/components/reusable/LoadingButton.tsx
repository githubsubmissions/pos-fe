import React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingButtonProps extends ButtonProps {
  spinnerLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({spinnerLoading, ...buttonProps}) => {
  return (
    <Button
      {...buttonProps}
      endIcon={spinnerLoading ? <CircularProgress size={24} color="inherit" /> : buttonProps.endIcon}
      disabled={spinnerLoading}
    />
  );
};

export default LoadingButton;
