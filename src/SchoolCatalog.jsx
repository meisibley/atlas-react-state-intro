import { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [schoolCatalog, setSchoolCatalog] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setSchoolCatalog(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = schoolCatalog.filter((course) => {
    const lowerCaseFilter = filter.toLowerCase();
    return (
      course.courseNumber.toLowerCase().includes(lowerCaseFilter) ||
      course.courseName.toLowerCase().includes(lowerCaseFilter)
    );
  });

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
