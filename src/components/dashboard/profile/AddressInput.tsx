"use client";

import { Button, Group, Textarea } from "@mantine/core";

interface AddressInputProps {
  address: string;
  index: number;
  onAddressChange: (index: number, updatedAddress: string) => void;
  onRemove: (index: number) => void;
}

const AddressInput = ({
  address,
  index,
  onAddressChange,
  onRemove,
}: AddressInputProps) => {
  return (
    <Group>
      <Textarea
        label={`Address ${index + 1}`}
        value={address} // Entire address string from props
        onChange={(e) => onAddressChange(index, e.target.value)} // Update entire string
      />
      <Button onClick={() => onRemove(index)} variant="light">
        Remove
      </Button>
    </Group>
  );
};

export default AddressInput;
