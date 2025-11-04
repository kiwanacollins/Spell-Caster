/**
 * Environment Configuration Loader
 *
 * This module loads and validates environment variables at runtime.
 * It ensures all required variables are present and provides helpful error messages.
 *
 * Usage:
 *   import { env } from '@/lib/env';
 *   const apiKey = env.OPENAI_API_KEY; // Throws if not defined
 *   const optionalKey = env.optional.OPTIONAL_VAR; // Returns undefined if not set
 */

// Define which environment variables are required for core functionality
const REQUIRED_ENV_VARS = ['MONGODB_URI', 'NEXT_PUBLIC_APP_URL'];

// Define which environment variables are optional but recommended
const OPTIONAL_ENV_VARS = [
  'OPENAI_API_KEY',
  'STRIPE_PUBLIC_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'WHATSAPP_BUSINESS_ACCOUNT_ID',
  'WHATSAPP_PHONE_NUMBER_ID',
  'WHATSAPP_API_TOKEN',
  'WHATSAPP_WEBHOOK_VERIFY_TOKEN',
  'MESSENGER_PAGE_ACCESS_TOKEN',
  'MESSENGER_APP_SECRET',
  'MESSENGER_WEBHOOK_VERIFY_TOKEN',
  'EMAIL_FROM',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'BETTER_AUTH_SECRET',
  'BETTER_AUTH_URL',
];

/**
 * Validates that all required environment variables are defined.
 * Throws an error with helpful guidance if any are missing.
 */
function validateEnvironment(): void {
  const missing: string[] = [];

  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    const missingList = missing.map((v) => `  - ${v}`).join('\n');
    const message = `
❌ Missing required environment variables:

${missingList}

📋 Instructions:
1. Copy .env.local.example to .env.local
2. Fill in the required values
3. Restart your development server

📖 For guidance on obtaining these values, see .env.local.example
    `;
    throw new Error(message);
  }

  // Log optional missing variables in development
  if (process.env.NODE_ENV === 'development') {
    const missingOptional: string[] = [];

    for (const varName of OPTIONAL_ENV_VARS) {
      if (!process.env[varName]) {
        missingOptional.push(varName);
      }
    }

    if (missingOptional.length > 0) {
      const optionalList = missingOptional
        .map((v) => `  - ${v}`)
        .join('\n');
      console.debug(
        `⚠️  Optional environment variables not configured:\n\n${optionalList}\n\nSome features may not work until configured.`
      );
    }
  }
}

/**
 * Environment variable accessor with type safety
 * Required variables throw errors if not defined
 * Optional variables return undefined if not defined
 */
export const env = {
  // Required variables (throws if undefined)
  get MONGODB_URI(): string {
    const value = process.env.MONGODB_URI;
    if (!value) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    return value;
  },

  get NEXT_PUBLIC_APP_URL(): string {
    const value = process.env.NEXT_PUBLIC_APP_URL;
    if (!value) {
      throw new Error('NEXT_PUBLIC_APP_URL environment variable is not defined');
    }
    return value;
  },

  // Optional variables with getters
  optional: {
    // OpenAI
    get OPENAI_API_KEY(): string | undefined {
      return process.env.OPENAI_API_KEY;
    },

    // Stripe
    get STRIPE_PUBLIC_KEY(): string | undefined {
      return process.env.STRIPE_PUBLIC_KEY;
    },

    get STRIPE_SECRET_KEY(): string | undefined {
      return process.env.STRIPE_SECRET_KEY;
    },

    get STRIPE_WEBHOOK_SECRET(): string | undefined {
      return process.env.STRIPE_WEBHOOK_SECRET;
    },

    // WhatsApp
    get WHATSAPP_BUSINESS_ACCOUNT_ID(): string | undefined {
      return process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
    },

    get WHATSAPP_PHONE_NUMBER_ID(): string | undefined {
      return process.env.WHATSAPP_PHONE_NUMBER_ID;
    },

    get WHATSAPP_API_TOKEN(): string | undefined {
      return process.env.WHATSAPP_API_TOKEN;
    },

    get WHATSAPP_WEBHOOK_VERIFY_TOKEN(): string | undefined {
      return process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    },

    // Messenger
    get MESSENGER_PAGE_ACCESS_TOKEN(): string | undefined {
      return process.env.MESSENGER_PAGE_ACCESS_TOKEN;
    },

    get MESSENGER_APP_SECRET(): string | undefined {
      return process.env.MESSENGER_APP_SECRET;
    },

    get MESSENGER_WEBHOOK_VERIFY_TOKEN(): string | undefined {
      return process.env.MESSENGER_WEBHOOK_VERIFY_TOKEN;
    },

    // Email
    get EMAIL_FROM(): string | undefined {
      return process.env.EMAIL_FROM;
    },

    get SMTP_HOST(): string | undefined {
      return process.env.SMTP_HOST;
    },

    get SMTP_PORT(): number | undefined {
      const port = process.env.SMTP_PORT;
      return port ? parseInt(port, 10) : undefined;
    },

    get SMTP_USER(): string | undefined {
      return process.env.SMTP_USER;
    },

    get SMTP_PASSWORD(): string | undefined {
      return process.env.SMTP_PASSWORD;
    },

    // BetterAuth
    get BETTER_AUTH_SECRET(): string | undefined {
      return process.env.BETTER_AUTH_SECRET;
    },

    get BETTER_AUTH_URL(): string | undefined {
      return process.env.BETTER_AUTH_URL;
    },
  },
} as const;

// Validate environment on module load (only in server-side code)
if (typeof window === 'undefined') {
  try {
    validateEnvironment();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default env;
