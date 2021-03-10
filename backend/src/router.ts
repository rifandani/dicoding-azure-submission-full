import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
// files
import { getHome } from './controllers/HomeController';
import {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
} from './controllers/BookController';
import {
  getReviews,
  getReview,
  postReview,
  putReview,
  deleteReview,
} from './controllers/ReviewController';

// express router
const router = express.Router();

// middlewares
router.use(helmet()); // security
router.use(morgan('dev')); // dev logging API
router.use(cors()); // allow CORS
router.use(express.json()); // request application/type === json
router.use(express.urlencoded({ extended: false })); // form data object, value objectnya berasal dari input attribute name
// router.use(compression()); // Gzip compressing can greatly decrease the size of the response body

// HOME routes
router.get('/', getHome);
// BOOKS routes
router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.post('/books', postBook);
router.put('/books/:id', putBook);
router.delete('/books/:id', deleteBook);
// BOOKS routes
router.get('/reviews', getReviews);
router.get('/reviews/:id', getReview);
router.post('/reviews', postReview);
router.put('/reviews/:id', putReview);
router.delete('/reviews/:id', deleteReview);

export default router;
