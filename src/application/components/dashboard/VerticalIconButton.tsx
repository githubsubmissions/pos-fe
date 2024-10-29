import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {Grid} from "@mui/material";
import ChartTypes from "highcharts-library/lib/domain/enums/ChartTypes";
import {useTheme} from "@mui/material/styles";

export interface IconProps {
  icon: React.ReactElement;
  tooltip: string;
  onClick: () => void;
  category: string;
}

interface VerticalIconButtonProps {
  mainIconType: string
  mainIcon: React.ReactElement;
  tooltip: string;
  subButtons: IconProps[];
  selectedCategory: string;
}

const VerticalIconButton: React.FC<VerticalIconButtonProps> = ({
                                                                 mainIconType,
                                                                 mainIcon,
                                                                 tooltip,
                                                                 subButtons,
                                                                 selectedCategory,
                                                               }) => {
  const [showButtons, setShowButtons] = useState(false);
  const theme = useTheme()

  const handleMouseEnter = () => {
    if (mainIconType === ChartTypes.PIE.label || mainIconType === ChartTypes.SEMI_CIRCLE_DONUT.label)
      setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  return (
    <Tooltip title={tooltip}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <IconButton>{mainIcon}</IconButton>
        {showButtons && (
          <Grid container sx={{position: 'absolute', left: 0, zIndex: 1}}>
            <Grid item xs={12}>
              {subButtons.map((button, index) => (
                <Tooltip key={index} title={button.tooltip}>
                  <IconButton onClick={button.onClick}
                              sx={{backgroundColor: button.category === selectedCategory ? theme.palette.success.dark : 'transparent',}}>
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Grid>
          </Grid>
        )}
      </div>
    </Tooltip>
  );
};

export default VerticalIconButton;
