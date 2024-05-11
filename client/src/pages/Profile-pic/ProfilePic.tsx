import { BsImage } from "react-icons/bs";
import { useRef, useState } from "react";

export default function ProfilePic() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const file_dom = useRef<HTMLInputElement>(null);
  const handleFileClick = () => {
    file_dom.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      setImageName(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-slate-200">
      <div className="h-80 rounded-md bg-white w-[90%] md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/4 flex flex-col justify-center items-center">
        <div
          onClick={handleFileClick}
          className=" flex flex-col justify-center items-center cursor-pointer"
        >
          <BsImage />
          Select image
          {imageUrl ? (
            <div className="w-20 h-20 flex justify-center items-center">
              <img
                src={imageUrl}
                alt="profile-pic"
                className="rounded-full w-fit h-fit"
              />
            </div>
          ) : (
            ""
          )}
          {imageName ? <p>{imageName}</p> : ""}
        </div>

        <input
          onChange={handleFileUpload}
          ref={file_dom}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
        />
      </div>
    </div>
  );
}
