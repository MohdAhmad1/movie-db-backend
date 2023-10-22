import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./AuthenticationTitle.module.css";

function Login() {
  return (
    <Container size={420} className={classes.container}>
      <div>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} to="/auth/signup">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="john@doe.com" required />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />

          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </div>
    </Container>
  );
}

export default Login;
