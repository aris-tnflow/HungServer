import { sign } from "jsonwebtoken";
import { env } from "./dotenv";

const config = {
  secrets: {
    jwt: env.JWT,
    jwtExp: "30d",
  },
};

const createToken = (user) => {
  return sign(
    {
      _id: user._id,
      phone: user.phone,
    },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp,
    }
  );
};

module.exports = { createToken, config };
