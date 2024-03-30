import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import {
  getEmployeeProfile,
  updateEmployeeProfile,
} from "../services/employee.service";
import { getBase64 } from "../helpers/convert";

function Profile(props) {
  const [employeeDetail, setEmployeeDetail] = useState({
    EmployeeName: "",
    EmployeeEmail: "",
    EmployeePosition: "",
    EmployeePhone: "",
    Password: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const employeeProfile = async () => {
    const payload = JSON.parse(localStorage.getItem("employeeDetail"));
    const mainFilter = {
      EmployeeEmail : payload.EmployeeEmail
    }
    const { data } = await getEmployeeProfile(mainFilter);
    setEmployeeDetail(data[0]);
  };

  useEffect(() => {
    props.funcNav(true);
    employeeProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = structuredClone(employeeDetail);

      if (selectedImage) {
        getBase64(selectedImage, async (result) => {
          submitData["EmployeePhotos"] = result;
        });
      }
      const result = await updateEmployeeProfile(submitData);
      if (result.status === "success") {
        alert(result.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const cloneEmployeeDetail = structuredClone(employeeDetail);

    cloneEmployeeDetail[name] = value;
    setEmployeeDetail(cloneEmployeeDetail);
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={12} className="justifyCenter">
            <Image
              src={employeeDetail.EmployeePhotos}
              roundedCircle
              fluid
              width={200}
              height={200}
              className="mb-3"
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="nama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                name="EmployeeName"
                value={employeeDetail.EmployeeName}
                type="text"
                placeholder="Masukkan Nama"
                maxLength={50}
                disabled
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="EmployeeEmail"
                value={employeeDetail.EmployeeEmail}
                type="text"
                placeholder="Masukkan Email"
                maxLength={50}
                disabled
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="posisi">
              <Form.Label>Posisi</Form.Label>
              <Form.Control
                name="EmployeePosition"
                value={employeeDetail.EmployeePosition}
                type="text"
                placeholder="Masukkan Posisi"
                maxLength={50}
                disabled
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="handphone">
              <Form.Label>Nomor Handphone</Form.Label>
              <Form.Control
                name="EmployeePhone"
                value={employeeDetail.EmployeePhone}
                type="text"
                placeholder="Masukkan Nomor Handphone"
                maxLength={15}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                name="EmployeePhoto"
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                name="Password"
                type="password"
                placeholder="Password"
                maxLength={30}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={12} className="mb-2 justifyEnd">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Profile;
