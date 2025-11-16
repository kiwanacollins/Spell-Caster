npm run lint:fix && npm run format && echo "✓ Both ESLint and Prettier completed successfully"


Note: Email sending is currently logged to console. In production, you'll need to integrate an email service (SendGrid, Resend, etc.) to actually send the reset links.


## starting mongoDB connection

brew services list | grep mongodb || echo "Checking for MongoDB installation..."

## restart mongo

brew services restart mongodb-community

brew services list | grep mongodb



## migration for admin

# Run migration (initialize all users without role)
npx tsx scripts/migrate-user-roles.ts

# Check status before migrating
npx tsx scripts/migrate-user-roles.ts --check

# View current role distribution
npx tsx scripts/migrate-user-roles.ts --status


## more

npx tsx scripts/seed-admin.ts                    # Promote first user
npx tsx scripts/seed-admin.ts admin@example.com  # Promote specific user
npx tsx scripts/seed-admin.ts --list             # List all admins
npx tsx scripts/seed-admin.ts --check email      # Check if user is admin
npx tsx scripts/seed-admin.ts --demote email     # Demote from admin
npx tsx scripts/seed-admin.ts --help             # Show help


https://sketchfab.com/3d-models/healing-aura-effect-f09bfb93047648848ceb6ea942020028

what would be the value of this for this project: 