export const fetchWorkshops = async () => {
  const apiUrl = 'https://workshop-nfwx.onrender.com';
  const url = `${apiUrl}/api/workshops/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store", // Prevent caching issues in server components
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch workshops: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching workshops:", error.message);
    return []; // Return empty array on failure
  }
};

export const fetchWorkshopFields = async (workshopId) => {
  const apiUrl = 'https://workshop-nfwx.onrender.com';
  const url = `${apiUrl}/api/workshop/${workshopId}/fields/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching issues
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch workshop fields: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching fields:", error.message);
    return []; // Return empty array on failure
  }
};
