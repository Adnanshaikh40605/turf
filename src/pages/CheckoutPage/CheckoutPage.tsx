import React from 'react';
import { Box, Container, Typography, Paper, Button, TextField, Grid as MuiGrid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Process payment and booking
    alert('Booking confirmed! Thank you for your reservation.');
    navigate('/');
  };

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Complete Your Booking
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please review your booking details and provide payment information
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
          <Typography variant="h6" gutterBottom>
            Booking Summary
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <MuiGrid container spacing={2}>
              <MuiGrid sx={{ gridColumn: 'span 4' }}>
                <Typography variant="body2" color="text.secondary">
                  Sport:
                </Typography>
              </MuiGrid>
              <MuiGrid sx={{ gridColumn: 'span 8' }}>
                <Typography variant="body1" fontWeight={500}>
                  Cricket
                </Typography>
              </MuiGrid>
              
              <MuiGrid sx={{ gridColumn: 'span 4' }}>
                <Typography variant="body2" color="text.secondary">
                  Date:
                </Typography>
              </MuiGrid>
              <MuiGrid sx={{ gridColumn: 'span 8' }}>
                <Typography variant="body1" fontWeight={500}>
                  July 15, 2025
                </Typography>
              </MuiGrid>
              
              <MuiGrid sx={{ gridColumn: 'span 4' }}>
                <Typography variant="body2" color="text.secondary">
                  Time:
                </Typography>
              </MuiGrid>
              <MuiGrid sx={{ gridColumn: 'span 8' }}>
                <Typography variant="body1" fontWeight={500}>
                  10:00 AM - 11:00 AM
                </Typography>
              </MuiGrid>
              
              <MuiGrid sx={{ gridColumn: 'span 4' }}>
                <Typography variant="body2" color="text.secondary">
                  Duration:
                </Typography>
              </MuiGrid>
              <MuiGrid sx={{ gridColumn: 'span 8' }}>
                <Typography variant="body1" fontWeight={500}>
                  1 hour
                </Typography>
              </MuiGrid>
            </MuiGrid>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">
              Total Amount:
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary">
              ₹1,500
            </Typography>
          </Box>
        </Paper>
        
        <Paper 
          elevation={0} 
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            p: 3, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            mb: 4
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment Information
          </Typography>
          
          <MuiGrid container spacing={3}>
            <MuiGrid sx={{ gridColumn: 'span 12' }}>
              <TextField
                required
                fullWidth
                label="Cardholder Name"
                variant="outlined"
              />
            </MuiGrid>
            
            <MuiGrid sx={{ gridColumn: 'span 12' }}>
              <TextField
                required
                fullWidth
                label="Card Number"
                variant="outlined"
                inputProps={{ maxLength: 16 }}
              />
            </MuiGrid>
            
            <MuiGrid sx={{ gridColumn: 'span 6' }}>
              <TextField
                required
                fullWidth
                label="Expiry Date (MM/YY)"
                variant="outlined"
                placeholder="MM/YY"
                inputProps={{ maxLength: 5 }}
              />
            </MuiGrid>
            
            <MuiGrid sx={{ gridColumn: 'span 6' }}>
              <TextField
                required
                fullWidth
                label="CVV"
                variant="outlined"
                inputProps={{ maxLength: 3 }}
              />
            </MuiGrid>
          </MuiGrid>
        </Paper>
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 4
        }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleGoBack}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2
            }}
          >
            Back
          </Button>
          
          <Button
            variant="contained"
            size="large"
            type="submit"
            onClick={handleSubmit}
            sx={{ 
              py: 1.5,
              px: 4,
              borderRadius: 2
            }}
          >
            Confirm Booking
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutPage; 