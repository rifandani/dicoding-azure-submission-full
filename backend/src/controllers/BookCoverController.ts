import {
  Request,
  Response,
  // NextFunction
} from 'express';
// files

// POST /books/cover
export const postBookCover = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const { synopsis } = req.body;

    res.status(201);
    res.json({ success: true, coverURL: '' });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  }
};

// PUT /books/cover
export const putBookCover = async (
  req: Request,
  res: Response
  // next: NextFunction
): Promise<void> => {
  try {
    const { synopsis } = req.body;

    res.status(201);
    res.json({ success: true, coverURL: '' });
  } catch (err) {
    res.status(500);
    res.json({ success: false, msg: err.message, err });
  }
};
