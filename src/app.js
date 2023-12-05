import express from    "express";
import employeesRoutes  from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js"


const app = express();
app.use(express.json());  //esta lineA es para que express use json para gestionar datos con la base de datos


app.use(indexRoutes)
app.use('/api',employeesRoutes);  //Prefijo API para llamar las paginas

//Validar si ingresan una pagina que no existe a traves de un cliente frontend por ejemplo
app.use( (req, res, next)=>{
    res.status(404).json({message: "endpoint/url no found"})
})

export default app;