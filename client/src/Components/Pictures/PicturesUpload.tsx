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
			<input type='file' onChange={handleChange} />
			<div className='button-group'>
				<button className='pictures-button' onClick={handleUpload}>
					Upload Picture
				</button>
			</div>
			<progress value={progress} max='100' />
			<img
				style={{ width: 200, borderRadius: 5 }}
				className='journal-picture'
				src={url || 'http://via.placeholder.com/200x200'}
				alt='firebase-pic'
			/>
		</div>
	);
}
