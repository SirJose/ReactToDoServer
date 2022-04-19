import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { todos } from "./database/index.js";

const app = Express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
app.use(logs);

app.listen(3001, () => {
    console.log("Server is live! PORT: 3001");
});

function logs(req, res, next){
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}

// -------------------------------------------------------

app.get("/", (req,res) => res.send("<h1>TEST!</h1>"));

// GET ALL
app.get("/todos", async (req, res) => {

    const filtroTexto = req.query.texto;
    const filtroEstado = req.query.estado;
    let result;

    if(filtroTexto){
        result = await todos.filtroTexto(filtroTexto);

    } else if(filtroEstado){
        result = await todos.filtroEstado(filtroEstado);

    } else {
        result = await todos.all();
    }

    res.json(result);
});

// POST 
app.post("/todos", async (req, res) => {
    const todo = await todos.add(req.body);
    res.status(201);
    res.json(todo);
});

// GET BY ID
app.get("/todos/:codigo", async (req, res) => {
    const codigo = parseInt(req.params.codigo);
    const todo = await todos.single(codigo);

    if(!todo){
        res.status(404);
        res.json({ mensaje: "No existe ningun To-Do con codigo " + codigo });
    } else {
        res.status(200);
        res.json(todo);
    }
});

// UPDATE
app.put("/todos/:codigo", async (req, res) => {

    const codigo = parseInt(req.params.codigo);

    try{
        const newToDo = await todos.update(codigo, req.body);
        res.status(200);
        res.json(newToDo);
    } catch (mensaje){
        res.status(404);
        res.json({ mensaje });
    }

})

// DELETE
app.delete("/todos/:codigo", async (req, res) => {

    const codigo = parseInt(req.params.codigo);
    
    try{
        await todos.remove(codigo);
        res.status(200);
        res.json({ message: "Producto eliminado" });
    } catch(mensaje){
        res.status(404);
        res.json({ mensaje });
    }
})