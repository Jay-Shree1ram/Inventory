import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import UserUpdateModal from "./update";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 12;
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
    setEditingEmployeeId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setEditingEmployeeId(null);
    setIsModalOpen(false);
  };

  const handleModalSuccess = (updatedData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedData.id ? updatedData : emp))
    );
    handleModalClose();
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
      <div className="max-w-7xl mx-auto px-6 mt-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-[#052535] tracking-wide">
          Employee List
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-gray-700">
            <thead className="bg-[#052535]">
              <tr>
                {["S.N", "Username", "Email", "Role", "Actions"].map((head, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white select-none"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-gray-50 cursor-default transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{emp.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{emp.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{emp.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-5">
                      <button
                        onClick={() => handleEdit(emp.id)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                        aria-label={`Edit ${emp.username}`}
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                        aria-label={`Delete ${emp.username}`}
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 text-lg font-light">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {employees.length > itemsPerPage && (
          <div className="flex justify-center items-center mt-6 space-x-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium transition"
            >
              Previous
            </button>
            <span className="text-gray-600 font-semibold text-sm select-none">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 font-medium transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <UserUpdateModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        userId={editingEmployeeId}
      />
    </>
  );
};

export default EmployeeList;
