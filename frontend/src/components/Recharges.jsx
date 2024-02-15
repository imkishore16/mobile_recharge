import PaymentComponent from "./PaymentComponent";

const Recharge=()=>
{
    return(
        <div className="flex flex-col justify-between items-center ">
            <div>
                <PaymentComponent/>
            </div>
            <div>
                <PaymentComponent/>
            </div>
            <div>
                <PaymentComponent/>
            </div>
            <div>
                <PaymentComponent/>
            </div>
        </div>
        
    )
}
export default Recharge;