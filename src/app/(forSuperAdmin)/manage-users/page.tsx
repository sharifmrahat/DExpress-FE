"use client";
import DataNotFound from "@/components/common/DataNotFound";
import SectionHeading from "@/components/common/SectionHeading";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { useAllUsersQuery } from "@/redux/api/userApi";
import { IMeta } from "@/types";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { Role, users } from "@prisma/client";
import { IconSearch, IconSquareRoundedPlus } from "@tabler/icons-react";
import { format } from "date-fns";
import Link from "next/link";
import { useMemo, useState } from "react";

const ManageUsers = () => {
  const [searchValue, setSearchValue] = useDebouncedState("", 200);
  const [sortFieldValue, setSortFieldValue] = useState<string | undefined>(
    "createdAt"
  );
  const [sortOrderValue, setSortOrderValue] = useState<"asc" | "desc">("desc");

  const [filterData, setFilterData] = useState<{
    role?: Role;
  }>({
    role: undefined,
  });
  const [page, setPage] = useState(1);

  const sortFields = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "createdAt", label: "Created Date" },
  ];

  const sortOrders = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const {
    data: users,
    isLoading,
    isSuccess,
  } = useAllUsersQuery({
    search: searchValue,
    role: filterData.role,
    sortBy: sortFieldValue,
    sortOrder: sortOrderValue,
    limit: 10,
    page,
  });

  const userResults = useMemo(() => users?.data?.result as users[], [users]);

  const meta = useMemo(() => users?.data?.meta as IMeta, [users]);

  const routes = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/overview" },
    {
      title: "Manage Users",
      isCurrent: true,
    },
  ].map((item, index) => (
    <div key={index} className="font-semibold text-sm">
      {item.isCurrent ? (
        <Text className="font-semibold text-sm text-primary">{item.title}</Text>
      ) : (
        <Link
          href={item.href as string}
          key={index}
          className="hover:text-primary"
        >
          {item.title}
        </Link>
      )}
    </div>
  ));
  return (
    <div className="p-4 lg:p-8">
      <Breadcrumbs className="hidden lg:flex">{routes}</Breadcrumbs>
      <div className="mt-0 lg:mt-10">
        <div className="flex flex-row justify-between items-start">
          <SectionHeading line1="Manage Users" />
          <Button
            color="#ff3f39"
            leftSection={<IconSquareRoundedPlus className="mb-0.5" />}
          >
            Create New
          </Button>
        </div>
        <div className="mt-10">
          <div>
            {!isLoading ? (
              // Search & Sort
              <div>
                <div className="border bg-white shadow rounded">
                  <div className="px-2 py-3 flex flex-row justify-between items-center gap-4 border-b rounded-t overflow-auto">
                    <div className="flex flex-row gap-4">
                      <Select
                        data={sortFields}
                        value={sortFieldValue ? sortFieldValue : "createdAt"}
                        onChange={(value, option) =>
                          setSortFieldValue(value as string)
                        }
                        checkIconPosition="right"
                        size="sm"
                      />
                      <Select
                        data={sortOrders}
                        value={sortOrderValue ? sortOrderValue : "desc"}
                        onChange={(value, option) =>
                          setSortOrderValue(value as "asc" | "desc")
                        }
                        checkIconPosition="right"
                        size="sm"
                      />
                    </div>
                    <div>
                      <TextInput
                        size="sm"
                        placeholder="Search User"
                        rightSection={<IconSearch />}
                        defaultValue={searchValue}
                        onChange={(event) =>
                          setSearchValue(event.currentTarget.value)
                        }
                      />
                    </div>
                  </div>
                  {/* Table Section */}
                  {isSuccess && userResults?.length ? (
                    <>
                      <div className="overflow-auto">
                        <Table
                          horizontalSpacing="sm"
                          verticalSpacing="sm"
                          striped
                          highlightOnHover
                          className="overflow-auto"
                        >
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Name</Table.Th>
                              <Table.Th>Email</Table.Th>
                              <Table.Th>Contact No</Table.Th>
                              <Table.Th>Role</Table.Th>
                              <Table.Th>Verified</Table.Th>
                              <Table.Th>Status</Table.Th>
                              <Table.Th>CreatedAt</Table.Th>
                              <Table.Th>UpdatedAt</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {userResults.map((user: users) => (
                              <Table.Tr key={user?.id}>
                                <Table.Td className="flex flex-row gap-2">
                                  <Avatar
                                    src={user?.imageUrl}
                                    className="border border-primary"
                                    alt={user?.name}
                                    color="#ff3f39"
                                    size="sm"
                                  >
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                  </Avatar>{" "}
                                  <span> {user.name}</span>
                                </Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td>{user?.contactNo ?? "N/A"}</Table.Td>
                                <Table.Td>{user.role}</Table.Td>
                                <Table.Td>
                                  {user.isVerified
                                    ? "Verified"
                                    : "Not Verified"}
                                </Table.Td>
                                <Table.Td>
                                  {user.isActive ? "Active" : "Inactive"}
                                </Table.Td>
                                <Table.Td>
                                  {format(
                                    user.createdAt,
                                    "dd/MM/yyyy hh:mm:ss"
                                  )}
                                </Table.Td>
                                <Table.Td>
                                  {format(
                                    user.updatedAt,
                                    "dd/MM/yyyy hh:mm:ss"
                                  )}
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                      </div>
                      <div className="bg-white px-2 py-3 flex flex-row justify-between items-center border-t rounded-b">
                        <p>
                          Showing {page === 1 ? 1 : (page - 1) * meta.limit + 1}{" "}
                          - {Math.min(meta.limit * meta.page, meta.total)} of{" "}
                          {meta.total}
                        </p>
                        <Pagination
                          color="#ff3f39"
                          total={meta.totalPage}
                          value={page}
                          onChange={setPage}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center">
                      <DataNotFound
                        description="No user data is found"
                        bgColor="bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <SkeletonLoader amount={8}>
                  <div className="h-[400px]"></div>
                </SkeletonLoader>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
