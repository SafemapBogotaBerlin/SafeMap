
import { Router } from 'express';
import { addPoint, getColdPoints } from './controllers/pointsColdController';
import { addPointRT } from './controllers/pointsRTController';

const router = Router();

router.get('/', ( req, res ) => {
  res.send( "This is a basic route!" );
})

router.post('/addDangerPoint', addPoint);
router.post('/addDangerPointRT', addPointRT);
router.get('/getDangerPoints', getColdPoints);

export default router;