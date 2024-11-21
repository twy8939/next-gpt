import { create } from "zustand";

type State = {
  open: boolean;
};

type Action = {
  setOpen: (firstName: State["open"]) => void;
};

const useSheetStore = create<State & Action>((set) => ({
  open: true,
  setOpen: (open) => set(() => ({ open })),
}));

export { useSheetStore };
