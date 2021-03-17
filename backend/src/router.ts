import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import multer from 'multer';
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
import { postBookCover, putBookCover } from './controllers/BookCoverController';
import { postSearch } from './controllers/SearchController';
import { getRedis, postRedis } from './controllers/RedisController';

// express router + multer
const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 3000000,
  },
});

// middlewares
router.use(helmet()); // security
router.use(morgan('dev')); // dev logging API
router.use(cors()); // allow CORS
// router.use(compression()); // Gzip compressing can greatly decrease the size of the response body

// ALL for POST/PUT requests
router.use(express.json()); // parsing application/json req as a JSON Object
// value objectnya berasal dari input attribute name
// router.use(express.urlencoded({ extended: false })); // parsing application/www-form-urlencoded as strings or arrays (false) + object (true)

// HOME routes
router.get('/', getHome);
// BOOKS routes
router.get('/books', getBooks);
router.get('/books/:id', getBook);
router.post('/books', postBook);
router.put('/books/:id', putBook);
router.delete('/books/:id', deleteBook);
// REVIEWS routes
router.get('/reviews', getReviews);
router.get('/reviews/:id', getReview);
router.post('/reviews', postReview);
router.put('/reviews/:id', putReview);
router.delete('/reviews/:id', deleteReview);
// UPLOAD routes
router.post('/upload', upload.single('image_uploads'), postBookCover);
router.put('/upload', upload.single('image_uploads'), putBookCover);
// SEARCH routes
router.post('/search', postSearch);
// REDIS routes
router.get('/redis', getRedis);
router.post('/redis', postRedis);

export default router;
