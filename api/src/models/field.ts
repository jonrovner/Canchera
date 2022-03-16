'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface FieldAttributes {
  id: number;
  players: number;
  price: number;  
  image: string;
  light: boolean;   
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Field extends Model<FieldAttributes>
  implements FieldAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    players!: number;
    price!: number;
    image!: string;
    light!: boolean;
   

    static associate(models: any) {
      // define association here
       Field.belongsTo(models.Club);
      
    }
  }
  Field.init({
    id: {
      type: DataTypes.INTEGER,      
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    players: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: { msg: "La cantidad de jugadores tiene que ser un numero"},        
      },      
    },    
    price: {
      type: DataTypes.INTEGER,   
      allowNull: false   
      }, 
    image: {
      type: DataTypes.STRING       
      },
    light: {
      type: DataTypes.BOOLEAN,       
      },    
  }, {
    sequelize,
    modelName: 'Field',
  });
  return Field;
};