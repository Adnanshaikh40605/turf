import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card,
  CardContent,
  Container, 
  Dialog,
  DialogContent,
  DialogTitle,
  Grid as MuiGrid,
  IconButton,
  Stack, 
  Typography, 
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  SportsCricket as CricketIcon,
  SportsBaseball as PickleballIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [openSportModal, setOpenSportModal] = useState(false);

  const handleOpenSportModal = () => {
    setOpenSportModal(true);
  };

  const handleCloseSportModal = () => {
    setOpenSportModal(false);
  };

  const handleSportSelect = (sport: string) => {
    handleCloseSportModal();
    navigate(`/booking/${sport}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          minHeight: { xs: '70vh', md: '90vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(103, 58, 183, 0.97) 0%, rgba(156, 39, 176, 0.97) 100%)',
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 6 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
          >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: { xs: '100%', md: '70%' } }}>
              <Typography
                variant={isMobile ? "h3" : "h1"}
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 3 },
                  color: 'white',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4.5rem', lg: '5.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Lonavala's Premier
                <br />
                Sports Destination
              </Typography>
              <Typography
                variant="h5"
                sx={{ 
                  mb: { xs: 3, md: 4 }, 
                  color: 'rgba(255,255,255,0.95)',
                  maxWidth: { xs: '100%', md: '90%' },
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                Experience the thrill of sports amidst scenic mountain views.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={handleOpenSportModal}
                sx={{ 
                  py: { xs: 1.5, md: 2 }, 
                  px: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Book
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Sport Selection Modal */}
      <Dialog
        open={openSportModal}
        onClose={handleCloseSportModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle sx={{ 
          p: { xs: 2, md: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            Select Sport
          </Typography>
          <IconButton onClick={handleCloseSportModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={2}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CricketIcon />}
              onClick={() => handleSportSelect('cricket')}
              sx={{ 
                py: { xs: 1.5, md: 2 },
                justifyContent: 'flex-start',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Cricket
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PickleballIcon />}
              onClick={() => handleSportSelect('pickleball')}
              sx={{
                py: { xs: 1.5, md: 2 },
                justifyContent: 'flex-start',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Pickleball
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Sport Cards */}
      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <MuiGrid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            <MuiGrid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
                    <CricketIcon color="primary" sx={{ fontSize: { xs: 32, md: 40 }, mr: 2 }} />
                    <Typography variant={isMobile ? "h5" : "h4"} component="h3" fontWeight={700}>
                      Cricket
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: { xs: 2, md: 4 } }}>
                    Experience world-class cricket facilities with professional-grade pitches and practice nets.
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mt: 'auto'
                  }}>
                    <Typography 
                      variant={isMobile ? "h5" : "h4"} 
                      fontWeight={700} 
                      sx={{
                        background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ₹1,500/hr
                    </Typography>
                    <Button 
                      variant="contained"
                      size="large"
                      onClick={() => handleSportSelect('cricket')}
                      sx={{ 
                        py: { xs: 1, md: 1.5 }, 
                        px: { xs: 2, md: 4 },
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                        boxShadow: '0 8px 16px rgba(103, 58, 183, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 20px rgba(103, 58, 183, 0.4)',
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </MuiGrid>

            <MuiGrid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
                    <PickleballIcon color="primary" sx={{ fontSize: { xs: 32, md: 40 }, mr: 2 }} />
                    <Typography variant={isMobile ? "h5" : "h4"} component="h3" fontWeight={700}>
                      Pickleball
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: { xs: 2, md: 4 } }}>
                    Premium pickleball courts designed for both casual play and competitive matches.
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mt: 'auto'
                  }}>
                    <Typography 
                      variant={isMobile ? "h5" : "h4"} 
                      fontWeight={700} 
                      sx={{
                        background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      ₹800/hr
                    </Typography>
                    <Button 
                      variant="contained"
                      size="large"
                      onClick={() => handleSportSelect('pickleball')}
                      sx={{ 
                        py: { xs: 1, md: 1.5 }, 
                        px: { xs: 2, md: 4 },
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                        boxShadow: '0 8px 16px rgba(103, 58, 183, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 20px rgba(103, 58, 183, 0.4)',
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </MuiGrid>
          </MuiGrid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;