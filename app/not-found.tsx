'use client';

import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h3" fontWeight={600} gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h6" color="text.secondary" maxWidth="sm" margin="auto" gutterBottom>
        The page you&apos;re looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={() => router.push("/")}> 
          Go Back Home 
        </Button>
      </Box>
    </Container>
  );
}
