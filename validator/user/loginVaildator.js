import Joi from "joi";

export const loginVaildator = async (req, res, next) => {
  const LoginUser = Joi.object({
    email: Joi.string()
      .trim()
      .lowercase()
      .required()
      .email()
      .message("Email is invalid"),
    password: Joi.string()
      .trim()
      .required()
      .min(8)
      .max(25)
      .message("password is invalid"),
  });

  const { email, password } = req.body;

  const { error, value: user } = LoginUser.validate({ email, password });

  if (!error) {
    req.user = user;
    next();
    return;
  }

  res
    .status(400)
    .json({ error: error.details[0].message.toString().replace(/"/g, "") });
};
