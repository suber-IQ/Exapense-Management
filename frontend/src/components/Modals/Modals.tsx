import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Forms, { TFormValue } from '../Forms/Forms';

type TModal ={
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  values: TFormValue;
  setValues: React.Dispatch<React.SetStateAction<TFormValue>>;
  onSubmit: (values: TFormValue) => void;
}


const Modals: React.FC<TModal> = ({show, setShow, values,setValues,onSubmit}) => {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      Add New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Forms values={values} setValues={setValues} onSubmit={onSubmit}  />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modals;