import express from "express"; 
import cors from "cors"; 
import { sumar, restar, multiplicar, dividir } from './matematica.js'; 

const app = express();
const port = 3000; 


app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => { 
    res.status(200).send('¡Ya estoy respondiendo!');
});

app.get('/saludar/:nombre', (req, res) => { 
    res.status(200).send(`Hola ${nombre}`);
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => { 
    const { ano, mes, dia } = req.params;
    const fecha = new Date(`${ano}-${mes}-${dia}`);
    if (isNaN(fecha.getTime())) {
        res.status(400).send('Fecha no válida');
    } else {
        res.status(200).send('Fecha válida');
    }
});



app.get('/matematica/sumar', (req, res) => { 
    const { n1, n2 } = req.query; 
    const resultado = sumar(Number(n1), Number(n2)); 
    res.status(200).send(`Resultado de la suma: ${resultado}`);
});

app.get('/matematica/restar', (req, res) => {
    const { n1, n2 } = req.query; 
    const resultado = restar(Number(n1), Number(n2));
    res.status(200).send(`Resultado de la resta: ${resultado}`);
});

app.get('/matematica/multiplicar', (req, res) => { 
    const { n1, n2 } = req.query;
    const resultado = multiplicar(Number(n1), Number(n2));
    res.status(200).send(`Resultado de la multiplicación: ${resultado}`);
});

app.get('/matematica/dividir', (req, res) => {
    const { n1, n2 } = req.query;
    if (n2 == 0) {
        res.status(400).send('El divisor no puede ser cero');
    } else {
        const resultado = dividir(Number(n1), Number(n2));
        res.status(200).send(`Resultado de la división: ${resultado}`);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
