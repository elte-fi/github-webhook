const { json } = require('body-parser');
const { HmacSHA1 } = require('crypto-js');
const express = require('express');
const run = require('./run');

const config = require('../github-webhook.json');

const app = express();

app.use(json());

app.post('/', async function (req, res) {
  const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  console.log(`Webhook request from: ${remoteAddress}`);

  const repository = req.body.repository['full_name'];
  const remoteSecret = req.headers['x-hub-signature'];
  const localSecret = 'sha1=' + HmacSHA1(JSON.stringify(req.body), config.github.secret)

  if (!repository) {
    res.status(400).send('Missing repository data.');
    return;
  }

  if (repository !== config.github.repository) {
    res.status(403).send('Repository mismatch.')
  }

  if (!remoteSecret) {
    res.status(400).send('Missing remote secret data.');
    return;
  }
  
  if (remoteSecret !== localSecret) {
    res.status(403).send('Secret mismatch.');
    return;
  }

  try {
    for (const {command, workingDir} of config.hooks.before) {
      await run(command, workingDir || config.local.repository);
    }

    await run('git pull', config.local.repository);

    for (const {command, workingDir} of config.hooks.after) {
      await run(command, workingDir || config.local.repository);
    }
  } catch (err) {
    res.status(500).send('Error executing webhook command: ' + err.cmd);
    return;
  }

  res.status(200).send(`Webhook executed successfully.`);
});

app.listen(config.port, function () {
  console.log(`Github webhook server started on port ${config.port}.`);
})