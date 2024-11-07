type Staff = {
  image: string;
  name: string;
  role: string;
};

type VoiceActor = {
  role: string;
  name: string;
  image: string;
};

type Question = {
  title: string;
  studios: string[];
  staffs: Staff[];
  meanScore: number;
  genres: string[];
  voiceActors: VoiceActor[];
  season: string;
  bannerImage: string;
};
