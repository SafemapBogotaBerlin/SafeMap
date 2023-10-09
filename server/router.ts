
import { Router } from 'express';
import { addPoint, getColdPoints, addPointRT } from './controllers/pointsColdController';

const router = Router();
//routes

router.get('/', ( req, res ) => {
  res.send( "This is a basic route!" );
})

router.post('/addDangerPoint', addPoint);
router.post('/addDangerPointRT', addPointRT);
router.get('/getDangerPoints', getColdPoints);

export default router;