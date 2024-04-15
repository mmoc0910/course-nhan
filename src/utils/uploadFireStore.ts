import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export const uploadFireStore = async (file: File) => {
  try {
    const imageRef = ref(storage, `uploads/${file.name + uuidv4()}`);
    const snapshot = await uploadBytes(imageRef, file);
    const url = getDownloadURL(snapshot.ref);
    console.log("url - ", url);
    return url;
  } catch (error) {
    console.log(error);
    return;
  }
};
