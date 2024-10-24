import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      name: String,
      email: String,
      access_level: {
        type: String,
        enum: ['admin', 'read-only'],
        default: 'read-only',
      },
    },
  ],
}, { timestamps: true });

const Organization = model('Organization', organizationSchema);
export default Organization;
