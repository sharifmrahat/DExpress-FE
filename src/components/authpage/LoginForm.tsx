import { useDisclosure } from "@mantine/hooks";
import {
  LoadingOverlay,
  Button,
  Group,
  Box,
  TextInput,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  useUserLoginMutation,
  useUserSignupMutation,
} from "@/redux/api/authApi";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Spinner from "../common/Spinner";
import Link from "next/link";
import { showNotification } from "@/utils/showNotification";

function LoginForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const { refetch } = useUserProfileQuery({});
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (val) =>
        val.length < 8 ? "Password must be minimum 8 character" : null,
    },
  });

  const handleLoginSubmit = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.success) {
        toggle();
        showNotification({
          type: "success",
          title: "Login success",
          message: res.message,
        });
        if (res.accessToken) {
          storeUserInfo({ accessToken: res?.accessToken });
          await refetch();
          router.push("/overview");
        }
      }
    } catch (err: any) {
      toggle();
    }
  };
  return (
    <>
      <Box pos="relative" className="w-full">
        <LoadingOverlay
          visible={isLoading ?? visible}
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
          onSubmit={form.onSubmit((values) =>
            handleLoginSubmit({
              email: values.email,
              password: values.password,
            })
          )}
          className="flex flex-col gap-2"
        >
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="********"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Group className="mt-4">
            <Button type="submit" color="#ff3f39">
              Login Now
            </Button>
            <Link href="/signup">
              <Button variant="light" color="#ff3f39">
                Get Signup
              </Button>
            </Link>
          </Group>
        </form>
      </Box>
    </>
  );
}

export default LoginForm;
