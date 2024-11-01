import axios from "axios";

const schema = `
{
  Page {
    media(search: "Yuru Camp", type: ANIME) {
      id
      title {
        romaji
      }
      genres
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

export const getQuestion = async () => {
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
  console.log(result);
};
