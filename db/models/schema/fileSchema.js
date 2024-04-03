import mongoose, { Schema } from 'mongoose';
import AutoIncrementFactory  from 'mongoose-sequence'

const AutoIncrement = AutoIncrementFactory(mongoose);

const nodelName = 'File';
const schema = new Schema({
    fileId: {
        type: Number,
        unique: true,
        
    },
    fileName: {
        type: String,
        required: true
    },
    

}, { timestamps: true } );

schema.plugin(AutoIncrement, { 'inc_field': 'fileId' });

// create model
export const FileSchema = mongoose.model(nodelName, schema);
