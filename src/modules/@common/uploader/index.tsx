import React from "react";
import { Upload } from "antd";
import { CiCirclePlus, CiTrash } from "react-icons/ci";
import classnames from "classnames";

interface ImageUploadProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  name: string;
  accept?: string;
  classNames?: {
    root?: string;
    image?: string;
    deleteButton?: string;
    uploader?: string; // New class for antd_avatar_uploader
  };
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  values,
  setFieldValue,
  name,
  accept = "image/jpeg,image/png,image/gif",
  classNames = {},
}) => {
  const rootClassName = classnames("relative", classNames.root || "");
  const imageClassName = classnames("cursor-pointer", classNames.image || "");
  const deleteButtonClassName = classnames(
    "absolute top-[-5px] right-[-5px] p-1 text-white bg-red-500 rounded-full",
    classNames.deleteButton || ""
  );
  const uploaderClassName = classnames(
    "antd_avatar_uploader",
    classNames.uploader || ""
  ); // Add the new class here

  return (
    <div className={rootClassName}>
      <Upload
        name={name}
        showUploadList={false}
        beforeUpload={(file) => {
          setFieldValue(name, file);
          return false;
        }}
        accept={accept}
        className={uploaderClassName} // Apply the custom class here
        maxCount={1}
      >
        {values[name] ? (
          <img
            crossOrigin="anonymous"
            src={
              values[name]
                ? typeof values[name] === 'string'
                  ? values[name]
                  : (URL.createObjectURL(values[name] as File) as string)
                : undefined
            }
            alt={name}
            className={imageClassName}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-4">
            <CiCirclePlus className="text-2xl" />
            <div>Upload</div>
          </div>
        )}
      </Upload>
      {values[name] && (
        <button
          className={deleteButtonClassName}
          type="button"
          onClick={() => setFieldValue(name, null)}
        >
          <CiTrash className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
