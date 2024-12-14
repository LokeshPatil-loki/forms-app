import {
  AdvancedImage,
  upload,
  UploadApiOptions,
} from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  UploadResponseCallback,
} from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dppjkpum5",
    apiKey: "176237724499644",
    apiSecret: "iLgkg5-WEc7g9i8EVn9Li16tdoU",
  },
  url: {
    secure: true,
  },
});

// export const uploadToCloudinary = async (
//   fileUrl: string,
//   callback: UploadResponseCallback
// ) => {
//   return upload(cld, { file: fileUrl, callback });
// };

export const uploadToCloudinary = async (
  fileUrl: string
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    upload(cld, {
      file: fileUrl,
      callback: (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    });
  });
};

export const getImageFromCloudinary = (publicId: string) => {
  return cld.image(publicId);
};
