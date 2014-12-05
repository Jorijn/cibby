var cfg = require('../config');
var http = require('http');
var colors = require('irc-colors');

module.exports = function() {
    return function(irc) {
        var data, response;

        function get(target, params) {
            try {
                if (typeof params[0] === 'undefined') {
                    irc.send(target, 'ik heb tenminste een user id of user name nodig :-[');
                    return false;
                }

                http.get({
                  host: 'api.whatpulse.org',
                  port: 80,
                  path: '/user.php?user=' + encodeURI(params[0]) + '&formatted=1&format=json'
                }, function(resp){
                    data = [], response = [];

                    resp.setEncoding('utf8');
                    resp.on('data', function(chunk){
                        data.push(chunk);
                    });
                    resp.on('end', function() {
                        try {
                            data = JSON.parse(data.join(''));

                            console.log(typeof data.error);
                            if (typeof data.error === 'object') {
                                irc.send(target, data.error);
                                return false;
                            }

                            var s = ' ', o = colors.red('[') + s, c = s + colors.red(']'), string;
                            string = o + data.AccountName + c + s + o + data.tld + c + s + o + data.Keys + s + 'keys' + c;
                            string = string + s + o + data.Clicks + s + 'clicks' + c;
                            string = string + s + o + data.Download + s + 'downloaded' + c;
                            string = string + s + o + data.Upload + s + 'uploaded' + c;
                            string = string + s + o + data.Ranks.Keys + s + 'place' + c;

                            irc.send(target, string);
                        }
                        catch (e) {
                            irc.send(target, data.error);
                        }
                    });

                }).on("error", function(e){
                    console.log("Got error: " + e.message);
                }).end();
            }
            catch (err) {

            }
        }

        irc.on('command_wp', function(m) {
            get(m.channel, m.params);
        });
    }
}
