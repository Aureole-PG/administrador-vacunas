import { Table, Tag, Button, Typography } from "antd";
const { Paragraph } = Typography;
import { useHistory } from "react-router-dom";
import moment from "moment";
export const UsersTable = ({ data }) => {
  const history = useHistory();
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "name",
      align: "left",
      width: 50,
      fixed: "left",
      render: (text, record) => (
        // <Tooltip title="Ver Usuario">
        <Button
          type="link"
          onClick={() =>
            history.push(`/route/edit/${record.cedula}`, { record })
          }
        >
          {`${record.nombre} ${record.apellido}`}
        </Button>
        // </Tooltip>
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
      width: 30,
      dataIndex: "vacuna",
      render: (vacuna, record) => (
        <>
          <h5>{vacuna ?? ""}</h5>
          {record.estado == "vacunado" && (
            <Tag color={"geekblue"}>
              {`Dosis: ${record.dosis}`}
              <br />
              {`Fecha: ${moment(record.fecha_dosis).format("DD/mm/yyyy")}`}
            </Tag>
          )}
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
