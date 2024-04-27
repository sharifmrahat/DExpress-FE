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
import { useUserSignupMutation } from "@/redux/api/authApi";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";
import Link from "next/link";
import { showNotification } from "@/utils/showNotification";

function SignupForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const [userSignup, { isLoading }] = useUserSignupMutation();
  const { refetch } = useUserProfileQuery({});
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      name: (val: string) => (!val ? "Name is Required" : null),
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (val) =>
        val.length < 8 ? "Password must be minimum 8 character" : null,
      confirmPassword: (val, values) =>
        val !== values.password ? "Password not matched" : null,
      termsOfService: (val) =>
        !val ? "You must check agree to sign up" : null,
    },
  });

  const handleSignupSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await userSignup({ ...data }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        toggle();
        showNotification({
          type: "success",
          title: "Signup success",
          message: res.message,
        });
        if (res.accessToken) {
          storeUserInfo({ accessToken: res?.accessToken });
          await refetch();
          router.push("/profile");
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
            handleSignupSubmit({
              name: values.name,
              email: values.email,
              password: values.password,
            })
          )}
          className="flex flex-col gap-2"
        >
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
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
          <PasswordInput
            withAsterisk
            label="Confirm Password"
            placeholder="********"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />

          <Checkbox
            mt="md"
            label="I agree with terms and conditions"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
            color="#ff3f39"
          />
          <Group className="mt-4">
            <Button type="submit" color="#ff3f39">
              Sign Up Now
            </Button>
            <Link href="/login">
              <Button variant="light" color="#ff3f39">
                Get Login
              </Button>
            </Link>
          </Group>
        </form>
      </Box>
    </>
  );
}

export default SignupForm;
