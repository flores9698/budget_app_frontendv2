import React from 'react';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Cookies} from "react-cookie";

const cookies = new Cookies();
const cookiesOptions = {expires: new Date(Date.now() + 3600 * 1000)}
const userId = cookies.get("userid");
const token = cookies.get("token");
const baseUrl = 'http://192.168.0.14:8500';



export default function ExpensesDashboard() {

    const [expenses, setExpenses] = React.useState([]);

    const getExpenses = async () => {
        const response = await fetch(
            `${baseUrl}/expenses/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            }
        );
        const data = await response.json();
        setExpenses(data.body.expenses);
    }
    return (
        <div className={'container bg-gradient my-5'}>
            <div className={"h3"}>
                <Typography variant={"h4"} >

                </Typography>
                <Divider/>



            </div>
        </div>
    );
}