import axios from 'axios';

export const convertImageToBase64 = async (imageUrl:any) => {
  const response = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
  });
  const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/png;base64,${base64Image}`;
};

export const convertBase64ToImage = async (base64ImageString:any) => {
  // convert base64 to image
  const base64Image = base64ImageString.split(';base64,').pop();
  const image = Buffer.from(base64Image, 'base64');
  return image;
}