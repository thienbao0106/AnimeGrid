import { writable } from "svelte/store";

const handleAnswers = () => {
  const { subscribe, set, update } = writable<any>([]);

  return {
    subscribe,
    addAnswer: (newAnswer: any) => {
      update((currentAnswer: any) => {
        console.log(currentAnswer);
        return [...currentAnswer, newAnswer];
      });
    },
    set,
  };
};

export const gridAnswers = handleAnswers();
