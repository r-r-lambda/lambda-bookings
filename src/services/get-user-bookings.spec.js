const app = require('mock-express')();
const rewireMock = require('rewiremock/node');
const dbResponseMock = [
  {
    id_room: 4,
    property_name: 'Room 4',
    price: 50000,
    currency: 'COP',
    rating: 3,
    agency_id: '10',
    thumbnail:
      'https://a0.muscache.com/im/pictures/3b43d6ff-8adb-4de2-ad19-5920f0c2dee3.jpg?aki_policy=small',
    id_booking: 1,
    checkin: '2020-02-06 00:00:00',
    checkout: '2020-02-10 00:00:00',
    total_price: 200000,
  },
];

const query = jest.fn();
const release = jest.fn();
const next = jest.fn();

const getUserBookings = rewireMock.proxy(
  () => require('./get-user-bookings'),
  () => {
    rewireMock.proxy(() => require('../dao/get-user-bookings-dao'), {
      '../config/db-config': {
        promise: () => ({
          connection: () => Promise.resolve({ query, release }),
        }),
      },
    });
  }
);

describe('Get users bookings call', () => {
  it('Get bookings by user id', async () => {
    query.mockReturnValueOnce(Promise.resolve(dbResponseMock));

    const req = app.makeRequest({ params: { id: 'correo@mail.com' } });
    const res = app.makeResponse(function (err, sideEffects) {
      console.log(sideEffects);
    });

    await getUserBookings(req, res, next);
    expect(next.mock.calls.length).toBe(1);
  });
});
