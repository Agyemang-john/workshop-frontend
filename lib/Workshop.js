

export const fetchWorkshops = async () => {
    try {
      // Construct query parameters
      const url = `https://workshop-nfwx.onrender.com/api/workshops/`;
      const url_2 = `http://localhost:8000/api/workshops/`;
  
      const response = await fetch(url_2, {
        method: "GET",
        cache: "no-store", // Prevent caching issues in server components
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
      const url_2 = `http://localhost:8000/api/workshop/${workshopId}/fields/`;
      const url = `https://workshop-nfwx.onrender.com/api/workshop/${workshopId}/fields/`;
      const response = await fetch(url_2, {
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
  