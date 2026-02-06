import {PutObjectCommand} from '@aws-sdk/client-s3'
import s3 from '../configs/s3.js'
import {v4 as uuidv4} from 'uuid'

const uploadToS3 = async(imageFile)=>{
    const fileKey = `HeartNoteBlogApp/${uuidv4()}-${imageFile.originalname}`

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: imageFile.buffer,
        ContentType: imageFile.mimetype
    })

    await s3.send(command);

    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileKey}`
    console.log("image Uploaded to s3✅");
    
    return imageUrl;
}

export default uploadToS3;