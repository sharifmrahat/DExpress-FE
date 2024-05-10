/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import DataNotFound from "@/components/common/DataNotFound";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Spinner from "@/components/common/Spinner";
import AddressInput from "@/components/dashboard/profile/AddressInput";
import { authKey } from "@/constants/storageKey";
import {
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/redux/api/userApi";
import { removeUserInfo } from "@/services/auth.service";
import { showNotification } from "@/utils/showNotification";
import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Group,
  LoadingOverlay,
  PasswordInput,
  Skeleton,
  Tabs,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { users } from "@prisma/client";
import {
  IconPlus,
  IconSquarePlus,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const ProfilePage = () => {
  const [editable, setEditable] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("personal");
  const [addresses, setAddresses] = useState<string[]>([""]);
  const { data, isLoading, isSuccess, refetch } = useUserProfileQuery({});

  const [updateProfile, { isLoading: loadingUpdate }] =
    useUpdateProfileMutation();

  const [updatePassword, { isLoading: loadingUpdatePassword }] =
    useUpdatePasswordMutation();

  const profile = useMemo(() => data?.data as users, [data]);

  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: profile?.name,
      imageUrl: profile?.imageUrl,
      email: profile?.email,
      contactNo: profile?.contactNo,
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const passwordForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validate: {
      password: (val) =>
        val.length < 8 ? "Password must be minimum 8 character" : null,
      newPassword: (val) =>
        val.length < 8 ? "Password must be minimum 8 character" : null,
      confirmNewPassword: (val, values) =>
        val !== values.newPassword ? "Password not matched" : null,
    },
  });

  const handleAddAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const handleRemoveAddress = (index: number) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

  const handleAddressChange = (index: number, updatedAddress: string) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address, i) =>
        i === index ? updatedAddress : address
      )
    );
  };

  useEffect(() => {
    if (profile) {
      form.setValues({
        name: profile?.name,
        email: profile?.email,
        imageUrl: profile?.imageUrl,
        contactNo: profile?.contactNo,
      });
      setAddresses(profile?.addresses.length ? profile?.addresses : [""]);
    }
  }, [profile]);

  const submitUpdate = async (updatedData: {
    name?: string;
    imageUrl?: string;
    contactNo?: string;
    addresses?: string[];
  }) => {
    try {
      const res = await updateProfile({ ...updatedData }).unwrap();
      if (res?.success) {
        refetch();
        toggle();
        showNotification({
          type: "success",
          title: "Update success",
          message: res.message,
        });
      }
    } catch (err: any) {
      toggle();
    }
  };

  const submitUpdatePassword = async (data: {
    password?: string;
    newPassword?: string;
  }) => {
    try {
      const res = await updatePassword({ ...data }).unwrap();
      if (res?.success) {
        refetch();
        toggle();
        showNotification({
          type: "success",
          title: "Password Updated",
          message: res.message,
        });
        removeUserInfo(authKey);
        router.push("/login");
        showNotification({
          type: "info",
          title: "Signed out",
          message: "Please login again",
        });
      }
    } catch (err: any) {
      toggle();
    }
  };

  const routes = [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/overview" },
    {
      title: isLoading ? "Loading..." : "Profile",
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
      {isSuccess && profile ? (
        <>
          <div className="mt-0 lg:mt-10 mx-0">
            <div className="flex flex-col lg:flex-row gap-5 justify-center lg:justify-start items-center lg:items-start">
              <Avatar
                src={profile?.imageUrl}
                className="border-2 border-primary cursor-pointer"
                alt={profile?.name}
                color="#ff3f39"
                size="xl"
              >
                {profile?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div className="flex flex-col gap-4 justify-center items-center lg:justify-start lg:items-start">
                <Text className="text-2xl lg:text-3xl font-semibold">
                  {profile?.name}
                </Text>
                <Badge variant="light" color="#ff3f39" size="md">
                  {profile?.role}
                </Badge>
                {/* <Badge color={profile?.isVerified ? "teal" : "dark"}>
              {profile?.isVerified ? "Verified" : "Not Verified"}
            </Badge> */}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Tabs
              color="#ff3f39"
              defaultValue="personal"
              value={activeTab}
              onChange={(val) => setActiveTab(val)}
            >
              <Tabs.List>
                <Tabs.Tab
                  value="personal"
                  className={`hover:text-primary font-semibold hover:bg-transparent ${
                    activeTab === "personal" && "text-primary"
                  }`}
                >
                  Basic Info
                </Tabs.Tab>
                <Tabs.Tab
                  value="settings"
                  className={`hover:text-primary font-semibold hover:bg-transparent ${
                    activeTab === "settings" && "text-primary"
                  }`}
                >
                  Update Password
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="personal" className="p-4">
                <Box pos="relative" className="w-full lg:w-1/3">
                  <LoadingOverlay
                    className="bg-transparent"
                    visible={loadingUpdate ?? visible}
                    zIndex={1000}
                    px={20}
                    overlayProps={{ blur: 1 }}
                    loaderProps={{
                      children: (
                        <div className="w-fit">
                          <Spinner />
                        </div>
                      ),
                    }}
                  />
                  <form
                    className="flex flex-col gap-3"
                    onSubmit={form.onSubmit((values) => {
                      if (
                        values.name?.trim() === profile.name &&
                        values.imageUrl?.trim() === profile.imageUrl &&
                        values.contactNo?.trim() === profile.contactNo &&
                        addresses.length === profile?.addresses?.length &&
                        addresses.every((e) => profile?.addresses?.includes(e))
                      ) {
                        return;
                      }
                      submitUpdate({
                        name: values?.name,
                        imageUrl: values?.imageUrl ?? "",
                        contactNo: values?.contactNo ?? "",
                        addresses,
                      });
                    })}
                  >
                    <TextInput
                      label="Name"
                      placeholder="Your Name"
                      key={form.key("name")}
                      {...form.getInputProps("name")}
                      disabled={!editable}
                    />
                    <TextInput
                      label="Profile Picture"
                      placeholder="Profile Picture"
                      key={form.key("imageUrl")}
                      {...form.getInputProps("imageUrl")}
                      disabled={!editable}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Your Email"
                      key={form.key("email")}
                      {...form.getInputProps("email")}
                      disabled
                    />
                    <TextInput
                      label="Contact No."
                      placeholder="Contact No."
                      key={form.key("contactNo")}
                      {...form.getInputProps("contactNo")}
                      disabled={!editable}
                    />
                    {addresses.map((address, index) => (
                      <div key={index}>
                        <AddressInput
                          key={index}
                          address={address}
                          index={index}
                          total={addresses?.length}
                          disabled={!editable}
                          onAddressChange={handleAddressChange}
                          onRemove={handleRemoveAddress}
                        />
                      </div>
                    ))}
                    {editable && (
                      <Button
                        onClick={handleAddAddress}
                        variant="light"
                        color="black"
                        className="w-fit"
                        size="xs"
                      >
                        <IconPlus size={18} />{" "}
                        <span className="text-sm ml-2">Add More</span>
                      </Button>
                    )}

                    {!editable && (
                      <Group className="mt-4 flex justify-end">
                        <Button
                          variant="light"
                          color="#ff3f39"
                          onClick={() => setEditable(true)}
                        >
                          Edit
                        </Button>
                      </Group>
                    )}

                    {editable && (
                      <Group className="mt-4 flex justify-end">
                        <Button
                          variant="outline"
                          color="gray"
                          onClick={() => setEditable(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" color="#ff3f39">
                          Update
                        </Button>
                      </Group>
                    )}
                  </form>
                </Box>
              </Tabs.Panel>

              <Tabs.Panel value="settings" className="p-4">
                <Box pos="relative" className="w-full lg:w-1/3">
                  <LoadingOverlay
                    className="bg-transparent"
                    visible={loadingUpdatePassword ?? visible}
                    zIndex={1000}
                    px={20}
                    overlayProps={{ blur: 1 }}
                    loaderProps={{
                      children: (
                        <div className="w-fit">
                          <Spinner />
                        </div>
                      ),
                    }}
                  />
                  <form
                    className="flex flex-col gap-3"
                    onSubmit={passwordForm.onSubmit((values) => {
                      submitUpdatePassword({
                        password: values.password,
                        newPassword: values.newPassword,
                      });
                    })}
                  >
                    <PasswordInput
                      withAsterisk
                      label="Current Password"
                      placeholder="********"
                      key={passwordForm.key("password")}
                      {...passwordForm.getInputProps("password")}
                      required
                    />
                    <PasswordInput
                      withAsterisk
                      label="New Password"
                      placeholder="********"
                      key={passwordForm.key("newPassword")}
                      {...passwordForm.getInputProps("newPassword")}
                      required
                    />
                    <PasswordInput
                      withAsterisk
                      label="Confirm Password"
                      placeholder="********"
                      key={passwordForm.key("confirmNewPassword")}
                      {...passwordForm.getInputProps("confirmNewPassword")}
                      required
                    />

                    <Group className="mt-4 flex justify-end">
                      <Button type="submit" color="#ff3f39">
                        Update Password
                      </Button>
                    </Group>
                  </form>
                </Box>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : isLoading ? (
        <div className="mt-0 lg:mt-10 mx-0">
          <div className="flex flex-col lg:flex-row gap-5 justify-center lg:justify-start items-center px-2">
            <div className="w-fit mx-auto lg:mx-2">
              <Skeleton height={80} circle />
            </div>
            <Skeleton
              height={60}
              radius="md"
              width="20%"
              className="hidden lg:block"
            />
            <Skeleton
              height={40}
              radius="md"
              width="50%"
              className="block lg:hidden"
            />
          </div>

          <div className="mt-20 px-2">
            <Skeleton height={20} className="hidden lg:block" mb={20} />
            <SkeletonLoader>
              <div className="w-full h-[425px]"></div>
            </SkeletonLoader>
          </div>
        </div>
      ) : (
        <div className="flex justify-start items-start mt-0 lg:mt-10 mx-0">
          <DataNotFound description="No profile data is found" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
