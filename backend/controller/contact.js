
import Contact from '../model/contact.js'



export const sendMessage = async (req, res) => {
    try {
        const message = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        })
        if (!message) {
            res.status(400).json({
                message: 'Send message failed'
            })
        } else {
            res.status(200).json({
                message: "Message sent successfully"
            })
        }
    } catch (error) {
        console.error(error.message)
    }
}