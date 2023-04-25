import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faCamera } from '@fortawesome/free-solid-svg-icons';
import './UploadAndDisplayImage.css';
import { useZxing } from "react-zxing";

const UploadAndDisplayImage = (props) => {

	const [result, setResult] = useState("");
	const { ref } = useZxing({
		onResult(result) {
			console.log('result', result);
			setResult(result.getText());
		},
	});

	return (
		<>
			<video ref={ref} />
			<p>
				<span>Last result:</span>
				<span>{result}</span>
			</p>
		</>
	);
};

export default UploadAndDisplayImage;