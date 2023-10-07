
import { Router } from 'express';
import { addPoint, getColdPoints } from './controllers/testController';

const router = Router();
//routes

router.get('/', ( req, res ) => {
  res.send( "This is a basic route!" );
})

router.post('/addDangerPoint', addPoint);
router.get('/getDangerPoints', getColdPoints);

export default router;