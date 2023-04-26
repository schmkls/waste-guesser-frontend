import { useState } from 'react';
import { useZxing } from "react-zxing";
import './Scanner.css';

const Scanner = (props) => {

	const { ref } = useZxing({
		onResult(result) {
			props.onBarcode(result.getText());
		}
	});

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