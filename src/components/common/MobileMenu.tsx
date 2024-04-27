import { Burger, Button, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const MobileMenu = () => {
  const [opened, { open, close, toggle }] = useDisclosure(false);
  return (
    <div>
      <Drawer opened={opened} onClose={close} title="Menu" position="right">
        {/* Drawer content */}{" "}
      </Drawer>
    </div>
  );
};

export default MobileMenu;
