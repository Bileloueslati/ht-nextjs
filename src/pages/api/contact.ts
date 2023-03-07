import mailer from "@/libs/mailer";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405);
    res.end();
  } else {
    const data = req.body;

    mailer
      .sendMail({
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
      })
      .then(() => {
        res.status(200).json(data);
      })
      .catch((e) => {
        res.status(400).json({ e });
      });
  }
}
