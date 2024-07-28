require('./routes')
const { restoreSessions } = require('./sessions')
const { routes } = require('./routes')
const app = require('express')()
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const { maxAttachmentSize } = require('./config')
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));





// Initialize Express app
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: maxAttachmentSize + 1000000 }))
app.use(bodyParser.urlencoded({ limit: maxAttachmentSize + 1000000, extended: true }));
app.use(expressLayouts);
app.use('/', routes)


restoreSessions()

module.exports = app
