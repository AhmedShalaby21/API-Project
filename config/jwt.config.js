import jwt from 'jsonwebtoken'; 
const { sign, verify } = jwt;  

export function generateToken(user) {
  return sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  return verify(token, process.env.JWT_SECRET);
}
