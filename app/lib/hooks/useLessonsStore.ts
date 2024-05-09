import { create } from "zustand";
import { lessons} from "@prisma/client";

interface State {
  lessons: lessons[];
  isLoadingLessons: boolean;
}

interface Actions {
  getAllLessons: () => lessons[];
  getLessonsById: (id: number) => lessons[];
  getLessonsByChapterId: (chapterId: number) => lessons[];
  setLessons: (lessons: State["lessons"]) => void;
  fetchDataLessons: () => Promise<void>;
}

const INITIAL_STATE: State = {
  lessons: [],
  isLoadingLessons: false,
};

export const useLessonsStore = create<State & Actions>((set, get) => ({
  lessons: INITIAL_STATE.lessons,
  isLoadingLessons: INITIAL_STATE.isLoadingLessons,
  getAllLessons: () => {
    return get().lessons;
  },
  getLessonsById: (id) => {
    return get().lessons.filter(
      (lessons: lessons) => lessons.idLessons === id
    );
  },
  getLessonsByChapterId: (chapterId: number) => {
    return get().lessons.filter(
      (lesson: any) => lesson.chapterId === chapterId
    );
  },
  setLessons: (lessons) => set(() => ({ lessons: lessons })),

  fetchDataLessons: async () => {
    try {
      set({ isLoadingLessons: true });
      const response = await fetch(`http://localhost:3000/api/students/lessons`, {
        cache: "no-store",
      });
      const data = await response.json();

      set({
        lessons: data,
        isLoadingLessons: false,
      });
    } catch (error) {
      console.error("Error fetching lessons data:", error);
      set({ isLoadingLessons: false });
    }
  },
}));