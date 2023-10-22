import { useQuery } from "@tanstack/react-query";
import { Table } from "../components/Table";
import { getMovies } from "./global.api";
import { Button, LoadingOverlay } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Movies() {
  const movieQuery = useQuery({
    queryKey: ["get-movies"],
    queryFn: getMovies,
  });

  return (
    <div>
      <Button mb={"xl"} component={Link} to={"/create-movie"}>
        Create Movie
      </Button>

      <LoadingOverlay visible={movieQuery.isLoading} />

      <Table data={movieQuery.data ?? []} accessors={["name", "x"]} />
    </div>
  );
}
