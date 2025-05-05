import { useRef } from 'react';
import { EyeIcon, CloseIcon } from './Icons';

interface UploadedFile {
  image: string;
  type: string;
}

interface MediaUploadProps {
  files: UploadedFile[]; // Accept files from the parent component
  onFilesChange: (newFiles: UploadedFile[]) => void; // Callback to update the parent component's state
}

export const MediaUpload = ({ files, onFilesChange }: MediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      image: URL.createObjectURL(file),
      type: file.type,
    }));

    onFilesChange([...files, ...newFiles]); // Update the parent component's state
  };

  const handleRemove = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    onFilesChange(updatedFiles); // Update the parent component's state
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-black max-md:text-sm max-sm:text-xs">
        Upload media<span className="text-xl text-neutral-500">*</span>
      </label>

      {/* Upload box */}
      <div
        className="flex flex-col gap-2 justify-center items-center p-4 text-xs text-center bg-white rounded-lg border-2 border-dashed border-neutral-300 text-neutral-500 cursor-pointer"
        onClick={handleUploadClick}
      >
        <EyeIcon />
        <span>
          Drag & drop, or upload at least 3 media files (.jpg, .png, .webp, .mp4, .webm)
        </span>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* Previews */}
      <div className="flex flex-wrap gap-3">
        {files.map((file, index) => (
          <div key={index} className="flex gap-2 items-center">
            <img
              src={file.image}
              alt="Uploaded preview"
              className="w-10 h-10 rounded-sm bg-stone-50 object-cover"
            />
            <span className="text-xs text-neutral-500 max-md:text-xs max-sm:text-xs truncate max-w-[100px]">
              {file.type}
            </span>
            <button aria-label="Remove file" onClick={() => handleRemove(index)}>
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
