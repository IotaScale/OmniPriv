/**
 * EmailJS configuration
 *
 * To fill in these values:
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an Email Service (Gmail, Outlook, etc.) -> copy the Service ID
 * 3. Create an Email Template for each purpose -> copy the Template IDs
 * 4. Go to Account -> API Keys -> copy your Public Key
 *
 * Replace the placeholder strings below with your real values.
 */

export const EMAILJS_PUBLIC_KEY = "yvq-HLHV4_jF259wl";

export const EMAILJS_SERVICE_ID = "service_9am074m";

/** Recipient emails (comma-separated), set your EmailJS template's "To Email" field to {{to_email}} */
export const EMAILJS_RECIPIENT = "ahmed.raza@snskies.com,ahmediscoding@gmail.com";

/**
 * Template for the demo request form (/demo)
 * Suggested template variables:
 *   {{firstName}}, {{lastName}}, {{email}}, {{phone}},
 *   {{jobTitle}}, {{company}}, {{companySize}}, {{useCase}}, {{context}}
 */
export const EMAILJS_DEMO_TEMPLATE_ID = "template_8pcimf8";

/**
 * Template for the newsletter subscription (/blog)
 * Suggested template variables: {{subscriber_email}}
 */
export const EMAILJS_NEWSLETTER_TEMPLATE_ID = "YOUR_NEWSLETTER_TEMPLATE_ID";
