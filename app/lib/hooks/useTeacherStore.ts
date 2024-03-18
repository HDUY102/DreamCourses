import { create } from "zustand";
import {users} from "@prisma/client"

interface State {
  teachers: users[];
  isLoadingTeachers: boolean;
}

interface Actions {
  getTeacherById: (id: any) => users[];
  getAllTeachers: () => users[];
  fetchDataTeacher: () => Promise<void>;
  setTeachers: (tasks: State["teachers"]) => void;
}

const INITIAL_STATE: State = {
  teachers: [],
  isLoadingTeachers: false,
};

export const useTeacherStore = create<State & Actions>((set, get) => ({
  teachers: INITIAL_STATE.teachers,
  isLoadingTeachers: INITIAL_STATE.isLoadingTeachers,
  getAllTeachers: () => {
    return get().teachers;
  },
  getTeacherById: (id) => {
    let idTeacher = parseInt(id);
    return get().teachers.filter(
      (teacher: users) => teacher.idUser === idTeacher
    );
  },
  setTeachers: (teachers) => set(() => ({ teachers: teachers })),

  fetchDataTeacher: async () => {
    try {
      set({ isLoadingTeachers: true });
      const response = await fetch("http://localhost:3000/api/teacher", {
        cache: "no-store",
      });
      const data = await response.json();
      set({
        teachers: data,
        isLoadingTeachers: false,
      });
    } catch (error) {}
  },
}));