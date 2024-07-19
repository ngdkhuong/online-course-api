import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath: string) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'images',
        });
        return result;
    } catch (error: any) {
        throw new Error(`Cloudinary upload error: ${error.message}`);
    }
};

export const uploadVideo = async (filePath: string) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: 'videos',
        });
        return result;
    } catch (error: any) {
        throw new Error(`Cloudinary upload error: ${error.message}`);
    }
};
