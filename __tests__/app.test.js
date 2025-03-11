const endpointsJson = require("../endpoints.json");
const request = require('supertest');
const db = require("../db/connection.js");
const {app} = require("../app.js");
const testData = require("../db/data/test-data/index.js")
const seed = require('../db/seeds/seed.js')

beforeEach(() => {
  return seed(testData); 
});

afterAll(() => {
  return db.end(); 
});


describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});


describe("GET /api/topics", () => {
  test("200: Responds with all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        console.log(res.body, "<<result of get api/topics")
        expect (res.body.topics.length).toBe(3);
        res.body.topics.forEach(topic => {
          expect(typeof topic.slug).toBe("string")
          expect(typeof topic.description).toBe("string")

        });
      });
  });
});

describe.only("GET /api/articles/:articleid", () => {
  test("200: Responds with articles of an article_id", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((res) => {

        console.log(res.body);
        expect (res.body.articles.length).toBe(1);
          expect(typeof  res.body.articles[0].article_id).toBe("number");
          expect(typeof  res.body.articles[0].title).toBe("string");
          expect(typeof  res.body.articles[0].topic).toBe("string");
          expect(typeof  res.body.articles[0].author).toBe("string");
          expect(typeof  res.body.articles[0].body).toBe("string");
          expect(typeof  res.body.articles[0].created_at).toBe("string");
          expect(typeof  res.body.articles[0].votes).toBe("number");
          expect(typeof  res.body.articles[0].article_img_url).toBe("string");






       // });
      });
  });
});