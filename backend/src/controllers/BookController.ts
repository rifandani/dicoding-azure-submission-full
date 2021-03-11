import {
  Request,
  Response,
  // NextFunction
} from 'express';
// files
import prisma from '../utils/client';

// GET /books
export const getBooks = async (
  _: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const books = await prisma.book.findMany({
      include: {
        review: true,
      },
    });

    res.status(200);
    res.json({ success: true, books });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// GET /books/:id
export const getBook = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(req.params?.id),
      },
      include: {
        review: true,
      },
    });

    res.status(200);
    res.json({ success: true, book });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// POST /books
export const postBook = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const { title, author, releaseYear, coverURL, synopsis } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        releaseYear,
        coverURL,
        synopsis,
      },
    });

    res.status(201);
    res.json({ success: true, book });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// PUT /books/:id
export const putBook = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const { title, author, releaseYear, coverURL, synopsis } = req.body;

    const book = await prisma.book.update({
      where: {
        id: parseInt(req.params?.id),
      },
      data: {
        title,
        author,
        releaseYear,
        coverURL,
        synopsis,
      },
    });

    res.status(201);
    res.json({ success: true, book });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// DELETE /books/:id
export const deleteBook = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    // delete all the book reviews first
    await prisma.review.deleteMany({
      where: {
        bookId: parseInt(req.params?.id),
      },
    });

    // then delete the book
    await prisma.book.delete({
      where: {
        id: parseInt(req.params?.id),
      },
    });

    res.status(200);
    res.json({ success: true, msg: `Book with id ${req.params?.id} deleted` });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};
