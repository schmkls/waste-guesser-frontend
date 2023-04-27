import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import Scanner from './scanner/Scanner';
import './GetBarcode.css';


const GetBarcode = (props) => {
    const [selectedImage, setSelectedImage] = useState();
    const [isCapturing, setIsCapturing] = useState(false);

    if (isCapturing) {
        return (
            <>
                <Scanner
                    onBarcode={(barcode) => {
                        props.onBarcode(barcode);
                        setIsCapturing(false);
                    }}
                />
                <button 
					onClick={() => {
						setIsCapturing(false)
						props.onBarcode();
					}}>
                    Avbryt
                </button>
            </>
        );
    }

    if (!isCapturing && selectedImage) {
		return (
			<div className='uploaded'>
				{selectedImage && (
					<img
						alt='not found'
						className='image'
						src={URL.createObjectURL(selectedImage)}
					/>
				)}
				<button 
					onClick={() => {
						setSelectedImage()
						props.onUpload();
					}}>
					Avbryt
				</button>
			</div>
		);
	}

	return (
		<div>
			<h3 className='uploadInstructions'>
				Skanna produktens streckkod
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
						onClick={() => setIsCapturing(true)}
					/>
				</div>
			</div>
		</div>

	)

}

export default GetBarcode;