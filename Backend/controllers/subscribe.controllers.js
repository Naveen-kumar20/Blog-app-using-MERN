import Subscriber from "../models/subscriber.model.js";

export const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: 'Email is required.' })

        //Checking if user already subscribed.
        const exists = await Subscriber.findOne({ email })
        if (exists) return res.status(409).json({ success: false, message: 'User already subscribed.' })

        await Subscriber.create({ email })
        res.status(201).json({ success: true, message: 'Subscribed successfully.' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong while subscribing.' })
    }
}

