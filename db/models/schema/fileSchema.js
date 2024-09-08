import { Schema } from 'mongoose';

export const fileSchema = new Schema({
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

