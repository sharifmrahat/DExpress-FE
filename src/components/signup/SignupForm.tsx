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

function SignupForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const [userSignup, { isLoading, isError }] = useUserSignupMutation();
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
        if (res.accessToken) {
          storeUserInfo({ accessToken: res?.accessToken });
          await refetch();
          router.push("/profile");
        }
      }
    } catch (err: any) {
      toggle();
      toast.error(err?.message);
    }
  };
  return (
    <>
      <Box pos="relative" className="w-full">
        <LoadingOverlay
          visible={isLoading ?? visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "pink", type: "bars" }}
        />
        <form
          onSubmit={form.onSubmit((values) =>
            handleSignupSubmit({
              name: values.name,
              email: values.email,
              password: values.password,
            })
          )}
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
            label="I agree to sell my privacy"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </>
  );
}

export default SignupForm;
