import axios from "axios";

const schema = `
 {
  Page {
    media(type: ANIME, id: 98444) {
      id
      title {
        romaji
      }
      meanScore
      genres
      bannerImage
      season 
      characters(page: 1) {
        edges {
            node {
                id
                name {
                    full
                }
            }
            role
            voiceActors(language: JAPANESE) {
                name {
                    full
                }
                image {
                  large
                }
            }
        }
      }
      seasonYear
      staff {
        edges {
            role 
            node {
                name {
                    full
                }
                image {
                    large
                }
            }
        }
        
      }
    
  
      studios {
        nodes {
            name         
        }
      }
    }
    
  }
}
`;
const url = "https://graphql.anilist.co";

const convertToQuestion: (data: any) => Question = (data: any) => {
  const temp: any = data.data.Page.media[0];

  const voiceActorsData: VoiceActor[] = temp.characters.edges.map(
    (character: any) => {
      if (!character.voiceActors[0]) return;
      const voiceActor = character.voiceActors[0];
      return {
        role: character.role,
        image: voiceActor.image.large,
        name: voiceActor.name.full,
      };
    }
  );
  const studioData = temp.studios.nodes.map((node: any) => node.name);
  const staffsData: Staff[] = temp.staff.edges.map((staff: any) => {
    if (!staff) return;
    return {
      image: staff.node.image.large,
      role: staff.role,
      name: staff.node.name.full,
    };
  });
  const question: Question = {
    title: temp.title.romaji,
    meanScore: temp.meanScore,
    genres: temp.genres,
    bannerImage: temp.bannerImage,
    seasonYear: temp.seasonYear,
    season: temp.season,
    staffs: staffsData,
    studios: studioData,
    voiceActors: voiceActorsData,
  };
  return question;
};

export const getQuestionByAnilist = async () => {
  const result = await axios.post(
    url,
    {
      query: schema,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const { data } = result;
  if (!data) return {};
  return convertToQuestion(data);
};
