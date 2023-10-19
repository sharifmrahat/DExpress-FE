/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "@/components/common/Spinner";
import { useAllUsersQuery } from "@/redux/api/userApi";
import profileAvatar from "@/assets/images/profileAvatar.png";
import { IUser } from "@/types";
import UpdateUser from "@/components/dashboard/admin/UpdateUser";
import { useState } from "react";
import DeleteUser from "@/components/dashboard/admin/DeleteUser";
import EmptyState from "@/components/ui/EmptyState";
import CreateAdmin from "@/components/dashboard/admin/CreateAdmin";

const ManageBookingsPage = () => {
  const {
    data: users,
    isLoading,
    refetch: refetchAll,
  } = useAllUsersQuery({
    refetchOnMountOrArgChange: true,
  });

  const [userId, setUserId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  let [isOpen, setIsOpen] = useState(false);
  let [openAlert, setOpenAlert] = useState(false);
  let [openCreate, setOpenCreate] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const handleUpdateProfile = (id: string) => {
    setUserId(id);
    openModal();
  };

  const handleDeleteUser = async (id: string) => {
    setDeleteId(id);
    setOpenAlert(true);
  };
  return (
    <>
      {isLoading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-md">
          <Spinner />
        </div>
      ) : users?.data.length ? (
        <>
          <div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Manage Bookings
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Total Booking: {users?.data?.length}
                  </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    onClick={() => setOpenCreate(true)}
                    type="button"
                    className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Add New Booking
                  </button>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Contact No.
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Address
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {users?.data?.map((person: IUser) => (
                            <tr key={person.email}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-11 w-11 flex-shrink-0">
                                    <img
                                      className="h-11 w-11 rounded-full"
                                      src={person.imageUrl ?? profileAvatar.src}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-semibold text-gray-900">
                                      {person.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.email}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.contactNo ?? "N/A"}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.address ?? "N/A"}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {person.role}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex flex-row gap-3 justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(person.id)}
                                  className="bg-red-200 text-red-800 py-1 px-2 rounded text-xs"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateProfile(person?.id)
                                  }
                                  className="bg-teal-700 text-white py-1 px-2 rounded text-xs"
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {userId && (
              <UpdateUser
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                userId={userId}
                refetchAll={refetchAll}
              />
            )}
            {deleteId && (
              <DeleteUser
                isOpen={openAlert}
                setIsOpen={setOpenAlert}
                userId={deleteId}
                refetchAll={refetchAll}
              />
            )}
            <CreateAdmin
              isOpen={openCreate}
              setIsOpen={setOpenCreate}
              refetchAll={refetchAll}
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-fit mx-auto my-20">
            <EmptyState />
          </div>
        </>
      )}
    </>
  );
};

export default ManageBookingsPage;
