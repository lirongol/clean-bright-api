import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const clientSchema = mongoose.Schema({
   firstName: String,
   lastName: String,
   vehicleNumber: String,
   ignitionCode: String,
   phone: String,
   vehicleInfo: {},
   jobHistory: [{
      title: String,
      comments: String,
      cost: Number,
      status: { type: Boolean, default: false },
      date: { type: Date, default: () => Date.now() }
   }]
}, {timestamps: true})

const Client = mongoose.model('Client', clientSchema);

export default Client;