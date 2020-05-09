const pool = require('../config/db-config');

const DatabaseError = require('../errors/database-error');

const createBookingDao = async (data) => {
  const poolPromise = pool.promise();

  let result;

  const { checkin, checkout, email, name, id_room } = data;

  try {
    [result] = await poolPromise.query(
      `INSERT INTO booking 
        (checkin, checkout, email, name, id_room) 
      VALUES 
        (?, ?, ?, ?, ?)`,
      [checkin, checkout, email, name, id_room]
    );
  } catch (error) {
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
