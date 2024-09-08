import mongoose from 'mongoose';

import { fileSchema } from '../schema/fileSchema.js'

const nodelName = 'File';

// create model
export const FileModel = mongoose.model(nodelName, fileSchema);
