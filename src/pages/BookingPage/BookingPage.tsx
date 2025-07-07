import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  WbSunny as SunIcon,
  Nightlight as NightIcon,
  Add as AddIcon,
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
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formatType, setFormatType] = useState<string>("5v5");
  
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
  
  // Check if a slot is booked
  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots.some(slot => slot.date === date && slot.time === time);
  };
  
  // Handle slot selection
  const handleSlotSelect = (date: string, time: string) => {
    if (!isSlotBooked(date, time)) {
      setSelectedSlot(`${date}-${time}`);
    }
  };
  
  // Handle booking confirmation
  const handleBookNow = () => {
    if (selectedSlot) {
      // Navigate to checkout or confirmation page
      navigate('/checkout');
    }
  };

  // Handle format type change
  const handleFormatChange = (
    event: React.MouseEvent<HTMLElement>,
    newFormat: string,
  ) => {
    if (newFormat !== null) {
      setFormatType(newFormat);
    }
  };
  
  // Handle go back
  const handleGoBack = () => {
    navigate('/');
  };

  // Render time slot card
  const renderTimeSlot = (slot: { time: string, price: number }, category: string) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const isBooked = isSlotBooked(dateStr, slot.time);
    const isSelected = selectedSlot === `${dateStr}-${slot.time}`;
    
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
          p: 2,
          '&:last-child': { pb: 2 }
        }}>
          <Box>
            <Typography variant="h6" fontWeight={500}>
              {slot.time}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600} sx={{ mr: 2 }}>
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
                width: 40,
                height: 40
              }}
            >
              <AddIcon />
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
                {sportType === 'cricket' ? 'Falah Turf' : 'Pickleball Court'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    bgcolor: 'warning.light',
                    color: 'warning.dark',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    mr: 1
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>3.17</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">(23)</Typography>
              </Box>
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
                left: -16,
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1
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
                      minWidth: 70,
                      height: 70,
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
                right: -16,
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Turf Type */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1
          }}>
            <Box 
              component="span" 
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'success.light',
                color: 'success.dark',
                mr: 1
              }}
            >
              <Box component="span" role="img" aria-label="turf">
                🌱
              </Box>
            </Box>
            <Typography variant="h6" fontWeight={600}>
              ASTRO TURF
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Format Selection */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={600}>
                Available Slots
              </Typography>
              <Chip 
                label="(22)" 
                size="small" 
                sx={{ 
                  ml: 1,
                  bgcolor: 'grey.100',
                  fontWeight: 500
                }} 
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InfoIcon fontSize="small" sx={{ color: 'warning.main', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                Min. 60 mins slots
              </Typography>
            </Box>
          </Box>

          <ToggleButtonGroup
            value={formatType}
            exclusive
            onChange={handleFormatChange}
            aria-label="format type"
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton 
              value="5v5" 
              aria-label="5v5"
              sx={{ 
                borderRadius: '50px',
                py: 1,
                fontWeight: 600,
                color: formatType === '5v5' ? 'success.main' : 'text.primary',
                borderColor: formatType === '5v5' ? 'success.main' : 'divider',
                '&.Mui-selected': {
                  bgcolor: formatType === '5v5' ? 'success.light' : 'transparent',
                  color: formatType === '5v5' ? 'success.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: 'success.light',
                  }
                }
              }}
            >
              5v5
            </ToggleButton>
            <ToggleButton 
              value="6v6" 
              aria-label="6v6"
              sx={{ 
                borderRadius: '50px',
                py: 1,
                fontWeight: 600,
                color: formatType === '6v6' ? 'primary.main' : 'text.primary',
                borderColor: formatType === '6v6' ? 'primary.main' : 'divider',
                '&.Mui-selected': {
                  bgcolor: formatType === '6v6' ? 'primary.light' : 'transparent',
                  color: formatType === '6v6' ? 'primary.main' : 'text.primary',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  }
                }
              }}
            >
              6v6
            </ToggleButton>
          </ToggleButtonGroup>
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
        {selectedSlot && (
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
    </Box>
  );
};

export default BookingPage; 