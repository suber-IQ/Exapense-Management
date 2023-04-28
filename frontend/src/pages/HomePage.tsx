import {  useCallback, useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { AiOutlineUnorderedList, AiOutlineAreaChart } from "react-icons/ai";
import Modals from "../components/Modals/Modals";
import { TFormValue } from "../components/Forms/Forms";
import { serverUrl } from "../utitls/proxy";
import axios from "axios";
import { toast } from "react-toastify";
import Spin from "../components/Loading/Spin";
import Table from "../components/Table/Table";
import { Form } from "react-bootstrap";
import Analytics from "../components/Analytics/Analytics";

// interface EditableItem {
//   _id?: string;
// }

const HomePage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [allExpanse, setAllExpanse] = useState<TFormValue[]>([]);
  const [values, setValues] = useState<TFormValue>({
    amount: 0,
    type: "",
    date: "",
    category: "",
    refrence: "",
    description: "",
  });
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState<TFormValue | null>();


  // get all data api

  const getAllExpanses = useCallback(async () => {
    try {
      const userJson = localStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      setLoading(true);
      const res = await axios.post(`${serverUrl}/get/transection`, {
        userid: user._id,
        frequency,
        type,
      });
      setLoading(false);
      setAllExpanse(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Fetch Issue With Transction");
    }
  }, [frequency, type]);

  useEffect(() => {
    getAllExpanses();
  }, [getAllExpanses]);

  // delete api 
const deleteHandler = useCallback(async (id?: string) => {
  try {
    setLoading(true);
    await axios.delete(`${serverUrl}/delete/transection/${id}`,);
    setLoading(false);
    toast.success("Deleted Transacation Successfully...");
  } catch (error) {
    setLoading(false);
    console.log(error);
    toast.error("Deleted Issue With Transction");

  }
  
},[])


  // edit and create api 

  const ExpanseFunction = useCallback(async (values: TFormValue) => {
    try {
      const userJson = localStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      setLoading(true);
      // const transactionId: string | undefined = editable?._id;
      if(editable){
        await axios.put(`${serverUrl}/edit/transection`, {
          payload: {
            ...values,
            userId: user._id
          },
          transactionId: editable._id
        });
        setLoading(false);
        toast.success("Expense Updated Successfully...");

      }else{
        await axios.post(`${serverUrl}/add/transection`, {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        toast.success("Expense Added Successfully...");
      }
      setShow(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
    }
  }, [editable]);

  const onSubmit = async (values: TFormValue) => {
    ExpanseFunction(values);
  };

  // edit and delete Handler 
  const onClickEditHandler = (id?: string): void => {
   
    const editableItem = allExpanse.find((item) => item._id === id);
    if(id){
      setEditable(editableItem)
      console.log(editableItem);
      setShow(true);  
      setValues({
        amount: Number( editableItem?.amount),
        type: String(editableItem?.type),
        date: String(editableItem?.date),
        category: String(editableItem?.category),
        refrence: String(editableItem?.refrence),
        description: String(editableItem?.description)
      })
    }
      
  }

  // deleted handler
  const onClickDeleteHandler = (id?: string) => {
    if(id){
      deleteHandler(id);
      
    }
  }

  return (
    <Layout>
      {loading && <Spin />}
      <div className="filters">
        <Form.Group className="mb-3" controlId="formBasicFrequency">
          <Form.Label>Select Frequency</Form.Label>
          <Form.Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value={"7"}>LAST 1 Week</option>
            <option value={"30"}>LAST 1 Month</option>
            <option value={"365"}>LAST 1 Year</option>
            <option value={"730"}>LAST 2 Year</option>
            <option value={"1825"}>LAST 5 Year</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>Select Type</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value={"all"}>All</option>
            <option value={"income"}>INCOME</option>
            <option value={"expense"}>EXPENSE</option>
          </Form.Select>
        </Form.Group>
        
        <div className="d-flex gap-2 border border-secondary-subtle rounded p-2 mt-2">
            <AiOutlineUnorderedList className={`${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} style={{cursor: 'pointer'}} size={25} onClick={() => setViewData('table')} />
            <AiOutlineAreaChart className={`${viewData === 'analytics' ? 'active-icon' :  'inactive-icon'}`} style={{cursor: 'pointer'}} size={25}  onClick={() => setViewData('analytics')} />
          </div>
        <div>
          <Modals
            show={show}
            setShow={setShow}
            values={values}
            setValues={setValues}
            onSubmit={onSubmit}
            title={editable ? 'Edit Transaction' : 'Add Transection'}
          />
        </div>
      </div>
      <div className="content">
        {
              viewData === 'table' ? <Table onClickDeleteHandler={onClickDeleteHandler} onClickEditHandler={onClickEditHandler} allExpanse={allExpanse}  /> : <Analytics allExpanse={allExpanse} />
      
         }
      </div>
    </Layout>
  );
};

export default HomePage;
