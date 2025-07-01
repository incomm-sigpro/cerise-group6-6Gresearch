import fs from "fs";
import path from "path";
import { uploadConfig } from "../config/upload";
import ValidationException from "../exceptions/ValidationException";
import { HttpExceptionEnum } from "../exceptions";

export class DiskStorage {
  async saveFile(file: any) {
    const originalPath = path.resolve(uploadConfig.TMP_FOLDER, file);
    const newPath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);
    await fs.promises.rename(originalPath, newPath);

    return file;
  }

  async deleteFile(file: any) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Arquivo não encontrado.`,
        },
        404,
      );
    }

    await fs.promises.unlink(filePath);
  }
}
