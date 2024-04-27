/* eslint-disable @next/next/no-img-element */
"use client";
import Form from "@/components/ui/Form";
import FormInput from "@/components/ui/FormInput";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useCreateLorryMutation } from "@/redux/api/serviceAPI";
import { ICategory, Type } from "@/types";
import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

const CreateLorry = ({
  isOpen,
  setIsOpen,
  refetchAll,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  refetchAll: any;
}) => {
  const [CreateLorry] = useCreateLorryMutation();
  const {
    data: categories,
    isLoading,
    refetch: refetchAllCategory,
  } = useAllCategoriesQuery({
    refetchOnMountOrArgChange: true,
  });

  const [selectedType, setSelectedType] = useState("Small");
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.data[0]?.title
  );

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const defaultValues = {
    model: "",
    type: selectedType,
    plateNumber: "",
    price: 0,
    imageUrl: "",
    categoryId: categories?.data?.find(
      (e: ICategory) => e.title === selectedCategory
    )?.id,
  };

  const onSubmit = async (values: any) => {
    const { price, ...rest } = values;
    const data = {
      price: Number(price),
      ...rest,
    };
    setIsOpen(false);
    try {
      const res = await CreateLorry(data).unwrap();

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
          Create Lorry
        </Dialog.Title>
        <div className="my-4">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="flex flex-col gap-2">
              <FormInput label="Model" name="model" />
              <Select
                label="Type"
                name="type"
                value={selectedType}
                options={["Small", "Medium", "Large"]}
                selectedValue={selectedType}
                handleChange={handleTypeChange}
              />
              <FormInput label="Plate Number" name="plateNumber" />
              <FormInput label="Rent Price" name="price" type="number" />
              <FormInput label="Image" name="imageUrl" />
              <Select
                label="Category"
                name="categoryId"
                value={selectedCategory}
                options={categories.data.map((c: ICategory) => c.title)}
                selectedValue={selectedCategory}
                handleChange={handleCategoryChange}
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

export default CreateLorry;
