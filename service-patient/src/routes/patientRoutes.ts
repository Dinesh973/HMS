import express from 'express';
import { Router } from 'express';

import {getAllPatients} from  '../controllers/patientController'

const router = express.Router();

router.get('/', getAllPatients); 

export default router;