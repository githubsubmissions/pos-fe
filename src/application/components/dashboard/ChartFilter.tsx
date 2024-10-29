import React from 'react';
import {CircularProgress, IconButton, TextField} from '@mui/material';
import {ArrowUpward as ArrowUpwardIcon} from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ForwardIcon from '@mui/icons-material/Forward';
import {styled} from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({theme}) => ({
  padding: 0,
  width: '24px',
  height: '24px',
  '& svg': {
    fontSize: '1.5rem',
  },
}));

interface ChartFormProps {
  topDailyItems: number;
  daysPrior: number;
  loading: boolean;
  onTopDailyItemsChange: (value: any) => void;
  onDaysPriorChange: (value: any) => void;
  onSubmit: () => void;
}

export default function ChartFilter(
  { // TODO destructuring before getting in
    topDailyItems,
    daysPrior,
    loading,
    onTopDailyItemsChange,
    onDaysPriorChange,
    onSubmit,
  }: ChartFormProps) {

  const handleTopDailyItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    onTopDailyItemsChange(value);
  };

  const handleDaysPriorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    onDaysPriorChange(value >= 0 ? value : 0);
  };

  return (
    <React.Fragment>
      <TextField
        label="Top Daily Items"
        type="number"
        inputProps={{
          min: 0,
          max: 100,
          inputMode: 'numeric',
          style: {
            appearance: 'textfield',
            marginRight: '-20px',
          },
        }}
        value={topDailyItems}
        onChange={handleTopDailyItemsChange}
        sx={{width: '120px'}}
        size="small"
        InputProps={{
          endAdornment: (
            <React.Fragment>
              <StyledIconButton
                aria-label="decrease value"
                onClick={() => {
                  onTopDailyItemsChange((prevValue: number) => (prevValue - 1 < 0 ? 0 : prevValue - 1));
                }}
              >
                <ArrowDownwardIcon />
              </StyledIconButton>
              <StyledIconButton
                aria-label="increase value"
                onClick={() => {
                  onTopDailyItemsChange((prevValue: number) => (prevValue + 1 > 50 ? 50 : prevValue + 1));
                }}
              >
                <ArrowUpwardIcon />
              </StyledIconButton>
            </React.Fragment>
          ),
        }}
      />
      <TextField
        label="Days Considered"
        type="number"
        inputProps={{
          min: 0,
          max: 14,
          inputMode: 'text',
          style: {
            appearance: 'textfield',
            marginRight: '-20px',
          },
        }}
        value={daysPrior}
        onChange={handleDaysPriorChange}
        sx={{width: '120px', marginLeft: '16px'}}
        size="small"
        InputProps={{
          endAdornment: (
            <React.Fragment>
              <StyledIconButton
                aria-label="decrease value"
                onClick={() => {
                  onDaysPriorChange((prevValue: number) => (prevValue - 1 < 0 ? 0 : prevValue - 1));
                }}
              >
                <ArrowDownwardIcon />
              </StyledIconButton>
              <StyledIconButton
                aria-label="increase value"
                onClick={() => {
                  onDaysPriorChange((prevValue: number) => (prevValue + 1 > 7 ? 7 : prevValue + 1));
                }}
              >
                <ArrowUpwardIcon />
              </StyledIconButton>
            </React.Fragment>
          ),
          inputMode: 'numeric',
        }}
      />
      <IconButton color="success" onClick={onSubmit}>
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <ForwardIcon />
        )}
      </IconButton>
    </React.Fragment>
  );
}
