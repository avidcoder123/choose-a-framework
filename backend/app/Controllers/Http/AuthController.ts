import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from "App/Validators/RegisterValidator"
import UserValidator from "App/Validators/UserValidator"
import User from "App/Models/User"

export default class AuthController {

  public async register({ auth, request }: HttpContextContract) {
    let user = await request.validate(RegisterValidator)

    await User.create({
      username: user.username,
      password: user.password
    })

    let token = await auth.use('api').attempt(user.username, user.password)

    return token.toJSON()
  }

  public async login({ auth, request }: HttpContextContract) {
    let user = await request.validate(UserValidator)

    let token = await auth.use('api').attempt(user.username, user.password)

    return token.toJSON()
  }

}
