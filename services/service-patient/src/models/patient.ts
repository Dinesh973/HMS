import {DataTypes} from 'sequelize';
import sequelize from '../config/database';


const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    gender:{
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false
    }

})

export default Patient;     