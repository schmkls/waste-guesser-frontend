import { useState } from "react";


const UploadAndDisplayImage = (props) => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
    	<h3>Ladda upp bild på produktens streckkod</h3>
		<input
			type="file"
			name="myImage"
			onChange={(event) => {
				console.log(event.target.files[0]);
				setSelectedImage(event.target.files[0]);
				props.onUpload(event.target.files[0])
			}}
		/>
      	<br />
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