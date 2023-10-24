import { S3 } from "aws-sdk"
import { PutObjectRequest } from "aws-sdk/clients/s3";
import toast from "react-hot-toast";

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_APP_AWS_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_APP_AWS_REGION
})

const uploadImageToS3 = async (file: File) => {

  const fileName = `${Date.now()}-${file.name}`;

  const params: PutObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME ? process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME : '',
    Key: fileName,
    ContentType: file.type,
    Body: file,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    toast.error("画像のアップロードに失敗しました")
    return null;
  }
};

export default uploadImageToS3