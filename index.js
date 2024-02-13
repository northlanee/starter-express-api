const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
// const { google } = require("googleapis");
// const { OAuth2Client } = require("google-auth-library");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const adminEmail = "ovdiichuk.oleksandr@gmail.com";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: adminEmail,
    pass: "gruy vcoi yiuh izqk",
  },
  // auth: {
  //   type: "OAuth2",
  //   clientId:
  //     "676913062990-apvqupdg8orqga11vuk3nj32r5em11e1.apps.googleusercontent.com",
  //   clientSecret: "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",
  // },
});

app.post("/message", async (req, res) => {
  // const oAuth2Client = new OAuth2Client(clientId, clientSecret);
  // const { tokens } = await oAuth2Client.getToken(code);

  // const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: "OAuth2",
  //     user: adminEmail,
  //     clientId,
  //     clientSecret,
  //     refreshToken: tokens.refresh_token,
  //     accessToken: tokens.access_token,
  //     expires: 1484314697598,
  //   },
  // });

  console.log(req.body);
  const body = req.body;

  const mailOptions1 = {
    from: adminEmail,
    to: adminEmail,
    subject: "New submission",
    html: `<div>
            <p><strong>Time:</strong> ${body.startDate} - ${body.endDate}</p>
            <p><strong>Price:</strong> ${body.price}</p>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
          </div>`,
  };

  const mailOptions2 = {
    from: adminEmail,
    to: body.email,
    subject: "Submission report",
    html: `<div>
            <p><strong>Time:</strong> ${body.startDate} - ${body.endDate}</p>
            <p><strong>Price:</strong> ${body.price}</p>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
          </div>`,
  };

  transporter.sendMail(mailOptions1, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send email" });
      return;
    } else {
      console.log("Email 1 sent: " + info.response);
    }
  });

  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send email" });
      return;
    } else {
      console.log("Email 2 sent: " + info.response);
    }
  });

  console.log("Just got a request!");
  res.status(200).json({ message: "Success" });
});

app.listen(process.env.PORT || 3001);
