import { TFormValue } from "../Forms/Forms";

type TTableProps = {
  allExpanse: TFormValue[];
}

const Table: React.FC<TTableProps> = ( {allExpanse}) => {
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
           
              {
             allExpanse && allExpanse.map((item)  => (
                  <tr key={item._id}>
                    <th scope="row">{item._id}</th>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.type}</td>
                    <td>{item.category}</td>
                    <td>{item.refrence}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
