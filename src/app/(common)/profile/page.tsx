/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Spinner from "@/components/common/Spinner";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/redux/api/userApi";
import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Group,
  LoadingOverlay,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { users } from "@prisma/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ProfilePage = () => {
  const [editable, setEditable] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("personal");
  const { data, isLoading, refetch } = useUserProfileQuery({});

  const [updateProfile, { isLoading: loadingUpdate }] =
    useUpdateProfileMutation();

  const profile = useMemo(() => data?.data as users, [data]);

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

  useEffect(() => {
    if (profile) {
      form.setValues({
        name: profile?.name,
        email: profile?.email,
        imageUrl: profile?.imageUrl,
        contactNo: profile?.contactNo,
      });
    }
  }, [profile]);

  const submitUpdate = async (updatedData: {
    name?: string;
    imageUrl?: string;
    contactNo?: string;
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
              Personal Info
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              className={`hover:text-primary font-semibold hover:bg-transparent ${
                activeTab === "settings" && "text-primary"
              }`}
            >
              Account Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="personal" className="p-4">
            <Box pos="relative" className="w-full lg:w-1/3">
              <LoadingOverlay
                visible={loadingUpdate ?? visible}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 0 }}
                loaderProps={{
                  children: (
                    <div className="w-fit mb-20">
                      <Spinner />
                    </div>
                  ),
                }}
              />
              <form
                className="flex flex-col gap-3"
                onSubmit={form.onSubmit((values) =>
                  submitUpdate({
                    name: values?.name,
                    imageUrl: values?.imageUrl ?? "",
                    contactNo: values?.contactNo ?? "",
                  })
                )}
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

          <Tabs.Panel value="settings">
            <div className="p-4">Account Settings</div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
