import express from 'express';

import columnSetController from '../controllers/columnSetController';

const jsonParser = express.json();

const columnsSetRouter = express.Router();

columnsSetRouter.get('/', columnSetController.findColumns);

columnsSetRouter.patch('/', jsonParser, columnSetController.updateSetOfColumns);

columnsSetRouter.post('/', jsonParser, columnSetController.createSetOfColumns);

export default columnsSetRouter;
