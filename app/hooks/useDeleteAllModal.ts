import { create } from "zustand";

interface DeleteAllModal {
  isOpen: boolean;
  value: any;
  onOpen: () => void;
  onClose: () => void;
  setValue: (value: any) => void;
}

const useDeleteAllModal = create<DeleteAllModal>((set) => ({
  isOpen: false,
  value: [],
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setValue: (value) => set({ value }),
}));

export default useDeleteAllModal;
