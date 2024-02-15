import { useNavigate } from "react-router-dom";

const PaymentComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[800px] h-auto rounded-[20px] shadow-lg items-center my-6 bg-gray-100">
      <div className="flex flex-row items-center jutify-between w-[100%]  ">
        <div className="w-2/3 flex  flex-col mx-4 h-auto rounded-[10px]">
          <p className="text-xl font-medium mb-2">Order Summary</p>
          <div className="flex flex-row rounded-lg bg-white sm:flex-row">
            <div className="flex w-full flex-col px-4 py-4 mx-4 shadow-lg rounded-lg my-2">
              <span className="font-semibold">Yearly Plan 2</span>
              <p className="text-lg font-bold">$100</p>
            </div>
            <div className="flex w-full flex-col px-4 py-4 mx-4 shadow-lg rounded-lg my-2">
              <span className="font-semibold">Yearly Plan 2</span>
              <p className="text-lg font-bold">$100</p>
            </div>
          </div>
          <button
            class="h-[40px] w-[90px] rounded-[5px] font-bold ml-auto text-white bg-black my-2"
            onClick={() => {
              navigate("/pay");
            }}
          >
            Pay
          </button>
        </div>
        <div class="shadow-lg m-3 w-1/3 flex bg-black mx-4 h-auto rounded-[10px] float-right items-right justify-end justify-between">
          <table className=" shadow-lg w-full  m-3">
            <thead>
              <tr>
                <th className="text-left font-bold text-white">Description</th>
                <th className="text-right font-bold text-white">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left text-white">Plan 1</td>
                <td className="text-right text-white">$100.00</td>
              </tr>
              <tr>
                <td className="text-left text-white">Add-on 5</td>
                <td className="text-right text-white">$50.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="text-left font-bold text-white">Total</td>
                <td className="text-right font-bold text-white">$150.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default PaymentComponent;
