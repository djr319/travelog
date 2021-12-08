import { useState } from 'react';

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	UploadTaskSnapshot
} from 'firebase/storage';

type PicturesUploadProps = {
	sendUrl: (url: string) => void;
};

export default function PicturesUpload ({
	sendUrl
}: PicturesUploadProps): JSX.Element {
	const [ progress, setProgress ] = useState(0);

	const [ image, setImage ] = useState<File>();
	const [ url, setUrl ] = useState('');

	const storage = getStorage();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setImage(event.target.files[0]);
		}
	};

	const handleUpload = () => {
		if (image) {
			const storageRef = ref(storage, `images/${image}`);

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
		<div>
			<div>
				<progress value={progress} max='100' />
			</div>
			<input type='file' onChange={handleChange} />
			<div>
				<img
					style={{ height: 300, width: 400 }}
					className='journal-picture'
					src={url || 'http://via.placeholder.com/200x200'}
					alt='firebase-pic'
				/>
			</div>
			<div className='pictures-button' onClick={handleUpload}>
				Upload Picture
			</div>
		</div>
	);
}
