import express from 'express';


import { filesController } from '../controller/filesController.js'



const router = express.Router();

router.get('/', filesController.getAll)
router.get('/:fileId', filesController.getOne)
router.post('/', filesController.addOne)
router.patch('/:fileId', filesController.updateOne)
router.delete('/:fileId', filesController.deleteOne)


export default router