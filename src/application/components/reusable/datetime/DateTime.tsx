import * as React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import {Clock} from "@mui/x-date-pickers/internals/components/icons";

export default function DateTimePicker(props: any) {
  const dateFormat = "YYYY - MM - DD  hh:mm  A";
  const mask = dateFormat.replace(/\S/gi, '_') + "M";

  function onChangeHandler(date: any) {
    props.onChange(date);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        components={{
          LeftArrowIcon: ArrowBack,
          RightArrowIcon: ArrowForward,
          OpenPickerIcon: Clock,
        }}
        value={props.date}
        onChange={onChangeHandler}
        label={props.text}
        onError={console.log}
        inputFormat={dateFormat}
        mask={mask}
        renderInput={(params) => <TextField {...params}
                                            InputProps={{style: {height: '43px'}}} />}
      />
    </LocalizationProvider>
  );
}
