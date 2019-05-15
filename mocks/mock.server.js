const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

var originsWhitelist = [
    'http://localhost:4200'
	// add more whitelisted URLs here comma separated
];
var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
// whitelist domains for CORS/CORB
app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log('[mock] requested URL:', req.url);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/calcDividends', function(req, res) {
    var response = calculateDividends(req.body);
    console.log('result is ', response);
	try {	
	    res.send({result : response});
	} catch (err) {
		console.log("Error reading file ", err);
	}
});

function calculateDividends(bets) {
	var result = bets[bets.length - 1].split(':');
	var winBetString = `W:${result[1]}`;
	var placeBetString = [];
	for (var x = 1; x < result.length; x++) {
		placeBetString.push(`P:${result[x]}`);
	}
	
	var exactaBetString = `E:${result[1]},${result[2]}`;
	var winBetCommission = 15;
	var placeBetCommission = 12;
	var exactaBetCommission = 18;
	var winnerOddsPoolSum = 0,
		placeOddsPoolSum = [0, 0, 0],
		exactaOddsPoolSum = 0, output = '',
	totalWinPoolSum = 0, totalPlacePoolSum = 0, totalExactaPoolSum = 0;

	for (var i = 0; i < bets.length; i++) {
		var winArr = bets[i].split(':');
		if (bets[i].indexOf(winBetString) !== -1) {
			winnerOddsPoolSum += parseInt(winArr[winArr.length - 1]);
		}

		placeBetString.some((item, index) => {
			if (bets[i].indexOf(item) !== -1) {
				placeOddsPoolSum[index] += parseInt(winArr[winArr.length - 1]);
			}
		});

		if (bets[i].indexOf(exactaBetString) !== -1) {
			exactaOddsPoolSum += parseInt(winArr[winArr.length - 1]);
		}

		if (bets[i].indexOf('W') !== -1) {
			totalWinPoolSum += parseInt(winArr[winArr.length - 1]);
		}

		if (bets[i].indexOf('P') !== -1) {
			totalPlacePoolSum += parseInt(winArr[winArr.length - 1]);
		}

		if (bets[i].indexOf('E') !== -1) {
			totalExactaPoolSum += parseInt(winArr[winArr.length - 1]);
		}
	}

	output = `${output}Win:${result[1]}:$${parseFloat((totalWinPoolSum - winBetCommission / 100 * totalWinPoolSum) / winnerOddsPoolSum).toFixed(2)} `;
	
	for (var t=0; t < result.length - 1; t++) {
		output = `${output}Place:${result[t+1]}:$${parseFloat((totalPlacePoolSum - placeBetCommission / 100 * totalPlacePoolSum) / placeOddsPoolSum[t] / (result.length-1)).toFixed(2)} `;
	}
	
	output = `${output}Exacta:${result[1]},${result[2]}:$${parseFloat((totalExactaPoolSum - exactaBetCommission / 100 * totalExactaPoolSum) / exactaOddsPoolSum).toFixed(2)}`;
    return output;
}

const routes = require("./mock.routes.js")(app);

const server = app.listen(3456, function() {
    console.log("[mock] mock server listening on port %s...", server.address().port);
});