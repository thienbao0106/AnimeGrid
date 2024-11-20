import moment from "moment";
export const historyObject = (
  type: string,
  level: string,
  points: number,
  guesses: number
) => {
  return {
    type,
    level,
    points,
    guesses,
    date: moment(),
  };
};
export const setHistory = (data: any) => {
  if (!localStorage.getItem("stats")) {
    localStorage.setItem("stats", JSON.stringify([data]));
    return;
  }
  const currentData = JSON.parse(localStorage.getItem("stats") || "");
  currentData.unshift(data);
  localStorage.setItem("stats", JSON.stringify(currentData));
  return;
};

export const getHistory = () => {
  if (!localStorage.getItem("stats")) return [];
  return JSON.parse(localStorage.getItem("stats") || "") ?? [];
};

export const checkHistory = (listHistory: any, level: string) => {
  if (!listHistory || listHistory?.length === 0) return false;
  console.log(level);
  const history = listHistory.find((history: any) => history.level === level);
  console.log(history);
  if (!history) return false;
  if (history.length === 0) return false;
  const dataDate: any = moment(history.date);
  console.log(moment().diff(dataDate, "hours"));
  return moment().diff(dataDate, "hours") < 24;
};
