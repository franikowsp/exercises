import create from "zustand";

import * as jstat from "jstat";

const points = Array.from({ length: 30 }, () => {
  const x = jstat.normal.sample(10, 4);
  const y = -3 + 1 * x + jstat.normal.sample(0, 2);

  return { x, y };
});

const useRegressionStore = create((set) => ({
  points: points,
  beta0: 0,
  beta1: 1,
  update: (parameter, value) =>
    set(() => ({
      [parameter]: value,
    })),
}));

export default useRegressionStore;
