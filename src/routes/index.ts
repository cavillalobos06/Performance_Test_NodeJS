import { Router } from 'express';
import authRoutes from './auth.routes.js';
import clinicaRoutes from './clinic.routes.js';
import almacenRoutes from './warehouse.routes.js';
import medicamentoRoutes from './medication.routes.js';
import solicitudRoutes from './request.routes.js';
import seedRouter from './seed.routes.js';
const router = Router();

router.use('/auth', authRoutes);
router.use('/clinics', clinicaRoutes);
router.use('/warehouses', almacenRoutes);
router.use('/medications', medicamentoRoutes);
router.use('/requests', solicitudRoutes);
router.use("/seed", seedRouter);

export default router;
