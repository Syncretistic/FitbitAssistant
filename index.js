var http = require('http'
var express = require('express')
var cookieParser = require('cookie-parser')
var path = require("path");
var app = express()
var bodyParser = require('body-parser')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

var dynamicPaths = ['/home', '/heartsum','/heartint','/heartdaily']

app.use(dynamicPaths, function(req, res, next){
	if (!req.cookies.userData) {
		if(req._parsedUrl.pathname === '/login') {
        	next();
    	} else {
			return res.redirect('/login')	
    	}	
	} else {
			next();
	}
})

app.get('/', function(req,res){
	return res.redirect('/home')
})

app.route('/heartdaily')
	.get(function(req, res){
		res.sendFile('heartdaily.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var startDate = req.body.startDate
		var endDate = startDate
		var apiHeartint = 'http://34.252.198.73:8080/fitbit/heartrate/daily/'+userid+'/'+startDate+'/'+endDate+'/'+token
		http.get(apiHeartint, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/heartint')
	.get(function(req, res){
		res.sendFile('heartint.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var startDate = req.body.startDate
		var endDate = req.body.endDate
		var apiHeartint = 'http://34.252.198.73:8080/fitbit/heartrate/intraday/'+userid+'/'+startDate+'/'+endDate+'/'+token
		http.get(apiHeartint, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/heartsum')
	.get(function(req, res){
		res.sendFile('heartsum.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var minutes = req.body.minutes
		var apiHeartsum = 'http://34.252.198.73:8080/fitbit/heartrate/summary/'+ userid +'/' + minutes + '/' + token
		http.get(apiHeartsum, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/activitydaily')
	.get(function(req, res){
		res.sendFile('activitydaily.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var startDate = req.body.startDate
		var endDate = startDate
		var apiActivityint = 'http://34.252.198.73:8080/fitbit/activity/daily/'+userid+'/'+startDate+'/'+endDate+'/'+token
		http.get(apiActivityint, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/activityint')
	.get(function(req, res){
		res.sendFile('activityint.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var startDate = req.body.startDate
		var endDate = req.body.endDate
		var apiActivityint = 'http://34.252.198.73:8080/fitbit/activity/intraday/'+userid+'/'+startDate+'/'+endDate+'/'+token
		http.get(apiActivityint, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/activitysum')
	.get(function(req, res){
		res.sendFile('activitysum.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var minutes = req.body.minutes
		var apiActivitysum = 'http://34.252.198.73:8080/fitbit/activity/summary/'+ userid +'/' + minutes + '/' + token
		http.get(apiActivitysum, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/sleepdaily')
	.get(function(req, res){
		res.sendFile('sleepdaily.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var startDate = req.body.startDate
		var endDate = startDate
		var apiSleepint = 'http://34.252.198.73:8080/fitbit/sleep/'+userid+'/'+startDate+'/'+endDate+'/'+token
		http.get(apiSleepint, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/sleepint')
	.get(function(req, res){
		res.sendFile('sleepint.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var startDate = req.body.startDate
		var endDate = req.body.endDate
		var apiSleepint = 'http://34.252.198.73:8080/fitbit/sleep/intraday/'+userid+'/'+startDate+'/'+endDate+'/'+token
		http.get(apiSleepint, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.route('/sleepsum')
	.get(function(req, res){
		res.sendFile('sleepsum.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req, res){
		var body = ''
		var userid = req.cookies.userData.userid
		var token = req.cookies.userData.token
		var minutes = req.body.minutes
		var apiSleepsum = 'http://34.252.198.73:8080/fitbit/sleep/summary/'+ userid +'/' + minutes + '/' + token
		http.get(apiSleepsum, function(response) {
		response.on('error', function(err) {
						console.log(err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						body = JSON.parse(body)
						res.send(body)
					})
		})
	})

app.get('/home', function(req, res){
	res.sendFile('index.html', {root: path.join(__dirname, 'public') })
})

app.route('/login')
	.get(function(req, res){
		res.sendFile('login.html', {root: path.join(__dirname, 'public') })
	})
	.post(function(req,res){
		var username = req.body.username
		var password = req.body.password
		var apiToken = 'http://34.252.198.73:8080/token/' + username + '/' + password
		var body = ''
		http.get(apiToken, function(response) {                   // first api call to get the token
		response.on('error', function(err) {
						console.log('errore http1\n'+err)
					}).on('data', function(chunk) {
						body += chunk
					}).on('end', function() {
						var cookie = {}
						cookie.token = JSON.parse(body).token
						var apiUser = 'http://34.252.198.73:8080/fitbit/listusers/' + cookie.token
						body = ''
						http.get(apiUser, function(response) {         // second api call to get the userid
							response.on('error', function(err) {
								console.log('errore http2\n'+err)
							}).on('data', function(chunk) {
								body += chunk
							}).on('end', function() {
								body = JSON.parse(body)
								cookie.userid = body[0].id
								res.cookie("userData", cookie, {maxAge: 1800000})
								return res.redirect('/home')
							})
						})
					})
		})
	})

app.get('*', function(req, res){
  res.status(404).send('No siterino');
});

app.listen(8080, function() {
			console.log('Listening on port 8080...')
})
