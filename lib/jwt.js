import jwt from "jsonwebtoken";

// signing jwt
export function signJwtToken(payload, options = {}) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
}

// verifying jwt
export function verifyJwtToken(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// Signing Refresh Token
export function signRefreshToken(payload, options = {}) {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
}

// Verifying Refresh Token
export function verifyRefreshToken(token) {
  try {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
