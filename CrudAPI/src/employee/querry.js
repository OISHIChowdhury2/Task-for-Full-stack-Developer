const getEmployee ="SELECT * FROM employee";
const getEmployeeById ="SELECT * FROM employee where id=$1";
const addEmployee="INSERT INTO employee(e_name,e_email,e_age,e_salary,e_address,e_joining_date,e_total_sell) Values($1, $2, $3, $4, $5, $6, $7)";
const checkEmailExists ="SELECT s from employee s where s.e_email =$1";
const removeEmployee ="DELETE FROM employee WHERE id=$1";
const updateEmployee= "UPDATE employee SET e_name = $1, e_email = $2, e_age = $3, e_salary = $4, e_address = $5, e_joining_date = $6, e_total_sell = $7 WHERE id = $8 RETURNING *";

// const updateEmployee="UPDATE employee SET e_name = $1, e_email = $2, e_age = $3,e_salary = $4,e_address = $5,e_joining_date =$6,e_total_sell = $7 where id = $8";

module.exports = {
    getEmployee,
    getEmployeeById,
    checkEmailExists,
    addEmployee,
    removeEmployee,
    updateEmployee,
};