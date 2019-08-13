import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
const hashPassword = password => bcrypt.hashSync(password, 10);
const comparePasswords = (plain, encrypted) => {
  return bcrypt.compareSync(plain, encrypted) ? true : false;
}
const authenticateUser = ({id,email,first_name}) => {
  return jwt.sign({
    id,
    email,
    first_name
  },
  process.env.SECRET,
  { expiresIn : 3600}) // expires in an hour
}
const respond = (res, statusCode, statusText, message, payload) => {
  return statusText !== "error" 
    ? res.status(statusCode).send({
      status : statusCode,
      message,
      data : payload
    })
    : res.status(statusCode).send({
      status : statusCode,
      error : payload
    })
}

export default { hashPassword, comparePasswords, authenticateUser, respond };