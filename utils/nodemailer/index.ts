// const nodemailer = require("nodemailer");

import nodemailer  from "nodemailer";

// Create a transport object
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    // pass: "wbrknqwssdophyyd",
    pass:process.env.MAIL_PASSWORD
  },
});


export const sendMail = (senderEmail:string,senderName:string,matchedUserEmail:string,matchedUserContact:string,matchedUserName:string,currentAlloted:number,currentLookingFor:number[],remoteAlloted:number,remoteLookingFor:number[]) =>
  new Promise((resolve, reject) => {
    let mailOptions = {
        from: '"KIIT CONNECT" <no-reply@kiitconnect.live>',
        to: senderEmail,
        subject: 'Match Found For Section Swapping',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
            <h1 style="color: #333;">Hey ${senderName},</h1>
            <p>Congratulations! You have found a match for Section Swapping:</p>
      
            <div style="background-color: #fff; border: 1px solid #ccc; padding: 15px; margin-top: 15px;">
              <h2>Details:</h2>
              <h3>Name: ${matchedUserName}</h3>
              <h3>Email: ${matchedUserEmail}</h3>
              <h3>Contact: ${matchedUserContact}</h3>
      
              <h2>Swapping Section Details:</h2>
              <div>
                <h3>Your Details:</h3>
                <p>Alloted: ${currentAlloted}</p>
                <p>Looking For: ${currentLookingFor.join(", ")}</p>
              </div>
              <div>
                <h3>Matched User Details:</h3>
                <p>Alloted: ${remoteAlloted}</p>
                <p>Looking For: ${remoteLookingFor.join(", ")}</p>
              </div>
            </div>
          </div>
        `
      
      
      
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject({ message: "Error Occured", success: false });
      } else {
        // console.log('Email sent: ' + info.response);
        resolve({ message: "Your response has been recorded", success: true });
      }
    });
  });