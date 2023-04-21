import { useState } from "react";
import "./UploadAndDisplayImage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const UploadAndDisplayImage = (props) => {

  const [selectedImage, setSelectedImage] = useState(null);

  if (!selectedImage) {
	return (
		<div>
			<h3>Ladda upp bild på produktens streckkod</h3>
			<div className="imageUpload">
				<label for="file-input">
					<FontAwesomeIcon icon={faUpload} size="4x"/>
				</label>
				<input
					id="file-input"
					type="file"
					name="myImage"
					onChange={(event) => {
						console.log(event.target.files[0]);
						setSelectedImage(event.target.files[0]);
						props.onUpload(event.target.files[0])
					}}
				/>
			</div>
			<br />
		</div>
	
	)
  }
  return (
    <div className="imageUpload">
		{selectedImage && (
			<div>
				<button onClick={() => setSelectedImage(null)}>Remove</button>
				<img
					alt="not found"
					width={"250px"}
					src={URL.createObjectURL(selectedImage)}
				/>
				<br />
			</div>
		)}
    </div>
  );
};

export default UploadAndDisplayImage;