import logoSao from "./logo-sao.svg"

const logos: Record<string, string> = {
  sao: logoSao
}

export const getLogo = (businessName: string) => {
  return logos[businessName]
}
