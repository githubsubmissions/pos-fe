import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import VerticalIconButton, {IconProps} from "./VerticalIconButton";

const StyledButton = styled(IconButton)(({theme}) => ({
  width: 40,
  height: 40,
  position: 'relative',
}));

interface HighchartsButtonProps {
  mainIcon: React.ReactElement;
  mainIconType: string
  tooltip: string;
  onClick: () => void;
  style?: React.CSSProperties;
  selectedChartType: string;
  subIcons: IconProps[];
  selectedCategory: string;
}


export default function HighchartsButton(props: HighchartsButtonProps) {
  const {mainIcon, tooltip, onClick, style, mainIconType, subIcons, selectedCategory} = props;
  const [showSelectableIcons, setShowSelectableIcons] = useState(false);

  const handleIconClick = () => {
    setShowSelectableIcons((prevState) => !prevState);
    onClick();
  };


  return (
    <Tooltip title={tooltip} placement={'top'}>
      <StyledButton onClick={handleIconClick} style={style}>
        <VerticalIconButton mainIcon={mainIcon}
                            tooltip=""
                            subButtons={subIcons}
                            mainIconType={mainIconType}
                            selectedCategory={selectedCategory} />
      </StyledButton>
    </Tooltip>
  );
}
