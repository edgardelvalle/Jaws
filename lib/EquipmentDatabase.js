import Equipment from '../models/equipment.js';

export default class EquipmentDatabase {
  constructor() {
    this.equipmentDatabase = Equipment;
  }
  checkEquipment(equipment) {
    let equipmentExists = false;
    for (let i = 0; i < this.equipmentDatabase.length; i++) {
      if (equipment == this.equipmentDatabase[i]) {
        equipmentExists = true;
      }
    }
    return equipmentExists;
  }
  addEquipment(equipment) {
    //add workout
    // equipmentExists = false;
    // for (let i = 0; i < equipmentDatabase.length; i++){
    //     if (equipment == equipmentDatabase[i]){
    //         equipmentExists = true;
    //     }
    // }
    if (this.checkEquipment(equipment)) this.equipmentDatabase.push(equipment);
  }
  removeEquipment(equipment) {
    //remove workout
    for (let i = 0; i < this.equipmentDatabase.length; i++) {
      if (equipment == this.equipmentDatabase[i]) {
        this.equipmentDatabase.splice(i, 1);
      }
    }
  }
  getEquipmentDatabase() {
    if (this.equipmentDatabase == null) {
      //or NaN
      return 'empty';
    }
    return this.equipmentDatabase;
  }
}
