import NodeMailer from "nodemailer";
// @ts-ignore
import Hbs from "nodemailer-express-handlebars";

const mailer = NodeMailer.createTransport({
  host: "ssl0.ovh.net",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

mailer.use(
  "compile",
  Hbs({
    viewPath: "views/email/",
    extName: ".hbs",
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "views/email/",
      defaultLayout: false,
      partialsDir: "views/email/",
    },
  })
);

export default mailer;
