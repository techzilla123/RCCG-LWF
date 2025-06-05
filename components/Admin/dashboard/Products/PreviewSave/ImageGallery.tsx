// ImageGallery.tsx
"use client";
import * as React from "react";

interface UploadedFile {
  image: string;
  type: string;
}

export const ImageGallery = () => {
  const [media, setMedia] = React.useState<UploadedFile[]>([]);
  const [selected, setSelected] = React.useState<string>("");

  React.useEffect(() => {
    const stored = localStorage.getItem("uploadedMedia");
    if (stored) {
      const parsed: UploadedFile[] = JSON.parse(stored);
      setMedia(parsed);
      if (parsed.length > 0) setSelected(parsed[0].image);
    }
  }, []);

  const isVideo = (type: string) => type.startsWith("video");

  return (
    <section className="flex flex-col justify-center w-full min-h-[559px]">
      <div className="flex flex-1 gap-6 size-full">
        {media.length > 0 ? (
          isVideo(media.find((m) => m.image === selected)?.type || "") ? (
            <video
              src={selected}
              controls
              className="object-contain flex-1 shrink w-full aspect-[1.4] basis-0 min-w-60"
            />
          ) : (
            <img
              src={selected}
              alt="Product preview"
              className="object-contain flex-1 shrink w-full aspect-[1.4] basis-0 min-w-60"
            />
          )
        ) : (
          <p className="text-neutral-400">No media uploaded yet.</p>
        )}
      </div>

      <p className="text-base text-black leading-[24px]">Click to view full screen</p>

      <div className="flex overflow-hidden overflow-x-auto gap-4 mt-2 w-full min-h-[120px]">
        {media.map((file, index) => (
          <button key={index} onClick={() => setSelected(file.image)} className="flex-none">
            {isVideo(file.type) ? (
              <video
                src={file.image}
                className="object-contain aspect-[1.67] max-w-60 min-w-[200px] w-[200px]"
              />
            ) : (
              <img
                src={file.image}
                alt={`Thumbnail ${index + 1}`}
                className="object-contain aspect-[1.67] max-w-60 min-w-[200px] w-[200px]"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
