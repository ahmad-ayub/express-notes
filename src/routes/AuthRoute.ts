import express from 'express';
import { SignInRequest } from '../requests/auth/SignInRequest';
import RequestBodyValidator from '../middlewares/RequestBodyValidator';
import { SignUpRequest } from '../requests/auth/SignUpRequest';
import { Container } from 'typedi';
import AuthController from '../controllers/AuthController';

const router = express.Router();

const authController = Container.get(AuthController);

router.post('/sign-up', RequestBodyValidator.validate(SignUpRequest), authController.signUp);
router.post('/sign-in', RequestBodyValidator.validate(SignInRequest), authController.signIn);

export default router;
