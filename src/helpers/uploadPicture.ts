import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: "dqjs90sqs",
    api_key: "515452877685295",
    api_secret: "r2yvQMgiQ1TZMJw3x-rXWU4nzoA"
});

export const upload = async (file: any) => {
    try {
        const [typeFile] = file.mimetype.split('/');
        if (typeFile !== 'image') {
            throw new Error('El archivo no es una imagen');
        }

        const { secure_url } = await cloudinary.uploader.upload(file.tempFilePath);
        return secure_url;

    } catch (error) {
        console.log(error);
    }
}

export const deleteFile = (address: string) => {
    const addressArray = address.split('/');
    const name = addressArray[addressArray.length - 1];
    const [public_id] = name.split('.');
    cloudinary.uploader.destroy(public_id);
}