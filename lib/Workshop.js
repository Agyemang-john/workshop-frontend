

export const fetchWorkshops = async () => {
    try {
      // Construct query parameters
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workshops/`;
  
      const response = await fetch(url, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch workshops: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching workshops:", error.message);
      throw error;
    }
  };

  export const fetchWorkshopFields = async (workshopId) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workshop/${workshopId}/fields/`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Prevent caching issues in server components
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch workshops: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching fields:", error);
      return [];
    }
  };
  