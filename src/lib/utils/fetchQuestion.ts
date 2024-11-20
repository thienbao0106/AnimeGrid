import { getQuestionByAnilist } from "./anilist/fetchQuestionByAnilist";
import { defaultQuestion } from "./defaultValue";
import { getQuestionByJikan } from "./jikan/fetchQuestionByJikan";
export const fetchQuestion: (ids: any) => Promise<Question> = async (
  ids: any
) => {
  let data: any = defaultQuestion;
  try {
    data = await getQuestionByAnilist(ids.questionId.anilistId);
  } catch (error) {
    data = await getQuestionByJikan(ids.questionId.malId);
  }

  return data;
};
