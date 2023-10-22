import { useQuery } from "@tanstack/react-query";
import { Table } from "../components/Table";
import { getMovies } from "./global.api";
import { LoadingOverlay } from "@mantine/core";

export default function Movies() {
  const movieQuery = useQuery({
    queryKey: ["get-movies"],
    queryFn: getMovies,
  });

  return (
    <div>
      <LoadingOverlay visible={movieQuery.isLoading} />

      <Table data={movieQuery.data ?? []} accessors={["name", "x"]} />
    </div>
  );
}
