import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const ResourceForm = () => {
  const [formState, setFormState] = useState({
    brand: '',
    model: '',
    specification: '',
    purchaseDate: '',
    warrantyExpiry: '',
    resourceTypeName: '',
    resourceClassName: '',
    resourceStatusName: '',
  });

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const [classes, setClasses] = useState([]);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await axios.get("http://localhost:8080/master/resource-class", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("Fetched classes response:", res.data);
        
        setClasses( res.data.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };
    fetchClass();
  }, []);
  
useEffect(() => {
  
  console.log("Statuses updated:", classes);
}, [classes]);

  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get("http://localhost:8080/master/resource-type", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("Fetched types response:", res.data);
        setTypes(res.data.data);
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };
    fetchType();
  }, []);

  
useEffect(() => {
  
  console.log("Statuses updated:", types);
}, [types]);

useEffect(() => {
  const fetchStatuses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/master/resource-status", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Fetched statuses response:", res.data);
      setStatuses(res.data.data); 
    } catch (err) {
      console.error("Error fetching statuses:", err);
    }
  };

  fetchStatuses();
}, []);

useEffect(() => {
  
  console.log("Statuses updated:", statuses);
}, [statuses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting data:', formState);

      await axios.post('http://localhost:8080/resources', [formState], {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      console.log('Resource created successfully');
      alert('Resource created!');
      navigate('/resource');
    } catch (err) {
      console.error(err);
      alert('Error creating resource');
    }
  };

  return (
    <>
      <Header />
      <div className="w-[800px] mx-auto mt-10 mb-10 bg-white rounded-3xl p-10 shadow-lg">
        <h2 className="text-center text-4xl font-bold text-[#052535] mb-8">
          Create Resource
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
        
          <div className="flex flex-col gap-2">
            <label htmlFor="brand" className="font-semibold text-gray-700">Brand</label>
            <input
              id="brand"
              name="brand"
              value={formState.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

       
          <div className="flex flex-col gap-2">
            <label htmlFor="model" className="font-semibold text-gray-700">Model</label>
            <input
              id="model"
              name="model"
              value={formState.model}
              onChange={handleChange}
              placeholder="Model"
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

        
          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="specification" className="font-semibold text-gray-700">Specification</label>
            <textarea
              id="specification"
              name="specification"
              value={formState.specification}
              onChange={handleChange}
              placeholder="Specification"
              rows={4}
              className="px-5 py-3 rounded-2xl bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none resize-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

          
          <div className="flex flex-col gap-2">
            <label htmlFor="purchaseDate" className="font-semibold text-gray-700">Purchase Date</label>
            <input
              id="purchaseDate"
              type="date"
              name="purchaseDate"
              value={formState.purchaseDate}
              onChange={handleChange}
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="warrantyExpiry" className="font-semibold text-gray-700">Warranty Expiry</label>
            <input
              id="warrantyExpiry"
              type="date"
              name="warrantyExpiry"
              value={formState.warrantyExpiry}
              onChange={handleChange}
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            />
          </div>

     
          <div className="flex flex-col gap-2">
            <label htmlFor="resourceTypeName" className="font-semibold text-gray-700">Resource Type Name</label>
            <select
              id="resourceTypeName"
              name="resourceTypeName"
              value={formState.resourceTypeName}
              onChange={handleChange}
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            >
              <option value="">Select Resource Type</option>
              {Array.isArray(types) && types.length > 0 ? (
                types.map((type: any) => (
                  <option key={type.resourceTypeId} value={type.resourceTypeName}>
                    {type.resourceTypeName}
                  </option>
                ))
              ) : (
                <option disabled>Loading types...</option>
              )}
            </select>
          </div>

      
          <div className="flex flex-col gap-2">
            <label htmlFor="resourceClassName" className="font-semibold text-gray-700">Resource Class Name</label>
            <select
              id="resourceClassName"
              name="resourceClassName"
              value={formState.resourceClassName}
              onChange={handleChange}
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            >
              <option value="">Select Resource Class</option>
              {Array.isArray(classes) && classes.length > 0 ? (
                classes.map((cls: any) => (
                  <option key={cls.resourceClassId} value={cls.resourceClassName}>
                    {cls.resourceClassName}
                  </option>
                ))
              ) : (
                <option disabled>Loading classes...</option>
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="resourceStatusName" className="font-semibold text-gray-700">Resource Status Name</label>
            <select
              id="resourceStatusName"
              name="resourceStatusName"
              value={formState.resourceStatusName}
              onChange={handleChange}
              className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
            >
              <option value="">Select Resource Status</option>
              {Array.isArray(statuses) && statuses.length > 0 ? (
                statuses.map((status: any) => (
                  <option key={status.resourceStatusId} value={status.resourceStatusName}>
                    {status.resourceStatusName}
                  </option>
                ))
              ) : (
                <option disabled>Loading statuses...</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="mt-8 md:col-span-2 w-full bg-[#052535] text-white text-lg font-bold py-3 rounded-full hover:bg-[#03415a] transition-colors"
          >
            Create Resource
          </button>
        </form>
      </div>
    </>
  );
};

export default ResourceForm;



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';
// const ResourceForm = () => {
//   const [formState, setFormState] = useState({
//     brand: '',
//     model: '',
//     specification: '',
//     purchaseDate: '',
//     warrantyExpiry: '',
//     resourceTypeName: '',
//     resourceClassName: '',
//     resourceStatusName: '',
   
//   });
//   const navigate = useNavigate();
//   const accessToken = localStorage.getItem('accessToken');
//   const [statuses, setStatuses] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };
//   useEffect(() => {
//       const fetchClass = async () => {
//         try {
//           const res = await axios.get("http://localhost:8080/master/resource-class", {
//             headers: { Authorization: `Bearer ${accessToken}` },

//           });
//             console.log("Fetched classs:", res.data);
          
//              setClasses(res.data);
        
//         } catch (err) {
//           console.error("Error fetching classs:", err);
//         }
//       };
  
//       fetchClass();
//     }, [accessToken]);



//       useEffect(() => {
//         const fetchType = async () => {
//           try {
//             const res = await axios.get("http://localhost:8080/master/resource-type", {
//               headers: { Authorization: `Bearer ${accessToken}` },
//             });
//             console.log("Fetched types:", res.data);
//           } catch (err) {
//             console.error("Error fetching types:", err);
//           }
//         };
    
//         fetchType();
//       }, [accessToken]);
//      useEffect(() => {
//         const fetchStatuses = async () => {
//           try {
//             const res = await axios.get("http://localhost:8080/master/resource-status", {
//               headers: { Authorization: `Bearer ${accessToken}` },
//             });
//             console.log("Fetched statuses:", res.data);
//           } catch (err) {
//             console.error("Error fetching statuses:", err);
//           }
//         };
    
//         fetchStatuses();
//       }, [accessToken]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {

//       console.log('Submitting data:', formState);

//       await axios.post('http://localhost:8080/resources', [formState], {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`
//         },
//         withCredentials: true
//       });

//       console.log('Resource created successfully');
//       alert('Resource created!');
//       navigate('/resource');
     
//     } catch (err) {
//       console.error(err);
//       alert('Error creating resource');
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="w-[800px] mx-auto mt-10 mb-10 bg-white rounded-3xl p-10 shadow-lg">
//         <h2 className="text-center text-4xl font-bold text-[#052535] mb-8">
//           Create Resource
//         </h2>
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-2">
//             <label htmlFor="brand" className="font-semibold text-gray-700">
//               Brand
//             </label>
//             <input
//               id="brand"
//               name="brand"
//               value={formState.brand}
//               onChange={handleChange}
//               placeholder="Brand"
//               className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label htmlFor="model" className="font-semibold text-gray-700">
//               Model
//             </label>
//             <input
//               id="model"
//               name="model"
//               value={formState.model}
//               onChange={handleChange}
//               placeholder="Model"
//               className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//             />
//           </div>

//           <div className="flex flex-col gap-2 md:col-span-2">
//             <label htmlFor="specification" className="font-semibold text-gray-700">
//               Specification
//             </label>
//             <textarea
//               id="specification"
//               name="specification"
//               value={formState.specification}
//               onChange={handleChange}
//               placeholder="Specification"
//               rows={4}
//               className="px-5 py-3 rounded-2xl bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none resize-none focus:ring-2 focus:ring-[#052535]"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label htmlFor="purchaseDate" className="font-semibold text-gray-700">
//               Purchase Date
//             </label>
//             <input
//               id="purchaseDate"
//               type="date"
//               name="purchaseDate"
//               value={formState.purchaseDate}
//               onChange={handleChange}
//               className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label htmlFor="warrantyExpiry" className="font-semibold text-gray-700">
//               Warranty Expiry
//             </label>
//             <input
//               id="warrantyExpiry"
//               type="date"
//               name="warrantyExpiry"
//               value={formState.warrantyExpiry}
//               onChange={handleChange}
//               className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label htmlFor="resourceTypeName" className="font-semibold text-gray-700">
//               Resource Type Name
//             </label>
//             <input
//               id="resourceTypeName"
//               type="text"
//               name="resourceTypeName"
//               value={formState.resourceTypeName}
//               onChange={handleChange}
//               placeholder="Resource Type Name"
//               className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label htmlFor="resourceClassName" className="font-semibold text-gray-700">
//               Resource Class Name
//             </label>
//             <input
//               id="resourceClassName"
//               type="text"
//               name="resourceClassName"
//               value={formState.resourceClassName}
//               onChange={handleChange}
//               placeholder="Resource Class Name"
//               className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//             />

            
//           </div>

//           <div className="flex flex-col gap-2">
//             <label htmlFor="resourceStatusName" className="font-semibold text-gray-700">
//               Resource Status Name
//             </label>
//             <input
//               id="resourceStatusName"
//               type="text"
//               name="resourceStatusName"
//               value={formState.resourceStatusName}
//               onChange={handleChange}
//               placeholder="Resource Status Name"
//               className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//             />
//           </div>

          

//           <button
//             type="submit"
//             className="mt-8 md:col-span-2 w-full bg-[#052535] text-white text-lg font-bold py-3 rounded-full hover:bg-[#03415a] transition-colors"
//           >
//             Create Resource
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ResourceForm;



