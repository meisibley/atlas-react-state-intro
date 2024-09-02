import logo from "./assets/logo.png";
import { useAppContext } from "./AppContext";

export default function Header() {
  const { enrolledCourses } = useAppContext();

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolledCourses.length}</div>
    </div>
  );
}
