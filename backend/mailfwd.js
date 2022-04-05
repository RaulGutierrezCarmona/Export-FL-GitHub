var AWS = require('aws-sdk');
var ses = new AWS.SES();
 
var RECEIVER = '-Aqui la dirección de correo destino (empresa)-';
var SENDER =   '-Aqui la dirección de correo origen (formulario de contacto)-';

var response = {
 "isBase64Encoded": false,
 "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'us-west-2.amazonses.com'},
 "statusCode": 200,
 "body": "{\"result\": \"Success.\"}"
 };

exports.handler = function (event, context) {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
};
 
function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Name: ' + event.name + '\nPhone: ' + event.phone + '\nEmail: ' + event.email + '\nMessage: ' + event.desc,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}