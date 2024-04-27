"use client";
import {
  IconInfoCircle,
  IconX,
  IconCheck,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { rem } from "@mantine/core";
export function GetNotificationIcon({
  type = "info",
}: {
  type?: "info" | "success" | "error" | "warn";
}) {
  const infoIcon = (
    <IconInfoCircle style={{ width: rem(20), height: rem(20) }} />
  );
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
  const warnIcon = (
    <IconAlertTriangle style={{ width: rem(20), height: rem(20) }} />
  );

  return (
    <>
      {(type === "info" && infoIcon) ||
        (type === "error" && xIcon) ||
        (type === "success" && checkIcon) ||
        (type === "warn" && warnIcon)}
    </>
  );
}
