var cfg = require('../config');

module.exports = function() {
    return function(irc) {
        irc.on('message', function(message) {
            if (message.to.substr(0, 1) !== '#') {
                return;
            }

            var string = message.message,
                to = message.to,
                prefix = cfg.commands.prefix,
                bits = string.split(' '),
                command;

            if (string.substr(0, prefix.length) === prefix) {
                command = bits[0].substr(prefix.length);
                bits.shift();

                irc.emit('command_' + command, { command: command, channel: to, params: bits, message: message });
            }
        });
    }
}
