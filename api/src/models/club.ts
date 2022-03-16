'use strict';
import { Model, UUIDV4 } from 'sequelize';

interface ClubAttributes {
  id: number;
  name: string;
  description: string;
  location: string;
  openHour: number;
  closeHour: number;
  image: string;
  score: string;   
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Club extends Model<ClubAttributes>
  implements ClubAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    description!: string;
    location!: string;
    openHour!: number;
    closeHour!: number;
    image!: string;
    score!: string; 

    static associate(models: any) {
      // define association here
      Club.belongsTo(models.User);
      Club.hasMany(models.Field)
      
    }
  }
  Club.init({
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
        isAlphanumeric: { msg: "El nombre solo debe contener letras y numeros"},
        len: {
          args: [2, 30],
          msg: "El nombre debe tener mas de 2 caracteres"
        },
      }
    },    
    description: {
      type: DataTypes.STRING(1500)      
      },        
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },    
    openHour: {
      type: DataTypes.INTEGER,
      allowNull: false 
      },
    closeHour: {
      type: DataTypes.INTEGER,
      allowNull: false 
      },    
    image: {
      type: DataTypes.STRING
    },
    score: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5']      
    }
   
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};