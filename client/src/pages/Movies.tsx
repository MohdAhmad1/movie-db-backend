import { useQuery } from "@tanstack/react-query";
import { Table } from "../components/Table";
import { getMovies } from "./global.api";
import { Button, Group, LoadingOverlay, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Movies() {
  const movieQuery = useQuery({
    queryKey: ["get-movies"],
    queryFn: getMovies,
  });

  return (
    <div>
      <Group mb="md" justify="space-between">
        <Title> Movies </Title>

        <Button component={Link} to={"/create-movie"}>
          Create New
        </Button>
      </Group>

      <LoadingOverlay visible={movieQuery.isLoading} />

      <Table data={movieQuery.data ?? []} accessors={["name", "x"]} />
    </div>
  );
}
