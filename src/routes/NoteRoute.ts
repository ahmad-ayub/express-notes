import express from 'express';
import RequestBodyValidator from '../middlewares/RequestBodyValidator';
import { Container } from 'typedi';
import NoteController from '../controllers/NoteController';
import { CreateNoteRequest } from '../requests/note/CreateNoteRequest';
import { UpdateNoteRequest } from '../requests/note/UpdateNoteRequest';
import passport from 'passport';
import RequestParamValidator from '../middlewares/RequestParamValidator';
import { NoteIdRequestParam } from '../requests/note/NoteIdRequestParam';

const router = express.Router();

const noteController = Container.get(NoteController);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  RequestBodyValidator.validate(CreateNoteRequest),
  noteController.createNote,
);
router.get('', passport.authenticate('jwt', { session: false }), noteController.getAllUserNotes);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  RequestParamValidator.validate(NoteIdRequestParam),
  noteController.getNoteById,
);
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  RequestParamValidator.validate(NoteIdRequestParam),
  RequestBodyValidator.validate(UpdateNoteRequest),
  noteController.updateNoteById,
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  RequestParamValidator.validate(NoteIdRequestParam),
  noteController.deleteNoteById,
);

export default router;
