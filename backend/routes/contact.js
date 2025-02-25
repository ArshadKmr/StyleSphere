import express from 'express';
import { sendMessage } from '../controller/contact.js';


const contactRoute = express()


contactRoute.post('/sendMessage', sendMessage)

export default contactRoute