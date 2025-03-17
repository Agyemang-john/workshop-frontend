"use client";


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Typography } from '@mui/material';
import { useRouter } from "next/navigation";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider, // Remove vars fallback

}));


export default function AppAppBar() {
    const router = useRouter();
  
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, marginLeft: '5px'}}>
              <Typography variant='h5' onClick={() => router.push("/")} sx={{ fontWeight: 600, color: "black", cursor: 'pointer' }}>Workshop</Typography> {"   "}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
              marginRight: '5px',
            }}
          >
            <Button color="primary" onClick={() => window.location.href = `https://workshop-nfwx.onrender.com/dashboard/login`} variant="text" size="small">
              Sign in
            </Button>
            <Button onClick={() => router.push("/register")} color="primary" variant="contained" size="small">
              Sign up
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Features</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>About</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button onClick={() => router.push("/register")} color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button onClick={() => window.location.href = `https://workshop-nfwx.onrender.com/dashboard/login`} color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}