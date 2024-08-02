import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: any = process.env.JWT_SECRET;

export const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "Not authorised | No token" });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.json({ error: error });
  }
};
