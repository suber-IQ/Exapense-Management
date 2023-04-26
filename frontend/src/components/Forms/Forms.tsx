import { ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export type TFormValue = {
    amount: number;
    type: string;
    date: string;
    category: string;
    refrence?: string;
    description: string
    createdAt?: string;
    userid?:string;
    updatedAt?: string;
    __v?: number;
    _id?: string;
}

type TFormProps = {
    onSubmit: (values: TFormValue) => void;
    values: TFormValue;
    setValues: React.Dispatch<React.SetStateAction<TFormValue>>;
}

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const Forms: React.FC<TFormProps> = ({values,setValues,onSubmit}) => {



    const handleInputChange = (event: ChangeEvent<FormControlElement>): void => {
        const { name, value } = event.target;
     
        setValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
         onSubmit(values);
          setValues({
            amount: 0 ,
            type: '',
            date: '',
            category: '',
            refrence: '',
            description: ''
        })
     }
    
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control onChange={handleInputChange} value={values.amount} name='amount' type="number" placeholder="Enter Amount" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicType">
        <Form.Label>type</Form.Label>
        <Form.Select name="type" value={values.type} onChange={handleInputChange} >
        <option>Select type</option>
          <option  value={"income"}>Income</option>
          <option value={"expense"}>Expense</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>category</Form.Label>
        <Form.Select name="category" onChange={handleInputChange}  value={values.category} >
          <option>Select Category</option>
          <option value={"salary"}>Salary</option>
          <option value={"tip"}>Tip</option>
          <option value={"project"}>Project</option>
          <option value={"food"}>Food</option>
          <option value={"movie"}>Movies</option>
          <option value={"bills"}>Bills</option>
          <option value={"Medical"}>Medical</option>
          <option value={"fees"}>Fees</option>
          <option value={"tax"}>Tax</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Date</Form.Label>
        <Form.Control  onChange={handleInputChange} value={values.date} name='date' type="date" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRefrence">
        <Form.Label>Refrence</Form.Label>
        <Form.Control  onChange={handleInputChange} value={values.refrence} name='refrence' type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control value={values.description} onChange={handleInputChange} name='description' type="text" />
      </Form.Group>     
      <Button variant="primary" type="submit">
       Save
      </Button>
    </Form>
  );
}

export default Forms;