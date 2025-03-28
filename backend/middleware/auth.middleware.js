import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
/**
 * Middle ware to protect routes
 * It checks if the user is authenticated by verifying the access token
 * If the token is valid, it adds the user to the request object and calls next()
 * If the token is valid it will call next() and check if user is the admin
 * @param {
 * } req
 * @param {*} res
 * @param {*} next  next()
 * @returns
 */
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      return res
        .status(401)
        .json({ message: "Unauthorized- No access token provided" });

    try {
      //varify the access token and auth user
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in protectedRoute middleware: ", error.message);
    return res.status(401).json({ message: "Invalid access token" });
  }
};

/**
 * Middleware to check if the user is an admin
 * protectRoute adminRoute
 * is Auth user -> is admin
 */
export const adminRoute = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Access denied - Unauthorized" });
  }
};
