import { getQuestionByAnilist } from "./anilist/fetchQuestionByAnilist";
import { defaultQuestion } from "./defaultValue";
import { getQuestionByJikan } from "./jikan/fetchQuestionByJikan";

export const fetchQuestion: () => Promise<Question> = async () => {
  let data: any = defaultQuestion;
  data = await getQuestionByAnilist();
  if (Object.keys(data).length !== 0) return data;
  data = await getQuestionByJikan();
  return data;
};
