const PropertyRequiedError = require('../errors/property-required-error');
const getUserBookingsDao = require('../dao/get-user-bookings-dao');

const getUserBookings = async (req, res, next) => {
  try {
    console.log(req);
    const userEmail = req.params.id || null;

    if (!userEmail) {
      throw new PropertyRequiedError('id');
    }

    const bookings = await getUserBookingsDao(userEmail);

    if (bookings) {
      res.status(200).send(bookings);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error, req, res, next);
  }
};

module.exports = getUserBookings;
