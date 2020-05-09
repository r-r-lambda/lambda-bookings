const pool = require('../config/db-config');

const DatabaseError = require('../errors/database-error');

const createBookingDao = async (data) => {
  const poolPromise = pool.promise();

  let result;

  try {
    [result] = await poolPromise.query(
      `INSERT INTO booking 
        (checkin, checkout, email, name, id_room) 
      VALUES 
        (?, ?, ?, ?, ?)`,
      [data.checkin, data.checkout, data.email, data.name, data.id_room]
    );
  } catch (error) {
    throw new DatabaseError(error);
  }

  if (!result.insertId) {
    throw new NotFoundError('No fue posible realizar el booking');
  }

  result[0].id_booking = result.insertId;

  return result[0] || null;
};

module.exports = createBookingDao;
