import express from 'express';
import { createClient, getClients, getClientInfo, updateClient, addJob, editJob, deleteClient, deleteJob } from '../controllers/client.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/getall', auth, getClients);
router.get('/getone/:id', auth, getClientInfo);
router.post('/create', auth, createClient);
router.patch('/update/:id', auth, updateClient);
router.patch('/newjob/:id', addJob);
router.patch('/:clientId/editjob/:jobId', editJob)
router.delete('/delete/:id', deleteClient)
router.patch('/deletejob/:clientId/:jobId', deleteJob)

export default router;