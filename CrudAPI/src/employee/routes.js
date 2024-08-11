const { Router }= require('express')
const router = Router();
// const router = express.Router();
// router.use(someMiddleware); 
const {
    getEmployee,
    addEmployee,
    getEmployeeById,
    removeEmployee,
    updateEmployee,
  } = require("./controller");
  const {
    addUserValidation
  } = require('./userVal');

router.get("/", getEmployee); 
router.post("/",addUserValidation,addEmployee);
router.get("/:id", getEmployeeById); 
router.delete("/:id", removeEmployee); 
router.put("/:id", updateEmployee); 

module.exports =router;