import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./AuthenticationTitle.module.css";

function Signup() {
  return (
    <Container size={420} className={classes.container}>
      <div>
        <Title ta="center" className={classes.title}>
          Welcome
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component={Link} to="/auth/login">
            Login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack gap={"10px"}>
            <TextInput label="First Name" placeholder="John" required />
            <TextInput label="Last Name" placeholder="Doe" required />
            <TextInput label="Email" placeholder="john@doe.com" required />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
            />
          </Stack>

          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </div>
    </Container>
  );
}

export default Signup;
