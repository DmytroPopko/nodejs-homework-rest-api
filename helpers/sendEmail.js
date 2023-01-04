const sgMail = require('@sendgrid/mail')

const {SENGRID_API_KEY} = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async(data) => {
    const email = {...data, from: "sosokmu@meta.ua"};
    await sgMail.send(email);
    return true;
}

module.exports = sendEmail;
