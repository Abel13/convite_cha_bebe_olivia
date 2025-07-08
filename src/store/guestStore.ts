import { create } from "zustand";

interface Guest {
  code: string;
  guestId: string;
}

interface GuestState {
  guest: Guest | null;
  setGuest: (guest: Guest) => void;
  clear: () => void;
}

export const useGuestStore = create<GuestState>((set) => ({
  guest: null,
  setGuest: (guest) =>
    set({
      guest,
    }),
  clear: () => set({ guest: null }),
}));
