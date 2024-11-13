import moment from "moment";

export const setHistory = (data: any) => {
  if (!localStorage.getItem("stats")) {
    localStorage.setItem("stats", JSON.stringify([data]));
  }
  const currentData = JSON.parse(localStorage.getItem("stats") || "");
  currentData.unshift(data);
  localStorage.setItem("stats", JSON.stringify(currentData));
};

export const checkHistory = () => {
  if (!localStorage.getItem("stats")) return false;
  const data = JSON.parse(localStorage.getItem("stats") || "") ?? [];
  if (data.length === 0) return false;
  const dataDate: any = moment(data[0].date);
  return moment().diff(dataDate, "hours") < 24;
};
