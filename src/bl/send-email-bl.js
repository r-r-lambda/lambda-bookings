const emailConfig = require('../config/email-config');
const PropertyRequiedError = require('../errors/property-required-error');
const EmailError = require('../errors/email-error');

const sendEmailBL = async (data) => {
  const { checkin, checkout, email, name, id_room, id_booking } = data;

  if (!(checkin && checkout && email && name && id_room && id_booking)) {
    throw new PropertyRequiedError(
      'Error al enviar el correo de notificación.'
    );
  }

  try {
    const sendInfo = await emailConfig.sendMail({
      from: '"Rest & Rooms" <fernando.areiza@udea.edu.co>', // sender address
      to: email, // list of receivers
      subject: 'Confirmación de Booking - Rest & Rooms ✔', // Subject line
      text: '', // plain text body
      html: `
        <p>
          Estimado ${name} le informamos que su reserva en Rest & Rooms <br>
          queda confirmada con la siguiente información:
        <p>

        <p>
          <strong>Checkin:</strong> ${checkin} <br>
          <strong>Checkout:</strong> ${checkout} <br>
          <strong>Id de reserva:</strong> ${id_booking}
        </p>

        Rest & Rooms le desea un feliz estancia.
      `, // html body
    });

    console.log(sendInfo);

    return sendInfo;
  } catch (error) {
    throw new EmailError(error);
  }
};

module.exports = sendEmailBL;
