import { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const cookieValue = req.query.value;
  res.setHeader(
    "set-cookie",
    `__Secure-next-auth.session-token=${cookieValue}; path=/; samesite=lax; httponly`
  );

  res.end();
}
