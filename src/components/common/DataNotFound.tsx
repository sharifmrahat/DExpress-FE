"use client";

import { Paper, Text } from "@mantine/core";
import { IconFileSad, IconMoodSad } from "@tabler/icons-react";
import { Oswald } from "next/font/google";
const oswald = Oswald({ style: "normal", weight: "400", subsets: ["latin"] });

const DataNotFound = ({
  title = "Data Not Found!",
  description = "No data is found",
  icon = <IconFileSad size={60} stroke={1} />,
  bgColor = "background",
}: {
  title?: string;
  description?: string;
  icon?: JSX.Element;
  bgColor?: string;
}) => {
  return (
    <Paper p="md" className={`w-full bg-${bgColor}`}>
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="text-gray-500 w-fit mx-auto">{icon}</div>
        <div className="flex flex-col justify-center items-center gap-1">
          <Text
            className={`${oswald.className} text-lg lg:text-xl max-w-sm text-secondary`}
          >
            {title}
          </Text>
          <Text className="text-sm lg:text-base max-w-sm text-gray-600">
            {description}
          </Text>
        </div>
      </div>
    </Paper>
  );
};

export default DataNotFound;
