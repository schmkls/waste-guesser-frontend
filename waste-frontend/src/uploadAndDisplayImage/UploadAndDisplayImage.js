import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './UploadAndDisplayImage.css';

const UploadAndDisplayImage = (props) => {

	const [selectedImage, setSelectedImage] = useState(null);
	const [takingPhoto, setTakingPhoto] = useState(false);


	const handleImageUpload = (dataUri) => {
		// Convert Data URI to Blob
		const byteString = atob(dataUri.split(',')[1]);
		const mimeType = dataUri.split(',')[0].split(':')[1].split(';')[0];
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const uint8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
		  uint8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([arrayBuffer], { type: mimeType });
	  
		// Create File object from Blob with desired file name
		const fileName = 'image.jpg'; // Replace with the desired file name
		const file = new File([blob], fileName, { lastModified: new Date().getTime(), type: mimeType });
	  
		// Set the File object as the image state
		props.onUpload(file);
	};

	if (takingPhoto) {
		return (
			<div>
				<Camera
					onTakePhoto={(dataUri) => {
						handleImageUpload(dataUri);
						setTakingPhoto(false);
					}}
				/>
			</div>
		);
	}

	if (!selectedImage) {
		return (
			<div>
				<h3 className='uploadInstructions'>
					Ladda upp bild på produktens streckkod
				</h3>
				<div className='bottomStuff'>
					<div className='imageUpload'>
						<img
							className='instructionImage'
							src="image_upload_instruction.png"
							alt=""
						>
						</img>
					</div>
					<div className='buttonsBar'>
						<label htmlFor='file-input'>
							<FontAwesomeIcon icon={faUpload} size='4x' />
						</label>
						<input
							id='file-input'
							type='file'
							name='myImage'
							onChange={(event) => {
								console.log(event.target.files[0]);
								setSelectedImage(event.target.files[0]);
								props.onUpload(event.target.files[0])
							}}
						/>
						<FontAwesomeIcon
							className='camera'
							icon={faCamera}
							size='4x'
							onClick={() => setTakingPhoto(true)}
						/>
					</div>
				</div>
			</div>

		)
	}
	return (
		<div className='uploaded'>
			{selectedImage && (
				<img
					alt='not found'
					className='image'
					src={URL.createObjectURL(selectedImage)}
				/>
			)}
			<button onClick={() => setSelectedImage(null)}>Remove</button>
		</div>
	);
};

export default UploadAndDisplayImage;