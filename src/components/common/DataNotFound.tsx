"use client";

import { Alert } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";

const DataNotFound = ({
  variant = "light",
  color = "blue",
  title = "Data Not Found!",
  description = "No data is found",
  icon = <IconMoodSad />,
}: {
  variant?: string;
  color?: string;
  title?: string;
  description?: string;
  icon?: JSX.Element;
}) => {
  return (
    <Alert variant={variant} color={color} title={title} icon={icon}>
      {description}
    </Alert>
  );
};

export default DataNotFound;
