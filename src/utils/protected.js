
import { verify } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { config } from "./token";
import { response } from "./response";
import User from "~/models/userModel";
import { TYPE_EMPLOYEE } from "./constants";

const verifyToken = async (token) => {
  if (!token) {
    return;
  }
  try {
    const payload = await verify(token, config.secrets.jwt);
    const user = await User.findById(payload._id);

    if (user) {
      return user;
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const isUser = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const user = await verifyToken(req.headers.authorization.split("Bearer ")[1]);
      if (user) {
        req.user = user;
        next();
      } else {
        return response(res, StatusCodes.NOT_FOUND, false, {}, "Không có quyền truy cập!");
      }
    } catch (error) {
      return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, err, err.message);
    }
  } else {
    return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Chưa đăng nhập!");
  }
};

const isAdminMax = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const user = await verifyToken(
        req.headers.authorization.split("Bearer ")[1]
      );
      if (user && user.userType === TYPE_EMPLOYEE.admin) {
        req.user = user;
        next();
      } else {
        return response(res, StatusCodes.NOT_FOUND, false, {}, "Không có quyền truy cập!");
      }
    } catch (error) {
      return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, error, error.message);
    }
  } else {
    return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Chưa đăng nhập!");
  }
};

const isAdmin = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const user = await verifyToken(
        req.headers.authorization.split("Bearer ")[1]
      );
      if (user && user.userType === TYPE_EMPLOYEE.admin || user.userType === TYPE_EMPLOYEE.adminControl) {
        req.user = user;
        next();
      } else {
        return response(res, StatusCodes.NOT_FOUND, false, {}, "Không có quyền truy cập!");
      }
    } catch (error) {
      return response(res, StatusCodes.INTERNAL_SERVER_ERROR, false, error, error.message);
    }
  } else {
    return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, "Chưa đăng nhập!");
  }
};

export const protectedRoute = { isUser, isAdmin, isAdminMax, verifyToken };
