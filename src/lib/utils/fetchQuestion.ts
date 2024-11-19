import { getQuestionByAnilist } from "./anilist/fetchQuestionByAnilist";
import { defaultQuestion } from "./defaultValue";
import { getQuestionByJikan } from "./jikan/fetchQuestionByJikan";
export const fetchQuestion: (ids: any) => Promise<Question> = async (
  ids: any
) => {
  let data: any = defaultQuestion;
  data = await getQuestionByAnilist(ids.questionId.anilistId);
  if (Object.keys(data).length !== 0) return data;
  data = await getQuestionByJikan(ids.questionId.malId);
  return data;
};
