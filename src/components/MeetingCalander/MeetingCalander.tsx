import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import axios from 'axios';
import { heIL } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import 'dayjs/locale/he';

dayjs.locale('he'); // Set global locale to Hebrew


const theme = createTheme({
  direction: 'rtl',
});

// Mimic fetch with abort controller

const fetchMeetingsDetails = async (date: Dayjs, { signal }: { signal: AbortSignal }) => {
  try {
    const controller = new AbortController();
    signal.onabort = () => controller.abort(); // Link signal to axios cancellation

    const res = await axios.get(`http://localhost:3001/actor/practices/${localStorage.getItem('id')}`, {
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
      signal: controller.signal, // Pass cancellation signal to axios
    });

    const meetings = res.data; // This is an array of meeting objects

    // Convert API date format and store meetings by their formatted date
    const meetingsByDate: { [key: string]: any[] } = {};
    meetings.forEach((meeting: any) => {
      const formattedDate = new Date(meeting.date).toISOString().split('T')[0]; // Extract YYYY-MM-DD
      if (!meetingsByDate[formattedDate]) {
        meetingsByDate[formattedDate] = [];
      }
      meetingsByDate[formattedDate].push(meeting);
    });

    // Extract unique dates to highlight
    const daysToHighlight = Object.keys(meetingsByDate);

    return { daysToHighlight, meetingsByDate };
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new DOMException('aborted', 'AbortError');
    }
    console.error('Error fetching meetings:', error);
    alert('אירעה שגיאה בהבאת הנתונים.');
    throw error; // Rethrow for handling in the component
  }
};




const initialValue = dayjs(); // Current date


function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[]; onDayClick?: (date: string) => void }) {
  const { highlightedDays = [], day, outsideCurrentMonth, onDayClick, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(day.format('YYYY-MM-DD')) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <Button onClick={() => onDayClick?.(day.format('YYYY-MM-DD'))}>📌</Button>
        ) : undefined
      }
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState<string[]>([]);
  const [meetingsByDate, setMeetingsByDate] = React.useState<{ [key: string]: any[] }>({}); // Store meeting details
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fetchMeetingsDetails(date, { signal: controller.signal })
      .then(({ daysToHighlight, meetingsByDate }) => {
        setHighlightedDays(daysToHighlight);
        setMeetingsByDate(meetingsByDate); // Store detailed meetings
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDate(null);
  };

  return (
    <>
      <h1>יומן חזרות</h1>
      <Alert severity="info">ביום בו מתקיימת חזרות יופיע 📌 - ניתן ללחוץ ולקבל פרטים על הפגישה</Alert>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='he' localeText={{...heIL.components.MuiLocalizationProvider.defaultProps.localeText, calendarWeekNumberText: (weekNumber) => `שבוע ${weekNumber}`,}}>
          <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: (props) => (
                <ServerDay {...props} onDayClick={handleDayClick} highlightedDays={highlightedDays} />
              ),
            }}
            sx={{
              '.MuiPickersDay-root': {
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
              },
              '.MuiPickersDay-daySelected': {
                backgroundColor: 'lightgreen',
              },
            }}
          />

          {/* Meeting Details Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>פרטי החזרות:</DialogTitle>
            <DialogContent>
              {selectedDate && meetingsByDate[selectedDate] ? (
                <>
                  {meetingsByDate[selectedDate].map((meeting, index) => (
                    <div key={index}>
                      <h3>מיקום: {meeting.location}</h3>
                      <p><strong>שעה:</strong> {meeting.startHour} - {meeting.endHour}</p>
                      <p><strong>במאי:</strong> {meeting.directorId}</p>
                      {/* <p>{'localStrage.getItem('userRole') == Actor? '}</p> */}
                      {localStorage.getItem('userRole') == 'Actor' ? (
                        <p><strong>מאמן:</strong> {meeting.coachId}</p>
                      ) : localStorage.getItem('userRole') == 'Coach' ? (
                        meeting.actorsId.length == 1 ? (
                          <p><strong>שחקן:</strong> {meeting.actorsId[0]}</p>
                        ) : (
                          <p><strong>שחקנים:</strong> {meeting.actorsId.join(', ')}</p>
                        )
                      ) : null}
                      <hr />
                    </div>
                  ))}
                </>
              ) : (
                <p>אין פרטים זמינים עבור יום זה</p>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                סגור
              </Button>
            </DialogActions>
          </Dialog>
        </LocalizationProvider>
      </ThemeProvider>
      
    </>
  );
}