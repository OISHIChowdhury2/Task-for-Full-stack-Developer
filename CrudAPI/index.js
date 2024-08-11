const express =require('express')
const EmployeeRoutes = require('./src/employee/routes')
const app = express();
const myMiddleware = require('./src/employee/middleware/myMiddleware');
const cors = require ("cors");

app.use(myMiddleware);
const port = 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("hi");
});
app.use('/api/v1/employee', EmployeeRoutes);
app.listen(port, () => console.log(`app server ${port}`));