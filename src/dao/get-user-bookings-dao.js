const moment = require('moment');

const pool = require('../config/db-config');
const DatabaseError = require('../errors/database-error');

const getUserBookingsDao = async (userEmail) => {
  const poolPromise = pool.promise();

  let rooms;

  let connection;
  try {
    connection = await poolPromise.getConnection();

    [rooms] = await connection.query(
      `SELECT r.id as id_room, r.property_name, r.price, r.currency, r.rating, r.agency_id, i.url as thumbnail, b.id_booking, b.checkin, b.checkout, b.total_price
      FROM booking as b
      INNER JOIN room as r ON (r.id = b.id_room)
      INNER JOIN room_images as i ON (i.room_id = r.id AND i.is_thumbnail = 1)
      INNER JOIN location as l ON (r.id = l.room_id)
      INNER JOIN city as c ON (c.id = l.city_id)
      WHERE b.email = ?`,
      [userEmail]
    );

    for (let room of rooms) {
      room.checkin = moment(room.checkin).format('YYYY-MM-DD');
      room.checkout = moment(room.checkout).format('YYYY-MM-DD');

      const [location] = await connection.query(
        `SELECT l.latitude, l.longitude, c.name, c.code
        FROM location as l
        INNER JOIN city as c ON (c.id = l.city_id)
        WHERE l.room_id = ?`,
        [room.id_room]
      );

      room.location = location[0];

      const [agency] = await connection.query(
        `SELECT id, name, logo_url
        FROM agency
        WHERE id = ?`,
        [room.agency_id]
      );

      room.agency = agency[0];
      delete room.agency_id;
    }

    connection.release();
  } catch (error) {
    if (connection) {
      connection.release();
    }
    throw new DatabaseError(error);
  }

  return rooms || null;
};

module.exports = getUserBookingsDao;
