import { Table, Tag, Button, Tooltip } from "antd";
import { useHistory } from "react-router-dom";

export const UsersTable = ({ data }) => {
  const history = useHistory();
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "name",
      width: 15,
      fixed: "left",
      render: (text, record) => (
        <Tooltip title="Ver Usuario">
          <Button
            type="link"
            onClick={() =>
              history.push(`/route/edit/${record.cedula}`, { record })
            }
            block
          >
            {`${record.nombre} ${record.apellido}`}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "cedula",
      width: 15,
      responsive: ["md"],
    },
    {
      title: "Estado",
      dataIndex: "estado",
      width: 20,
      key: "estado",
    },
    {
      title: "Vacuna",
      key: "vacuna",
      width: 20,
      dataIndex: "vacuna",
      render: (vacuna, record) => (
        <>
          <h5>{vacuna ?? ""}</h5>

          {record.dosis.map((dosis) => {
            return (
              <Tag color={"geekblue"} key={dosis.num}>
                {`Dosis: ${dosis.num}`}
                <br />
                {`Fecha: ${dosis.fecha}`}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  return (
    <Table
      size="small"
      scroll={{ x: "80vw", y: "60vh" }}
      columns={columns}
      dataSource={data}
      bordered
      rowKey="cedula"
    />
  );
};
