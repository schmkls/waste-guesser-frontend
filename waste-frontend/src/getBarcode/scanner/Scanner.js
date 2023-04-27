import { useState } from "react";
import { useZxing } from "react-zxing";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import './Scanner.css';

const hints = new Map();
hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13]);

const Scanner = (props) => {


	const [scanned, setScanned] = useState();

	const { ref } = useZxing({
		onResult(result) {
			console.log('result: ', result.getText());
			props.onBarcode(result.getText());
			setScanned(result.getText());
		}, 
		hints: hints, 
		locate: true,
		timeBetweenDecodingAttempts: 200
	});

	if (scanned) {
		return (
			<h2>{scanned}</h2>
		)
	}

	return (
		<>
			<video
				className='video'
				ref={ref}
			/>
		</>
	);	
};

export default Scanner;