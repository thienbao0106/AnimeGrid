import axios from "axios";

const schema = `
query ($title: String) {

	Page {
        media(search: $title) {
            id
            title {
                romaji
            }
        }
	}
}
`;
const url = "https://graphql.anilist.co";

export const fetchDropdown = async (guess: string) => {
  console.log(guess);
  const result = await axios.post(
    url,
    {
      query: schema,
      variables: {
        title: guess,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (result.data && result.data.data.Page.media.length > 0) {
    return result.data.data.Page.media.map((data: any) => {
      return data.title.romaji;
    });
  }
  return [];
};
