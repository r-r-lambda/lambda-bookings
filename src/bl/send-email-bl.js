const emailConfig = require("../config/email-config");
const Mustache = require('mustache');
const emailTemplate = fs.readFileSync(
    path.resolve(__dirname, 'email.html'),
    'utf8'
  );
const sendEmailBL = async  (data)=>{
    const { checkin, checkout, email, name, id_room } = JSON.parse(data);
        if (!(checkIn && checkOut && email && name && id_room)) {
        throw new Error('Missing parameters! Make sure to add all parameters.');
            }
    return {
    Source: myEmail,
    Destination: { ToAddresses: [myEmail] },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF8',
          Data: Mustache.render(emailTemplate, {
            checkin,
            checkout,
            email,
            name,
            id_room,
          }),
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `You received a message from ${myDomain}!`,
      },
    },
  };
}

module.exports = sendEmailBL;