
import { Router } from 'express'

const router = Router();
//routes

router.get('/', ( req, res ) => {
  res.send( "This is a basic route!" );
})

export default router;