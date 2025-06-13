/*

a parking lot with multiple sot types
support bikes cars, and trucks
synamic slot allocation based on vechicles size
payment processing with multiple methods
entry ticket issuance and exit validation

*/

enum VECHICLE_TYPE {
  CAR = "CAR",
  BIKE = "BIKE",
}

class ParkingLot {
  parkingSlotList: ParkingSlot[] = [];
}

class ParkingSlot {
  vehicleType: VECHICLE_TYPE;
  isOccupied: boolean = true;
}

abstract class Vehicle {
  licensePlate: string;
  vehicleType: VECHICLE_TYPE;
  //here we can store the parking fee stratergy
  constructor(licensePlate: string, vehicleType: VECHICLE_TYPE) {
    this.licensePlate = licensePlate;
    this.vehicleType = vehicleType;
  }
}

interface PaymentStrategy {
  processPayment(amount: number): boolean;
}

interface ParkingFeeStrategy {
  calculateParkingFee(
    vehicleType: VECHICLE_TYPE,
    duration: number,
    durationType: string
  ): void;
}

class HourlyRateStrategy implements ParkingFeeStrategy {
    calculateParkingFee(vehicleType: VECHICLE_TYPE, duration: number, durationType: string): void {
        //here you can put up you logic to calculate the parking fee
    }
}


