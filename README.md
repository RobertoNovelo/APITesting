# APITesting
Post API Testing W/Node

## How to use:

1. Install [Node.js](https://nodejs.org/en/download/)
2. Add your project's **tests.json** file to the same folder as main.js
3. Open terminal or cmd on the project's folder
4. Run node main.js

The main.js file will run the tests and print the results in the console.

##tests.json format
```
  {
    "url":"http://localhost:8888/",
    "name":"APITesting",
    "testgroups":
    [
      {
        "groupname":"User API",
        "tests":
        [
          {
            "name":"User Register",
            "uri":"user/register",
            "input":
            {
              "data":
              {
                "username":"test",
                "password":"x"
              }
            },
            "output":
            {
              "responseStatus":"OK"
            }
          }
        ]
      }
    ]
  }
```
