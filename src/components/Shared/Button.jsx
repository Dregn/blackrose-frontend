import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ onClick, children, color = 'primary', variant = 'contained', ...props }) => {
  return (
    <MuiButton onClick={onClick} color={color} variant={variant} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
