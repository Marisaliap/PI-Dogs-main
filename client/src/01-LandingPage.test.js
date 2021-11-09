import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import LandingPage from "./components/LandingPage"
import { NavLink } from 'react-router-dom'; 

configure({ adapter: new Adapter() });

describe("<LandingPage />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });

  it("deberia renderizar e1 componente <NavLink />", () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
});


