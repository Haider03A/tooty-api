import mongoose, { Schema } from 'mongoose';
import AutoIncrementFactory  from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose);

const nodelName = 'Page';
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
    

}, { timestamps: true } );

schema.plugin(AutoIncrement, { 'inc_field': 'pageId' });

// create model
export const PageSchema = mongoose.model(nodelName, schema);
