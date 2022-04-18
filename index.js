import Express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = Express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());
app.use(logs);

app.listen(3001, () => {
    console.log("Server is live! PORT: 3001");
});

function logs(req, res, next){
    console.log(`${req.method}: ${req.originalUrl}`);
    console.log(req,res);
    next();
}