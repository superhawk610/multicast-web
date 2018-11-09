import { Request, Response, Router } from 'express';

const router = Router();

router.get('/check-host-validity', (req: Request, res: Response) => {
  const { address } = req.query;
  res.json({ valid: true });
});

export default router;
