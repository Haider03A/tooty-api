import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema({
    fileId: {
        type: String,
        required: true,
        unique: true,

    },
    fileName: {
        type: String,
        required: true
    }

}, { timestamps: true });



const nodelName = 'File';

// create model
export const FileModel = mongoose.model(nodelName, fileSchema);
