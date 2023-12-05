import {pool} from '../db.js'

//export const getEmployees = (req, res)=>  res.send('Obteniendo empleados')
export const getEmployees = async (req, res)=>  
{
   try {
     // throw new Error("Server Error") //Disparando un error a proposito para validar el try catch
      const [rows] = await pool.query("select * from employee ")
      res.json(rows)
   } catch (error) {
      return res.status(500).json({message: "Algo anda mal"})
   }
}
export const getEmployee = async (req, res)=>  
{
   try {
      const [rows] = await pool.query("select * from employee where id = ?", [req.params.id])
      //Mensaje no existe empleado
      if(rows.length <= 0) return res.status(404).json({
           message: "Employee not found" 
      })
      res.json(rows[0])   //Devuelve siempre la linea 0
   } catch (error) {
      return res.status(500).json({message: "Algo anda mal"})
   } 
}
//

export const createEmployee = async (req, res)=>   {
   try {
      const {name, salary} = req.body
      const [rows] = await  pool.query('insert into employee (name, salary) values (?,?)', [name, salary])
      res.send({
                  id: rows.insertId,
                  name,
                  salary,
               })
   } catch (error) {
      return res.status(500).json({message: "Algo anda mal"})
   }
   
   
}

export const deleteEmployee = async (req, res) => {
   try {
      const [result] = await pool.query("delete from employee where id = ?", [req.params.id])
      if (result.affectedRows <= 0) return res.status(404).json({ message: "Employee not found" })

      res.sendStatus(204) //Accion ok pero no ha hecho nada
   } catch (error) {
      return res.status(500).json({ message: "Algo anda mal" })
   }
}

export const updateEmployee = async (req, res) => {
   try {
      const { id } = req.params   //viene como parametro en la url
      const { name, salary } = req.body   //vienen en el cuerpo en un archivo json que simula que los datos vienen del frontend

      const [result] = await pool.query("update employee set name = IFNULL(?, name), salary = ISNULL(?, salary) where id=? ", [name, salary, id])
      console.log(result)
      if (result.affectedRows === 0) return res.status(404).json({ message: "Employee not found" })

      //Devolver el registro que se ha actualizado
      const [rows] = await pool.query("select * from employee where id = ? ", [id])

      res.json(rows[0])
   } catch (error) {

   }
  
  

}
