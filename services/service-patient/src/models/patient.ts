import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database';


export const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    age: {  
          type: DataTypes.INTEGER,   
           allowNull: false, 
 },

    gender:{
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false
    }

});

    