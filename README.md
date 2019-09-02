This is an application to list, create, edit and delete invoices from a mock API which generates invoices on every request.

To install and run:
you have to run your server on your localhost, on port 3000.
After the server is running and you have cloned the repo:
`npm install`
`npm start``
The program will tell you that another application is listening on your port 3000 (your server) so you say yes to selecting another port.
The program will tell you that is now listening on port 3001.
go to http://localhost:3001/ and click on the left side of the page "invoices" to see the list of invoices.

It might be the case that your node server prents CORS request so you will have to allow CORS requests in your server to test.

To edit select an invoice from the list and it will take you to the invoice detail page.