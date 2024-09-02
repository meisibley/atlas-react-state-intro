import { useState, useEffect } from "react";
const PAGE_SIZE = 5;

export default function SchoolCatalog() {
  const [schoolCatalog, setSchoolCatalog] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ column: "trimester", direction: "asc" });
  const [page, setPage] = useState(1);

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

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sort.column];
    const bValue = b[sort.column];
    
    if (typeof aValue === "string") {
      return sort.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
  });

  const handleSort = (column) => {
    setSort((prevSort) => ({
      column,
      direction: prevSort.column === column && prevSort.direction === "asc" ? "desc" : "asc",
    }));
  };

  const currentPage = sortedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = sortedData.length > page * PAGE_SIZE;
  const hasLess = page > 1;

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
            <th onClick={() => handleSort("trimester")}>Trimester</th>
            <th onClick={() => handleSort("courseNumber")}>Course Number</th>
            <th onClick={() => handleSort("courseName")}>Courses Name</th>
            <th onClick={() => handleSort("semesterCredits")}>Semester Credits</th>
            <th onClick={() => handleSort("totalClockHours")}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course) => (
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
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
