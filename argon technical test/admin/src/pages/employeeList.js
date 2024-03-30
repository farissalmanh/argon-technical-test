import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "../components/modal";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import {
  getEmployeeProfile,
  updateEmployeeProfile,
  createEmployeeProfile,
} from "../services/employee.service";
import { getBase64 } from "../helpers/convert";

const defaultValue = {
  EmployeeName: "",
  EmployeeEmail: "",
  EmployeePosition: "",
  EmployeePhone: "",
  Password: "",
}
function EmployeeList(props) {
  const [dataTable, setDataTable] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [modal, setModal] = useState({
    isShow: false,
    title: "",
  });
  const [employeeDetail, setEmployeeDetail] = useState(defaultValue);

  const getAllEmployee = async () => {
    const { data } = await getEmployeeProfile();
    setDataTable(data);
  };

  useEffect(() => {
    props.funcNav(true);
    getAllEmployee();
  }, []);

  function validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = structuredClone(employeeDetail);
      for (const [key, value] of Object.entries(submitData)) {
        if(!value) return alert("All form must be filled")
        if(key === "EmployeeEmail" && !validateEmail(value)){
          return alert("Email must be in email format")
        }
      }
      // return
      let base64 = ""
      if (selectedImage) {
        base64 = await getBase64(selectedImage)
        submitData["EmployeePhotos"] = base64
      }

      let result;
      if(modal.title === "Tambah") {
        result = await createEmployeeProfile(submitData);
      } else if(modal.title === "Ubah"){
        result = await updateEmployeeProfile(submitData);
      }

      if (result.status === "success") {
        alert(result.message);
        getAllEmployee();
        setModal({...modal, isShow: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const cloneEmployeeDetail = structuredClone(employeeDetail);

    if(name === "EmployeePhone"){
      if (!/[0-9]/.test(value)) {
        return e.preventDefault();
      }
    }
    cloneEmployeeDetail[name] = value;
    setEmployeeDetail(cloneEmployeeDetail);
  };

  const handleCloseModal = () => {
    setModal({ ...modal, isShow: false });
  };

  const bodyModal = () => {
    return (
      <Container fluid>
        <Form>
          <Row>
            {modal.title === "Ubah" && (
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
            )}
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="nama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  name="EmployeeName"
                  value={employeeDetail.EmployeeName}
                  type="text"
                  placeholder="Masukkan Nama"
                  maxLength={50}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="EmployeeEmail"
                  value={employeeDetail.EmployeeEmail}
                  type="email"
                  placeholder="Masukkan Email"
                  maxLength={50}
                  disabled={modal.title === "Ubah"}
                  onChange={onChange}
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
                  onChange={onChange}
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
          </Row>
        </Form>
      </Container>
    );
  };

  const onChangeModal = (statusModal) => {
    setModal({ ...modal, isShow: true, title: statusModal });
  };

  return (
    <Container fluid>
      <Modal
        body={bodyModal()}
        isShow={modal.isShow}
        title={modal.title}
        handleClose={handleCloseModal}
        submit={handleSubmit}
      />
      <Row>
        <Col xs={12} md={12} className="justifyEnd">
          <Button onClick={() => {onChangeModal("Tambah"); setEmployeeDetail(defaultValue);}} variant="success">
            Tambah
          </Button>{" "}
        </Col>
        <Col xs={12} md={12} className="mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Posisi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.map((value, index) => (
                <tr key={value.EmployeeId}>
                  <td>{index + 1}</td>
                  <td>{value.EmployeeName}</td>
                  <td>{value.EmployeeEmail}</td>
                  <td>{value.EmployeePosition}</td>
                  <td>
                    <Button
                      onClick={() => {
                        onChangeModal("Ubah");
                        setEmployeeDetail(value)
                      }}
                      variant="warning"
                    >
                      Ubah
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeList;
