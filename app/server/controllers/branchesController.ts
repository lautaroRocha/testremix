import { branchesService, getBranchByAlias } from "../services/branchesService"
import { Request, Response, NextFunction } from "express"

const basicGet = (_req: Request, res: Response) => {
  res.json("branches-route")
}

const branchesFetch = async (req: Request, res: Response, next: NextFunction) => {
  const response = await branchesService(req, next)
  if (response) {
    res.status(200).json(response)
  } else {
    return
  }
}

const branchByAlias = async (req: Request, res: Response, next: NextFunction) => {
  const response = await getBranchByAlias(req, next)
  if (response) {
    res.status(200).json(response)
  } else {
    return
  }
}

export { basicGet, branchesFetch, branchByAlias }
