import Image from "next/image";
import Container from '@mui/material/Container';
import MainContent from '@/components/MainContent'
import { fetchWorkshops } from '@/lib/fetchWorkshop';


export default async function Home() {
  const workshops = await fetchWorkshops()
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
    <MainContent />
    {/* <Latest /> */}
  </Container>
  );
}
