import { filterDogsCreated, filterDogTemp, orderbyName, orderbyWeight } from "./actions/index.js";

describe("Actions", () => {
  it('Debería retornar una action con las propiedades type "FILTER_BY_TEMP" y payload, su valor lo recibe por argumento:', () => {
    expect(filterDogTemp("Playful")).toEqual({
      type: "FILTER_BY_TEMP",
      payload: "Playful",
    });
  });
  it('Debería retornar una action con las propiedades type "filterDogsCreated" y payload, su valor lo recibe por argumento:', () => {
    expect(filterDogsCreated("94a588eb-e98a-43c1-b54a-b5e889660a92")).toEqual({
      type: "FILTER_DOGS_CREATED",
      payload: "94a588eb-e98a-43c1-b54a-b5e889660a92",
    });
  });
  it('Debería retornar una action con la propiedad type "orderbyName" y el payload, su valor lo recibe por argumento:', () => {
    expect(orderbyName("Terrier")).toEqual({
      type: "ORDER_BY_NAME",
      payload: "Terrier",
    });
  }); 
  it('Debería retornar una action con la propiedad type "orderbyWeight" y el payload, su valor lo recibe por argumento:', () => {
    expect(orderbyWeight("Big")).toEqual({
      type: "ORDER_BY_WEIGHT",
      payload: "Big",
    });
  });
});

