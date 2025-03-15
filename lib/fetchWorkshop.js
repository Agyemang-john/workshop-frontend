// lib/fetchWorkshops.js

export const fetchWorkshops = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workshops/`,
        {cache: 'no-store', credentials: 'include'}
      );
      
      // Handle any error or fallback if fetch fails
      if (!res.ok) {
        throw new Error('Failed to fetch workshops');
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching workshops:', error);
      return []; // Return an empty array in case of error
    }
  };
  