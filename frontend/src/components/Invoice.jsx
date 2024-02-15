import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Invoice = ({ onClose }) => {
  const navigate = useNavigate();
  const plan = JSON.parse(sessionStorage.getItem("invoice_plan"));
  const [planName, setPlanName] = useState();
  const [offer, setOffer] = useState();
  const [total, setTotal] = useState();
  const [planPrice, setPlanPrice] = useState();

  useEffect(() => {
    setPlanName(plan.planName);
    setOffer((plan.planPrice * 20) / 100);
    setTotal(plan.planPrice - (plan.planPrice * 20) / 100);
    setPlanPrice(plan.planPrice);
  }, []);
  const body = {
    planName: planName,
    offer: offer,
    total: total,
    planPrice: planPrice,
  };

  return (
    <>
      <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
          DO-CO-MO Services
        </h1>
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">Invoice</h1>
          <div className="text-gray-700">
            <div>Date: 01/05/2023</div>
            <div>Invoice #: INV12345</div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Bill To:</h2>
          <div className="text-gray-700 mb-2">John Doe</div>
          <div className="text-gray-700 mb-2">9445422734</div>
          <div className="text-gray-700">johndoe@example.com</div>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left text-gray-700">{plan.planName}</td>
              <td className="text-right text-gray-700">₹{plan.planPrice}</td>
            </tr>
            <tr>
              <td className="text-left text-gray-700">Offer 20%</td>
              <td className="text-right text-gray-700">
                - ₹{(plan.planPrice * 20) / 100}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                ₹{plan.planPrice - (plan.planPrice * 20) / 100}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="text-gray-700 mb-2">Thank you for your business!</div>

        <button
          className="bg-black text-white w-full h-[50px] rounded-[10px]"
          onClick={() => {
            sessionStorage.setItem("payment_details", JSON.stringify(body));
            navigate("/pay");
          }}
        >
          Make Payment
        </button>
        <button
          className="bg-black text-white w-full h-[50px] rounded-[10px] mt-4"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
export default Invoice;
