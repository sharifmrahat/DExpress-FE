"use client";
import { PuffLoader } from "react-spinners";

function Spinner() {
  return (
    <div>
      <PuffLoader color={"#006266"} loading={true} size={100} />
    </div>
  );
}

export default Spinner;
