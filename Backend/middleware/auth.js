import jwt from 'jsonwebtoken'

const auth = async(req, res, next)=>{
    try {
        const token = req.header('Authorization');

        if(!token) return res.json({success:false, message: 'Token is required'})

        jwt.verify(token, process.env.JWT_SECRET)
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'Invalid token, login again.'
        })
        
    }
}

export default auth;