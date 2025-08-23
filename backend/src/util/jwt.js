
import jwt from "jsonwebtoken";

// Generate short-term access token (valid for 15 minutes or 1 hour)
export const generateAccessToken = (payload,secret) => {
  if (!payload) throw new Error("Payload is required for Access Token");

  return jwt.sign(payload, secret, { expiresIn: "1h" }); // short-term
};

// Generate long-term refresh token (valid for 7 days or more)
export const generateRefreshToken = (payload,secret) => {
  if (!payload) throw new Error("Payload is required for Refresh Token");

  return jwt.sign(payload, secret, { expiresIn: "7d" }); // long-term
};

// Verify Access Token
export const verifyAccessToken = (token,secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid or expired Access Token");
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token,secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid or expired Refresh Token");
  }
};
