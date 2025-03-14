import { notFound } from "next/navigation";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DetailPage from '@/components/DetailPage';


interface Workshop {
  title: string;
  description: string;
  date: string;
  location: string;
  cover_image: string;
}

async function getWorkshop(slug: string): Promise<Workshop | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workshop/${slug}/`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function WorkshopDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const workshop = await getWorkshop(slug);

  if (!workshop) return notFound();

  return (

    
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div>
            <DetailPage  workshop={workshop}/>
        </div>
    </Box>
  );
}


// 🔹 Improve SEO with dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
	const { slug } = await params;

	try {
    const workshop = await getWorkshop(slug);
		return {
			title: workshop?.title || "Workshop Not Found",
			description: workshop?.description || "This workshop does not exist.",
		};
	} catch (error) {
		return {
			title: "Workshop Not Found",
			description: "This workshop does not exist.",
		};
	}
}
