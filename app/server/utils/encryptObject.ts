import { encrypt, decrypt, cyphered } from "./crypto"

const encryptObject = (obj: Record<string, string | number>): Record<string, cyphered> => {
  const encryptedObject: Record<string, cyphered> = {}
  for (const key in obj) {
    const value = obj[key]
    const encryptedValue = encrypt(String(value))
    encryptedObject[key] = encryptedValue
  }

  return encryptedObject
}

const decryptObject = (encryptedObject: Record<string, cyphered>): Record<string, string> => {
  const decryptedObject: Record<string, string> = {}
  for (const key in encryptedObject) {
    const cypheredValue = encryptedObject[key]
    if (cypheredValue && cypheredValue.iv && cypheredValue.content) {
      const decryptedValue = decrypt(cypheredValue)
      decryptedObject[key] = decryptedValue
    } else {
      throw new Error("Invalid cyphered object")
    }
  }

  return decryptedObject
}

export { encryptObject, decryptObject }
