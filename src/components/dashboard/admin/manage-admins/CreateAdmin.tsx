/* eslint-disable @next/next/no-img-element */
"use client";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { useCreateAdminMutation } from "@/redux/api/userApi";
import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const CreateAdmin = ({
  isOpen,
  setIsOpen,
  refetchAll,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetchAll: any;
}) => {
  const [CreateAdmin] = useCreateAdminMutation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  function closeModal() {
    setIsOpen(false);
  }

  const [selectedValue, setSelectedValue] = useState("admin");

  const defaultValues = {
    name: "",
    imageUrl: "",
    email: "",
    password: "",
    role: selectedValue || "",
    contactNo: "",
    address: "",
  };

  const onSubmit = async (values: any) => {
    setIsOpen(false);

    try {
      const res = await CreateAdmin(values).unwrap();

      if (res?.success) {
        refetchAll();
        toast.success(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Modal
        buttonLabel="Confirm"
        closeModal={closeModal}
        isOpen={isOpen}
        submitModal={onSubmit}
        buttonType="submit"
      >
        <Dialog.Title as="h3" className="font-medium leading-6 text-gray-900">
          Create Admin
        </Dialog.Title>
        <div className="my-4">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="flex flex-col gap-2">
              <FormInput label="Name" name="name" />
              <FormInput label="Email" name="email" />
              <FormInput label="Password" name="password" type="password" />
              <FormInput label="Profile Image" name="imageUrl" />
              <FormInput label="Contact No." name="contactNo" />
              <FormInput label="Address" name="address" />
              <Select
                label="Role"
                name="role"
                value={selectedValue}
                options={["admin"]}
                selectedValue={selectedValue}
                handleChange={handleChange}
              />
            </div>

            <div className="mt-4 flex flex-row justify-end items-center gap-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-1 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-1 text-sm font-medium text-white hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Create
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateAdmin;
