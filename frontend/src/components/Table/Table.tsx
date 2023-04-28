import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TFormValue } from "../Forms/Forms";

type TTableProps = {
  allExpanse: TFormValue[];
  onClickDeleteHandler: (id?: string) => void;
  onClickEditHandler: (id?: string) => void;
};

const Table: React.FC<TTableProps> = ({
  allExpanse,
  onClickDeleteHandler,
  onClickEditHandler,
}) => {
  return (
    <>
      <div className="table-responsive container mt-3">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">category</th>
              <th scope="col">Refrence</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {allExpanse.map((item) => (
              <tr key={item._id}>
                <th scope="row">{item._id}</th>
                <td>{item.date}</td>
                <td>{item.amount}</td>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>{item.refrence}</td>
                <td className="d-flex gap-3 mt-2">
                  <button onClick={() => onClickEditHandler(item._id)} className="border border-0 bg-transparent">
                    <AiOutlineEdit size={22} color={"Blue"} />
                  </button>
                  <button onClick={() => onClickDeleteHandler(item._id)} className="border border-0 bg-transparent">
                    <AiOutlineDelete size={22} color={"red"} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
