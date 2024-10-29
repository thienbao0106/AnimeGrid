import { writable } from "svelte/store";

function handleCalculate() {
  const { subscribe, set, update } = writable(150);

  return {
    subscribe,
    decrement: (value: number) => update((n) => n - value),
    reset: () => set(150),
  };
}

export const calculate = handleCalculate();
