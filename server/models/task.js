const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true,'description is necessary']
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type:Date,
        required: false,
        default: Date.now()
    },
    completed:{
        type: String,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema);
