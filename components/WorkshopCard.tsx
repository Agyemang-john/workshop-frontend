import Link from "next/link";
import { Box, Card, CardContent, CardMedia, Typography, Avatar, AvatarGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

interface Speaker {
  name: string;
  profile_image: string;
}

interface Workshop {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover_image: string;
  category: { name: string };
  speaker: Speaker[];
}

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
  return (
      <StyledCard variant="outlined" tabIndex={0}>
        <Link href={`/workshop/${workshop.slug}`} passHref>
          <Box component="a" sx={{ display: "block", textDecoration: "none" }}>
            <CardMedia
              component="img"
              alt={workshop.title}
              image={workshop.cover_image}
              sx={{
                height: { sm: "auto", md: "50%" },
                aspectRatio: { sm: "16 / 9", md: "" },
                cursor: "pointer",
              }}
            />
          </Box>
        </Link>

        <StyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            <Link href={`/workshop/${workshop.slug}`} style={{ textDecoration: "none" }}>
              {workshop.category.name}
            </Link>
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            <Link href={`/workshop/${workshop.slug}`} style={{ textDecoration: "none" }}>
              {workshop.title}
            </Link>
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {workshop.description}
          </StyledTypography>
        </StyledCardContent>

        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AvatarGroup max={3}>
              {workshop.speaker.map((s, index) => (
                <Avatar key={index} alt={s.name} src={s.profile_image} sx={{ width: 24, height: 24 }} />
              ))}
            </AvatarGroup>
            <Typography variant="caption">
              {workshop.speaker.map((s) => s.name).join(", ")}
            </Typography>
          </Box>
        </Box>
      </StyledCard>
  );
};

export default WorkshopCard;
