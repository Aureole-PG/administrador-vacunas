import { useState, useEffect } from "react";
import { Row, Col, Select, DatePicker, Switch, Space, Radio } from "antd";
// import data from "../../../utils/empleados.json";
import { UsersTable } from "./table";
import { getUsers } from "../../../store/users";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;
const Dasboard = () => {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [auxFilter, setAuxFilter] = useState([]);
  const [filter, setFilter] = useState(false);
  const [estado, setEstado] = useState("todos");
  const [dateValue, setDateValue] = useState(null);
  const handleChange = (value) => {
    const vacunados = allUsers.filter((e) => e.estado === "vacunado");
    setDateValue(null);
    if (value !== "todos") {
      const newfilter = vacunados.filter((e) => e.vacuna === value);
      setAuxFilter([...newfilter]);
      setFilterData([...newfilter]);
    } else {
      setFilterData([...vacunados]);
      setAuxFilter([...vacunados]);
    }
  };
  const onChangeState = (e) => {
    const estado = e.target.value;
    setEstado(estado);
    setFilterData([...allUsers]);
    if (estado !== "todos") {
      setFilterData(allUsers.filter((e) => e.estado === estado));
      setAuxFilter(allUsers.filter((e) => e.estado === estado));
    }
  };
  const onDateChange = (e) => {
    setDateValue(e);
    if (e === null) {
      setFilterData(auxFilter);
    } else {
      const datefilter = auxFilter.filter(
        (data) =>
          moment(data.fecha_dosis) >= e[0] && moment(data.fecha_dosis) <= e[1]
      );
      setFilterData([...datefilter]);
    }
  };
  useEffect(() => {
    let data = getUsers();
    setFilterData([...data]);
    setAllUsers([...data]);
    setLoading(false);
  }, [loading]);
  if (loading) {
    return <div>Cargando</div>;
  }
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <Space>
            Filtrar datos
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              onChange={() => setFilter(!filter)}
            />
          </Space>
        </Col>
      </Row>
      {filter && (
        <Row gutter={[16, 16]} style={{ marginBlock: 15 }}>
          <Col xs={24}>
            <label>Estado </label>
            <Radio.Group
              defaultValue="todos"
              onChange={onChangeState}
              optionType="button"
            >
              <Radio.Button value="todos">Todos</Radio.Button>
              <Radio.Button value="vacunado">Vacunado</Radio.Button>
              <Radio.Button value="no vacunado">No vacunado</Radio.Button>
            </Radio.Group>
          </Col>
          {estado === "vacunado" && (
            <>
              <Col>
                <label> Vacuna </label>
                <Select
                  defaultValue="todos"
                  style={{ width: 120 }}
                  onChange={handleChange}
                >
                  <Option value="todos">Todos</Option>
                  <Option value="Sputnik">Sputnik</Option>
                  <Option value="AstraZeneca">AstraZeneca</Option>
                  <Option value="Pfizer">Pfizer</Option>
                  <Option value="Jhonson&Jhonson">Jhonson&Jhonson</Option>
                </Select>
              </Col>
              <Col>
                <label>Rango de fechas </label>
                <RangePicker
                  format={"DD-MM-yyyy"}
                  value={dateValue}
                  onChange={onDateChange}
                  picker="week"
                />
              </Col>
            </>
          )}
        </Row>
      )}
      <Row gutter={[16, 16]}>
        <Col style={{ marginTop: "10px" }}>
          <UsersTable data={filterData} />
        </Col>
      </Row>
    </>
  );
};

export default Dasboard;
