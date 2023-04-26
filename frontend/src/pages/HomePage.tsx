import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layouts/Layout';
import Modals from '../components/Modals/Modals';
import { TFormValue } from '../components/Forms/Forms';
import { serverUrl } from '../utitls/proxy';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spin from '../components/Loading/Spin';
import Table from '../components/Table/Table';
import { Form } from 'react-bootstrap';



const HomePage  = () => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [allExpanse,setAllExpanse] = useState<TFormValue[]>([]);
  const [values, setValues] = useState<TFormValue>({
    amount: 0,
    type: '',
    date: '',
    category: '',
    refrence: '',
    description: ''
  });
  const [frequency,setFrequency] = useState("7");
 const [type, setType] = useState('all');

  const getAllExpanses = useCallback(async () => {
    try {

      const userJson = localStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      setLoading(true);
     const res = await axios.post(`${serverUrl}/get/transection`,{userid: user._id,frequency,type});
     setLoading(false);
     setAllExpanse(res.data);
     console.log(res.data);
     
   } catch (error) {
     console.log(error);
      toast.error('Fetch Issue With Transction');
   }
  },[frequency,type])

  useEffect(() => {
      getAllExpanses();
  },[getAllExpanses])
  

  const ExpanseFunction = useCallback(async(values: TFormValue) => {
    try {
      const userJson = localStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
       setLoading(true);
      await axios.post(`${serverUrl}/add/transection`,{
        ...values,
        userid: user._id
      });
      setLoading(false);
      toast.success('Expense Added Successfully...');
      setShow(false);
   } catch (error) {
     setLoading(false)
      toast.error('Something went wrong!');
   }
  },[]);

  const onSubmit = async (values: TFormValue) => {
    ExpanseFunction(values);
  }

  return (
    <Layout>
        {loading && <Spin />}
        <div className="filters">
        <Form.Group className="mb-3" controlId="formBasicFrequency">
        <Form.Label>Select Frequency</Form.Label>
        <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value) }>
          <option value={"7"}>LAST 1 Week</option>
          <option value={"30"}>LAST 1 Month</option>
          <option value={"365"}>LAST 1 Year</option>
          <option value={"730"}>LAST 2 Year</option>
          <option value={"1825"}>LAST 5 Year</option>
        </Form.Select>
      </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicType">
        <Form.Label>Select Type</Form.Label>
        <Form.Select value={type} onChange={(e) => setType(e.target.value) }>
          <option value={"all"}>All</option>
          <option value={"income"}>INCOME</option>
          <option value={"expense"}>EXPENSE</option>
        </Form.Select>
      </Form.Group>

            <div>              
            <Modals show={show} setShow={setShow} values={values} setValues={setValues} onSubmit={onSubmit} />
            </div>
        </div>
        <div className="content">
          <Table allExpanse={allExpanse} />
        </div>
    </Layout>
  )
};

export default HomePage;