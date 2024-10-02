import express from "express";
import { routerAdopcion } from "./rutas/adopcionRouter.js";
import { db } from "./database/conexion.js";

// Crear instancia de Express
const app = express();
app.use(express.json());

// Verificar conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch(err => {
    console.log("No se pudo conectar a la base de datos:", err);
  });

// Definir rutas
app.get('/', (req, res) => {
    res.send('Hola Sitio Principal');
});

// Llamar rutas de adopción
app.use("/adopcion", routerAdopcion);

// Puerto del servidor
const PORT = 4000;

// Sincronizar la base de datos
db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor inicializado en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Error al sincronizar la base de datos: ${err}`);
  });
