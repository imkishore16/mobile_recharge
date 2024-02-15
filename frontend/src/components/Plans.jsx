import { useState } from "react";
// import PlanComponent from "./PlanComponent";
import Invoice from "./Invoice";
import axios from "axios";
import { useEffect } from "react";

const Plans = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [plans, setPlans] = useState([]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const getData = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/getplans",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setPlans(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getData(token);
  }, []);

  const Popup = ({ onClose }) => {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <Invoice onClose={onClose} /> {/* Pass plan to Invoice */}
      </div>
    );
  };

  console.log(plans);

  return (
    <div className="bg-cover bg-center h-screen bg-white">
      <div className=" bg-opacity-90 bg-cover">
        {/* <div className="bg-[url('src/assets/networks.jpg')] bg-opacity-90 bg-cover" > */}
        {isPopupOpen && <Popup onClose={closePopup} />}
        <section className="flex items-center justify-center">
          <ul className="flex flex-wrap justify-around w-[1000px] ">
            {plans.map((plan) => (
              <li
                key={plan.planId} // Use planId as the key
                className="w-1/4 flex justify-center rounded-[20px] mx-4 my-16"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[10 0%]">
                  <div className="bg-blue-500 text-white font-bold py-2 px-4 uppercase tracking-wide text-sm rounded-t-lg">
                    {plan.planName}
                  </div>
                  <div className="text-4xl font-bold text-black py-8 px-4 text-center">
                    ₹{plan.planPrice}
                  </div>
                  <div className="flex justify-center items-center space-x-4 py-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20h4a2 2 0 002-2V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="text-gray-500 text-sm font-medium">
                      +2 more
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 border-t border-gray-200">
                    <div className="text-gray-500 text-sm font-medium">
                      VALIDITY
                      <br />
                      <span className="text-black font-bold">
                        {plan.planValidity}
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm font-medium">
                      DATA
                      <br />
                      <span className="text-black font-bold">
                        {plan.planDetails}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-4 px-4">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                      Recharge
                    </button>
                    <button
                      className="text-blue-500 font-bold py-2 px-4 rounded"
                      onClick={() => {
                        sessionStorage.setItem(
                          "invoice_plan",
                          JSON.stringify(plan)
                        );
                        openPopup();
                      }}
                    >
                      View details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Plans;
