const { query } = require('express');
const { is } = require('type-is');
const pool =require('../../db');

const queries = require("./querry");
const getEmployee= (req, res)=>{
    pool.query(queries.getEmployee, (error,results)=>{
    if(error) throw error;
    res.status(200).json(results.rows);
})
};

const getEmployeeById= (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getEmployeeById,[id],(error, results)=>{
    if(error) throw error;
    res.status(200).json(results.rows);
})
};

// const addEmployee= (req, res)=>{
//     const {e_name,e_email,e_age,e_salary,e_address,e_joining_date,e_total_sell}= req.body;
//     pool.query(queries.checkEmailExists,[e_email],(error,results)=>{
//         if(results.rows.length){
//             res.send("email already exists");
//         }
//         //add Employee
//         pool.query(queries.addEmployee,
//             [e_name,e_email,e_age,e_salary,e_address,e_joining_date,e_total_sell],(error,results)=>{
//         if(error) throw error;
//         res.status(201).send("created");
//         })
    
//     });
// };


const addEmployee = (req, res) => {
    const {
        e_name,
        e_email,
        e_age,
        e_salary,
        e_address,
        e_joining_date,
        e_total_sell
    } = req.body;

    pool.query(queries.checkEmailExists, [e_email], (error, results) => {
        if (error) {
            console.error("Error checking email:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (results.rows.length) {
            return res.status(400).json({ message: "email already exists" });
        }

        // Add Employee
        pool.query(
            queries.addEmployee,
            [
                e_name,
                e_email,
                e_age,
                e_salary,
                e_address,
                e_joining_date,
                e_total_sell
            ],
            (error, results) => {
                if (error) {
                    console.error("Error adding employee:", error);
                    return res.status(500).json({ message: "Internal Server Error" });
                }

                return res.status(201).json({ message: "Employee created successfully" });
            }
        );
    });
};


const removeEmployee = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getEmployeeById,[id], (error, results)=>{
        const noEmployeeFound = !results.rows.length;
       if (noEmployeeFound){
        res.send("not exist");
       }
    pool.query(queries.removeEmployee, [id] ,(error, results) =>{
   
        if(error) throw error;
    res.status(200).send("delected");
       });
});
};

const updateEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    const {e_name} = req.body;
    const {e_email} =  req.body;
    const {e_age} =  req.body;
    const {e_salary} = req.body;
    const {e_address} =  req.body;
    const {e_joining_date} =  req.body;
    const {e_total_sell} =  req.body;

    pool.query(queries.getEmployeeById,[id], (error, results)=>{
        const noEmployeeFound = !results.rows.length;
       if (noEmployeeFound){
        res.send("not exist");
       }
       else{
    pool.query(queries.updateEmployee,[e_name,e_email,e_age,e_salary,e_address,e_joining_date,e_total_sell,id ],(error, results) =>{
        if(error) throw error;
        res.status(200).send("Updatesd!");
       });
    }
});
};


module.exports={
    getEmployee,
    getEmployeeById,
    addEmployee,
    removeEmployee,
    updateEmployee,
};