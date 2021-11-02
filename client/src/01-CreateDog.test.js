/* import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { CreateDog } from "../actions";
import configureStore from "redux-mock-store";
import CreateDog, { CreateDog } from "../components/CreateDog.js";

configure({ adapter: new Adapter() });

describe("<CreateDog />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<AddTodo />);
    });
    it("Renderiza un <form>", () => {
      expect(wrapper.find("form")).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Name"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(0).text()).toEqual("Name");
    });

    it('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Description"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(1).text()).toEqual("Description");
    });

    it('Renderiza una textarea con la propiedad "name" igual a "description"', () => {
      expect(wrapper.find('textarea[name="description"]')).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Place"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(2).text()).toEqual("Place");
    });

    it('Renderiza un input con la propiedad "name" igual a "place"', () => {
      expect(wrapper.find('input[name="place"]')).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Date"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(3).text()).toEqual("Date");
    });

    it('Renderiza un input con la propiedad "name" igual a "date"', () => {
      expect(wrapper.find('input[name="date"]')).toHaveLength(1);
    });

    it('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });
  });
});
 */