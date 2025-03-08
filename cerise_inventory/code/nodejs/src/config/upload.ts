import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, 'uploads');

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename: (request: any, file: any, callback: any) => {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        },
    }),
};

export const uploadConfig = {
    TMP_FOLDER,
    UPLOAD_FOLDER,
    MULTER
};