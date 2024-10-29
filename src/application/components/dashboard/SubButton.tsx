import React from 'react';
import {styled} from '@mui/material/styles';

const SubButton = styled('span')(({theme}) => ({
  display: 'inline-flex',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  borderRadius: 0,
  padding: theme.spacing(0, 0, 0, 0),
  fontSize: theme.typography.caption.fontSize,
  minWidth: 0,
  cursor: 'pointer', // Add cursor style to indicate interactivity
}));

interface TooltipButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLSpanElement>; // Add onClick prop type
  color?: string; // Add color prop
}

const SubButtonComponent: React.FC<TooltipButtonProps> = ({children, onClick}) => {
  return <SubButton onClick={onClick}>{children}</SubButton>;
};

export default SubButtonComponent;
