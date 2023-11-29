import { useDropzone } from 'react-dropzone';
import { MdArrowDownward } from "react-icons/md";


function Dropzone(props) {
  // const [ files, setFiles ] = useState([]);
	const { content, file, onInput, onDelete, onSubmit, ...rest } = props;
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        onInput(acceptedFiles)
      }
    }
  });

  function onOpenFile() {
    const fileObj = file[0]
    const url = URL.createObjectURL(fileObj)
    window.open(url, '_blank')
    URL.revokeObjectURL(url)
  }

	return (
		<div className='h-full w-full flex flex-col items-center pb-4 gap-5'>
      <div {...getRootProps({ className: 'dropzone' })} {...rest}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <div className='flex flex-col items-center'>
            <MdArrowDownward className="text-[80px] text-brand-500 dark:text-white" />
            <h4 className='text-xl font-bold text-brand-500 dark:text-white text-center'>
              Jatuhkan file disini...
            </h4>
          </div> :
          <button>{content}</button>
        }
      </div>
      {
        file && file.length > 0 ?
        <div className='flex flex-col gap-5'>
          <button onClick={onOpenFile} className="linear flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Buka Berkas
          </button>
          <button onClick={onSubmit} className="linear flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Scan PDF
          </button>
          <button onClick={onDelete} className="linear flex items-center justify-center rounded-xl bg-red-600 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-800 active:bg-brand-700 dark:bg-red-700 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Hapus Berkas
          </button>
        </div> :
        null
      }
		</div>
	);
}

export default Dropzone;
