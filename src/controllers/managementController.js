const { sendErrorResponse } = require('../utils')
const { registerKeyPassword ,creditPerMessage} = require('../config')
const { getSessionsManagement, sessionGeyByKey } = require('../database')


const registerKey = async (req, res) => {
  const { key, credit, customerName, description } = req.body;
  try {
    const sessions = getSessionsManagement();

    if (!key.includes(registerKeyPassword)) {
      sendErrorResponse(res, 500, "Key pattern wrong.")
      return;
    }

    const orignalKey = key.replace(registerKeyPassword, "");

    sessions.insert({ key: orignalKey, credit, description, customerName, createdDate: new Date() });
    res.json({ success: true })
  } catch (error) {
    sendErrorResponse(res, 500, error.message)
  }
}

const getSessionsByKey = (req, res) => {
  const { key } = req.params;
  if (!key.includes(registerKeyPassword)) {
    sendErrorResponse(res, 500, "Key not found.")
    return;
  }
  const orignalKey = key.replace(registerKeyPassword, "");
  const sessions = getSessionsManagement();
  const session = sessions.findOne({ key:orignalKey });

  if (!session) {
    sendErrorResponse(res, 500, "Key not found.");
    return;
  }

  res.json(session);
};

const clientView = (req, res) => {
  const { key } = req.query;
  const session = sessionGeyByKey(key);
  if (!session) {
    res.render("error", { title: 'Customer not found' });
    return;
  }
  res.render("index", { title: 'Customer session', key, session ,creditPerMessage});
};
module.exports = { registerKey, getSessionsByKey, clientView }
