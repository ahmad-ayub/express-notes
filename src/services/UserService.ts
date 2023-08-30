import { ApplicationError } from '../utils/ApiError';
import { Service } from 'typedi';
import UserRepository from '../repositories/UserRepository';
import { LoggerClient } from './LoggerClient';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config/Config';

@Service()
export default class UserService {
  constructor(public userRepository: UserRepository, public logger: LoggerClient) {}

  signUp = async (email: string, name: string, password: string) => {
    try {
      const user = await User.create({ name, email, password });
      user.password = 'masked';
      return user;
    } catch (err) {
      throw new ApplicationError('User with email already exists');
    }
  };

  signIn = async (email: string, password: string) => {
    this.logger.info(`Email of the registered user is ${email}`);
    const userWithEmail: User | null = await this.userRepository.findByEmail(email);
    if (!userWithEmail) {
      throw new ApplicationError('No User found with this email');
    }
    const isPasswordMatched = await userWithEmail.comparePassword(password);
    if (!isPasswordMatched) {
      throw new ApplicationError('Password did not match');
    }

    const jwtPayload = { userId: userWithEmail.id };
    const token = jwt.sign(jwtPayload, config.jwtSecret, {
      expiresIn: '5hr',
    });
    return { token };
  };
}
