"use client";
import { PuffLoader } from "react-spinners";

function Spinner({
  size = 100,
  color = "#ff3f39",
}: {
  size?: number;
  color?: string;
}) {
  return <PuffLoader color={color} loading={true} size={size} />;
}

export default Spinner;
