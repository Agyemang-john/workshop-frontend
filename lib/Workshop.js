const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://workshop-nfwx.onrender.com";

export const fetchWorkshops = async () => {
  try {
    const url = `${API_BASE_URL}/api/workshops/`;

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
    return [];
  }
};

export const fetchWorkshopFields = async (workshopId) => {
  try {
    const url = `${API_BASE_URL}/api/workshop/${workshopId}/fields/`;

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
    return [];
  }
};
