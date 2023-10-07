
import { Router } from 'express';
import { addTest, getTest } from './controllers/testController';

const router = Router();
//routes

router.get('/', ( req, res ) => {
  res.send( "This is a basic route!" );
})

router.post('/addTest', addTest);
router.post('/getTest', getTest);

export default router;