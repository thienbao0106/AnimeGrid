import { writable } from "svelte/store";

function handleCalculate(number: number) {
  const { subscribe, set, update } = writable(number);

  return {
    subscribe,
    decrement: (value: number) => update((n) => n - value),
    reset: () => set(number),
  };
}

export const points = handleCalculate(150);
export const guesses = handleCalculate(5);
