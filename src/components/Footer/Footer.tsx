import React from 'react';
import { Box, Container, Divider, Grid as MuiGrid, IconButton, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Use Grid with proper typing
const Grid = MuiGrid;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const footerLinks = [
    { title: 'Company', links: [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ]},
    { title: 'Sports', links: [
      { name: 'Cricket', path: '/cricket' },
      { name: 'Pickleball', path: '/pickleball' },
    ]},
    { title: 'Legal', links: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ]},
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com' },
    { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com' },
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com' },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 4, md: 6 },
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <MuiGrid container spacing={isMobile ? 3 : 4}>
          <MuiGrid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              TurfBook
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Connecting cricket and pickleball enthusiasts with the perfect turf fields for their games and events.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component={Link}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  size="small"
                  sx={{
                    color: 'grey.700',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </MuiGrid>
          
          {footerLinks.map((category) => (
            <MuiGrid item xs={6} sm={4} md={2.5} key={category.title}>
              <Typography variant="subtitle2" color="text.primary" fontWeight={600} sx={{ mb: 2 }}>
                {category.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {category.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'none',
                        },
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </MuiGrid>
          ))}
        </MuiGrid>
        
        <Divider sx={{ my: { xs: 3, md: 4 } }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', sm: 'center' },
          textAlign: { xs: 'center', sm: 'left' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} TurfBook. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for cricket and pickleball enthusiasts
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 