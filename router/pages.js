import express from 'express';


import { pagesController } from '../controller/pagesController.js'



const router = express.Router();

router.get('/', pagesController.getAll)
router.get('/:fileId', pagesController.getMulti)
router.get('/:fileId/:pageId', pagesController.getOne)
router.post('/:fileId', pagesController.addOne)
router.patch('/:fileId/:pageId', pagesController.updateOne)
router.delete('/:fileId/:pageId', pagesController.deleteOne)


export default router