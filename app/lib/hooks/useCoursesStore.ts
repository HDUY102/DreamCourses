import { create } from "zustand";
import { courses, users } from "@prisma/client";

interface State {
  courses: courses[];
  users: users[];
  isLoadingCourses: boolean;
}

interface Actions {
  getCourseById: (id: any) => courses[];
  getAllCourses: () => courses[];
  fetchDataCourses: () => Promise<void>;
  getTeacherUsername: (teacherId: number) => string | null;
  setCourses: (tasks: State["courses"]) => void;
}

const INITIAL_STATE: State = {
  courses: [],
  users: [],
  isLoadingCourses: false,
};

export const useCoursesStore = create<State & Actions>((set, get) => ({
  courses: INITIAL_STATE.courses,
  users: INITIAL_STATE.users,
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

  getTeacherUsername: (teacherId) => {
    const users = get().users;
    if (!users) return null;
    const user = users.find((user) => user.idUser === teacherId);
    return user ? user.username : null;
  },

  setCourses: (courses) => set(() => ({ courses: courses })),

  fetchDataCourses: async () => {
    try {
      set({ isLoadingCourses: true });
      const coursesResponse = await fetch("http://localhost:3000/api/students/courses", {
        cache: "no-store",
      });
      
      const usersResponse = await fetch("http://localhost:3000/api/students/users", {
        cache: "no-store",
      });
      const coursesData = await coursesResponse.json();
      
      // console.log("Courses Data:", coursesData); 

      const usersData = await usersResponse.json();
      set({
        courses: coursesData,
        users: usersData,
        isLoadingCourses: false,
      });
    } catch (error) {
      console.error("Error fetching courses:", error);
      set({ isLoadingCourses: false });
    }
  },
}));