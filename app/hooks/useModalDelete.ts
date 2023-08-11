import { create } from "zustand";

interface DeleteModal {
  isOpen: boolean;
  value: any;
  onOpen: () => void;
  onClose: () => void;
  setValue: (value: any) => void;
}

const useModalDelete = create<DeleteModal>((set) => ({
  isOpen: false,
  value: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setValue: (value) => set({ value }),
}));

export default useModalDelete;
