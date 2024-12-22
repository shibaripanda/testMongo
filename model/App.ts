import mongoose from 'mongoose'

export const appSchema = new mongoose.Schema({
app: {
    type: String,
    required: false,
    unique: true
}
}, { timestamps: true});


// export const App = mongoose.model('App', appSchema)