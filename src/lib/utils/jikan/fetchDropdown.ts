import axios from "axios";

export const fetchDropdown = async (guess: string) => {
  const result = await axios.get(`https://api.jikan.moe/v4/anime?q=${guess}`);
  if (!result.data || result.data.data.length === 0) return [];
  return result.data.data.map((data: any) => data.titles[0].title);
};
