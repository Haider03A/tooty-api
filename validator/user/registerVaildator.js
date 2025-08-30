import Joi from "joi";

export const registerVaildator = async (req, res, next) => {
  const addUser = Joi.object({
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
    name: Joi.string()
      .trim()
      .min(2)
      .max(30)
      .message("Name is invalid"),
  });

  const { email, password, name } = req.body;

  const { error, value: user } = addUser.validate({ email, password, name });

  if (!error) {
    req.user = user;
    next();
    return;
  }

  res
    .status(400)
    .json({ error: error.details[0].message.toString().replace(/"/g, "") });
};
