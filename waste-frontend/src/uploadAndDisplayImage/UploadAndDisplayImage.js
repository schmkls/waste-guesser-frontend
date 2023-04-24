import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './UploadAndDisplayImage.css';

const UploadAndDisplayImage = (props) => {

  const [selectedImage, setSelectedImage] = useState(null);

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
                        alt="Instruction image"
                    >
                    </img>
                </div>
                <div className='buttonsBar'>
                    <label htmlFor='file-input'>
                            <FontAwesomeIcon icon={faUpload} size='4x'/>
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
                            onClick={() => console.log('camera click')}
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