import { TFormValue } from "../Forms/Forms";
import ProgressBar from 'react-bootstrap/ProgressBar';


type TTableProps = {
    allExpanse: TFormValue[];

  }



const Analytics: React.FC<TTableProps> = ({ allExpanse}) => {

    const categories: string[] = [
        "salary",
        "tip",
        "project",
        "food",
        "movie",
        "bills",
        "medical",
        "fees",
        "tax"
       ]; 

    const totalTransaction = allExpanse.length;
    const totalIncomeTransactions = allExpanse.filter((transaction: TFormValue) => transaction.type === 'income');
    
    const totalExpenseTransactions = allExpanse.filter((transaction: TFormValue) => transaction.type === 'expense');

    const totalIncomePercent = ( Number(totalIncomeTransactions.length) / Number(totalTransaction)) * 100;
    const totalExpensePercent =  ( Number(totalExpenseTransactions.length) / Number(totalTransaction)) * 100;

    // total turnover

    const totalTurnover = allExpanse.reduce((acc: number,transaction: TFormValue) => {
       return acc + transaction.amount;
    },0);

    const totalIncomeTurnover= allExpanse.filter((transaction: TFormValue) => transaction.type === 'income').reduce((acc: number,transaction: TFormValue) => {
        return acc + transaction.amount
    },0)
    const totalExpenseTurnover = allExpanse.filter((transaction: TFormValue) => transaction.type === 'expense').reduce((acc: number,transaction: TFormValue) => {
        return acc + transaction.amount
    },0)

  const totalIncomeTurnoverPercent = (Number(totalIncomeTurnover) / Number(totalTurnover)) * 100;
  const totalExpenseTurnoverPercent = (Number(totalExpenseTurnover) / Number(totalTurnover)) * 100;



  return (
    <>
    <div className="row m-3">
         <div className="col-md-4">
            <div className="card">
               <div className="card-header">
                  Total Transactions : { totalTransaction}
               </div>
               <div className="card-body">
                    <h5 className="text-primary">Income: { totalIncomeTransactions.length } </h5>
                    <ProgressBar animated now={Number(totalIncomePercent.toFixed(0))} label={` ${totalIncomePercent.toFixed(0)}%`} />
                    <div className="mt-4">
                    <h5 className="text-danger">Expense: { totalExpenseTransactions.length } </h5>
                    <ProgressBar variant="danger" animated now={Number(totalExpensePercent.toFixed(0))} label={`${totalExpensePercent.toFixed(0)}%`} />
                    </div>
               </div>
            </div>
         </div>
         <div className="col-md-4">
            <div className="card">
               <div className="card-header">
                  Total TurnOver : ₹ { totalTurnover}
               </div>
               <div className="card-body">
                    <h5 className="text-primary">Income: ₹ { totalIncomeTurnover} </h5>
                    <ProgressBar animated now={Number(totalIncomeTurnoverPercent.toFixed(0))} label={`${totalIncomeTurnoverPercent.toFixed(0)}%`} />
                    <div className="mt-4">
                    <h5 className="text-danger">Expense: ₹ { totalExpenseTurnover } </h5>
                    <ProgressBar variant="danger" animated now={Number(totalExpenseTurnoverPercent.toFixed(0))} label={`${totalExpenseTurnoverPercent.toFixed(0)}%`} />
                    </div>
               </div>
            </div>
         </div>
    </div>
    <div className="row m-3">
        <div className="col-md-4">
            <h4>Categorywise Income</h4>
            {
               categories.map((category: string,index: number) => {
                const amount: number = allExpanse
                  .filter((transaction: TFormValue) => transaction.type === 'income' && transaction.category === category)
                  .reduce((acc: number, transaction: TFormValue) => acc + transaction.amount, 0);
                      return (
                        <div className="card" key={index + 1} >
                            <div className="card-body">
                                <h5>{category}</h5>
                    <ProgressBar animated now={Number(((Number(amount)/Number(totalIncomeTurnover)) * 100).toFixed(0))} label={`${((Number(amount)/Number(totalIncomeTurnover)) * 100).toFixed(0)}%`} />

                            </div>
                        </div>
                      )
                })
            }
        </div>
        <div className="col-md-4">
            <h4>Categorywise Expense</h4>
            {
               categories.map((category: string,index: number) => {
                const amount: number = allExpanse
                  .filter((transaction: TFormValue) => transaction.type === 'expense' && transaction.category === category)
                  .reduce((acc: number, transaction: TFormValue) => acc + transaction.amount, 0);
                      return (
                        <div className="card" key={index+1}>
                            <div className="card-body">
                                <h5>{category}</h5>
                    <ProgressBar animated now={Number(((Number(amount)/Number(totalExpenseTurnover)) * 100).toFixed(0))} label={`${((Number(amount)/Number(totalExpenseTurnover)) * 100).toFixed(0)}%`} />

                            </div>
                        </div>
                      )
                })
            }
        </div>
    </div>
    </>
  )
};

export default Analytics;