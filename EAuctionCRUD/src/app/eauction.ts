export class Seller {
  SellerId: string;
  FirstName: string;
  LastName: string;
  DateofBirth: Date;
  EmailId: string;
  Gender: string;
  CountryId: string;
  StateId: string;
  Cityid: string;
  Address: string;
  Pincode: string;
  Country: string;
  State: string;
  City: string;
}

export class Buyer {
  BuyerId: string;
  BuyerFirstName: string;
  BuyerLastName: string;  
  BuyerEmailId: string;
  BuyerState: string;
  BuyerCity: string;
  BuyerAddress: string;
  BuyerPincode: string;  
  BuyersProductId: string;
  BidAmount: string;
  BuyerMobileNo: string;
}


export class Product {
  ProductId: string;
  ProductName: string;
  ShortDescription: string;  
  DetailedDescription: string;
  Category: string;
  StartingPrice: BigInteger;
  BidEndDate: string;
}

export class Country {
  CountryId: string;
  CountryName: string;
}

export class State {
  StateId: string;
  StateName: string;
  CountryId: string;
}

export class City {
  Cityid: string;
  CityName: string;
  StateId: string;
  CountryId: string;
}
