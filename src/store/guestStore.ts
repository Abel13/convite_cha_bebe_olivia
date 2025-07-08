import { create } from "zustand";
import { persist } from "zustand/middleware";

type Guest = {
  code: string;
  guestId: string;
  partyId: string;
};

type GuestStore = {
  guest?: Guest;
  setGuest: (guest: Guest) => void;
  clearGuest: () => void;
};

export const useGuestStore = create<GuestStore>()(
  persist(
    (set) => ({
      guest: undefined,
      setGuest: (guest) => set({ guest }),
      clearGuest: () => set({ guest: undefined }),
    }),
    {
      name: "guest-storage",
    }
  )
);
