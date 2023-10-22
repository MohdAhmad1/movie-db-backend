import { useQuery } from "@tanstack/react-query";
import { getGenres } from "./global.api";
import { LoadingOverlay, Title } from "@mantine/core";
import { Table } from "../components/Table";

function Genre() {
  const genreQuery = useQuery({
    queryKey: ["get-genres"],
    queryFn: getGenres,
  });

  return (
    <div>
      <Title mb="md"> Genres </Title>

      <LoadingOverlay visible={genreQuery.isLoading} />

      <Table data={genreQuery.data ?? []} accessors={["id", "name"]} />
    </div>
  );
}

export default Genre;
