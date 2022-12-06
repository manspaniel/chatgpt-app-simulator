import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";

const API_URL = "https://chat.openai.com";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default (req: NextApiRequest, res: NextApiResponse) => {
  const proxy = httpProxy.createProxyServer();
  return new Promise<void>((resolve, reject) => {
    req.url = req.url!.replace("/api/proxy", "");
    proxy.on("proxyRes", (proxyRes, req, res) => {
      res.setHeader("Content-Encoding", "none");
    });
    proxy.web(
      req,
      res,
      {
        target: API_URL,
        changeOrigin: true,
        cookieDomainRewrite: {
          "*": "",
        },
        headers: {
          cookie: "__Secure-next-auth.session-token=" + req.query.cookie,
        },
      },
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};
