import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const adopcion = db.define("adopcion", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true  
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 50],
        msg: "El nombre debe tener entre 1 y 50 caracteres"
      }
    }
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 30
    }
  },
  raza: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 30],
        msg: "La raza debe tener entre 1 y 30 caracteres"
      }
    }
  },
  sexo: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['M', 'F']],
        msg: "El sexo debe ser 'M' o 'F'"
      }
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

export { adopcion };
