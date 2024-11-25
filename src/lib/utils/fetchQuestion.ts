import { getQuestionByAnilist } from "./anilist/fetchQuestionByAnilist";
import { defaultQuestion } from "./defaultValue";
import { getQuestionByJikan } from "./jikan/fetchQuestionByJikan";
export const fetchQuestion: (ids: any) => Promise<Question> = async (
  ids: any
) => {
  let data: any = defaultQuestion;
  console.log("ids: " + ids.questionId.anilistId);
  try {
    data = await getQuestionByAnilist(ids.questionId.anilistId);
    console.log(data);
  } catch (error) {
    data = await getQuestionByJikan(ids.questionId.malId);
  }

  return data;
};
