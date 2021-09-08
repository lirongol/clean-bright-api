import Client from '../models/client.js';
import axios from 'axios';

export const createClient = async (req, res) => {
   const { firstName, lastName, vehicleNumber, ignitionCode, phone } = req.body;
   try {
      if (vehicleNumber) {
         const apiRes = await axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=1&q=${vehicleNumber}`);
         const vehicleInfo = apiRes.data.result.records[0];
         const client = new Client({
            firstName,
            lastName,
            vehicleNumber,
            ignitionCode,
            phone,
            vehicleInfo
         })
         await client.save();
         res.status(200).json(client);
      } else {
         const client = new Client({
            firstName,
            lastName,
            ignitionCode,
            phone
         })
         await client.save();
         res.status(200).json(client);
      }
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}

export const getClients = async (req, res) => {
   try {
      const clients = await Client.find();
      res.status(200).json(clients)
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}

export const getClientInfo = async (req, res) => {
   const { id } = req.params;
   try {
      const client = await Client.findById(id);
      res.status(200).json(client);
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}

export const updateClient = async (req, res) => {
   const { id } = req.params;
   const { firstName, lastName, vehicleNumber, ignitionCode, phone } = req.body;
   try {
      if (vehicleNumber) {
         const apiRes = await axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=1&q=${vehicleNumber}`);
         const vehicleInfo = apiRes.data.result.records[0];
         const updatedClient = await Client.findByIdAndUpdate(id, {
            firstName,
            lastName,
            vehicleNumber,
            ignitionCode,
            phone,
            vehicleInfo
         }, { new: true });
         res.status(200).json(updatedClient);
      } else {
         const updatedClient = await Client.findByIdAndUpdate(id, {
            firstName,
            lastName,
            vehicleNumber,
            ignitionCode,
            phone,
            vehicleInfo: {}
         }, { new: true });
         res.status(200).json(updatedClient);
      }
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}

export const addJob = async (req, res) => {
   const { id } = req.params;
   const { title, comments, cost } = req.body;
   try {
      const client = await Client.findById(id);
      const updatedClient = await Client.findByIdAndUpdate(id, {
         jobHistory: [
            ...client.jobHistory,
            { title, comments, cost }
         ]
      }, { new: true });
      res.status(200).json(updatedClient);
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}

export const editJob = async (req, res) => {
   const { clientId, jobId } = req.params;
   const { title, comments, cost, status } = req.body;
   try {
      const client = await Client.findById(clientId);
      const [job] = client.jobHistory.filter(job => job._id.toString() === jobId);
      job.title = title;
      job.comments = comments;
      job.cost = cost;
      job.status = status;
      const updatedClient = await Client.findByIdAndUpdate(clientId, client, { new: true });
      res.status(200).json(updatedClient);
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}

export const deleteClient = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedClient = await Client.findByIdAndDelete(id);
      res.status(200).json(deletedClient);
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}

export const deleteJob = async (req, res) => {
   const { clientId, jobId } = req.params;
   try {
      const client = await Client.findById(clientId);
      client.jobHistory = client.jobHistory.filter(job => job._id.toString() !== jobId);
      const updatedClient = await Client.findByIdAndUpdate(clientId, client, { new: true });
      res.status(200).json(updatedClient);
   } catch (err) {
      res.status(500).json({ msg: 'server error' });
      console.log(err);
   }
}