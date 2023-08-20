'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_Clinic_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_Clinic_Specialty.init({
    // id:DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    spetialtyId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Doctor_Clinic_SpecialtY',
  });
  return Doctor_Clinic_Specialty;
};