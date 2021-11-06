/* import { render, screen } from '@testing-library/react'; */
/* import App from './App'; */
/* 
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});  */

//Mi CODIGO *****************************************

import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";

import App from './App.js'; 

import { BrowserRouter, Route, Switch } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import CreateDog from "./components/CreateDog"
import Detail from "./components/Detail"


configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe("El componente Landing Page debe renderizar solo en la ruta /.", () => {
    it('Debería renderizarse solo en la ruta "/"', () => {
      const wrapper = mount(
      <BrowserRouter>
        <Switch>
         <Route exact path= "/"/>
        </Switch>
      </BrowserRouter>
      );
      expect(wrapper.find(LandingPage)).toHaveLength(0);
    });
  });
  
  it("El componente Home debe renderizar sólo en la ruta /home", () => {
    const wrapper = mount(
      <BrowserRouter>
        <Switch>
         <Route path= "/home"/>
        </Switch>
      </BrowserRouter>
    );

    expect(wrapper.find(Home)).toHaveLength(0);
  });

  it("El componente CreateDog debe renderizar en la ruta /dog.", () => {
    const container = mount(
      <BrowserRouter>
      <Switch>
       <Route path="/dog"/>
      </Switch>
    </BrowserRouter>
    );
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(CreateDog)).toHaveLength(0);
  });

  it("El componente Detail debe renderizar en la ruta /dogs/:id.", () => {
    const container = mount(
      <BrowserRouter>
      <Switch>
      <Route path="/dogs/:id"/>
      </Switch>
    </BrowserRouter>
    );
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(CreateDog)).toHaveLength(0);
    expect(container.find(Detail)).toHaveLength(0);
  });
}); 