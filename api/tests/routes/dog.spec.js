/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  id: 'bcaf121f-4dab-4129-90c5-50ae9512eb7f', 
  weight: '8',
  height: '25',
  life_span: '14',
  temperament: "Clever",
  image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Mops-falk-vom-maegdebrunnen-internationaler-champion-fci.jpg' 
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /api/dogs', () => {
    it('should get 200', () =>
      agent.get('/api/dogs').expect(200)
    );
  });
});

describe("Obtiene un Dog por id o por name", () => {
  describe("GET /api/dogs/:id", () => {
    it("Se espera una respuesta 200 si se pasa un id", () =>
      agent.get("/api/dogs/bcaf121f-4dab-4129-90c5-50ae9512eb7f").expect(200));
  });
  
  describe("GET /api/dogs?name=xxx", () => {
    it("Si se recibe name devuelve una respuesta 200", () =>
      agent.get("/api/dogs?name=Pug").expect(200));
  });

  describe('/api/temperament', function() {
    it('GET respond with a status 200 if you find temperaments', () =>
      agent.get('/api/temperament').expect(200)); 
    });
  })


