const fs = require('fs');
const pathToMessages = './files/messages.json';


const fetch = async () => {
    let data = await fs.promises.readFile(pathToMessages, 'utf-8');
    let messages = JSON.parse(data);
    return messages
}



class MessagesManager {

    add = async (message) => {
        let date = new Date();
        message.timeSent = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        if (fs.existsSync(pathToMessages)) {
            try {
                let messages = await fetch();
                if (messages.length === 0) {
                    message.id = 1;
                    await fs.promises.writeFile(pathToMessages, JSON.stringify([message], null, 2))
                    return { status: 'Success', message: "Message added." }
                }
                message.id = messages[messages.length - messages.length].id + 1;
                messages.unshift(message);
                await fs.promises.writeFile(pathToMessages, JSON.stringify(messages, null, 2))
                return { status: 'Success', message: 'Message added.' }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }
        try{
            message.id = 1;
            await fs.promises.writeFile(pathToMessages, JSON.stringify([message], null, 2))
            return { status: 'Success', message: "Message added." }
    
        }
        catch(error){
                            return { status: 'Error', error: error }
        }
    }

    getAll = async () => {

        if (fs.existsSync(pathToMessages)) {
            try {
                let messages = await fetch();
                return { status: 'Success', payload: messages }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }

    }


}

module.exports = MessagesManager;