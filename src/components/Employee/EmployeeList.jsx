import React, { useState, useEffect } from 'react';
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employees")
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Failed to load employee data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.id.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term)
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  return (
    <div className="container mx-auto p-6">
<h2 className="text-3xl font-bold text-center mb-6 text-[#052535]">
  Employee List
</h2>

      {/* 🔍 Search Input */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by name, email, ID or department"
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 border-spacing-x-2">
        <thead>
          <tr className="bg-[#052535] text-white ">
            <th className="py-2 px-4 border-b">Employee ID</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Name</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="4" className="py-4 px-4 text-center text-red-600">
                {error}
              </td>
            </tr>
          ) : filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          ) : (
            filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{emp.id}</td>
                <td className="py-2 px-4 border-b">{emp.department}</td>
                <td className="py-2 px-4 border-b">{emp.email}</td>
                <td className="py-2 px-4 border-b">{emp.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
