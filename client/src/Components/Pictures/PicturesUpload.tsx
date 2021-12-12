import { useState } from 'react';

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	UploadTaskSnapshot
} from 'firebase/storage';

type PicturesUploadProps = {
	givenURL: string;
	sendUrl: (url: string) => void;
};

export default function PicturesUpload ({
	givenURL,
	sendUrl
}: PicturesUploadProps): JSX.Element {
	const [ progress, setProgress ] = useState(0);
	const [ url, setUrl ] = useState(givenURL);
	const [ image, setImage ] = useState<File>();
	const storage = getStorage();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(event.target.files[0]);
		}
	};

	const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (image) {
			const storageRef = ref(storage, `images/${new Date()}`);
			const uploadTask = uploadBytesResumable(storageRef, image);

			uploadTask.on(
				'state_changed',
				(snapshot: UploadTaskSnapshot) => {
					const progress = Math.round(
						snapshot.bytesTransferred / snapshot.totalBytes * 100
					);
					setProgress(progress);
				},
				(error: Error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
						setUrl(url);
						sendUrl(url);
					});
				}
			);
		}
	};

	return (
    <div className='flex-container'>
			<img
				style={{ width: 200, borderRadius: 5 }}
				className='journal-picture'
				src={url || 'http://via.placeholder.com/200x200'}
				alt='firebase-pic'
			/>
      <progress value={progress} max='100' />
			<div className='button-group'>
			<label htmlFor="file-upload" className="custom-file-upload">
      <input id="file-upload" type='file' onChange={handleChange} />
      Choose Pic</label>
        <button className='button' onClick={handleUpload}>
					Upload
				</button>
			</div>
		</div>
	);
}
