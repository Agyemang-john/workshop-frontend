"use client";


import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://johnagyemang.pythonanywhere.com">
        Explorer
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");

const handleSubscribe = async () => {
  if (!email) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please enter an email address!",
    });
    return;
  }

  try {
    const response = await fetch(`https://workshop-nfwx.onrender.com/api/subscribe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: data.message || "You have successfully subscribed.",
      });
      setEmail(""); // Clear input after success
    } else {
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: data.error || "Email may already be registered.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: error ? String(error) : "Please try again later.",
    });
  }
};



  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Typography variant='h5' onClick={() => router.push("/")} sx={{ fontWeight: 600, color: "black" }}>Workshop</Typography> {"   "}
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontWeight: 600, mt: 2 }}
              >
                Join the newsletter
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Subscribe for weekly updates. No spams ever!
              </Typography>
              <InputLabel htmlFor="email-newsletter">Email</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-newsletter"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label="Enter your email address"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "250px" }}
              />
              <Button variant="contained" color="primary" size="small" sx={{ flexShrink: 0 }} onClick={handleSubscribe}>
                Subscribe
              </Button>
            </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Product
            </Typography>
            <Link color="text.secondary" variant="body2" href="https://johnagyemang.pythonanywhere.com">
              Pricing
            </Link>
            <Link color="text.secondary" variant="body2" href="https://johnagyemang.pythonanywhere.com">
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <Link color="text.secondary" variant="body2" href="/about">
              About us
            </Link>
         
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Legal
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Terms
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy
            </Link>
            <Link color="text.secondary" variant="body2" href="#">
              Contact
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/Agyemang-john"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://x.com/oseiagyemanjohn"
              aria-label="X"
              sx={{ alignSelf: 'center' }}
            >
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}