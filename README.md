npm run lint:fix && npm run format && echo "✓ Both ESLint and Prettier completed successfully"


Note: Email sending is currently logged to console. In production, you'll need to integrate an email service (SendGrid, Resend, etc.) to actually send the reset links.


## starting mongoDB connection

brew services list | grep mongodb || echo "Checking for MongoDB installation..."

## restart mongo

brew services restart mongodb-community

brew services list | grep mongodb