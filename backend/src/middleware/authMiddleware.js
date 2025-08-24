// middleware/authMiddleware.js
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from "../util/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    // Access token usually comes from Authorization header: "Bearer <token>"
    const authHeader = req.headers["authorization"];
   console.log(authHeader)
    const accessToken = authHeader
    const refreshToken = req.cookies?.refreshToken || req.headers["x-refresh-token"];

    if (!accessToken) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    try {
      // ✅ Verify Access Token
      const decoded = verifyAccessToken(accessToken,process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded)
      req.user = decoded;
      return next();
    } catch (err) {
      // ❌ Access token expired/invalid → check refresh token
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" });
      }

      try {
        // ✅ Verify Refresh Token
        const decodedRefresh = verifyRefreshToken(refreshToken,process.env.REFRESH_TOKEN_SECRET);

        // Generate new access token
        const newAccessToken = generateAccessToken({ id: decodedRefresh.id },process.env.ACCESS_TOKEN_SECRET);

        // Attach new token to response headers (or you can send in body)
        res.setHeader("x-access-token", newAccessToken);
        //console.log(decodedRefresh)
        req.user = decodedRefresh;
        return next();
      } catch (refreshErr) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

export default authMiddleware;
