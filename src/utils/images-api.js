import axios from "axios";

const API_KEY = "PX84KhBw3f6v1mnrr4t_iYllNTotWgYyIr7vExuuCys";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchImages = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: { query: query, per_page: 15, page: page },
    headers: {
      Authorization: "Client-ID " + API_KEY,
    },
  });
  return response.data;
};
