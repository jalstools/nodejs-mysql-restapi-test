import app from "./app.js"
import {PORT} from "./config.js"

//Puerto de escucha en la web
app.listen(PORT)

console.log("Server running on port", PORT);