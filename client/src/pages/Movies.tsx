import { Table } from "../components/Table";

export default function Movies() {
  return (
    <div>
      Movies
      <br />
      <br />
      <br />
      <Table
        data={[
          { id: "22", name: "23Ahmad", x: 4 },
          { id: "1", name: "Mohd Ahmad", x: 3 },
          { id: 2, name: "D", x: 1 },
          { id: 3, name: "e", x: 0 },
        ]}
        accessors={["name", "x"]}
      />
    </div>
  );
}
