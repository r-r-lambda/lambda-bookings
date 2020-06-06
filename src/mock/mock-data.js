const rewireMock = require('rewiremock/node');

const locationsMockData = [
  {
    latitude: 10.9878,
    longitude: -74.788,
    name: 'Barranquilla',
    code: 'BAQ',
  },
];

const agenciesMockData = [
  {
    id: '10',
    name: 'Lambda Team',
    logo_url:
      'https://www.sphereinc.com/wp-content/uploads/2019/03/Three-Options-and-Tips-for-Creating-a-Python-AWS-Lambda-Function.png',
  },
];

const bookingsMockData = [
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
  () => require('../services/get-user-bookings'),
  () => {
    console.log('rewireOne');
    rewireMock(
      () => require('../dao/get-user-bookings-dao'),
      () => {
        rewireMock(() => require('../config/db-config')).with({
          promise: () => ({
            connection: () => Promise.resolve({ query, release }),
          }),
        });
      }
    );
  }
);

module.exports = {
  bookingsMockData,
  query,
  release,
  next,
  getUserBookings,
  locationsMockData,
  agenciesMockData,
};
