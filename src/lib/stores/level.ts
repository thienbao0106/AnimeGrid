import { writable } from "svelte/store";
const handleLevel = (level: string) => {
  const { subscribe, set, update } = writable(level);
  return {
    subscribe,
    setLevel: (diff: string) => {
      update((n) => (n = diff));
    },
    set,
  };
};

export const level = handleLevel("normal");
