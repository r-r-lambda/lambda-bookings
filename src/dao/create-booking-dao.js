const moment = require('moment');

const pool = require('../config/db-config');
const DatabaseError = require('../errors/database-error');
const NotFoundError = require('../errors/not-found-error');

const createBookingDao = async (data) => {
  const poolPromise = pool.promise();

  let result;

  const { checkin, checkout, email, name, id_room } = data;

  const startDate = moment(new Date(checkin));
  const endDate = moment(new Date(checkout));

  const days = endDate.diff(startDate, 'days');

  let connection;
  try {
    connection = await poolPromise.getConnection();

    let [room] = await connection.query(
      `SELECT price
      FROM room
      WHERE id = ?`,
      [id_room]
    );

    if (!room || !room.length || room.length <= 0) {
      throw new NotFoundError('No fue posible realizar el booking');
    }

    let total_price = room[0].price * days;

    [result] = await connection.query(
      `INSERT INTO booking 
        (checkin, checkout, email, name, id_room, total_price) 
      VALUES 
        (?, ?, ?, ?, ?, ?)`,
      [checkin, checkout, email, name, id_room, total_price]
    );

    connection.release();
  } catch (error) {
    if (connection) {
      connection.release();
    }
    throw new DatabaseError(error);
  }

  if (!result.insertId) {
    throw new NotFoundError('No fue posible realizar el booking');
  }

  return {
    id_booking: result.insertId,
    checkin,
    checkout,
    email,
    name,
    id_room,
  };
};

module.exports = createBookingDao;
