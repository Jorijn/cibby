// CORE
var util = require('util'),
    irc = require('slate-irc'),
    net = require('net'),
    cfg = require('./config');

// BOT PLUGINS
var commands = require('./plugins/commands.js'),
    autojoin = require('./plugins/autojoin.js'),
    ai = require('./plugins/ai.js');
    control = require('./plugins/control.js');
    whatpulse = require('./plugins/whatpulse.js');
    traffic = require('./plugins/traffic.js');
    karma = require('./plugins/karma.js');
    bitcoin = require('./plugins/bitcoin.js');
    stock = require('./plugins/stock.js');

// CONNECT
var stream = net.connect({
  port: cfg.server.port,
  host: cfg.server.host
});

var client = irc(stream);

// AUTH
client.nick(cfg.who.nickname);
client.user(cfg.who.username, cfg.who.realname);

// ADD PLUGINS
client.use(commands());
client.use(ai());
client.use(autojoin());
client.use(control());
client.use(traffic());
client.use(whatpulse());
client.use(karma());
client.use(bitcoin());
client.use(stock());
