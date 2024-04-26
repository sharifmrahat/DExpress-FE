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

function SignupForm() {
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (val) =>
        val.length < 8 ? "Password must be minimum 8 character" : null,
      confirmPassword: (val, values) =>
        val !== values.password ? "Password not matched" : null,
    },
  });
  return (
    <>
      <Box pos="relative" className="p-10 shadow-md">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "pink", type: "bars" }}
        />
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
            required
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="********"
            key={form.key("password")}
            {...form.getInputProps("password")}
            required
          />
          <PasswordInput
            withAsterisk
            label="Confirm Password"
            placeholder="********"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
            required
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
