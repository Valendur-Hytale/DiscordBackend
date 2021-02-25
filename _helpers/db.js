const config = require('config.json');
const mongoose = require('mongoose');
var connectWithRetry = function() {
    return mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true }, function(err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        } else {
			mongoose.Promise = global.Promise;
		}
    });
};

connectWithRetry();

//mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
//mongoose.Promise = global.Promise;

module.exports = {
C_APPLICATION_COMPONENT: require('../objects/C_APPLICATION_COMPONENT/C_APPLICATION_COMPONENT.model'),
C_APPLICATION_INTERFACE: require('../objects/C_APPLICATION_INTERFACE/C_APPLICATION_INTERFACE.model'),
C_SYSTEM_SOFTWARE: require('../objects/C_SYSTEM_SOFTWARE/C_SYSTEM_SOFTWARE.model'),
User: require('../users/user.model'),
Member: require('../member/member.model'),
	Setting: require('../settings/setting.model')
};
