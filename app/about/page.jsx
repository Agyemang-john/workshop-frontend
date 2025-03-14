import { Container, Typography, Box, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const features = [
  { icon: <CheckCircleIcon fontSize="large" />, text: "Custom Forms - Build personalized registration forms." },
  { icon: <EventAvailableIcon fontSize="large" />, text: "Seamless Registration - Smooth and easy event sign-up." },
  { icon: <SearchIcon fontSize="large" />, text: "Workshop & Event Discovery - Find events based on interests." },
  { icon: <NotificationsActiveIcon fontSize="large" />, text: "Timely Notifications - Get reminders for upcoming workshops." },
  { icon: <LocationOnIcon fontSize="large" />, text: "Event Location View - Plan your journey with ease." },
];

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" fontWeight={600} gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="sm" margin="auto">
          Welcome to <strong>[Workshop]</strong>, the ultimate platform for event and workshop management!
          Create custom registration forms, discover workshops, and manage attendees effortlessly.
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} textAlign="center">
            <Box>
              {feature.icon}
              <Typography variant="subtitle1" mt={1}>{feature.text}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>
    </Container>
  );
}
