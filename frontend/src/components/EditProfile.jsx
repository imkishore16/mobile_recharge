// /* eslint-disable react/no-unknown-property */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const EditProfile = () => {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("No address details");
//   const [mobile, setMobile] = useState("9445422734");

//   const getData = async (token) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/customer/get/${9}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data.data[0]);
//       setName(response.data.data[0].customerName);
//       if (response.data.data[0].address != null)
//         setAddress(response.data.data[0].address);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     getData(token);
//   }, []);

//   const putData = async () => {
//     try {
//       const body = {
//         customerName: name,
//         address: address,
//       };
//       const token = sessionStorage.getItem("token");
//       const response = await axios.put(
//         `http://localhost:8080/api/customer/updateCustomer/${9}`,
//         body,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error;
//     }
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="w-full md:w-2/5 p-8 bg-white lg:ml-4 shadow-md">
//         <div className="rounded shadow p-6">
//           <div className="pb-6">
//             <label
//               htmlFor="name"
//               className="font-semibold text-gray-700 block pb-1"
//             >
//               Name
//             </label>
//             <div className="flex">
//               <input
//                 id="username"
//                 className="border-1 rounded-r px-4 py-2 w-full"
//                 type="text"
//                 value={name}
//               />
//             </div>
//           </div>
//           <div className="pb-4">
//             <label
//               htmlFor="about"
//               className="font-semibold text-gray-700 block pb-1"
//             >
//               Address
//             </label>
//             <input
//               id="email"
//               className="border-1 rounded-r px-4 py-2 w-full"
//               type="email"
//               value={address}
//             />
//             <button
//               className="mt-5 flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
//               onClick={() => {
//                 putData();
//               }}
//             >
//               Edit profile
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default EditProfile;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("No address details");
  const navigate = useNavigate();

  const getData = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/customer/get/${9}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { customerName, address: customerAddress } = response.data.data[0];
      setName(customerName);
      if (customerAddress) setAddress(customerAddress);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getData(token);
  }, []);

  const putData = async () => {
    try {
      const body = {
        customerName: name,
        address: address,
      };
      const token = sessionStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/customer/updateCustomer/${9}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-2/5 p-8 bg-white lg:ml-4 shadow-md">
        <div className="rounded shadow p-6">
          <div className="pb-6">
            <label
              htmlFor="name"
              className="font-semibold text-gray-700 block pb-1"
            >
              Name
            </label>
            <div className="flex">
              <input
                id="username"
                className="border-1 rounded-r px-4 py-2 w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="pb-4">
            <label
              htmlFor="about"
              className="font-semibold text-gray-700 block pb-1"
            >
              Address
            </label>
            <input
              id="email"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="email"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="mt-5 flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
              onClick={() => {
                putData();
                navigate("/profile");
              }}
            >
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
