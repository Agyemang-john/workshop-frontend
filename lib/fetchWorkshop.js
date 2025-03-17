// lib/fetchWorkshops.js

export const fetchWorkshops = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Read the env variable
  const url = apiUrl ? `${apiUrl}/api/workshops/` : 'https://workshop-nfwx.onrender.com/api/workshops/';

  try {
    const res = await fetch(url, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch workshops');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return []; // Return an empty array to handle errors gracefully
  }
};

  