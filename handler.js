'use strict';

const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

const ses = new aws.SES();
const myEmail = process.env.EMAIL;
const myDomain = process.env.DOMAIN;

const emailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'email.html'),
  'utf8'
);

function generateResponse(code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(payload),
  };
}

function generateError(code, err) {
  console.log(err);
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(err.message),
  };
}

function generateEmailParams(body) {
  const { checkin, checkout, email, name, id_room } = JSON.parse(body);
  if (!(CheckIn && checkOut && email && name && id_room)) {
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

module.exports.send = async (event) => {
  try {
    const emailParams = generateEmailParams(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return generateResponse(200, data);
  } catch (err) {
    return generateError(500, err);
  }
};
