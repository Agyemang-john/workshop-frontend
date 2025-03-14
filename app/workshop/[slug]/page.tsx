import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import DetailPage from "@/components/DetailPage";
import { Metadata } from "next";

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
    console.warn(error);
    return null;
  }
}

// ✅ Correct `params` type
interface WorkshopDetailPageProps {
  params: { slug: string };
}

export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { slug } = params;
  const workshop = await getWorkshop(slug);

  if (!workshop) return notFound();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <DetailPage workshop={workshop} />
      </div>
    </Box>
  );
}

// ✅ Correct `params` type for metadata
export async function generateMetadata({ params }: WorkshopDetailPageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const workshop = await getWorkshop(slug);
    return {
      title: workshop?.title || "Workshop Not Found",
      description: workshop?.description || "This workshop does not exist.",
    };
  } catch (error) {
    console.warn(error);
    return {
      title: "Workshop Not Found",
      description: "This workshop does not exist.",
    };
  }
}
