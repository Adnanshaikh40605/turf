import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  WbSunny as SunIcon,
  Nightlight as NightIcon,
  Add as AddIcon,
  Check as CheckIcon,
  ArrowBack as ArrowBackIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';

const BookingPage = () => {
  const { sportType } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for date selection
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Generate dates for the calendar view (7 days)
  const today = new Date();
  const dateArray = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  
  // Time slots grouped by time of day
  const midnightSlots = [
    { time: "1:00 - 2:00", price: 1200 },
    { time: "2:00 - 3:00", price: 1200 },
    { time: "3:00 - 4:00", price: 1200 },
  ];
  
  const morningSlots = [
    { time: "4:00 - 5:00", price: 1200 },
    { time: "5:00 - 6:00", price: 1200 },
    { time: "6:00 - 7:00", price: 1200 },
    { time: "7:00 - 8:00", price: 1500 },
    { time: "8:00 - 9:00", price: 1500 },
  ];
  
  const afternoonSlots = [
    { time: "12:00 - 1:00", price: 1500 },
    { time: "1:00 - 2:00", price: 1500 },
    { time: "2:00 - 3:00", price: 1500 },
    { time: "3:00 - 4:00", price: 1500 },
  ];
  
  const eveningSlots = [
    { time: "4:00 - 5:00", price: 2000 },
    { time: "5:00 - 6:00", price: 2000 },
    { time: "6:00 - 7:00", price: 2000 },
    { time: "7:00 - 8:00", price: 2000 },
    { time: "8:00 - 9:00", price: 2000 },
  ];
  
  // Mock data for booked slots
  const bookedSlots = [
    { date: format(dateArray[0], 'yyyy-MM-dd'), time: "7:00 - 8:00" },
    { date: format(dateArray[0], 'yyyy-MM-dd'), time: "8:00 - 9:00" },
    { date: format(dateArray[1], 'yyyy-MM-dd'), time: "2:00 - 3:00" },
    { date: format(dateArray[2], 'yyyy-MM-dd'), time: "6:00 - 7:00" },
  ];

  // Calculate available slots
  const getTotalSlots = () => {
    return midnightSlots.length + morningSlots.length + afternoonSlots.length + eveningSlots.length;
  };

  const getAvailableSlots = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const bookedForDate = bookedSlots.filter(slot => slot.date === dateStr).length;
    return getTotalSlots() - bookedForDate;
  };
  
  // Check if a slot is booked
  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots.some(slot => slot.date === date && slot.time === time);
  };
  
  // Handle slot selection (multiple selection)
  const handleSlotSelect = (date: string, time: string) => {
    if (!isSlotBooked(date, time)) {
      const slotId = `${date}-${time}`;
      setSelectedSlots(prev => {
        if (prev.includes(slotId)) {
          return prev.filter(id => id !== slotId);
        } else {
          return [...prev, slotId];
        }
      });
    }
  };
  
  // Handle booking confirmation
  const handleBookNow = () => {
    if (selectedSlots.length > 0) {
      setShowSuccessMessage(true);
      // Reset selected slots after successful booking
      setTimeout(() => {
        setSelectedSlots([]);
        navigate('/');
      }, 2000);
    }
  };
  
  // Handle go back
  const handleGoBack = () => {
    navigate('/');
  };

  // Handle close success message
  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    selectedSlots.forEach(slotId => {
      const time = slotId.split('-')[2] + ' - ' + slotId.split('-')[3];
      
      // Find the price for this time slot
      const allSlots = [...midnightSlots, ...morningSlots, ...afternoonSlots, ...eveningSlots];
      const slot = allSlots.find(s => s.time === time);
      if (slot) {
        total += slot.price;
      }
    });
    return total;
  };

  // Render time slot card
  const renderTimeSlot = (slot: { time: string, price: number }, category: string) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const isBooked = isSlotBooked(dateStr, slot.time);
    const slotId = `${dateStr}-${slot.time}`;
    const isSelected = selectedSlots.includes(slotId);
    
    return (
      <Card 
        key={`${dateStr}-${slot.time}`}
        elevation={0}
        sx={{
          mb: 2,
          border: '1px solid',
          borderColor: isSelected ? 'primary.main' : 'divider',
          borderRadius: 2,
          backgroundColor: isBooked ? 'grey.100' : 'white',
          opacity: isBooked ? 0.7 : 1,
          position: 'relative',
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: { xs: 1.5, sm: 2 },
          '&:last-child': { pb: { xs: 1.5, sm: 2 } }
        }}>
          <Box>
            <Typography variant="h6" fontWeight={500} sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {slot.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mr: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              ₹{slot.price}
            </Typography>
            <IconButton 
              color="primary"
              disabled={isBooked}
              onClick={() => handleSlotSelect(dateStr, slot.time)}
              sx={{ 
                bgcolor: isSelected ? 'primary.main' : 'grey.100',
                color: isSelected ? 'white' : 'primary.main',
                '&:hover': {
                  bgcolor: isSelected ? 'primary.dark' : 'grey.200',
                },
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 }
              }}
            >
              {isSelected ? <CheckIcon /> : <AddIcon />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" component="h1" fontWeight={600}>
                {sportType === 'cricket' ? 'Cricket Field' : 'Pickleball Court'}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md">
        {/* Date Selector */}
        <Box sx={{ my: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box 
              component="span"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                fontWeight: 500
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  p: 0.5,
                  borderRadius: 1,
                  display: 'inline-flex',
                  mr: 1
                }}
              >
                <Box component="span" role="img" aria-label="calendar">
                  📅
                </Box>
              </Box>
              <Typography variant="h6">July 2025</Typography>
            </Box>
          </Box>

          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <IconButton 
              sx={{ 
                position: 'absolute',
                left: { xs: -8, sm: -16 },
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 }
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            <Box 
              sx={{ 
                display: 'flex',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                px: 1,
                py: 1,
                flex: 1
              }}
            >
              {dateArray.map((date, index) => {
                const dayNumber = format(date, 'd');
                const dayName = format(date, 'EEE');
                const isToday = isSameDay(date, today);
                const isSelected = isSameDay(date, selectedDate);
                const labelText = index === 0 ? 'Today' : dayName;

                return (
                  <Box
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    sx={{
                      minWidth: { xs: 60, sm: 70 },
                      height: { xs: 60, sm: 70 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 0.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: isSelected ? '2px solid' : '1px solid',
                      borderColor: isSelected ? 'primary.main' : 'divider',
                      bgcolor: isSelected ? 'white' : 'transparent',
                      boxShadow: isSelected ? 1 : 0,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                      }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      color={isSelected ? 'primary.main' : 'text.secondary'}
                      fontWeight={500}
                    >
                      {labelText}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      fontWeight={600}
                      color={isSelected ? 'primary.main' : 'text.primary'}
                    >
                      {dayNumber}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <IconButton 
              sx={{ 
                position: 'absolute',
                right: { xs: -8, sm: -16 },
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 }
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Available Slots Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={600}>
                Available Slots
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                sx={{ 
                  ml: 2,
                  color: 'primary.main'
                }}
              >
                {getAvailableSlots()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InfoIcon fontSize="small" sx={{ color: 'warning.main', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                Min. 60 mins slots
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Time Slots */}
        <Box sx={{ mb: 4 }}>
          {/* Midnight Slots */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2 
            }}>
              <NightIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <Typography variant="h6" fontWeight={600} color="text.secondary">
                Mid-Night Slots
              </Typography>
            </Box>
            {midnightSlots.map(slot => renderTimeSlot(slot, 'midnight'))}
          </Box>

          {/* Morning Slots */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2 
            }}>
              <Box component="span" role="img" aria-label="morning" sx={{ mr: 1 }}>
                🌞
              </Box>
              <Typography variant="h6" fontWeight={600} color="warning.dark">
                Morning Slots
              </Typography>
            </Box>
            {morningSlots.map(slot => renderTimeSlot(slot, 'morning'))}
          </Box>

          {/* Afternoon Slots */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2 
            }}>
              <SunIcon sx={{ color: 'warning.main', mr: 1 }} />
              <Typography variant="h6" fontWeight={600} color="warning.main">
                Afternoon Slots
              </Typography>
            </Box>
            {afternoonSlots.map(slot => renderTimeSlot(slot, 'afternoon'))}
          </Box>

          {/* Evening Slots */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2 
            }}>
              <Box component="span" role="img" aria-label="evening" sx={{ mr: 1 }}>
                🌆
              </Box>
              <Typography variant="h6" fontWeight={600} color="primary.main">
                Evening Slots
              </Typography>
            </Box>
            {eveningSlots.map(slot => renderTimeSlot(slot, 'evening'))}
          </Box>
        </Box>

        {/* Fixed Book Now Button */}
        {selectedSlots.length > 0 && (
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ 
              position: 'fixed', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              bgcolor: 'background.paper',
              borderTop: '1px solid',
              borderColor: 'divider',
              p: 2,
              zIndex: 10
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" fontWeight={500}>
                  {selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''} selected
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  Total: ₹{calculateTotalPrice()}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleBookNow}
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: 'success.main',
                  '&:hover': {
                    bgcolor: 'success.dark',
                  }
                }}
              >
                Book Now
              </Button>
            </Container>
          </Box>
        )}
      </Container>

      {/* Success Message */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={2000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSuccessMessage} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Booking successful! Redirecting to home...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingPage; 