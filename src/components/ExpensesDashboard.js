import React from 'react';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Cookies} from "react-cookie";
import {useEffect} from "react";
import axios from "axios";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import AddCategoryDialog from "./dialogs/AddCategoryDialog";
import AddExpenseDialog from "./dialogs/AddExpenseDialog";

const cookies = new Cookies();
const cookiesOptions = {expires: new Date(Date.now() + 3600 * 1000)}
const userId = cookies.get("userid");
const token = cookies.get("token");
const baseUrl = 'http://192.168.0.14:8500';


export default function ExpensesDashboard() {
    const [categories, setCategories] = React.useState([]);
    const [expenses, setExpenses] = React.useState([]);


    const getCategories = async () => {
        const response = await fetch(
            `${baseUrl}/categories/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }
        );
        const data = await response.json();
        console.log(data.body);
        setCategories(data.body.categories.categories);

    }

    const getExpenses = async () => {
        const response = await axios.get(
            `${baseUrl}/expenses/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

            }

        );
        setExpenses((await response).data.body.expenses);
    }
    useEffect(() => {
            getExpenses();
            console.log("Expenses",expenses);

        }
        , []);

    return (
        <div className={'container bg-gradient my-5'}>
            <div className={"h3"}>
                <Typography variant={"h4"}>
                    Expenses
                </Typography>
                <Divider/>

                <Typography variant={"h6"} mt={10}>
                    Last Expenses
                </Typography>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Description
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                    Amount
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>
                                        {expense.expense_name}
                                    </TableCell>
                                    <TableCell>
                                        {expense.date_added}
                                    </TableCell>
                                    <TableCell>
                                        {expense.amount}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                <AddCategoryDialog/>
                <AddExpenseDialog/>


            </div>
        </div>
    );
}