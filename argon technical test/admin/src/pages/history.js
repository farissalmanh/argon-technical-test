import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import DatePicker from "react-datepicker";

import { getAttendance } from "../services/employee.service";
import { formatDatetime } from "../helpers/format-date";

function History(props) {
  const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth();
  const firstDay = new Date(year, month, 1);

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(new Date());
  const [dataTable, setDataTable] = useState([]);

  const getAllAttendance = async () => {
    const where = {
      startDate,
      endDate,
    };
    const { data } = await getAttendance(where);
    setDataTable(data);
  };

  useEffect(() => {
    props.funcNav(true);
    getAllAttendance();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} className="justifyStart">
          <Card>
            <Card.Body className="alignCenter">
              <div>
                Tanggal Mulai: &nbsp;
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div>
                Tanggal Selesai: &nbsp;
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
              <div className="justifyEnd mt-2">
                <Button onClick={getAllAttendance} variant="primary">
                  Cari
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={12} className="mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Karyawan</th>
                <th>Tanggal</th>
                <th>Jam Masuk</th>
                <th>Jam Pulang</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.map((value, index) => (
                <tr key={value.EmployeeAttendanceId}>
                  <td>{index + 1}</td>
                  <td>{value.Employee.EmployeeName}</td>
                  <td>{formatDatetime(value.CreatedAt)}</td>
                  <td>{formatDatetime(value.EmployeeCheckIn)}</td>
                  <td>{formatDatetime(value.EmployeeCheckOut)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default History;
