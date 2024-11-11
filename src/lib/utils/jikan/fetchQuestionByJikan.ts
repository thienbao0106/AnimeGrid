import axios from "axios";

const malId: number = 34798;

const getStaffs: (id: number) => Promise<Staff[]> = async (id: number) => {
  const result = await axios.get(`https://api.jikan.moe/v4/anime/${id}/staff`);
  if (!result.data) return [];
  const staffs: Staff[] = result.data.data.map((data: any) => {
    return {
      name: data.person.name.replace(",", ""),
      role: data.positions[0],
      image: data.person.images?.jpg.image_url ?? "",
    };
  });
  return staffs;
};

const getVoiceActors: (id: number) => Promise<VoiceActor[]> = async (
  id: number
) => {
  const result = await axios.get(
    `https://api.jikan.moe/v4/anime/${id}/characters`
  );
  if (!result.data) return [];
  const voiceActors: VoiceActor[] = result.data.data
    .slice(0, 3)
    .map((data: any) => {
      return {
        role: data.role,
        name: data.voice_actors[0].person.name.replace(",", ""),
        image: data.voice_actors[0].images?.jpg.image_url ?? "",
      };
    });
  return voiceActors;
};

export const getQuestion = async () => {
  const result = await axios.get(
    `https://api.jikan.moe/v4/anime/${malId}/full`
  );
  const staffs = await getStaffs(malId);
  const voiceActors = await getVoiceActors(malId);
  if (!result.data || !staffs || !voiceActors) return;
  const { data } = result.data;
  const genres = data.genres.map((genre: any) => genre.name);
  const studios = data.studios.map((studio: any) => studio.name);
  const openingStaff = data.theme.openings[0].split("by")[1];
  const endingStaff = data.theme.endings[0].split("by")[1];
  staffs.push(
    {
      image: "",
      name: openingStaff,
      role: "Theme Song Performance (OP)",
    },
    { image: "", name: endingStaff, role: "Theme Song Performance (ED)" }
  );
  console.log(staffs);
  const question: Question = {
    seasonYear: data.year,
    meanScore: data.score,
    season: data.season,
    genres,
    studios,
    title: data.titles[0].title,
    bannerImage: data.images.webp.large_image_url,
    staffs,
    voiceActors,
  };
  return question;
};
