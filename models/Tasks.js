import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema({
    done: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        require: true,
    }, 
    description: {
        type: String,
        require: true,
    }, 
    
    important: {
        type: Boolean
    },
}, {
    timestamps: true
})

export default mongoose.model('Tasks', TasksSchema)