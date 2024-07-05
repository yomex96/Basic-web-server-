Task Description
Set up a basic web server in your preferred stack. Deploy it to any free hosting platform and expose an API endpoint that conforms to the criteria below:
Endpoint: [GET] <http://example.com>/api/hello?visitor_name="Mark" (where <http://example.com> is your server origin)

Response:
{
  "client_ip": "127.0.0.1", // The IP address of the requester
  "location": "New York" // The city of the requester
  "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
}

Author:Abayomi robert Onawole
