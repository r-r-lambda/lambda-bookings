const app = require('mock-express')();
const {
  bookingsMockData,
  query,
  release,
  next,
  getUserBookings,
  locationsMockData,
  agenciesMockData,
} = require('../mock/mock-data');

describe('Get users bookings call', () => {
  it('Get bookings by user id', async () => {
    query
      .mockReturnValueOnce(Promise.resolve(bookingsMockData))
      .mockReturnValueOnce(Promise.resolve(locationsMockData))
      .mockReturnValueOnce(Promise.resolve(agenciesMockData));

    const req = { params: { id: 'correo@mail.com' } };
    const res = app.makeResponse(function (err, sideEffects) {
      console.log(sideEffects);
    });
    await getUserBookings(req, res, next);
    console.log(next.mock.calls[0][0]);
    expect(next.mock.calls.length).toBe(1);
  });
});
