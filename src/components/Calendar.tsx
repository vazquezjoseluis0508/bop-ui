import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { Box, Paper } from '@mui/material';

export default function Calendar( { onDateChange, dateSelected }) {



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
        }}
        margin={2}
        borderRadius={4}
      >
        <Paper elevation={24}   >
        <StaticDatePicker
          value={dateSelected}
          displayStaticWrapperAs="desktop"
          onChange={onDateChange}
          renderInput={(params) => <TextField  {...params} />}
      />
      </Paper>
      </Box>
    </LocalizationProvider>
  );
}