// Chakra imports
// Assets
import { useDropzone } from 'react-dropzone';

function Dropzone(props) {
  // const [ files, setFiles ] = useState([]);
	const { content, onInput, ...rest } = props;
	const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      onInput(acceptedFiles)
      // setFiles(acceptedFiles)
      // console.log(acceptedFiles)
    }
    // onDrop: acceptedFiles => {
    //   setFiles(acceptedFiles.map(file => Object.assign(file, {
    //     preview: URL.createObjectURL(file)
    //   })))
    // }
  });
  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, []);

	return (
		<div
			align='center'
			justify='center'
			bg={bg}
			border='1px dashed'
			borderColor={borderColor}
			borderRadius='16px'
			w='100%'
			h='max-content'
			minH='100%'
			cursor='pointer'
			{...getRootProps({ className: 'dropzone' })}
			{...rest}>
			<input {...getInputProps()} />
      <button variant='no-effects'>{content}</button>
		</div>
	);
}

export default Dropzone;
