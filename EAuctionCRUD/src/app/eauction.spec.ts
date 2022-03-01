import { Seller, Buyer, Product } from './eauction';

describe('Seller', () => {
  it('should create an instance', () => {
    expect(new Seller()).toBeTruthy();
  });
});

describe('Buyer', () => {
  it('should create an instance', () => {
    expect(new Buyer()).toBeTruthy();
  });
});

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product()).toBeTruthy();
  });
});
