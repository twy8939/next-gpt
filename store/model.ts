import { create } from "zustand";

type State = {
  model: string;
};

type Action = {
  updateModel: (firstName: State["model"]) => void;
};

const useModelStore = create<State & Action>((set) => ({
  model: "gpt-3.5-turbo",
  updateModel: (model) => set(() => ({ model })),
}));

export { useModelStore };
