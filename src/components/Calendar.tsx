import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { Box, Paper } from '@mui/material';

type CalendarProps = {
  onDateChange: (date: Dayjs | null) => void;
  fechaSeleccionada:  string;
};

export default function Calendar( { onDateChange, fechaSeleccionada }: CalendarProps) {

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
                value={fechaSeleccionada}
                displayStaticWrapperAs="desktop"
                onChange={
                  (newValue) => {
                    onDateChange(newValue);
                }}
                renderInput={(params) => <TextField  {...params} />}
                minDate={dayjs()}
              />
      </Paper>
      </Box>
    </LocalizationProvider>
  );
}