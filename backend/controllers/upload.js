const File      = require('../models/file')
const Busboy    = require('busboy')
const fs        = require('fs')

exports.newFile = function (request, response, next) {
    var busboy = new Busboy({ headers: request.headers })
    let name = null
    let mime = null
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        name = filename
        mime = mimetype
        if (fs.existsSync(`../uploads/${filename}`)) {
            return response.status(400).json({
                "data": {
                    "error": "file already exists"
                }
            })
        } else {
            const storeLocation = `../uploads/${filename}`
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
      let stat = fs.statSync(`../uploads/${name}`)
            File.create({
                "name": name,
                "location": `../uploads/${name}`,
                "mime": mime,
                "size": stat.size
            })
    })
  
    request.pipe(busboy)
}

exports.getFile = async function (request, response) {
    let file = null 
    try { file = await File.findById(request.params.id) } catch (err) {}

    if (!file) {
        return response.status(404).json({
            "data": {
                "error": "unable to find requested file"
            }
        })
    }

    var stat = fs.statSync(file.location)
    response.writeHead(200, {
        'Content-Type': file.mime,
        'Content-Length': stat.size,
        'Content-Disposition': `attachment;filename=${file.name}`
    })

    let stream = fs.createReadStream(file.location)
    stream.pipe(response)
}

exports.getFiles = async function (request, response) {
    let files = await File.find({})

    if (!files) {
        return response.status(404).json({
            "data": {
                "message": "There are no uploaded files"
            }
        })
    }

    return response.status(200).json({
        "data": {
            "files": files
        }
    })
}