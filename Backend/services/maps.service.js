const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.OpenCage_API;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.OpenCage_API;
  const originUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    origin
  )}&key=${apiKey}`;
  const destinationUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    destination
  )}&key=${apiKey}`;

  try {
    const originResponse = await axios.get(originUrl);
    const destinationResponse = await axios.get(destinationUrl);

    if (
      originResponse.data.status.code === 200 &&
      destinationResponse.data.status.code === 200
    ) {
      if (
        originResponse.data.results.length > 0 &&
        destinationResponse.data.results.length > 0
      ) {
        const originLocation = originResponse.data.results[0].geometry;
        const destinationLocation =
          destinationResponse.data.results[0].geometry;

        // Calculate distance using the Haversine formula
        const distance = calculateHaversineDistance(
          originLocation.lat,
          originLocation.lng,
          destinationLocation.lat,
          destinationLocation.lng
        );

        // Estimate duration assuming average speed of 50 km/h
        const durationInHours = (distance / 50).toFixed(2); // Duration in hours
        const durationInSeconds = (durationInHours * 3600).toFixed(0); // Convert to seconds

        // Create human-readable duration (e.g., "1 day 3 hours")
        const humanReadableDuration = formatDuration(durationInSeconds);

        return {
          distance: {
            text: `${distance.toLocaleString()} km`,
            value: (distance * 1000).toFixed(0), // distance in meters
          },
          duration: {
            text: humanReadableDuration,
            value: durationInSeconds,
          },
          status: "OK",
        };
      } else {
        throw new Error("Unable to fetch coordinates");
      }
    } else {
      throw new Error("Unable to fetch data from OpenCage API");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Function to calculate distance using the Haversine formula
const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Function to format duration in human-readable form (e.g., "1 day 3 hours")
const formatDuration = (durationInSeconds) => {
  const days = Math.floor(durationInSeconds / (24 * 3600));
  const hours = Math.floor((durationInSeconds % (24 * 3600)) / 3600);

  let result = "";
  if (days > 0) result += `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""}`;

  return result.trim();
};

module.exports.getAutoCompleteSuggestions = async (input, limit = 10, page = 1) => {
    if (!input) {
      throw new Error("Query is required");
    }
  
    const apiKey = process.env.OpenCage_API;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      input
    )}&key=${apiKey}&limit=${limit}&page=${page}`;
  
    try {
      const response = await axios.get(url);
      if (response.data.status.code === 200) {
        const suggestions = response.data.results;
  
        // Optional: If you want to format the response similarly to Google's autocomplete API
        const formattedSuggestions = suggestions.map(suggestion => ({
          description: suggestion.formatted,
          place_id: suggestion.place_id,
          // You can add more data depending on what's available in the OpenCage response
        }));
  
        return {
          results: formattedSuggestions,
          status: "OK",
          // This is a custom field for pagination, as OpenCage doesn't provide offset
          pagination: {
            next_page: page + 1, // You can increment the page for pagination
            current_page: page,
            total_results: response.data.total_results,
          },
        };
      } else {
        throw new Error("Unable to fetch suggestions");
      }
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching autocomplete suggestions");
    }
  };
  
