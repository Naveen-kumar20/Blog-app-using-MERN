import multer from 'multer'

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    limit: {
        fileSize: 6 * 1024 *1024 //6MB fileSize
    }
})

export default upload;