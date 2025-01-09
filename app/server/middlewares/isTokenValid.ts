import { Request, Response, NextFunction } from "express"
import logger from "../loaders/logger"
import { decryptObject, encryptObject } from "../utils/encryptObject"
import authenticateUser from "../services/authService"

const isTokenValid = async (req: Request, res: Response, next: NextFunction) => {
  const session = req.headers["session"] as string | undefined
  const timestamp = req.headers["timestamp"] as string | undefined

  if (!session || !timestamp) {
    return res.status(400).json({ message: "Invalid content in request headers" })
  }

  try {
    const decryptedSession = decryptObject(JSON.parse(session))
    const { expires_in } = decryptedSession
    const now = Date.now()

    const isTokenExpired = now - parseInt(timestamp) > parseInt(expires_in) * 1000

    if (isTokenExpired) {
      const newSession = await authenticateUser(req, next)
      if (newSession && newSession?.data) {
        logger.info("Successfully refreshed auth token")
        const encryptedNewSession = encryptObject(newSession.data)
        req.headers["session"] = JSON.stringify(encryptedNewSession)
        req.headers["refreshed"] = "true"
        req.headers["authorization"] = `Bearer ${newSession.data.access_token}`
      }
    } else {
      req.headers["refreshed"] = "false"
      req.headers["authorization"] = `Bearer ${decryptedSession.access_token}`
    }

    next()
  } catch (error) {
    logger.error("Error in isTokenValid middleware", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export default isTokenValid
