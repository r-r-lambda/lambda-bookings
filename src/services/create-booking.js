const creteBookingDao = require('../dao/create-booking-dao');
const sendEmailBL = require('../bl/send-email-bl');

const PropertyRequiedError = require('../errors/property-required-error');

const createBooking = async (req, res, next) => {
  try {
    const { checkin, checkout, email, name, id_room } = req.body;

    if (!checkin) {
      throw new PropertyRequiedError('El parámetro checking es requerido');
    }

    if (!checkout) {
      throw new PropertyRequiedError('El parámetro checkout es requerido');
    }

    if (!email) {
      throw new PropertyRequiedError('El parámetro email es requerido');
    }

    if (!name) {
      throw new PropertyRequiedError('El parámetro name es requerido');
    }

    if (!id_room) {
      throw new PropertyRequiedError('El parámetro id_room es requerido');
    }

    const bookingData = await creteBookingDao(req.body);

    await sendEmailBL(bookingData);

    res.send(bookingData);
  } catch (error) {
    next(error, req, res, next);
  }
};

module.exports = createBooking;
