"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="yfvh5a6i"
      >
        <div className=" bg-muted p-6 rounded-2xl hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="p-5 md:p-1">
            <Image
              width={136}
              height={118}
              alt="Upload"
              src={value || "/img/library_empty.svg"}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
