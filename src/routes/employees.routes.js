import {Router} from 'express';
import {getEmployees , createEmployee, updateEmployee, deleteEmployee, getEmployee} from '../controllers/employees.controller.js'  //Importando funcion que devuelve los empleados

const router = Router();

//Al hacer localhost:3000/employees muestra el mensaje 'obteniendo empleados'
//Indican que al visitar cada una de las paginas ejecutar la funcion correspondiente
router.get('/employees', getEmployees);   
router.get('/employees/:id', getEmployee);

router.post('/employees', createEmployee);   

router.patch('/employees/:id', updateEmployee);     //Put debe actua1lizar todos los campos y patch solo los que necesitemos

router.delete('/employees/:id', deleteEmployee );   

export default router
