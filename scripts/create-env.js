const fs = require('fs')
fs.writeFileSync('./.env', `GOOGLE_CLIENT_ID=${process.env.GOOGLE_CLIENT_ID}\n`)