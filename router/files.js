import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('all files')
})


export default router