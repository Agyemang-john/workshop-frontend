"use client";

import React, { useState, useEffect, useMemo } from "react";
import { fetchWorkshops } from "@/lib/Workshop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";
import WorkshopCard from "./WorkshopCard";
import { CircularProgress } from "@mui/material";


export default function MainContent() {
  const [workshops, setWorkshops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        setLoading(true);
        const data = await fetchWorkshops();
        setWorkshops(data);

        const uniqueCategories = Array.from(
          new Set(data.map((w) => w.category?.name).filter(Boolean))
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      } finally{
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  // const filteredWorkshops = useMemo(() => {
  //   return selectedCategory === "All"
  //     ? workshops
  //     : workshops.filter((w) => w.category?.name === selectedCategory);
  // }, [workshops, selectedCategory]);

  const filteredWorkshops = useMemo(() => {
    return workshops
      .filter((w) =>
        selectedCategory === "All" ? true : w.category?.name === selectedCategory
      )
      .filter((w) =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) // Search filter
      );
  }, [workshops, selectedCategory, searchQuery]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h5" gutterBottom>
          Explore & Register for Exciting Workshops!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and register for exciting workshops on our platform! Browse
          through a variety of workshops uploaded by organizers, learn more about
          each one, and secure your spot with a simple registration process.
          Start exploring today!
        </Typography>
      </div>

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: "100%",
          overflow: "auto",
        }}
      >
         <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
            <OutlinedInput
              size="small"
              id="search"
              placeholder="Search…"
              sx={{ flexGrow: 1 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Live search update
              startAdornment={
                <InputAdornment position="start" sx={{ color: "text.primary" }}>
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "search",
              }}
            />
          </FormControl>
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "start", md: "center" },
          gap: 4,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <Chip
            label="All"
            onClick={() => setSelectedCategory("All")}
            color={selectedCategory === "All" ? "primary" : "default"}
          />
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? "primary" : "default"}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            gap: 1,
            overflow: "auto",
          }}
        >
          <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
            <OutlinedInput
              size="small"
              id="search"
              placeholder="Search…"
              sx={{ flexGrow: 1 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Live search update
              startAdornment={
                <InputAdornment position="start" sx={{ color: "text.primary" }}>
                  <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
              }
              inputProps={{
                "aria-label": "search",
              }}
            />
          </FormControl>
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2} columns={12}>
        {filteredWorkshops.map((workshop) => (
          <Grid size={{ xs: 12, md: 4 }} key={workshop.id}>
            <WorkshopCard workshop={workshop} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
