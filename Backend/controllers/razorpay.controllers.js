import razorpayInstance from "../configs/razorpay.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

export const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount < 60 || amount > 10000) {
            return res.status(400).json({ success: false, message: 'Invalid amount.' })
        }

        const options = {
            amount: amount * 100, //amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong while creating order.' })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const isValid = validatePaymentVerification(
            {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id
            },
            razorpay_signature,
            process.env.RAZORPAY_KEY_SECRET
        )

        if(!isValid) return res.status(400).json({success: false, message: 'Invalid signature.'})

        res.json({success: true, message: 'Payment verified.'})

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Internal server error.'})
    }
}