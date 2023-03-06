import NodeMailer from "nodemailer";
// @ts-ignore
import Hbs from "nodemailer-express-handlebars";

const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const mailer = NodeMailer.createTransport({
  host: "ssl0.ovh.net",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
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
