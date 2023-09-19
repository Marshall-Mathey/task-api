import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegisterValidator from "../../Validators/RegisterValidator";
import User from "../../Models/User";
import LoginValidator from "../../Validators/LoginValidator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator);
      const user = await User.create(payload);
      return response.created("Congrats " + user.username);
    } catch (error) {
      return response.status(400).json({
        message: "Something went wrong :(",
      });
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const user = await request.validate(LoginValidator);
      const { email, password } = user;
      const token = await auth.attempt(email, password, {
        expiresIn: "30 mins",
      });
      return token;
    } catch (error) {
      return response.unauthorized("Invalid credentials");
    }
  }

  public async logout({ auth }: HttpContextContract) {
    try {
      await auth.use("api").revoke();
      return {
        message: "Disconnected",
      };
    } catch (error) {
      return {
        message: "Something went wrong",
      };
    }
  }
}
