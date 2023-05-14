import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIROMENT VARIABLES
const { CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY } = process.env;

// CONFIGURE CLOUDINARY
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file, destinationFolder, publicId) => {
    const options = {
        folder: `bookstore/${destinationFolder}`,
        public_id: publicId,
        use_filename: true,
        unique_filename: false,
    };
    const result = await cloudinary.uploader.upload(file, options);
    console.log(result.url);
    return result.url;
};

export default uploadToCloudinary;