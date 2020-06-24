// import passport from 'passport'
import { UserModel, User } from '@models/user'
import { Request, Response, NextFunction } from 'express'
import * as utils from '@lib/utils'
import { ObjectId } from 'mongodb'
// const router = require('express').Router()

export function findUser (req: Request, res: Response, next: NextFunction) {
  UserModel.findOne({ username: req.body.username }).then((user: User): Response<any> => {
    if (!user) {
      // Username is not found
      return res.status(401).json({ success: false, msg: 'Wrong credentials' })
    }

    const isValid = utils.validPassword(req.body.password, user.hash, user.salt)

    if (isValid) {
      const tokenObject = utils.issueJWT(user)
      return res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
    } else {
      // Password is incorrect
      return res.status(401).json({ success: false, msg: 'Wrong credentials' })
    }
  }).catch((err: any) => {
    console.log('error ', err)
    next(err)
  })
}

export function registerUser (req: Request, res: Response) {
  const saltHash = utils.genPassword(req.body.password)

  const salt = saltHash.salt
  const hash = saltHash.hash

  const newUser = new UserModel()
  newUser._id = new ObjectId()
  newUser.username = req.body.username
  newUser.hash = hash
  newUser.salt = salt

  newUser.save().then((user: Object): void => {
    res.json({ success: true, user: user })
  }).catch((err: any) => {
    console.log(err)
    res.json({ success: false, msg: err })
  })
}
