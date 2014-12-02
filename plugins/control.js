var cfg = require('../config');

module.exports = function() {
    return function(irc) {
        var target;

        var commands = {
            uptime: {
                level: 'public',
                run: function(target, message) {
                    var exec = require('child_process').exec;
                    exec('uptime', function(error, stdout, stderr) {
                        irc.send(target, stdout)
                    });
                }
            },
            v: {
                level: 'public',
                run: function(target, message) {
                    var exec = require('child_process').exec;
                    exec('git log --pretty=format:\'%ad %h %d\' --abbrev-commit --date=short -1', function(error, stdout, stderr) {
                        irc.send(target, 'CIBBY ' + stdout)
                    });
                }
            },
        };

        for (key in commands) {
            irc.on('command_' + key, function(m) {
                commands[m.command].run(m.channel, m.message);
            });
        }
    };
}
