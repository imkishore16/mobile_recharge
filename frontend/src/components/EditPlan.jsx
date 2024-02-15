/* eslint-disable no-unused-vars */
import { useState } from "react";
// import PlanComponent from "./PlanComponent";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const EditPlan = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState();

  const navigate = useNavigate();
  function showAlert() {
    const result = window.confirm(
      "Are you sure you want to delete your profile"
    );
    if (result) {
      // call delete user api
    } else {
      console.log("Cancelled.");
    }
  }
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
  const deletePlan = async () => {
    const token = sessionStorage.getItem("token");
    console.log(planId);
    const response = await axios.delete(
      `http://localhost:8080/api/plan/${planId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const Popup = ({ onClose }) => {
    const [planType, setPlanType] = useState("");
    const [planName, setPlanName] = useState("");
    const [planValidity, setPlanValidity] = useState("");
    const [planDetails, setPlanDetails] = useState("");
    const [planPrice, setPlanPrice] = useState();
    const edit = JSON.parse(sessionStorage.getItem("edit_plan"));
    useEffect(() => {
      setPlanId(edit.planId);
      setPlanDetails(edit.planDetails);
      setPlanName(edit.planName);
      setPlanPrice(edit.planPrice);
      setPlanType(edit.planType);
      setPlanValidity(edit.planValidity);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault;
      try {
        const updated_body = {
          planId: planId,
          planType: planType,
          planName: planName,
          planValidity: planValidity,
          planDetails: planDetails,
          planPrice: planPrice,
        };
        console.log("updated_body");
        console.log(updated_body);
        const token = sessionStorage.getItem("token");
        const response = await axios.put(
          `http://localhost:8080/api/plan/${planId}`,
          updated_body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error("cant edit plan:", error);
      }
    };

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
        <div className="md:w-1/3 max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <label htmlFor="plantype" className="block mb-2">
              Plan type:
            </label>
            <input
              id="plantype"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
              type="text"
              placeholder="Plan type"
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
            />
            <label htmlFor="planname" className="block mb-2">
              Plan name:
            </label>
            <input
              id="planname"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-4"
              type="text"
              placeholder="Plan name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
            <label htmlFor="planvalidity">Plan validity:</label>
            <input
              id="planvalidity"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
              type="text"
              placeholder="plan validity"
              value={planValidity}
              onChange={(e) => setPlanValidity(e.target.value)}
            />
            <label htmlFor="plandetails">Plan details:</label>
            <input
              id="plandetails"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
              type="text"
              placeholder="plan details"
              value={planDetails}
              onChange={(e) => setPlanDetails(e.target.value)}
            />
            <label htmlFor="planprice">Plan price:</label>
            <input
              id="planprice"
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
              type="text"
              placeholder="plan price"
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-cover bg-center h-screen bg-white">
      <div className=" bg-opacity-90 bg-cover">
        {isPopupOpen && <Popup onClose={closePopup} />}
        <section className="flex items-center justify-center">
          <ul className="flex flex-wrap justify-around w-[1000px] ">
            {plans.map((plan) => (
              <li
                key={plan.planId}
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
                    <button
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        // setPlanId(plan.planId);
                        console.log("onclick");
                        console.log(plan.planId);
                        sessionStorage.setItem(
                          "edit_plan",
                          JSON.stringify(plan)
                        );

                        openPopup();
                      }}
                    >
                      Edit plan
                    </button>
                    <button
                      className="text-blue-500 font-bold py-2 px-4 rounded"
                      onClick={() => {
                        showAlert();
                        deletePlan();
                      }}
                    >
                      Delete plan
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

export default EditPlan;
