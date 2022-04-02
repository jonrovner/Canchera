"use strict";
import { Model, UUIDV4 } from "sequelize";

interface ClubAttributes {
  name: string;
  description: string;
  ciudad: string;
  street: string;
  num: number;
  province: string;
  openHour: number;
  closeHour: number;
  image: string;
  score: number;
  latitude: number;
  longitude: number;
  lowestPrice: number;
  totalRatings: number;  
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Club extends Model<ClubAttributes> implements ClubAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string;
    description!: string;
    ciudad!: string;
    street!: string;
    num!: number;
    province!: string;
    openHour!: number;
    closeHour!: number;
    image!: string;
    score!: number;
    latitude!: number;
    longitude!: number;
    lowestPrice!: number;
    totalRatings!: number;     

    static associate(models: any) {
      // define association here
      Club.belongsTo(models.User);
      Club.hasMany(models.Field);
    }
  }
  Club.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
          len: {
            args: [2, 30],
            msg: "El nombre debe tener mas de 2 caracteres",
          },
        },
      },
      description: {
        type: DataTypes.STRING(1500),
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      openHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      closeHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      score: {
        type: DataTypes.FLOAT,
                               
      },                                                          
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
      lowestPrice: {
        type: DataTypes.INTEGER,
      },
      totalRatings: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      
    },
    {
      sequelize,
      modelName: "Club",
    }
  );
  return Club;
};
