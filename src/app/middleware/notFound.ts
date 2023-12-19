/* eslint-disable no-unused-vars */
import { NextFunction } from 'express'
import httpStatus from 'http-status'
import { Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!!',
    error: '',
  })
}

export default notFound
