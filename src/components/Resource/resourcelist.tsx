import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';
interface Resource {
  brand: string;
  model: string;
  specification: string;
  purchaseDate: string;
  warrantyExpiry: string;
  resourceTypeId: string;
  resourceClassId: string;
  resourceStatusId: string;
  batchId: string;
  id: number; 
}

const ResourceList = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/resources', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response data:', res.data); 

       
        const resourceArray = Array.isArray(res.data) ? res.data : res.data.data || [];
        setResources(resourceArray);
      } catch (err) {
        setError('Failed to fetch resources');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <div>Loading resources...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
   <>
   <Header/>
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Resource List</h2>
      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Specification</th>
            <th className="border px-4 py-2">Purchase Date</th>
            <th className="border px-4 py-2">Warranty Expiry</th>
            <th className="border px-4 py-2">Type ID</th>
            <th className="border px-4 py-2">Class ID</th>
            <th className="border px-4 py-2">Status ID</th>
            <th className="border px-4 py-2">Batch ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(resources) && resources.length > 0 ? (
            resources.map((resource) => (
              <tr key={resource.id}>
                <td className="border px-4 py-2">{resource.brand}</td>
                <td className="border px-4 py-2">{resource.model}</td>
                <td className="border px-4 py-2">{resource.specification}</td>
                <td className="border px-4 py-2">{resource.purchaseDate}</td>
                <td className="border px-4 py-2">{resource.warrantyExpiry}</td>
                <td className="border px-4 py-2">{resource.resourceTypeId}</td>
                <td className="border px-4 py-2">{resource.resourceClassId}</td>
                <td className="border px-4 py-2">{resource.resourceStatusId}</td>
                <td className="border px-4 py-2">{resource.batchId}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => {
                      // example edit action, replace with your routing logic
                      alert(`Edit resource ID: ${resource.id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-4">
                No resources found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div></>
  );
};

export default ResourceList;
