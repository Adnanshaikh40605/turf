import React, { ReactNode, useState } from 'react';
import { 
  AppBar, 
  Box, 
  Container, 
  Toolbar, 
  Typography, 
  useMediaQuery, 
  useTheme,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  text: string;
  path: string;
}

const navItems: NavItem[] = [
  { text: 'Home', path: '/' },
  { text: 'About', path: '/about' },
  { text: 'Contact', path: '/contact' },
];

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem 
          key={item.text} 
          component={RouterLink} 
          to={item.path}
          onClick={handleDrawerToggle}
          sx={{
            color: location.pathname === item.path ? 'primary.main' : 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.04)',
            }
          }}
        >
          <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{
              fontWeight: location.pathname === item.path ? 700 : 500,
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'white',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
          py: 1,
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'space-between',
              minHeight: { xs: '70px', md: '80px' },
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                textDecoration: 'none',
                background: 'linear-gradient(45deg, #673ab7 30%, #9c27b0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              TurfBook
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ 
                display: 'flex',
                gap: { xs: 2, md: 4 },
                alignItems: 'center',
              }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      textTransform: 'none',
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: location.pathname === item.path ? '100%' : '0',
                        height: '2px',
                        bottom: -4,
                        left: 0,
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        '&:after': {
                          width: '100%',
                        },
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          pt: '80px',
        }}
      >
        {children}
      </Box>
      
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout; 