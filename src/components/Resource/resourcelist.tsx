

import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';
import { AuthContext } from '../Global/common';
import ResourceEditModal from './resourceedit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/Footer';

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

  const { accessToken } = useContext(AuthContext);

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

  const handleEdit = (id: number) => {
    setSelectedResourceId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResourceId(null);
  };

  
  const handleUpdateResource = (updatedResource: any) => {
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

  if (loading) return <div>Loading resources...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <Header />
      <div className="max-w-9xl mx-auto p-4">
      

        <h2 className="text-2xl font-bold mb-4">Resource List</h2>
        <table className="min-w-full border border-gray-300 rounded">
 
          <thead className="bg-[#052535] text-white">
            <tr>
              <th className="border px-4 py-2">Resource Id</th>
              <th className="border px-4 py-2">Brand</th>
              <th className="border px-4 py-2">Model</th>
              <th className="border px-4 py-2">Specification</th>
              <th className="border px-4 py-2">Purchase Date</th>
              <th className="border px-4 py-2">Warranty Expiry</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Batch ID</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <tr key={resource.id}>
                  <td className="border px-4 py-2">{resource.resourceId}</td>
                  <td className="border px-4 py-2">{resource.brand}</td>
                  <td className="border px-4 py-2">{resource.model}</td>
                  <td className="border px-4 py-2">{resource.specification}</td>
                  <td className="border px-4 py-2">{resource.purchaseDate}</td>
                  <td className="border px-4 py-2">{resource.warrantyExpiry}</td>
                  <td className="border px-4 py-2">{resource.resourceType}</td>
                  <td className="border px-4 py-2">{resource.resourceClass}</td>
                  <td className="border px-4 py-2">{resource.resourceStatus}</td>
                  <td className="border px-4 py-2">{resource.batchId ?? 'N/A'}</td>
                  <td className="border px-4 py-2 space-x-2 flex items-center">
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
                      className="bg-[#052535] text-white px-3 py-1 rounded hover:bg-[#03415a] flex items-center gap-1"
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
                <td colSpan={11} className="text-center p-4">
                  No resources found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      {showModal && selectedResourceId && (
        <ResourceEditModal
          open={showModal}
          resourceId={selectedResourceId}
          onClose={handleCloseModal}
          onUpdate={handleUpdateResource}
          token={accessToken}
        />
      )}
      
    </>
  );
};

export default ResourceList;
