import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SearchBar from "./components/SearchBar";

configure({ adapter: new Adapter() });

describe("<SearchBar />", () => {
  let wrapper;
  let name;
  beforeEach(() => {
    name = "Pug";
    wrapper = mount(<input value={name}/>);
  });

  it('deberia renderizar un "div" que contenga un imput con el "name" que recibe por props', () => {
    expect(wrapper.contains(<input value={name}/>)).toEqual(true);
  });
});

