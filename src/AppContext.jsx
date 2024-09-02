import { createContext, useState, useContext } from "react";
const AppContext = createContext();

export function AppProvider({ children }) {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const enrollCourse = (course) => {
        setEnrolledCourses((prevCourses) => [...prevCourses, course]);
    };

    const dropCourse = (courseNumber) => {
        setEnrolledCourses((prevCourses) =>
            prevCourses.filter((course) => course.courseNumber !== courseNumber)
        );
    };

    return (
        <AppContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
