import { useReducer} from 'react';
import axios from 'axios';
import { formReducer, initialState } from './batch'; 




const BatchUploadModal = ({ open, onClose, onSuccess }: any) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  

  const handleChange = (e: any) => {
      dispatch({
      type: 'UPDATE_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    dispatch({ type: 'SET_SUBMITTING', status: true });
    try {
      const payload = {

        resourceType: state.resourceTypeId,
        quantity: state.quantity,
        description: state.description
      };
      const res = await axios.post('/api/resources/batch-upload', payload);
      onSuccess(res.data);
      onClose();
      dispatch({ type: 'RESET' });
    } catch (err) {
      console.error("Batch upload failed", err);
    } finally {
      dispatch({ type: 'SET_SUBMITTING', status: false });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Upload Resource Batch</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        
         

          <div>
            <label className="block font-medium mb-1">Resource Type Id </label>
            <input
              name="resourceType"
              value={state.resourceTypeId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
             
            </input>
           
          </div>

          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={state.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
       
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={state.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                dispatch({ type: 'RESET' });
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={state.isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {state.isSubmitting ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatchUploadModal;




// import { useForm } from 'react-hook-form';
// import axios from 'axios';

// const resourceTypes = ['Monitor', 'Laptop', 'Keyboard', 'Mouse'];

// const BatchUploadModal = ({ open, onClose, onSuccess }:any) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     defaultValues: {
//       batchCode: '',
//       resourceType: '',
//       quantity: '',
//       description: ''
//     }
//   });

//   const onSubmit = async (data:any) => {
//     try {
//       const res = await axios.post('/api/resources/batch-upload', data);
//       onSuccess(res.data);
//       onClose();
//       reset();
//     } catch (err) {
//       console.error("Batch upload failed", err);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//       <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Upload Resource Batch</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
//           <div>
//             <label className="block font-medium mb-1">Batch Code</label>
//             <input
//               {...register('batchCode', { required: 'Batch Code is required' })}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             />
//             {errors.batchCode && <p className="text-red-500 text-sm">{errors.batchCode.message}</p>}
//           </div>

        
//           <div>
//             <label className="block font-medium mb-1">Resource Type</label>
//             <select
//               {...register('resourceType', { required: 'Resource Type is required' })}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             >
//               <option value="">Select Type</option>
//               {resourceTypes.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//             {errors.resourceType && <p className="text-red-500 text-sm">{errors.resourceType.message}</p>}
//           </div>

         
//           <div>
//             <label className="block font-medium mb-1">Quantity</label>
//             <input
//               type="number"
//               {...register('quantity', {
//                 required: 'Quantity is required',
//                 min: { value: 1, message: 'Must be at least 1' }
//               })}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             />
//             {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
//           </div>

         
//           <div>
//             <label className="block font-medium mb-1">Description</label>
//             <textarea
//               {...register('description')}
//               rows={3}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             />
//           </div>

          
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={() => { onClose(); reset(); }}
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               {isSubmitting ? 'Uploading...' : 'Upload'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BatchUploadModal;
