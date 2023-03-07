import { AppointementFormData } from "@/components/layout/header/appointement";
import mailer from "@/libs/mailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
  } else {
    const data = req.body as AppointementFormData;

    await new Promise((resolve, reject) => {
      mailer.sendMail(
        {
          to: "mrbileltn@gmail.com",
          from: "noreply@canfianceesthetique.com",
          subject: "Demande de rendez-vous",
          replyTo: data.email,
          // @ts-ignore
          context: {
            data,
          },
          // @ts-ignore
          template: "contact",
        },
        (err, info) => {
          if (err) {
            //console.error(err);
            res.status(404).json({ err });
            reject(err);
          } else {
            // console.log(info)
            res.status(200).json(req.body);
            resolve(info);
          }
        }
      );
    });
  }
}

export const config = {
  api: {
    // disable nextjs's body parser while deployed
    // (as body parsing is handled by `https.onRequest()`),
    // but enable it for local development using `next dev`
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
