"use strict";
var fs=require('fs');
var data = 0;
var validJSON = null;

function validateTestsJSON(callback)
{
	fs.open('./tests.json', 'r', function(err, fd) {
	    fs.fstat(fd, function(err, stats) {
	        var bufferSize = stats.size,
	            chunkSize = 512,
	            buffer = new Buffer(bufferSize),
	            bytesRead = 0;

	        while (bytesRead < bufferSize) {
	            if ((bytesRead + chunkSize) > bufferSize) {
	                chunkSize = (bufferSize - bytesRead);
	            }
	            fs.read(fd, buffer, bytesRead, chunkSize, bytesRead);
	            bytesRead += chunkSize;
	        }
	        data = buffer.toString('utf8', 0, bufferSize);
	        fs.close(fd);

	        try {
				JSON.parse(data);
				validJSON = JSON.parse(data);
				callback(data);
	        }
	        catch(err) {
	        	console.log("Incorrect JSON Format");
	        	return false;
	        }
	        
	    });
	});
}

function validateTestFormat(validJSON)
{
	console.log(validJSON);
}

validateTestsJSON(validateTestFormat);
