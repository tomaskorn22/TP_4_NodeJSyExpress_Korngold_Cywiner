import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
import { sumar, restar, multiplicar, dividir } from './matematica.js'; // Importamos las funciones matemáticas

const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)

// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

// Endpoints comunes

app.get('/', (req, res) => { // EndPoint "/"
    res.status(200).send('¡Ya estoy respondiendo!');
});

app.get('/saludar/:nombre', (req, res) => { // EndPoint "/saludar/:nombre"
    const { nombre } = req.params; // Accedemos al parámetro 'nombre'
    res.status(200).send(`Hola ${nombre}`);
});

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => { // EndPoint "/validarfecha/:ano/:mes/:dia"
    const { ano, mes, dia } = req.params;
    const fecha = new Date(`${ano}-${mes}-${dia}`);
    if (isNaN(fecha.getTime())) {
        res.status(400).send('Fecha no válida');
    } else {
        res.status(200).send('Fecha válida');
    }
});

// Endpoints matemáticos que reutilizan el módulo matematica.js

app.get('/matematica/sumar', (req, res) => { // EndPoint "/matematica/sumar"
    const { n1, n2 } = req.query; // Extraemos los números de los parámetros query
    const resultado = sumar(Number(n1), Number(n2)); // Llamamos a la función de sumar
    res.status(200).send(`Resultado de la suma: ${resultado}`);
});

app.get('/matematica/restar', (req, res) => { // EndPoint "/matematica/restar"
    const { n1, n2 } = req.query; 
    const resultado = restar(Number(n1), Number(n2));
    res.status(200).send(`Resultado de la resta: ${resultado}`);
});

app.get('/matematica/multiplicar', (req, res) => { // EndPoint "/matematica/multiplicar"
    const { n1, n2 } = req.query;
    const resultado = multiplicar(Number(n1), Number(n2));
    res.status(200).send(`Resultado de la multiplicación: ${resultado}`);
});

app.get('/matematica/dividir', (req, res) => { // EndPoint "/matematica/dividir"
    const { n1, n2 } = req.query;
    if (n2 == 0) {
        res.status(400).send('El divisor no puede ser cero');
    } else {
        const resultado = dividir(Number(n1), Number(n2));
        res.status(200).send(`Resultado de la división: ${resultado}`);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
