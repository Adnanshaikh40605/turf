import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  TextField,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  WbSunny as SunIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, addDays } from 'date-fns';

const BookingPage = () => {
  const { sportType } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for date selection
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Generate dates for the calendar view
  const currentDate = selectedDate || new Date();
  const dateArray = [0, 1, 2, 3].map(i => addDays(currentDate, i));
  
  // Time slots
  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', 
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];
  
  // Mock data for booked slots
  const bookedSlots = [
    { date: format(dateArray[0], 'yyyy-MM-dd'), time: '09:00 AM' },
    { date: format(dateArray[0], 'yyyy-MM-dd'), time: '10:00 AM' },
    { date: format(dateArray[1], 'yyyy-MM-dd'), time: '02:00 PM' },
    { date: format(dateArray[2], 'yyyy-MM-dd'), time: '06:00 PM' },
  ];
  
  // Mock data for filling fast slots
  const fillingFastSlots = [
    { date: format(dateArray[0], 'yyyy-MM-dd'), time: '11:00 AM' },
    { date: format(dateArray[1], 'yyyy-MM-dd'), time: '04:00 PM' },
    { date: format(dateArray[3], 'yyyy-MM-dd'), time: '07:00 PM' },
  ];
  
  // Check if a slot is booked
  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots.some(slot => slot.date === date && slot.time === time);
  };
  
  // Check if a slot is filling fast
  const isSlotFillingFast = (date: string, time: string) => {
    return fillingFastSlots.some(slot => slot.date === date && slot.time === time);
  };
  
  // Handle slot selection
  const handleSlotSelect = (date: string, time: string) => {
    if (!isSlotBooked(date, time)) {
      setSelectedSlot(`${date}-${time}`);
    }
  };
  
  // Handle date navigation
  const handlePreviousDay = () => {
    if (selectedDate) {
      setSelectedDate(addDays(selectedDate, -1));
    }
  };
  
  const handleNextDay = () => {
    if (selectedDate) {
      setSelectedDate(addDays(selectedDate, 1));
    }
  };
  
  // Handle booking confirmation
  const handleBookNow = () => {
    if (selectedSlot) {
      // Navigate to checkout or confirmation page
      navigate('/checkout');
    }
  };
  
  return (
    <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Book {sportType === 'cricket' ? 'Cricket Field' : 'Pickleball Court'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select your preferred date and time slot
          </Typography>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            mb: 4
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3
          }}>
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                  slotProps={{
                    textField: {
                      fullWidth: isMobile,
                      sx: { width: isMobile ? '100%' : 200 }
                    }
                  }}
                />
              </LocalizationProvider>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mr: 1
              }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  bgcolor: 'error.main',
                  borderRadius: '50%',
                  mr: 1
                }} />
                <Typography variant="body2">Booked</Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mr: 1
              }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  bgcolor: 'success.light',
                  borderRadius: '50%',
                  mr: 1
                }} />
                <Typography variant="body2">Filling Fast</Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center'
              }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  bgcolor: 'grey.300',
                  borderRadius: '50%',
                  mr: 1
                }} />
                <Typography variant="body2">Available</Typography>
              </Box>
              
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setSelectedDate(new Date())}
                sx={{ ml: { xs: 0, sm: 2 } }}
              >
                Today
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ overflowX: 'auto' }}>
            <Box sx={{ 
              display: 'flex',
              minWidth: 600,
            }}>
              {/* Time column */}
              <Box sx={{ 
                width: 80, 
                flexShrink: 0,
                mr: 1
              }}>
                {timeSlots.map((time) => (
                  <Box 
                    key={time}
                    sx={{ 
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      px: 1,
                      py: 2
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" fontWeight={500}>
                        {time}
                      </Typography>
                      <SunIcon sx={{ color: 'warning.light', fontSize: 18 }} />
                    </Box>
                  </Box>
                ))}
              </Box>
              
              {/* Date columns */}
              <Box sx={{ 
                display: 'flex',
                flex: 1,
              }}>
                {dateArray.map((date, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      flex: 1,
                      minWidth: 120,
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ 
                      p: 1,
                      textAlign: 'center',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'grey.50'
                    }}>
                      <Typography variant="h6" fontWeight={600}>
                        {format(date, 'd')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {format(date, 'EEE')}
                      </Typography>
                    </Box>
                    
                    {timeSlots.map((time) => {
                      const dateStr = format(date, 'yyyy-MM-dd');
                      const isBooked = isSlotBooked(dateStr, time);
                      const isFillingFast = isSlotFillingFast(dateStr, time);
                      const isSelected = selectedSlot === `${dateStr}-${time}`;
                      
                      return (
                        <Box 
                          key={`${dateStr}-${time}`}
                          onClick={() => handleSlotSelect(dateStr, time)}
                          sx={{ 
                            height: 60,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            bgcolor: isSelected 
                              ? 'primary.light' 
                              : isBooked 
                                ? 'error.light' 
                                : isFillingFast 
                                  ? 'success.light' 
                                  : 'grey.100',
                            opacity: isBooked ? 0.7 : 1,
                            cursor: isBooked ? 'not-allowed' : 'pointer',
                            '&:hover': {
                              bgcolor: isBooked 
                                ? 'error.light' 
                                : isSelected 
                                  ? 'primary.light' 
                                  : 'action.hover'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        />
                      );
                    })}
                  </Box>
                ))}
              </Box>
              
              {/* Navigation buttons */}
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ml: 1
              }}>
                <IconButton 
                  onClick={handlePreviousDay}
                  size="small"
                  sx={{ mb: 1 }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton 
                  onClick={handleNextDay}
                  size="small"
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Paper>
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 4
        }}>
          <Button
            variant="contained"
            size="large"
            disabled={!selectedSlot}
            onClick={handleBookNow}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2
            }}
          >
            Continue to Booking
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BookingPage; 