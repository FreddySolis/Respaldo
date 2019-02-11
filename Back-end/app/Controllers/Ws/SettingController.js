'use strict'
const Setting =use('App/Models/Setting')

var exec = require('child_process').exec;
class SettingController {

  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  async onMessage (message) {
    let dato = await Setting.findOrFail(message.id);
    
    if(dato.password_db == null){
      dato.password_db=""
    }
    
    this.socket.broadcastToAll('message',message)
    let command = exec('C:\\xampp\\mysql\\bin\\mysqldump  --user=' + dato.user_db + ' --password=' + dato.password_db + ' -h 127.0.0.1 -P 3306 '+ dato.name_db +' > respaldo\\'+ dato.name +'.sql');
    }


}

module.exports = SettingController
