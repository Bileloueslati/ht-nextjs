import NodeMailer from "nodemailer";
// @ts-ignore
import Hbs from "nodemailer-express-handlebars";

const mailer = NodeMailer.createTransport({
  host: "ssl0.ovh.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "noreply@canfianceesthetique.com",
    pass: "Camfrog100", // generated ethereal password
  },
});

mailer.use(
  "compile",
  Hbs({
    viewPath: 'views/email/', extName: '.hbs',
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "views/email/",
      defaultLayout: false,
      partialsDir: "views/email/",
    },
  })
);

export default mailer;
