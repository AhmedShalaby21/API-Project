import Organization from '../models/organization.model.js';

// Create new organization
export async function createOrganization(req, res) {
  try {
    const { name, description } = req.body;
    const organization = new Organization({ name, description });
    await organization.save();
    res.status(201).json({ organization_id: organization._id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating organization' });
  }
}

// Get all organizations
export async function getAllOrganizations(req, res) {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving organizations' });
  }
}

// Get a specific organization
export async function getOrganizationById(req, res) {
  try {
    const organization = await  Organization.findById(req.params.organization_id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving organization' });
  }
}

// Update organization
export async function updateOrganization(req, res) {
  try {
    const { name, description } = req.body;
    const organization = await Organization.findByIdAndUpdate(
      req.params.organization_id,
      { name, description },
      { new: true }
    );
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Error updating organization' });
  }
}

// Delete organization
export async function deleteOrganization(req, res) {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.organization_id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.status(200).json({ message: 'Organization deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting organization' });
  }
}

// Invite user to organization
export const inviteUserToOrganization = async (req, res) => {
    const { user_email } = req.body;
    const { organization_id } = req.params;
  
    try {
      const organization = await Organization.findById(organization_id);
  
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
  
      // Check if the user is already a member
      const existingMember = organization.members.find(member => member.email === user_email);
      if (existingMember) {
        return res.status(400).json({ error: 'User is already a member' });
      }
  
      // Add the user as a member (you might want to set default access level)
      organization.members.push({ email: user_email, name: '', access_level: 'read-only' });
      await organization.save();
  
      return res.status(200).json({ message: 'User invited to organization' });
    } catch (error) {
      return res.status(500).json({ error: 'Error inviting user' });
    }
  };