import multer from 'multer';
import path from 'path';
import fs from 'fs';

import ApiError from '../exceptions/ApiError';
import { API_URL, UPLOAD_PATH } from '../constants';

export const deleteCandidates = new Map<string, number>();

const storage = multer.diskStorage({
    destination: function (_req, _file, callback) {
      if (!_req.user) throw ApiError.UnauthorizedError();

      const path = `./uploads/images/${_req.user.id}/${(new Date()).getDate()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}/`;

      fs.mkdirSync(path, { recursive: true });

      callback(null, path);
    },
    filename: function (_req, file, callback) {
      if (!_req.user) throw ApiError.UnauthorizedError();

      const fileName = `image-${Date.now()}${path.extname(file.originalname)}`;
      
      callback(null, fileName);

      const dir = `/images/${_req.user.id}/${(new Date()).getDate()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}/`;

      let url = `${API_URL}${dir}${fileName}`;

      deleteCandidates.set(url, (new Date()).getDate());
    }
});

export const upload = multer({ storage });

export const deleteFile = (file: string) => {

  const filePath = `${UPLOAD_PATH}${file.replace(API_URL, '')}`;

  fs.unlink(filePath, () => {
    console.log('file deleted');
  });
}
export function deleteTrashImages() {
  setInterval(() => {
    const date = new Date();
    deleteCandidates.forEach((value, key) => {
      if (date.getDate() - value >= 2) deleteFile(key);
    })
  }, 1000 * 60 * 60 * 24);
}