import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFileUploadProps {
  content?: string;
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ content, action }) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      { content || 'Tải lên'}
      <VisuallyHiddenInput
        type="file"
        onChange={action}
        multiple
      />
    </Button>
  );
};

export default InputFileUpload;
