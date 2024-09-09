import mongoose, { Schema } from 'mongoose';


const schema = new Schema({
    pageId: {
        type: Number,
        unique: true
    },
    fileId: {
        type: Number,
        required: true
    },
    pageName: {
        type: String,
        required: true
    },
    pageTitle: {
        type: String,
        required: true
    }


}, { timestamps: true });

const nodelName = 'Page';
// create model
export const PageModel = mongoose.model(nodelName, schema);