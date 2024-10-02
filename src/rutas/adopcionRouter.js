import express from "express";
import { crear, buscar, actualizar, eliminar } from "../controladores/adopcionController.js"; 

const routerAdopcion = express.Router();

routerAdopcion.get('/', (req, res) => {
    res.send('Hola Sitio de Mascotas');
});

routerAdopcion.post('/crear', (req, res) => {
    crear(req, res);
});

routerAdopcion.get('/buscar', (req, res) => {
    buscar(req, res);
});

routerAdopcion.put('/actualizar/:id', (req, res) => {
    //res.send('Actualizar Mascota');
    actualizar(req,res);
});

routerAdopcion.delete('/eliminar/:id', (req, res) => {
    //res.send('eliminar Mascota');
    eliminar(req,res);
});

export { routerAdopcion };
