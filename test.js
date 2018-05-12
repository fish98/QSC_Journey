const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

const busboy = new Busboy()

busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log(`On Loading File [${fieldname}]: filename: ${filename}`)

file.pipe('data', (data) => {
    console.log(`File [${fieldname}] got ${data.length} bytes`)
})

file.on('end', function() {
    console.log(`File [${fieldname}] Finished`)
  })
})

busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
    console.log(`Field [${fieldname}]: value: ${inspect(val)}`)
  })
  
  busboy.on('finish', function() {
    console.log('Done parsing form!')
    res.writeHead(303, { Connection: 'close', Location: '/' })
    res.end()
  })
  req.pipe(busboy)