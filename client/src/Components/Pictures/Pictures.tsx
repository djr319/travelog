import { useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const PicturesUpload = ({ setPicture }: any) => {
  const [progress, setProgress] = useState(0);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const storage = getStorage();

  const handleChange = (event: any) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const storageRef = ref(storage, `images/${image}`);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error: any) => {
          console.log(error);
        },
        () => {
          // .ref("images")
          // .child(image)
          getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
            setUrl(url);
            setPicture(url);
          });
        }
      );
    }
  };
  return (
    <div>
      <div>
        <progress value={progress} max="100" />
      </div>
      <input type="file" onChange={handleChange} />

      <div>
        <img
          className="journal-picture"
          src={url || "http://via.placeholder.com/200x200"}
          alt="firebase-pic"
        />
      </div>
      <div className="pictures-button" onClick={handleUpload}>
        Upload Picture
      </div>
    </div>
  );
};

export default PicturesUpload;
