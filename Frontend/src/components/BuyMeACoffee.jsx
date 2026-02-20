import { GiCoffeeCup } from "react-icons/gi";
import loadRazorpay from '../utils/loadRazorpay.js'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext.jsx'


function BuyMeACoffee() {

    const { axios } = useAppContext()
    const amount = 60;

    const handleDonate = async () => {
        const res = await loadRazorpay();
        if (!res) {
            toast.error('Failed to load razorpay SDK.');
            return;
        }

        try {
            const { data } = await axios.post('/api/payment/create-order', {amount})
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: "INR",
                name: "HeartNote",
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        const verifyRes = await axios.post('/api/payment/verify-payment', {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        })

                        toast.success('Thank you for the coffee ☕',{duration: 4000})

                    } catch (error) {
                        toast.error("Payment verification failed");
                    }
                },
                theme: {
                    color: '#1e2a45'
                },
            }

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            if (error || error.response) {
                toast.error(error.response.data.message)
            }
            toast.error("Something went wrong at checkout.")
        }

    }

    return (
        <>
            <span className="flex justify-center items-center gap-2 border py-1 px-4 rounded-full bg-(--secondary-color)/90 text-(--primary-color) cursor-pointer"><button className="cursor-pointer" onClick={handleDonate}>Buy me a coffee</button> <GiCoffeeCup /></span>
        </>
    )
}

export default BuyMeACoffee