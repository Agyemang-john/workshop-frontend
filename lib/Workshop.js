

export const fetchWorkshops = async () => {
    try {
      // Construct query parameters
      const url = `https://workshop-nfwx.onrender.com/api/workshops/`;
  
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
      const url = `https://workshop-nfwx.onrender.com/api/workshop/${workshopId}/fields/`;
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
  