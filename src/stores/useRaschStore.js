import create from "zustand";

const useRaschStore = create((set) => ({
  mu: 0,
  beta: 1,
  gamma: 0,
  lambda: 0,
  update: (parameter, value) =>
    set(() => ({
      [parameter]: value,
    })),
}));

export default useRaschStore;
