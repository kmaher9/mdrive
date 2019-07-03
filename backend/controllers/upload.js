const file      = require('../models/file')
const Busboy    = require('busboy')
const fs        = require('fs')
exports.newFile = async function (request, response, next) {
    var busboy = new Busboy({ headers: request.headers })

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        if (fs.existsSync(`../datum/${filename}`)) {
            return response.status(400).json({
                "data": {
                    "error": "file already exists"
                }
            })
        } else {
            const storeLocation = `../datum/${filename}`
            const stream        = fs.createWriteStream(storeLocation)   
            file.pipe(stream)
        }


    })
  
    busboy.on('finish', function() {
      response.status(200).json({
        "data": {
          "message": "upload successful"
        }
      })
    })
  
    request.pipe(busboy)
}