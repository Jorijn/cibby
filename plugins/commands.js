var cfg = require('../config');

module.exports = function() {
    return function(irc) {
        irc.on('data', function(data) {
            if (data.params.substr(0, 1) !== '#') {
                return;
            }

            var string = data.trailing,
                to = data.params,
                prefix = cfg.commands.prefix,
                bits = string.split(' '),
                from = data.prefix.match(/(.*)!(.*)@(.*)/),
                from = { nick: from[1], user: from[2], hostname: from[3] },
                command;

            if (string.substr(0, prefix.length) === prefix) {
                command = bits[0].substr(prefix.length);
                bits.shift();

                irc.emit('command_' + command, { command: command, channel: to, params: bits, message: string, from: from });
            }
        });
    }
}
