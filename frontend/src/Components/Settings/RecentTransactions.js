import React from 'react';
import { useRecentTransactionsQuery } from '../../features/users/usersSlice';
import { useSelector } from 'react-redux';
import Tab from 'react-bootstrap/Tab';

const RecentTransactions = () => {
    const id = useSelector((state) => state.auth.id);
    const { data: transactions, isLoading, isError, error } = useRecentTransactionsQuery(id);
    let rowNumber = 1;
    if(isLoading){
        return <p>Loading...</p>
    }

    if(isError){
        console.log(error);
        return <p>Something went wrong</p>
    }
    console.log(transactions);
    transactions.map((transaction, index) => {
        let courses = transaction.courses;

        courses.map((course, index) => {
            console.log(course.name);
        })
    })
  
    return (
        <>
            <h3>Recent Transactions</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Transaction ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Courses</th>
                        <th>Transaction Made</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                   
               {transactions.map((transaction, index) => (
    <tr key={index}>

        
        <td>{index + 1}</td>
        <td>{transaction.transaction_id}</td>
        <td>{transaction.username}</td>
        <td>{transaction.userEmail}</td>
        <td>
           {
            transaction.courses.map((course, index) => (
                <p key={index}>{course.name} , </p>
            ))    
           }
        </td>
        <td>{transaction.transaction_made}</td>
        <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
    </tr>
))}



                </tbody>
            </table>
        </>
    )
}

export default RecentTransactions;
