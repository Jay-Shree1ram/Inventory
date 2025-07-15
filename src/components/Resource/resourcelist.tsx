import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';

import ResourceEditModal from './resourceedit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface Resource {
  brand: string;
  model: string;
  specification: string;
  purchaseDate: string;
  warrantyExpiry: string;
  resourceId: number;
  resourceType: string;
  resourceClass: string;
  resourceStatus: string;
  batchId: number | null;
  id: number;
}

const ResourceList = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);
  const [resourceStatusOptions, setResourceStatusOptions] = useState<string[]>([]);
  const [resourceTypeOptions, setResourceTypeOptions] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2

  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('http://localhost:8080/resources', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const resourceArray = Array.isArray(res.data) ? res.data : res.data.data || [];
        setResources(resourceArray);
      } catch (err) {
        setError('Failed to fetch resources');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [accessToken]);

  useEffect(() => {
    const fetchResourceStatus = async () => {
      try {
        const res = await axios.get('http://localhost:8080/master/resource-status', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const statusList = res.data?.data?.map((item: any) => item.resourceStatusName) || [];
        setResourceStatusOptions(statusList);
      } catch (err) {
        console.error("Error fetching resource status", err);
      }
    };
    fetchResourceStatus();
  }, [accessToken]);

  useEffect(() => {
    const fetchResourceType = async () => {
      try {
        const res = await axios.get('http://localhost:8080/master/resource-type', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const typeList = res.data?.data?.map((item: any) => item.resourceTypeName) || [];
        setResourceTypeOptions(typeList);
      } catch (err) {
        console.error("Error fetching resource types", err);
      }
    };
    fetchResourceType();
  }, [accessToken]);

  const handleEdit = (id: number) => {
    setSelectedResourceId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResourceId(null);
  };

  const handleUpdateResource = (updatedResource: Resource) => {
    setResources((prev) =>
      prev.map((res) => (res.resourceId === updatedResource.resourceId ? updatedResource : res))
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/resources/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setResources((prev) => prev.filter((r) => r.resourceId !== id));
    } catch (err) {
      alert('Failed to delete resource');
      console.error(err);
    }
  };

  const handleCreate = () => {
    navigate('create');
  };

  const filteredResources = resources.filter((res) =>
    (statusFilter ? res.resourceStatus === statusFilter : true) &&
    (typeFilter ? res.resourceType === typeFilter : true)
  );

  
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading) return <div className="p-4">Loading resources...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <>
      <Header />
      <div className="max-w-9xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Resource List</h2>
          <button
            onClick={handleCreate}
            style={{ backgroundColor: "#052535" }}
            className="px-4 mx-4 py-2 text-white hover:opacity-90 transition"
          >
            Create
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            className="border p-2 rounded"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); 
            }}
          >
            <option value="">All Status</option>
            {resourceStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1); 
            }}
          >
            <option value="">All Types</option>
            {resourceTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-[#052535] text-white text-sm uppercase tracking-wider">
              <tr>
                {[
                  "Resource Id", "Brand", "Model", "Specification", "Purchase Date",
                  "Warranty Expiry", "Type", "Class", "Status", "Batch ID", "Actions"
                ].map((head, idx) => (
                  <th key={idx} className="border px-4 py-3 text-left whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm bg-white divide-y divide-gray-200">
              {paginatedResources.length > 0 ? (
                paginatedResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-3">{resource.resourceId}</td>
                    <td className="px-4 py-3">{resource.brand}</td>
                    <td className="px-4 py-3">{resource.model}</td>
                    <td className="px-4 py-3">{resource.specification}</td>
                    <td className="px-4 py-3">{resource.purchaseDate}</td>
                    <td className="px-4 py-3">{resource.warrantyExpiry}</td>
                    <td className="px-4 py-3">{resource.resourceType}</td>
                    <td className="px-4 py-3">{resource.resourceClass}</td>
                    <td className="px-4 py-3">{resource.resourceStatus}</td>
                    <td className="px-4 py-3">{resource.batchId ?? 'N/A'}</td>
                    <td className="px-4 py-3 space-x-2 flex flex-wrap items-center">
                      <button
                        onClick={() => handleEdit(resource.resourceId)}
                        className="bg-[#052535] text-white px-3 py-1 rounded hover:bg-[#03415a] flex items-center gap-1"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(resource.resourceId)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center p-6 text-gray-500">
                    No resources found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

     
        {filteredResources.length > itemsPerPage && (
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

      {showModal && selectedResourceId && (
        <ResourceEditModal
          open={showModal}
          resourceId={selectedResourceId}
          onClose={handleCloseModal}
          onUpdate={handleUpdateResource}
          token={accessToken ?? ''}
        />
      )}
    </>
  );
};

export default ResourceList;
