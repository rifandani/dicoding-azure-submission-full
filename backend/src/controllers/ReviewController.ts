import {
  Request,
  Response,
  // NextFunction
} from 'express';
// files
import prisma from '../utils/client';

// GET /reviews
export const getReviews = async (
  _: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        book: true,
      },
    });

    res.status(200);
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// GET /reviews/:id
export const getReview = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: parseInt(req.params?.id),
      },
      include: {
        book: true,
      },
    });

    res.status(200);
    res.json({ success: true, review });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// POST /reviews
export const postReview = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const { bookId, reviewerName, rating, comment } = req.body;

    const review = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        review: {
          create: {
            reviewerName,
            rating,
            comment,
          },
        },
      },
    });

    res.status(200);
    res.json({ success: true, review });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// PUT /reviews/:id
export const putReview = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const { reviewerName, rating, comment } = req.body;

    const review = await prisma.review.update({
      where: {
        id: parseInt(req.params?.id),
      },
      data: {
        reviewerName,
        rating,
        comment,
      },
    });

    res.status(200);
    res.json({ success: true, review });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};

// DELETE /reviews/:id
export const deleteReview = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    await prisma.review.delete({
      where: {
        id: parseInt(req.params?.id),
      },
    });

    res.status(200);
    res.json({
      success: true,
      msg: `Review with id ${req.params?.id} deleted`,
    });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  } finally {
    await prisma.$disconnect();
  }
};
