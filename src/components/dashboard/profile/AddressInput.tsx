"use client";
import { Textarea } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
interface AddressInputProps {
  address: string;
  index: number;
  total: number;
  disabled: boolean;
  onAddressChange: (index: number, updatedAddress: string) => void;
  onRemove: (index: number) => void;
}

const AddressInput = ({
  address,
  index,
  total,
  disabled,
  onAddressChange,
  onRemove,
}: AddressInputProps) => {
  return (
    <div className="flex flex-row justify-start items-center gap-2 w-full">
      <div className="w-full">
        <Textarea
          label={`Address-${index + 1}`}
          value={address}
          onChange={(e) => onAddressChange(index, e.target.value)}
          disabled={disabled}
          resize="vertical"
        />
      </div>
      {total > 1 && !disabled && (
        <div
          onClick={() => onRemove(index)}
          className="w-fit mt-5 cursor-pointer bg-primaryLight text-primary p-2 rounded"
        >
          <IconTrash size={16} />
        </div>
      )}
    </div>
  );
};

export default AddressInput;
