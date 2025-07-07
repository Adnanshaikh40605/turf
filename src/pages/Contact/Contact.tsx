import React, { useState } from 'react';
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box, 
  Button, 
  Card,
  CardContent,
  Container, 
  Divider,
  Grid, 
  IconButton,
  Paper,
  Snackbar,
  TextField, 
  Typography, 
  useTheme 
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  LocationOn as LocationIcon,
  ExpandMore as ExpandMoreIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Office locations
  const locations = [
    {
      id: 1,
      city: 'Seattle',
      address: '123 Pine Street, Seattle, WA 98101',
      phone: '+1 (206) 555-1234',
      email: 'seattle@turfbook.com',
      image: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 2,
      city: 'Portland',
      address: '456 Oak Avenue, Portland, OR 97204',
      phone: '+1 (503) 555-5678',
      email: 'portland@turfbook.com',
      image: 'https://images.unsplash.com/photo-1545155277-56d3e640e5da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    },
    {
      id: 3,
      city: 'Vancouver',
      address: '789 Maple Road, Vancouver, BC V6B 4Y8',
      phone: '+1 (604) 555-9012',
      email: 'vancouver@turfbook.com',
      image: 'https://images.unsplash.com/photo-1560814304-4f05b62af116?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: 'How do I book a sports field?',
      answer: 'Booking a field is simple! Just search for facilities in your area, select the one you want, choose your date and time, and complete the payment process. You\'ll receive a confirmation email with all the details of your booking.'
    },
    {
      question: 'What happens if it rains on the day of my booking?',
      answer: 'Our cancellation policy for weather-related issues varies by facility. Most venues offer rescheduling options or partial refunds if the field is deemed unplayable due to weather conditions. Check the specific facility\'s policy on their listing page.'
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes, you can cancel or reschedule bookings through your account dashboard. Please note that cancellation policies vary by facility and how far in advance you make changes. Most venues allow free cancellation up to 48 hours before your scheduled time.'
    },
    {
      question: 'How do I list my sports facility on TurfBook?',
      answer: 'To list your facility, create a business account and click on "List a Facility" in your dashboard. You\'ll need to provide details about your venue, upload photos, set availability, and pricing. Our team will review your listing before it goes live.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store to manage bookings, discover fields, and receive notifications on the go.'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      });
    }
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      subject: formData.subject.trim() === '',
      message: formData.message.trim() === '',
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the form data to your backend here
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent! We will get back to you soon.',
        severity: 'success',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Please fill out all required fields correctly.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          py: 12,
          backgroundColor: 'background.paper',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Typography
              variant="h2"
              component="h1"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 4, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}
            >
              Have questions or need assistance? We're here to help you.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 2, mb: 8 }}>
        <Grid container spacing={3}>
          {[
            {
              icon: <EmailIcon fontSize="large" />,
              title: 'Email Us',
              content: 'info@turfbook.com',
              color: theme.palette.primary.main,
            },
            {
              icon: <PhoneIcon fontSize="large" />,
              title: 'Call Us',
              content: '+1 (800) 555-TURF',
              color: theme.palette.secondary.main,
            },
            {
              icon: <LocationIcon fontSize="large" />,
              title: 'Visit Us',
              content: 'Headquarters: Seattle, WA',
              color: theme.palette.error.main,
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    borderRadius: 4,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.content}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form & Social Media */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
                Send Us a Message
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={formErrors.name}
                      helperText={formErrors.name ? 'Name is required' : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={formErrors.email}
                      helperText={formErrors.email ? 'Enter a valid email address' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={formErrors.subject}
                      helperText={formErrors.subject ? 'Subject is required' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      error={formErrors.message}
                      helperText={formErrors.message ? 'Message is required' : ''}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SendIcon />}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Typography variant="h4" component="h2" gutterBottom fontWeight={600}>
                Connect With Us
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Follow us on social media to stay updated with the latest news, promotions, and community events.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                {[
                  { icon: <FacebookIcon />, color: '#1877F2', name: 'Facebook' },
                  { icon: <TwitterIcon />, color: '#1DA1F2', name: 'Twitter' },
                  { icon: <InstagramIcon />, color: '#E4405F', name: 'Instagram' },
                  { icon: <LinkedInIcon />, color: '#0A66C2', name: 'LinkedIn' },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <IconButton
                      aria-label={`Follow us on ${social.name}`}
                      sx={{
                        bgcolor: `${social.color}15`,
                        color: social.color,
                        width: 56,
                        height: 56,
                        '&:hover': {
                          bgcolor: social.color,
                          color: 'white',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
              
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Customer support team"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Customer Support Hours
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Monday - Friday:</Typography>
                    <Typography variant="body2" fontWeight={500}>8:00 AM - 8:00 PM PST</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Saturday:</Typography>
                    <Typography variant="body2" fontWeight={500}>9:00 AM - 5:00 PM PST</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Sunday:</Typography>
                    <Typography variant="body2" fontWeight={500}>10:00 AM - 4:00 PM PST</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Office Locations */}
      <Box sx={{ backgroundColor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Our Offices
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center" 
              color="text.secondary" 
              sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
            >
              Visit us at one of our office locations across the Pacific Northwest.
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              {locations.map((location) => (
                <Grid item xs={12} md={4} key={location.id}>
                  <motion.div variants={fadeIn}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: 'relative',
                          height: 200,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          component="img"
                          src={location.image}
                          alt={location.city}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 2,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                          }}
                        >
                          <Typography variant="h5" component="h3" color="white" fontWeight={600}>
                            {location.city}
                          </Typography>
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', mb: 2 }}>
                          <LocationIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
                          <Typography variant="body2">
                            {location.address}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 2 }}>
                          <PhoneIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
                          <Typography variant="body2">
                            {location.phone}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          <EmailIcon color="primary" sx={{ mr: 1, flexShrink: 0 }} />
                          <Typography variant="body2">
                            {location.email}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Find answers to common questions about TurfBook and our services.
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faqItems.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Accordion 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    '&:before': {
                      display: 'none',
                    },
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    overflow: 'hidden',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-panel-${index}-content`}
                    id={`faq-panel-${index}-header`}
                    sx={{
                      backgroundColor: 'background.paper',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 