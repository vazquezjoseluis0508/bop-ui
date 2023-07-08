import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDayProps, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import { Box, Paper } from '@mui/material';
import { IMenuPersonal } from '../hook/types';

type CalendarProps = {
  onDateChange: (date: Dayjs | null) => void;
  fechaSeleccionada:  string;
  reservas: IMenuPersonal[] | undefined;
};

export default function Calendar( { onDateChange, fechaSeleccionada, reservas }: CalendarProps) {



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: 400,
        }}
        margin={2}
      >
        <Paper elevation={24} sx={
          {
            maxWidth: 400,
          }
        }  >
          
              <StaticDatePicker
                
                value={fechaSeleccionada}
                displayStaticWrapperAs="desktop"
                renderDay={
                  (day: Dayjs, selectedDays: Dayjs[], pickersDayProps: PickersDayProps<Dayjs>) => {
                    const dayIsBooked = reservas?.find( reserva => reserva.start.substring(0,10) === day.format('YYYY-MM-DD'))
                    return (
                      <PickersDay
                        {...pickersDayProps}
                        disableMargin
                        style={{
                          color: dayIsBooked ? '#f44336' : pickersDayProps.color,
                          fontWeight: pickersDayProps.today ? 'bold' : undefined,
                        }}
                      />
                    );
                  }

                }
                onChange={
                  (newValue) => {
                    onDateChange(newValue);
                }}
                renderInput={(params) => <TextField  {...params} />}
                minDate={dayjs().subtract(1, 'day')}
              />
      </Paper>
      </Box>
    </LocalizationProvider>
  );
}