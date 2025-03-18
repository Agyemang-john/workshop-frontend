import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import PlaceIcon from '@mui/icons-material/Place';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import NavigationIcon from '@mui/icons-material/Navigation';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

dayjs.extend(relativeTime);

const WorkshopDetail = () => {
  const { slug } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const fetchWorkshop = async () => {
      const url_2 = `http://localhost:8000/api/workshop/${slug}/`;

      const apiUrl = 'https://workshop-nfwx.onrender.com';
      const url = `${apiUrl}/api/workshop/${slug}/`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch workshop data");
        
        const data = await res.json();
        setWorkshop(data);
        setLoading(false);

        // Calculate time left
        const now = dayjs();
        const startDate = dayjs(data.date);
        const endDate = startDate.add(data.duration, "hour");

        if (now.isBefore(startDate)) {
          setTimeLeft(`Starts in ${startDate.fromNow(true)}`);
        } else if (now.isAfter(startDate) && now.isBefore(endDate)) {
          setTimeLeft("Ongoing");
        } else {
          setTimeLeft("Completed");
        }
      } catch (error) {
        console.error("Error fetching workshop:", error);
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [slug]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  

  return (
    <div >
      {/* Cover Image */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 250, md: 400 },
          backgroundImage: `url(${workshop.cover_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
        }}
      />

      {/* Workshop Info */}
      <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          {workshop.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          <CategoryIcon/> {workshop.category?.name} | <AccessTimeIcon/> {dayjs(workshop.date).format("MMMM D, YYYY h:mm A")} | <CalendarMonthIcon/> {timeLeft}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {workshop.description}
        </Typography>

        {/* Workshop Details */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6"> <PersonPinIcon/> Speaker(s):</Typography>
            <Typography variant="body1">
              {workshop.speaker.map((s) => s.name).join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6"> <PlaceIcon /> Location:</Typography>
            <Typography variant="body1">
            {workshop.location === "online" ? (
              <Link href={workshop.google_meet_link}>
                <LanguageIcon/>  Online (Google Meet)
              </Link>
            ) : (
              <Link href={workshop.google_map_link}>
                <NavigationIcon/>  {`Venue: ${workshop.venue_address}`}
              </Link>
            )}

            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default WorkshopDetail;
