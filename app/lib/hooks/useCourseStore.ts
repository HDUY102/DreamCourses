import { create } from "zustand";
import { courses } from "@prisma/client";

interface State {
  courses: courses[];
  isLoadingCourses: boolean;
}

interface Actions {
  getCourseById: (id: any) => courses[];
  getAllCourses: () => courses[];
  fetchDataCourses: () => Promise<void>;
  setCourses: (tasks: State["courses"]) => void;
}

const INITIAL_STATE: State = {
  courses: [],
  isLoadingCourses: false,
};

export const useCourseStore = create<State & Actions>((set, get) => ({
  courses: INITIAL_STATE.courses,
  isLoadingCourses: INITIAL_STATE.isLoadingCourses,
  getAllCourses: () => {
    return get().courses;
  },
  getCourseById: (id) => {
    let idCourse = parseInt(id);
    return get().courses.filter(
      (courses: courses) => courses.idCourse === idCourse
    );
  },
  setCourses: (courses) => set(() => ({ courses: courses })),

  fetchDataCourses: async () => {
    try {
      set({ isLoadingCourses: true });
      const response = await fetch("http://localhost:3000/api/courses", {
        cache: "no-store",
      });
      const data = await response.json();
      set({
        courses: data,
        isLoadingCourses: false,
      });
    } catch (error) {}
  },
}));
