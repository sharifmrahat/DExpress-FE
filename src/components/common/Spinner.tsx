"use client";
import { PuffLoader } from "react-spinners";

function Spinner({
  size = 100,
  color = "#ff3f39",
  isLoading = true,
}: {
  size?: number;
  color?: string;
  isLoading?: boolean;
}) {
  return <PuffLoader color={color} loading={isLoading} size={size} />;
}

export default Spinner;
