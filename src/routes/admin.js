const express = require('express');
const router = express.Router();

const AdminController = require('../app/controllers/AdminController');
const roomTypeController = require('../app/controllers/roomTypeController');
const roomController = require('../app/controllers/roomController');
const clerkController = require('../app/controllers/clerkController');
const clientController = require('../app/controllers/clientController');

//  ------- routes ROOM TYPE -----------------------------------------------------
router.get('/room-type/create', roomTypeController.roomTypeCreate);                // READ
router.post('/room-type/store', roomTypeController.roomTypeStore);                 // CREATE
router.get('/room-type/:id/edit', roomTypeController.roomTypeEdit);
router.put('/room-type/:id', roomTypeController.roomTypeUpdate);
router.delete('/room-type/:id', roomTypeController.roomTypeDelete);
router.delete('/room-type/:id/force', roomTypeController.roomTypeDeleteForce);
router.patch('/room-type/:id/restore', roomTypeController.roomTypeRestore);
router.get('/room-type/trash', roomTypeController.roomTypeTrash);
router.get('/room-type', roomTypeController.roomTypeShow);
// -------------------------------------------------------------------------------



// --------- routes ROOM ---------------------------------------------------------
router.get('/room/create', roomController.roomCreate); 
router.post('/room/store', roomController.roomStore); 
router.get('/room/:id/edit', roomController.roomEdit);
router.put('/room/:id', roomController.roomUpdate);
router.delete('/room/:id', roomController.roomDelete);
router.delete('/room/:id/force', roomController.roomDeleteForce);
router.patch('/room/:id/restore', roomController.roomRestore);
router.get('/room/trash', roomController.roomTrash);
router.get('/room', roomController.roomShow);
// -------------------------------------------------------------------------------



// --------- routes CLERK --------------------------------------------------------
router.get('/clerk/create', clerkController.clerkCreate);
router.post('/clerk/store', clerkController.clerkStore);
router.get('/clerk/:id/edit', clerkController.clerkEdit);
router.put('/clerk/:id', clerkController.clerkUpdate);
router.delete('/clerk/:id', clerkController.clerkDelete);
router.delete('/clerk/:id/force', clerkController.clerkDeleteForce);
router.patch('/clerk/:id/restore', clerkController.clerkRestore);
router.get('/clerk/trash', clerkController.clerkTrash);
router.get('/clerk', clerkController.clerkShow);
// -------------------------------------------------------------------------------



// --------- routes CLIENT -------------------------------------------------------
router.get('/client/create', clientController.clientCreate);
router.post('/client/store', clientController.clientStore);
router.get('/client/:id/edit', clientController.clientEdit);
router.put('/client/:id', clientController.clientUpdate);
router.delete('/client/:id', clientController.clientDelete);
router.delete('/client/:id/force', clientController.clientDeleteForce);
router.patch('/client/:id/restore', clientController.clientRestore);
router.get('/client/trash', clientController.clientTrash);
router.get('/client', clientController.clientShow);
// -------------------------------------------------------------------------------


router.get('/', AdminController.show);

module.exports = router;