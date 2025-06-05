import { useRef, useEffect } from "react";
import { EyeIcon, CloseIcon } from "./Icons";

export interface UploadedFile {
  image: string; // preview URL
  type: string;
  name: string;
  file: File; // actual File object
}

interface MediaUploadProps {
  files: UploadedFile[];
  onFilesChange: (newFiles: UploadedFile[]) => void;
}

export const MediaUpload = ({ files, onFilesChange }: MediaUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only save metadata to localStorage, not the actual File object
    const metadata = files.map(({ image, name, type }) => ({ image, name, type }));
    localStorage.setItem("uploadedMedia", JSON.stringify(metadata));
  }, [files]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      image: URL.createObjectURL(file),
      type: file.type,
      name: file.name,
      file: file,
    }));

    const updatedFiles = [...files, ...newFiles];
    onFilesChange(updatedFiles);
  };

  const handleRemove = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    onFilesChange(updatedFiles);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-black">Upload media *</label>

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

      <div className="flex flex-wrap gap-3">
        {files.map((file, index) => (
          <div key={index} className="flex gap-2 items-center">
            {file.type.startsWith("video") ? (
              <video
                src={file.image}
                className="w-10 h-10 rounded-sm bg-stone-50 object-cover"
              />
            ) : (
              <img
                src={file.image}
                alt="Uploaded preview"
                className="w-10 h-10 rounded-sm bg-stone-50 object-cover"
              />
            )}
            <span className="text-xs text-neutral-500 truncate max-w-[100px]">
              {file.name}
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
