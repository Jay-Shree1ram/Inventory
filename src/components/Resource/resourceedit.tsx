import { useEffect, useState } from 'react';
import axios from 'axios';

interface ResourceEditModalProps {
  open: boolean;
  resourceId: number | null;
  onClose: () => void;
  onUpdate: (updatedResource: any) => void;
  token: string;
}

const ResourceEditModal = ({ open, resourceId, onClose, onUpdate, token }: ResourceEditModalProps) => {
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!resourceId || !open) {
      setResource(null);
      return;
    }

    const fetchResource = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/resources/${resourceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setResource({
          ...data,
          resourceTypeName: data.resourceType,
          resourceClassName: data.resourceClass,
          resourceStatusName: data.resourceStatus,
        });
      } catch (err) {
        alert('Failed to load resource');
        console.error(err);
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [resourceId, open, token, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const updatePayload = {
        brand: resource.brand,
        model: resource.model,
        specification: resource.specification,
        purchaseDate: resource.purchaseDate,
        warrantyExpiry: resource.warrantyExpiry,
        resourceTypeName: resource.resourceTypeName,
        resourceClassName: resource.resourceClassName,
        resourceStatusName: resource.resourceStatusName,
      };

      const res = await axios.put(
        `http://localhost:8080/resources/${resourceId}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Resource updated!');
      onUpdate(res.data.data);
      onClose();
    } catch (err) {
      alert('Error updating resource');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 overflow-auto p-4">
      <div className="relative w-[800px] mx-auto mt-10 mb-10 bg-white rounded-3xl p-10 shadow-lg">

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-center text-4xl font-bold text-[#052535] mb-8">Edit Resource</h2>

        {loading || !resource ? (
          <div className="text-center">Loading...</div>
        ) : (
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="brand" className="font-semibold text-gray-700">
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                value={resource.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="model" className="font-semibold text-gray-700">
                Model
              </label>
              <input
                id="model"
                name="model"
                value={resource.model}
                onChange={handleChange}
                placeholder="Model"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="specification" className="font-semibold text-gray-700">
                Specification
              </label>
              <textarea
                id="specification"
                name="specification"
                value={resource.specification}
                onChange={handleChange}
                placeholder="Specification"
                rows={4}
                className="px-5 py-3 rounded-2xl bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none resize-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="purchaseDate" className="font-semibold text-gray-700">
                Purchase Date
              </label>
              <input
                id="purchaseDate"
                type="date"
                name="purchaseDate"
                value={resource.purchaseDate}
                onChange={handleChange}
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="warrantyExpiry" className="font-semibold text-gray-700">
                Warranty Expiry
              </label>
              <input
                id="warrantyExpiry"
                type="date"
                name="warrantyExpiry"
                value={resource.warrantyExpiry}
                onChange={handleChange}
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="resourceTypeName" className="font-semibold text-gray-700">
                Resource Type Name
              </label>
              <input
                id="resourceTypeName"
                type="text"
                name="resourceTypeName"
                value={resource.resourceTypeName}
                onChange={handleChange}
                placeholder="Resource Type Name"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="resourceClassName" className="font-semibold text-gray-700">
                Resource Class Name
              </label>
              <input
                id="resourceClassName"
                type="text"
                name="resourceClassName"
                value={resource.resourceClassName}
                onChange={handleChange}
                placeholder="Resource Class Name"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="resourceStatusName" className="font-semibold text-gray-700">
                Resource Status Name
              </label>
              <input
                id="resourceStatusName"
                type="text"
                name="resourceStatusName"
                value={resource.resourceStatusName}
                onChange={handleChange}
                placeholder="Resource Status Name"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 md:col-span-2 w-full bg-[#052535] text-white text-lg font-bold py-3 rounded-full hover:bg-[#03415a] transition-colors disabled:opacity-60"
            >
              {submitting ? 'Updating...' : 'Update Resource'}
            </button>
          </form>
        )}
      </div>
    </div>
  );

};

export default ResourceEditModal;
