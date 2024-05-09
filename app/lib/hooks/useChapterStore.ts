import { create } from "zustand";
import { chapters } from "@prisma/client";

interface State {
  chapters: chapters[];
  isLoadingChapters: boolean;
}

interface Actions {
  getChapterById: (id: any) => chapters[];
  getAllChapters: () => chapters[];
  fetchDataChapters: () => Promise<void>;
  setChapters: (tasks: State["chapters"]) => void;
}

const INITIAL_STATE: State = {
  chapters: [],
  isLoadingChapters: false,
};

export const useChapterStore = create<State & Actions>((set, get) => ({
  chapters: INITIAL_STATE.chapters,
  isLoadingChapters: INITIAL_STATE.isLoadingChapters,
  getAllChapters: () => {
    return get().chapters;
  },
  getChapterById: (id) => {
    let idChapter = parseInt(id);
    return get().chapters.filter(
      (chapters: chapters) => chapters.idChapter === idChapter
    );
  },
  setChapters: (chapters) => set(() => ({ chapters: chapters })),

  fetchDataChapters: async () => {
    try {
      set({ isLoadingChapters: true });
      const response = await fetch("http://localhost:3000/api/students/chapters", {
        cache: "no-store",
      });
      const data = await response.json();
      set({
        chapters: data,
        isLoadingChapters: false,
      });
    } catch (error) {}
  },
}));