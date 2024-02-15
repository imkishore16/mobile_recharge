import { Panel } from "rsuite";

const PlanComponent = (plan) => (
  <Panel
    shaded
    bodyFill
    // bordered
    style={{ display: "inline-block", width: 240 }}
    // className="bordered-[100px] "
  >
    <img src="https://via.placeholder.com/240x240" height="240" />

    <Panel header={plan.planPrice} className="text-center bordered-[310px]">
      <p className="text-center">
        <small className="text-center">Plan-name: {plan.planName}</small>
      </p>
      <p className="text-center">
        <small>Validity: {plan.planValidity}</small>
      </p>
      <p className="text-center">
        <small>Plan-Details: {plan.planDetails}</small>
      </p>
      <p className="text-center">{plan.planType}</p>
    </Panel>
    <button
      className="w-[100%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {}}
    >
      Try Now !
    </button>
  </Panel>
);
export default PlanComponent;
