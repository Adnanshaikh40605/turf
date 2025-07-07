import React from 'react';
import { 
  Box, 
  Container, 
  Divider, 
  Grid, 
  IconButton, 
  Paper, 
  Stack, 
  Typography, 
  useTheme,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  LinkedIn as LinkedInIcon, 
  Public as PublicIcon,
  SportsSoccer as SportsSoccerIcon,
  Diversity3 as CommunityIcon,
  Park as ParkIcon
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

const About = () => {
  const theme = useTheme();

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Former professional soccer player with a passion for making sports accessible to everyone.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com',
      },
    },
    {
      id: 2,
      name: 'Samantha Lee',
      role: 'CTO',
      bio: 'Tech enthusiast with over 10 years of experience in building scalable platforms.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
    {
      id: 3,
      name: 'Marcus Williams',
      role: 'Head of Operations',
      bio: 'Sports management expert who ensures smooth operations of all TurfBook facilities.',
      image: 'https://randomuser.me/api/portraits/men/68.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
      },
    },
    {
      id: 4,
      name: 'Jessica Chen',
      role: 'Marketing Director',
      bio: 'Creative strategist who loves connecting sports enthusiasts with the perfect venues.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    },
  ];

  // Company values
  const companyValues = [
    {
      title: 'Accessibility',
      description: 'We believe sports facilities should be accessible to everyone, regardless of skill level or background.',
      icon: <PublicIcon fontSize="large" />,
    },
    {
      title: 'Quality',
      description: 'We maintain high standards for all the facilities listed on our platform to ensure the best experience.',
      icon: <SportsSoccerIcon fontSize="large" />,
    },
    {
      title: 'Community',
      description: 'We foster a sense of community among sports enthusiasts, bringing people together through the love of the game.',
      icon: <CommunityIcon fontSize="large" />,
    },
    {
      title: 'Sustainability',
      description: 'We promote eco-friendly practices in sports facility management and operations.',
      icon: <ParkIcon fontSize="large" />,
    },
  ];

  return (
    <Box>
      {/* Hero Section - Tightened padding */}
      <Box 
        sx={{ 
          position: 'relative',
          py: 8, // Reduced from 12
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
                mb: 1, // Reduced from 2
                background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About TurfBook
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 2, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }} // Reduced from mb: 4
            >
              Connecting sports enthusiasts with the perfect playing fields since 2020.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Our Story - Using Card with elevation for better contrast */}
      <Container maxWidth="lg" sx={{ py: 4 }}> {/* Reduced from py: 8 */}
        <Grid container spacing={3}> {/* Reduced from spacing: 6 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card elevation={2} sx={{ height: '100%', p: 2 }}>
                <CardContent>
                  <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                    Our Story
                  </Typography>
                  <Typography variant="body1" paragraph>
                    TurfBook was born out of a simple frustration: finding and booking quality sports fields was unnecessarily complicated. Our founder, Alex Johnson, a former professional soccer player, experienced this challenge firsthand when organizing community games.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    In 2020, Alex assembled a team of sports enthusiasts and tech experts to create a platform that would simplify the process of discovering, comparing, and booking sports facilities. What started as a small project in Seattle has now expanded to serve communities across North America.
                  </Typography>
                  <Typography variant="body1">
                    Today, TurfBook connects thousands of players, teams, and event organizers with the perfect venues for their needs. We're proud to support local sports communities and help make sports more accessible to everyone.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <Card elevation={2} sx={{ height: '100%', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Team playing sports"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Mission & Vision - Added contrast with Paper background */}
      <Box sx={{ backgroundColor: 'background.default', py: 4 }}> {/* Reduced from py: 8 */}
        <Container maxWidth="lg">
          <Grid container spacing={3}> {/* Reduced from spacing: 6 */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Paper elevation={1} sx={{ p: 3, height: '100%', backgroundColor: '#f9f9f9' }}>
                  <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Our mission is to make sports accessible to everyone by providing a seamless platform for discovering and booking quality sports facilities. We believe that playing sports should be easy, enjoyable, and available to all, regardless of skill level or background.
                  </Typography>
                  <Typography variant="body1">
                    By connecting facility owners with players and teams, we're creating a vibrant ecosystem that promotes physical activity, community engagement, and the love of sports.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Paper elevation={1} sx={{ p: 3, height: '100%', backgroundColor: '#f9f9f9' }}>
                  <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" paragraph>
                    We envision a world where anyone can easily find and book the perfect sports venue, anytime, anywhere. A world where facility owners can maximize the use of their spaces, and where communities come together through the power of sports.
                  </Typography>
                  <Typography variant="body1">
                    By 2025, we aim to be the leading platform for sports facility bookings across North America, with a growing global presence, serving millions of sports enthusiasts and thousands of facility owners.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Values - Improved card layout */}
      <Container maxWidth="lg" sx={{ py: 4 }}> {/* Reduced from py: 8 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Our Values
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 3, maxWidth: 700, mx: 'auto' }} /* Reduced from mb: 6 */
          >
            These core principles guide everything we do at TurfBook.
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Grid container spacing={2}> {/* Reduced from spacing: 4 */}
            {companyValues.map((value, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <motion.div variants={fadeIn}>
                  <Card
                    elevation={2}
                    sx={{
                      p: 2, // Reduced from p: 4
                      height: '100%',
                      borderRadius: 2, // Reduced from 4
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)', // Reduced from -8px
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1, // Reduced from mb: 2
                        color: 'primary.main',
                      }}
                    >
                      {value.icon}
                      <Typography variant="h6" component="h3" fontWeight={600} sx={{ ml: 1 }}> {/* Reduced from ml: 2 */}
                        {value.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary"> {/* Changed from body1 to body2 */}
                      {value.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Team Section - Improved card layout */}
      <Box sx={{ backgroundColor: 'background.default', py: 4 }}> {/* Reduced from py: 8 */}
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Meet Our Team
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center" 
              color="text.secondary" 
              sx={{ mb: 3, maxWidth: 700, mx: 'auto' }} /* Reduced from mb: 6 */
            >
              The passionate people behind TurfBook.
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={2}> {/* Reduced from spacing: 4 */}
              {teamMembers.map((member) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.id}>
                  <motion.div variants={fadeIn}>
                    <Card
                      elevation={2}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2, // Reduced from 4
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)', // Reduced from -8px
                          boxShadow: 3, // Reduced from 'boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)''
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: '100%',
                          height: 200, // Reduced from 240
                          objectFit: 'cover',
                        }}
                      />
                      <CardContent sx={{ p: 2, flexGrow: 1 }}> {/* Reduced from p: 3 */}
                        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                          {member.name}
                        </Typography>
                        <Typography variant="subtitle2" color="primary.main" gutterBottom>
                          {member.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {member.bio}
                        </Typography>
                        <Stack direction="row" spacing={1} mt={1}> {/* Reduced from mt: 2 */}
                          {member.social.linkedin && (
                            <IconButton 
                              size="small" 
                              aria-label={`${member.name}'s LinkedIn`}
                              sx={{ 
                                color: '#0A66C2',
                                '&:hover': { bgcolor: '#0A66C220' },
                              }}
                            >
                              <LinkedInIcon />
                            </IconButton>
                          )}
                          {member.social.twitter && (
                            <IconButton 
                              size="small" 
                              aria-label={`${member.name}'s Twitter`}
                              sx={{ 
                                color: '#1DA1F2',
                                '&:hover': { bgcolor: '#1DA1F220' },
                              }}
                            >
                              <TwitterIcon />
                            </IconButton>
                          )}
                          {member.social.facebook && (
                            <IconButton 
                              size="small" 
                              aria-label={`${member.name}'s Facebook`}
                              sx={{ 
                                color: '#1877F2',
                                '&:hover': { bgcolor: '#1877F220' },
                              }}
                            >
                              <FacebookIcon />
                            </IconButton>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Company Stats - Added card elevation for better visual appeal */}
      <Container maxWidth="lg" sx={{ py: 4 }}> {/* Reduced from py: 8 */}
        <Grid container spacing={2}> {/* Reduced from spacing: 4 */}
          {[
            { number: '50+', label: 'Cities Covered' },
            { number: '1000+', label: 'Sports Facilities' },
            { number: '100,000+', label: 'Happy Users' },
            { number: '250,000+', label: 'Bookings Made' },
          ].map((stat, index) => (
            <Grid size={{ xs: 6, sm: 3 }} key={index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card 
                  elevation={2}
                  sx={{ 
                    textAlign: 'center',
                    p: 2, // Reduced from p: 3
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    component="p"
                    sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 