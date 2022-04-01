'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  rol: string;
  status: boolean;
  resetPassword:string;
  authorized: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
  implements UserAttributes {    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    email!: string;
    password!: string;
    rol!: string;
    status!: boolean;
    resetPassword!: string;
    authorized!: boolean;
    static associate(models: any) {
      // define association here   
       User.hasOne(models.Club);
       User.hasMany(models.Booking);
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {               
        len: {
          args: [2, 30],
          msg: "El nombre debe tener mas de 2 caracteres"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull:{msg: "No puede estar vacio"},
        isEmail: {msg: "Debe ser un email valido"}           
      }
    },
    password: {
      type: DataTypes.STRING,        
    },
    rol: {
      type: DataTypes.ENUM,
      values: ['user', 'owner', 'admin'],
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue:false    
      //allowNull: false,
    },
    resetPassword:{
      type:DataTypes.STRING
    },
    authorized:{
      type: DataTypes.BOOLEAN,
      defaultValue:false      
    }
   
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};