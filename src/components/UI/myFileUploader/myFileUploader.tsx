
interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  photoUrl?: string;
  setPhotoUrl: (photoUrl: string) => void;
}

export const MyFileUploader: React.FC<FileUploadProps> = ({file, setFile, photoUrl, setPhotoUrl} : FileUploadProps) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    setFile(uploadedFile as File);
  };

  const handleDeleteFile = () => {
    setFile(null);
    setPhotoUrl('');
  };

  return (
    <div className="flex flex-col w-full gap-1 px-2.5">
      <h6 className="text-[15px] font-normal leading-[18px] tracking-[0%]">Фото</h6>

      {file || photoUrl ? (
        <div className="relative flex justify-between">
          <img
            src={photoUrl ? photoUrl : file ? URL.createObjectURL(file) : ''}
            alt="Preview"
            className="w-[56px] h-[56px] object-contain rounded-md"
          />

          <div className="flex items-center gap-2.5">
            <span className="block text-sm text-gray-600 max-w-[200px] overflow-hidden overflow-ellipsis">
              {file ? file.name : 'image.png'} 
            </span>
            <div className=" text-gray-600">
              <button
                className="bg-transparent focus:outline-none"
                onClick={handleDeleteFile}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.71967 0.46967C1.01256 0.176777 1.48744 0.176777 1.78033 0.46967L7.25 5.93934L12.7197 0.469671C13.0126 0.176777 13.4874 0.176778 13.7803 0.469671C14.0732 0.762564 14.0732 1.23744 13.7803 1.53033L8.31066 7L13.7803 12.4697C14.0732 12.7626 14.0732 13.2374 13.7803 13.5303C13.4874 13.8232 13.0126 13.8232 12.7197 13.5303L7.25 8.06066L1.78033 13.5303C1.48744 13.8232 1.01256 13.8232 0.71967 13.5303C0.426777 13.2374 0.426777 12.7626 0.71967 12.4697L6.18934 7L0.71967 1.53033C0.426777 1.23744 0.426777 0.762563 0.71967 0.46967Z"
                    fill="#475569"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-[298ps] h-[64px] rounded-lg cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Загрузить фото
            </p>

            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.47812 3.93387C4.67178 3.30448 5.25329 2.875 5.91179 2.875H8C8.41421 2.875 8.75 2.53921 8.75 2.125C8.75 1.71079 8.41421 1.375 8 1.375H5.91179C4.59478 1.375 3.43177 2.23397 3.04446 3.49274L0.632663 11.3311C0.544715 11.6169 0.5 11.9143 0.5 12.2133V16.375C0.5 18.0319 1.84315 19.375 3.5 19.375H18.5C20.1569 19.375 21.5 18.0319 21.5 16.375V12.2133C21.5 11.9143 21.4553 11.6169 21.3673 11.3311L18.9555 3.49274C18.5682 2.23397 17.4052 1.375 16.0882 1.375H14C13.5858 1.375 13.25 1.71079 13.25 2.125C13.25 2.53921 13.5858 2.875 14 2.875H16.0882C16.7467 2.875 17.3282 3.30448 17.5219 3.93387L19.7345 11.125H16.8906C15.7543 11.125 14.7155 11.767 14.2073 12.7834L13.9511 13.2958C13.697 13.804 13.1776 14.125 12.6094 14.125H9.39058C8.82242 14.125 8.30302 13.804 8.04894 13.2958L7.79271 12.7834C7.28453 11.767 6.24574 11.125 5.10942 11.125H2.26547L4.47812 3.93387Z"
                fill="#475569"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 0.625C11.4142 0.625 11.75 0.960786 11.75 1.375V7.81434L13.4697 6.09467C13.7626 5.80178 14.2374 5.80178 14.5303 6.09467C14.8232 6.38756 14.8232 6.86244 14.5303 7.15533L11.5303 10.1553C11.2374 10.4482 10.7626 10.4482 10.4697 10.1553L7.46967 7.15533C7.17678 6.86244 7.17678 6.38756 7.46967 6.09467C7.76256 5.80178 8.23744 5.80178 8.53033 6.09467L10.25 7.81434V1.375C10.25 0.960786 10.5858 0.625 11 0.625Z"
                fill="#475569"
              />
            </svg>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

