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

    try {
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
          (e, info) => {
            if (e) {
              console.error(e);
              res.status(400).json({ e });
              reject(e);
            } else {
              console.log(info)
              res.status(200).json(req.body);
              resolve(info);
            }
          }
        );
      });
    } catch (e: any) {
      res.status(400).json({ e });
    }
  }
}
