import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent({isShow, handleClose, title, body, submit}) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={isShow} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {body}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Tutup</Button>
          <Button variant="primary" type='button' onClick={submit}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;