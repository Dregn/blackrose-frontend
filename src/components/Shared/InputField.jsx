import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ label, name, value, onChange, required = false, type = 'text', ...props }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      fullWidth
      margin="normal"
      variant="outlined"
      {...props}
    />
  );
};

export default InputField;
