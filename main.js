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
				validJSON = JSON.parse(data);
				callback(validJSON);
	        }
	        catch(err) {
	        	console.log("File is not written in a valid JSON Format");
	        	callback(false);
	        }
	        
	    });
	});
}

function validateTestFormat(validJSON)
{
	if(!validJSON)
	{
		return false;
	}
	else
	{
		console.log(validJSON);
		if(typeof validJSON.name == "string" && typeof validJSON.url == "string" && typeof validJSON.testgroups == "object" && typeof validJSON.port == "number")
		{
			for (var i = validJSON.testgroups.length - 1; i >= 0; i--) 
			{
				if(typeof validJSON.testgroups[i].groupname == "string" && typeof validJSON.testgroups[i].tests == "object")
				{
					for (var j = validJSON.testgroups[i].tests.length - 1; j >= 0; j--)
					{
						if( typeof validJSON.testgroups[i].tests[j].name == "string" && 
							typeof validJSON.testgroups[i].tests[j].uri == "string" && 
							typeof validJSON.testgroups[i].tests[j].input == "object" && 
							typeof validJSON.testgroups[i].tests[j].output == "object" && 
							typeof validJSON.testgroups[i].tests[j].input.data == "object" && 
							typeof validJSON.testgroups[i].tests[j].input.data.username == "string" && 
							typeof validJSON.testgroups[i].tests[j].input.data.password == "string" &&
							typeof validJSON.testgroups[i].tests[j].output.responseStatus == "string") 
						{
							console.log("Correct JSON Format");
						}
						else
						{
							console.log("Invalid JSON Format");
						}
					}
				}
				else
				{
					console.log("Invalid JSON Format");
				}
			}	
		}
		else
		{
			console.log("Invalid JSON Format");
		}
	}
	
}

validateTestsJSON(validateTestFormat);
