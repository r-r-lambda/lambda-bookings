const PropertyRequiedError = require('../errors/property-required-error');

const bookingRoom = async (req, res, next) => {
  try {
    req.post(/* const roomId = req.query.roomId || null;
    const checkIn = req.query.checkIn || null;
    const checkOut = req.query.checkOut || null;
    const name = req.query.name || null;
    const email = req.query.email || null; */


    res.send({
      message: `La habitación ${roomId} fue reservada desde ${checkIn} hasta ${checkOut}, su código de reserva es ${bookingID}`,
    });
  } catch (error) {
    next(error, req, res, next);)
  }
};

module.exports = bookingRoom;
