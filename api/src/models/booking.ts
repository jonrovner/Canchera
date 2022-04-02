'use strict';
import { Model } from 'sequelize';

interface BookingAttributes {
  id: number;
  time: number;
  paymentPending: boolean; 
  rated: boolean; 
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Booking extends Model<BookingAttributes>
  implements BookingAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    */
    id!: number;
    time!: number;
    paymentPending!: boolean;
    rated!: boolean;

    static associate(models: any) {
      // define association here
      Booking.belongsTo(models.User);
      Booking.belongsTo(models.Field)
      
    }
  }
  Booking.init({
    id: {
      type: DataTypes.INTEGER,      
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,       
    },    
    paymentPending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false     
    }, 
    rated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false     
    }, 

  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};