import express from 'express';


import { pagesController } from '../controller/pagesController.js'



const router = express.Router();

router.get('/', pagesController.getAll)
router.get('/:fileId', pagesController.getMultiByFileId)
router.get('/:fileId/:pageId', pagesController.getOneByFileIdAndPageId)
router.post('/:fileId', pagesController.addOne)
router.delete('/:fileId/:pageId', pagesController.deleteOneByFileIdAndPageId)


export default router