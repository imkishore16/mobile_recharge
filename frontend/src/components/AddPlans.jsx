import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddPlans() {
  const api_url = "http://localhost:8080";
  const navigate = useNavigate();
  const [planId, setPlanId] = useState();
  const [planType, setPlanType] = useState("");
  const [planName, setPlanName] = useState("");
  const [planValidity, setPlanValidity] = useState("");
  const [planDetails, setPlanDetails] = useState("");
  const [planPrice, setPlanPrice] = useState();

  const handleSubmit = async () => {
    try {
      const body = {
        planId: planId,
        planType: planType,
        planName: planName,
        planValidity: planValidity,
        planDetails: planDetails,
        planPrice: planPrice,
      };
      console.log(body);
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/plan",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/plans");
    } catch (error) {
      console.error("cant post plan:", error);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
          type="text"
          placeholder="paln Id"
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
          type="text"
          placeholder="plan type"
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
          type="text"
          placeholder="planName"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
          type="text"
          placeholder="planValidity"
          value={planValidity}
          onChange={(e) => setPlanValidity(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
          type="text"
          placeholder="planDetails"
          value={planDetails}
          onChange={(e) => setPlanDetails(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded my-4"
          type="text"
          placeholder="planPrice"
          value={planPrice}
          onChange={(e) => setPlanPrice(e.target.value)}
        />

        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
}

export default AddPlans;
