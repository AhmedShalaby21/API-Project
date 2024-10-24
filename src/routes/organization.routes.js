import { Router } from 'express';
const router = Router();
import { createOrganization, getAllOrganizations, getOrganizationById, updateOrganization, deleteOrganization, inviteUserToOrganization } from '../controllers/organization.controller.js';
import authMiddleware from '../middleware/auth.middleware.js'; 

// Create organization
router.post('/', authMiddleware, createOrganization);

// Get all organizations
router.get('/', authMiddleware, getAllOrganizations);

// Get a specific organization
router.get('/:organization_id', authMiddleware, getOrganizationById);

// Update organization
router.put('/:organization_id', authMiddleware, updateOrganization);

// Delete organization
router.delete('/:organization_id', authMiddleware, deleteOrganization);

// Invite user to organization
router.post('/:organization_id/invite', authMiddleware, inviteUserToOrganization);


export default router;
