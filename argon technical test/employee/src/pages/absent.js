import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { dateTimeToHourMinutes } from "../helpers/format-date";
import { getAttendance, updateAbsent } from "../services/employee.service";

function Absent(props) {
  const payload = JSON.parse(localStorage.getItem("employeeDetail"));

  const [statusAbsent, setStatusAbsent] = useState("Masuk");
  const [todayAbsent, setTodayAbsent] = useState([]);
  
  const checkCurrentAbsent = () => {
    const hour = dayjs().hour();

    if (hour >= 12) {
      setStatusAbsent("Pulang");
    }
  };
  
  const checkEmployeeTodayAbsent = async () => {
    const where = {
      currentDate: dayjs().format("YYYY-MM-DD"),
      employeeId: payload.EmployeeId,
    };
    const { data } = await getAttendance(where);
    setTodayAbsent(data[0]);
  };
  
  useEffect(() => {
    props.funcNav(true);
    checkCurrentAbsent();
    checkEmployeeTodayAbsent();
  }, []);

  const checkInOut = async () => {
    const data = {
      status: statusAbsent,
      isExist: todayAbsent ? true : false,
      employeeId: payload.EmployeeId
    };
    const result = await updateAbsent(data);
    if (result.status === "success") {
      alert(result.message);
      window.location.reload();
    }
  };

  return (
    <Container className="mainContainer">
      <Row>
        {todayAbsent?.EmployeeCheckIn ? (
          <>
            <Col xs={12} md={12} className="justifyCenter">
              Hari ini Anda masuk pada jam{" "}
              {`${dateTimeToHourMinutes(todayAbsent?.EmployeeCheckIn)}`}
            </Col>
          </>
        ) : statusAbsent === "Masuk" && !todayAbsent?.EmployeeCheckIn ? (
          <>
            <Col xs={12} md={12} className="justifyCenter">
              Silahkan klik tombol Absen {`${statusAbsent}`}
            </Col>
            <Col xs={12} md={12} className="justifyCenter mt-2">
              <Button onClick={checkInOut} variant="primary">
                Absen {`${statusAbsent}`}
              </Button>{" "}
            </Col>
          </>
        ) : (
          <></>
        )}
        {todayAbsent?.EmployeeCheckOut ? (
          <>
            <Col xs={12} md={12} className="justifyCenter">
              Hari ini Anda pulang pada jam{" "}
              {`${dateTimeToHourMinutes(todayAbsent?.EmployeeCheckOut)}`}
            </Col>
          </>
        ) : statusAbsent === "Pulang" && !todayAbsent?.EmployeeCheckOut ? (
          <>
            <Col xs={12} md={12} className="justifyCenter">
              Silahkan klik tombol Absen {`${statusAbsent}`}
            </Col>
            <Col xs={12} md={12} className="justifyCenter mt-2">
              <Button onClick={checkInOut} variant="primary">
                Absen {`${statusAbsent}`}
              </Button>{" "}
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
}

export default Absent;
