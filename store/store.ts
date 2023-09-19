import { create } from "zustand";

type NoticeModal = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useNoticeModalStore = create<NoticeModal>((set) => ({
  open: false,
  setOpen: (status: boolean) => set((state) => {
    return { open: status }
  }),
}));