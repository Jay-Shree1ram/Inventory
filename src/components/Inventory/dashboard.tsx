import { useState, useEffect } from 'react';
import axios from 'axios';
import BatchUploadModal from '../Batch/batchupload';
import Header from '../Navbar/Navbar';
const InventoryDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({});
  const [recentBatches, setRecentBatches] = useState([]);

  const fetchData = async () => {
    const res1 = await axios.get('/api/inventory/stats');
    const res2 = await axios.get('/api/resources/batches?limit=5');
    setStats(res1.data);
    setRecentBatches(res2.data);
  };

  const handleSuccess = () => {
    fetchData();
    setShowModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
<>
<Header/>
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
<div>
        <h2 className="text-xl font-semibold mb-2">Recent Batches</h2>
        <table className="w-full border text-left">
          <thead>
            <tr>
              <th className="p-2 border">Batch Code</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
         
          </tbody>
        </table>
      </div>

   
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload New Batch
      </button>

      <BatchUploadModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
      />
    </div></>
  );
};


export default InventoryDashboard;
