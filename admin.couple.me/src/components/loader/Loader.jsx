import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader color={"#36D7B7"} size={50} />
    </div>
  );
}
