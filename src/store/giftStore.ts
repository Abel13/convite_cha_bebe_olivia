import { create } from "zustand";

interface Gift {
  id: number;
  name: string;
  value: number;
  image: string;
}

interface GiftState {
  selected: Gift[];
  setSelected: (gifts: Gift[]) => void;
  toggle: (gift: Gift) => void;
  clear: () => void;
}

export const useGiftStore = create<GiftState>((set) => ({
  selected: [],
  setSelected: (gifts) => set({ selected: gifts }),
  toggle: (gift) =>
    set((state) => ({
      selected: state.selected.includes(gift)
        ? state.selected.filter((i) => i !== gift)
        : [...state.selected, gift],
    })),
  clear: () => set({ selected: [] }),
}));
