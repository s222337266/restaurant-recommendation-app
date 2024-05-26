const chai = require('chai');
const expect = chai.expect;
const app = require('../app');
const request = require('supertest')(app);

describe('Restaurant Recommendation App', function() {
    describe('POST /restaurants', function() {
        it('should create a new restaurant', function(done) {
            const restaurant = {
                name: 'Test Restaurant',
                cuisine: 'Test Cuisine',
                location: 'Test Location',
                rating: 4
            };
            request.post('/restaurants')
                .send(restaurant)
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.have.property('id');
                    expect(res.body.name).to.equal(restaurant.name);
                    expect(res.body.cuisine).to.equal(restaurant.cuisine);
                    expect(res.body.location).to.equal(restaurant.location);
                    expect(res.body.rating).to.equal(restaurant.rating);
                    done();
                });
        });
    });

    // Add more test cases for other endpoints (GET, PUT, DELETE) as needed
});
