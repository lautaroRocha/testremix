import { Request, Response } from "express"
import logger from "../loaders/logger"
import { fileURLToPath } from "url"
import path from "path"
import fs from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const versionFilePath = path.join(__dirname, "../../../package.json")

const getVersion = (_req: Request, res: Response) => {
  fs.readFile(versionFilePath, "utf8", (err, data) => {
    if (err) {
      logger.error("Error al leer el archivo de versión:", err)

      return res.status(500).send("Error al leer el archivo de versión")
    }

    try {
      const version = JSON.parse(data)

      res.json(version.version)
    } catch (parseErr) {
      logger.error("Error al parsear el archivo de versión:", parseErr)

      res.status(500).send("Error al parsear el archivo de versión")
    }
  })
}

export { getVersion }
