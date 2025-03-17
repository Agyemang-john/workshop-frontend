// lib/fetchWorkshops.js

export const fetchWorkshops = async () => {
  const apiUrl = 'https://workshop-nfwx.onrender.com/api/workshops/'; // Read the env variable
  const url = apiUrl ? `${apiUrl}` : 'https://workshop-nfwx.onrender.com/api/workshops/';

  try {
    const res = await fetch(url, {
      cache: 'no-store', 
      credentials: 'include',
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

  