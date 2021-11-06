/* import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/* import { CreateDog } from "../actions"; 
import configureStore from "redux-mock-store";
import  CreateDog,  { CreateDog } from "../components/CreateDog.js"; 
import   CreateDog,  { CreateDog } from "../components/CreateDog.jsx"; */

//MI CODIGO

import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
/* import configureStore from "redux-mock-store"; */


import CreateDog from "./components/CreateDog"



configure({ adapter: new Adapter() });

describe("<CreateDog />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CreateDog />);
    });
    xit("Renderiza un <form>", () => {
      expect(wrapper.find("form")).toHaveLength(1);
    });

    xit('Renderiza un label con el texto igual a "Name:"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(0).text()).toEqual("Name");
    });

    xit('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Height:"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(1).text()).toEqual("Height:");
    });

    xit('Renderiza un input con la propiedad "name" igual a "min_height"', () => {
      expect(wrapper.find('textarea[name="min_height"]')).toHaveLength(1);
    });

    xit('Renderiza un input con la propiedad "name" igual a "max_height"', () => {
      expect(wrapper.find('textarea[name="max_height"]')).toHaveLength(1);
    });

    xit('Renderiza un label con el texto igual a "Weight:"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(2).text()).toEqual("Weight:");
    });

    xit('Renderiza un input con la propiedad "name" igual a "min_weight"', () => {
      expect(wrapper.find('input[name="min_weight"]')).toHaveLength(1);
    });

    xit('Renderiza un input con la propiedad "name" igual a "max_weight"', () => {
      expect(wrapper.find('input[name="max_weight"]')).toHaveLength(1);
    });

    xit('Renderiza un label con el texto igual a "Life Span:"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(3).text()).toEqual("Life Span:");
    });

    xit('Renderiza un input con la propiedad "name" igual a "life_span"', () => {
      expect(wrapper.find('input[name="life_span"]')).toHaveLength(1);
    });

    xit('Renderiza un label con el texto igual a "Image:"', () => {
      // El orden en el que se encuentran los Labels es importante.
      expect(wrapper.find("label").at(3).text()).toEqual("Image:");
    });

    xit('Renderiza un input con la propiedad "name" igual a "image"', () => {
      expect(wrapper.find('input[name="image"]')).toHaveLength(1);
    });

    xit('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });
  });
});