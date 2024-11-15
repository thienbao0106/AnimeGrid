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

export const checkHistory = () => {
  const data = getHistory();
  if (data.length === 0) return false;
  const dataDate: any = moment(data[0].date);
  return moment().diff(dataDate, "hours") < 24;
};
