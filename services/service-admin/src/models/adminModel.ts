import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface AdminAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  profilePic?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, "id" | "profilePic" | "createdAt" | "updatedAt"> {}

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public profilePic?: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "admins",
    sequelize,
  }
);

export default Admin;
