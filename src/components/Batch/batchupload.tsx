import { useState } from 'react';
import axios from 'axios';

const BatchUploadModal = ({ open, onClose, onSuccess }: any) => {
  const [resourceTypeName, setResourceTypeName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        resourceTypeName,
        quantity,
        description,
      };

      const res = await axios.post('http://localhost:8080/batches', payload);
      onSuccess(res.data);
      handleClose();
    } catch (err) {
      console.error('Batch upload failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setResourceTypeName('');
    setQuantity('');
    setDescription('');
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-[#052535] mb-6">
          Upload Resource Batch
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="resourceTypeName" className="font-semibold text-gray-700">
              Resource Type Name
            </label>
            <input
              id="resourceTypeName"
              name="resourceTypeName"
              value={resourceTypeName}
              onChange={(e) => setResourceTypeName(e.target.value)}
              placeholder="Resource Type Name"
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="quantity" className="font-semibold text-gray-700">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={3}
              className="px-5 py-3 rounded-2xl bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none resize-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-full bg-[#052535] text-white font-semibold hover:bg-[#03415a] transition disabled:opacity-60"
            >
              {isSubmitting ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatchUploadModal;
