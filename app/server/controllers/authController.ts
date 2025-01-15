import authenticateUser from "../services/authService"
import { Response, Request, NextFunction } from "express"
import { encryptObject } from "../utils/encryptObject"

const makeLogin = async (req: Request, res: Response, next: NextFunction) => {
  const session = await authenticateUser(req, next)
  if (session) {
    const encryptedObj = encryptObject(session.data)
    res.status(200).json({ access_token: encryptedObj })
  } else {
    return
  }
}

export { makeLogin }
