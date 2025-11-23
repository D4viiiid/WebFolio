# EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (you'll need this)

## Step 3: Create Email Template
1. Click "Email Templates" in the dashboard
2. Click "Create New Template"
3. Set up the template with these variables:

**Template for User (Automated Response):**
```
Subject: Thank you for contacting me

Hi {{to_name}},

Thank you for getting in touch. To proceed, kindly provide the exact details of your request or project. You may contact me directly through this email, and I'll make sure to respond shortly.

For your reference, here are the details you submitted:

Name: {{user_name}}
Email: {{user_email}}
Address: {{user_address}}
Details: {{user_details}}

Looking forward to assisting you.

Best regards,
Carl David M. Pamplona
```

4. Copy the **Template ID**

## Step 4: Update Your Code
1. Open `index.html` and find this line:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
   Replace `YOUR_PUBLIC_KEY` with your actual Public Key from EmailJS Account settings

2. Open `script.js` and find these lines:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', userTemplateParams)
   ```
   and
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', adminTemplateParams)
   ```
   
   Replace:
   - `YOUR_SERVICE_ID` with your Service ID from Step 2
   - `YOUR_TEMPLATE_ID` with your Template ID from Step 3

## Step 5: Get Your Public Key
1. In EmailJS dashboard, click "Account"
2. Find "API Keys" section
3. Copy your **Public Key**

## What Happens When Form is Submitted:
1. ✅ User receives automated email with your thank you message
2. ✅ User receives their submitted information (Name, Email, Address, Details)
3. ✅ You (cmpamplona@ccc.edu.ph) receive notification with all form details
4. ✅ Submit button shows "Sending..." during process
5. ✅ Success/error messages displayed to user

## Free Tier Limits:
- 200 emails per month
- Should be sufficient for a portfolio website

## Testing:
After setup, submit a test form to verify emails are being sent correctly.
