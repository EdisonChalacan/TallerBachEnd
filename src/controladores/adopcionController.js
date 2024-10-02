import { adopcion } from "../modelos/adopcionModelo.js"; 

// Función para crear una nueva mascota en adopción
const crear = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({
            mensaje: "El nombre no puede estar vacío."
        });
    }

    const dataset = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        raza: req.body.raza,
        sexo: req.body.sexo,
        color: req.body.color
    };

    adopcion.create(dataset)
        .then((resultado) => {
            res.status(201).json("Registro creado.");
        })
        .catch((err) => {
            res.status(500).json(`Registro no creado: ${err}`);
        });
};

const buscar = (req, res) => {
    adopcion.findAll()
        .then((mascotas) => {
            res.status(200).json(mascotas);
        })
        .catch((err) => {
            res.status(500).json(`Error al buscar mascotas: ${err}`);
        });
};

// Actualizar Mascota
const actualizar = (req, res) => {
    const id = req.params.id;

    // Verificar si se pasaron datos para actualizar
    if (!req.body.nombre && !req.body.edad && !req.body.raza && !req.body.sexo && !req.body.color) {
        res.status(400).json({
            mensaje: "No se encontraron datos para actualizar"
        });
        return;
    }

    // Extraer los datos del cuerpo de la solicitud
    const { nombre, edad, raza, sexo, color } = req.body;

    // Realizar la actualización
    adopcion.update(
        { nombre, edad, raza, sexo, color },  // Campos a actualizar
        { where: { id } }                    // Condición: el id de la mascota
    ).then((resultado) => {
        if (resultado[0] === 0) {
            // Si no se actualizó ninguna fila
            res.status(404).json({
                tipo: 'error',
                mensaje: "No se encontró la mascota para actualizar"
            });
        } else {
            // Si se actualizó correctamente
            res.status(200).json({
                tipo: 'success',
                mensaje: "Registro actualizado correctamente"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            tipo: 'error',
            mensaje: `Error al actualizar registro: ${err}`
        });
    });
};


// Eliminar Mascota
const eliminar = (req, res) => {
    const id = req.params.id;

    // Verificar si se pasó un ID
    if (!id) {
        res.status(400).json({
            mensaje: "No se proporcionó un ID válido"
        });
        return;
    }

    // Eliminar el registro con el ID especificado
    adopcion.destroy({ where: { id } })
        .then((resultado) => {
            if (resultado === 0) {
                // Si no se eliminó ninguna fila
                res.status(404).json({
                    tipo: 'error',
                    mensaje: "No se encontró la mascota para eliminar"
                });
            } else {
                // Si la mascota fue eliminada
                res.status(200).json({
                    tipo: 'success',
                    mensaje: "Registro eliminado correctamente"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar el registro: ${err}`
            });
        });
};

// Exportar las funciones
export { crear, buscar, actualizar, eliminar };



