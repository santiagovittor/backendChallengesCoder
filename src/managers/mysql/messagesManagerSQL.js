const options = require('../../database/options/mysqlconfig.js')
const knex = require('knex')
const database = knex(options);


const createMessagesTable = async () => {

    await database.schema.createTable('messages', table => {
        table.increments('id');
        table.string('user');
        table.string('message');
        table.string('timesent');
    }).then(console.log('Messages Table Created'))
        .catch((err) => console.log(err))

}




class MessagesManager {

    add = async (message) => {

        let date = new Date();
        message.timesent = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


        if (await database.schema.hasTable('messages') === true) {
            try {
                await database('messages').insert(message)
                    .then(console.log(` Message from ${message.user} added to database.`))
                    .catch((err) => console.log(err))
                return { status: 'Success', message: 'Message added.' }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }
        try {
            await createMessagesTable();
            await database('messages').insert(message)
                .then(console.log(`Message from ${message.user} added to database.`))
                .catch((err) => console.log(err))
            return { status: 'Success', message: 'Message added.' }

        }
        catch (err) {
            return { status: 'Error', message: err }
        }

    }

    getAll = async () => {

        if (await database.schema.hasTable('messages') === true) {
            try {
                let data = await database.from('messages').select('*')
                    .then(data => {
                        let messages = JSON.parse(JSON.stringify(data))
                        return messages
                    })
                    .catch((err) => { console.log(err) })
                return { status: 'Success', payload: data }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }
        else {
            return { status: 'Error', payload: 'No messages yet.' }
        }

    }


}

module.exports = MessagesManager;