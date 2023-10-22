import { useQuery } from "@tanstack/react-query";
import { LoadingOverlay, Title } from "@mantine/core";
import { Table } from "../components/Table";
import { getActors } from "./global.api";

function Actors() {
  const actorsQuery = useQuery({
    queryKey: ["get-actors"],
    queryFn: getActors,
  });

  console.log(actorsQuery.data ?? []);

  return (
    <div>
      <Title mb="md"> Actors (movie cast) </Title>

      <LoadingOverlay visible={actorsQuery.isLoading} />

      <Table data={actorsQuery.data ?? []} accessors={["id", "name"]} />
    </div>
  );
}

export default Actors;
