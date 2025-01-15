import * as crypto from "crypto"

export type cyphered = { iv: string; content: string }
const algorithm = "aes-256-ctr"
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3"

const encrypt = (text: any) => {
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex")
  }
}

const decrypt = (cyphered: cyphered) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(cyphered.iv, "hex"))
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(cyphered.content, "hex")),
    decipher.final()
  ])

  return decrypted.toString()
}

export { decrypt, encrypt }
