const pool = require('../config/db-config');

const DatabaseError = require('../errors/database-error');

const axios = require('axios');
let connection = await poolPromise.getConnection();
axios
  .post('https://aevpe2f019.execute-api.us-east-2.amazonaws.com/dev/booking/', {
    checkin: '2020-02-06',
    checkout: '2020-02-10',
    email: 'pedro@correo.com',
    name: 'Pedro',
    id_room: 'b34f67ea2345',
  })
  .then((res) => {
    connection.query(
      `INSERT INTO bookings (roomID, checkin, checkout, name, email) VALUES (roomID, checkin, checkout, name, email)`
    );
    console.log(`statusCode: ${res.statusCode}`);
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });

/* const getQuoteDao = async (id) => {
  const poolPromise = pool.promise();

  let result;

  try {
    [
      result,
    ] = await poolPromise.query(
      'SELECT id, quote, image FROM quote WHERE id = ?',
      [id]
    );
  } catch (error) {
    throw new DatabaseError(error);
  }

  return result[0] || null;
}; */

module.exports = getQuoteDao;
