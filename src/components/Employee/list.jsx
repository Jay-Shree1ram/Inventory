import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/users", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("Fetched employees:", res.data);
        setEmployees(res.data.data || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, [accessToken]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEdit = (id) => {
   
    alert(`Navigate to edit page for user ID: ${id}`);
  };

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const paginatedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#052535]">
          Employee List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-[#052535] text-white text-sm uppercase tracking-wider">
              <tr>
                {["S.N", "Username", "Email", "Role", "Actions"].map((head, idx) => (
                  <th
                    key={idx}
                    className="border px-4 py-3 text-left whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm bg-white divide-y divide-gray-200">
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, index) => (
                  <tr key={emp.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-3">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-3">{emp.username}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.role}</td>
                    <td className="px-4 py-3 flex gap-4">
                      <button
                        onClick={() => handleEdit(emp.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {employees.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-4 px-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeList;
