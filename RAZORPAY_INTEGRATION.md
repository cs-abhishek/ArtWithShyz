# Razorpay Integration Guide for ArtWithShyz

## Overview

This guide will help you integrate Razorpay payment gateway into your ArtWithShyz checkout page.

## Prerequisites

1. Create a Razorpay account at [https://dashboard.razorpay.com/](https://dashboard.razorpay.com/)
2. Get your API keys from the Razorpay dashboard
3. Add Razorpay script to your HTML

## Steps to Integrate

### 1. Add Razorpay Script to HTML

Add this script tag to your `client/public/index.html` file in the `<head>` section:

```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### 2. Update the Integration Code

In `client/src/App.tsx`, find the `initiateRazorpayPayment` function and:

1. Replace `"YOUR_RAZORPAY_KEY_ID"` with your actual Razorpay Key ID
2. Uncomment the Razorpay integration code block
3. Remove/comment out the demo alert code

### 3. Backend Integration (Optional but Recommended)

For production, you should:

1. Create a backend API endpoint to create Razorpay orders
2. Verify payment signatures on your backend
3. Update order status in your database

### 4. Testing

- Use Razorpay test keys for development
- Test with different payment methods (UPI, Cards, Net Banking)
- Test failure scenarios

## Code Structure

The checkout flow is:

1. User fills checkout form → `Checkout` component
2. Clicks "Place Order" → `handlePlaceOrder` function
3. If Razorpay selected → `initiateRazorpayPayment` function
4. Razorpay modal opens → Payment processing
5. Success/failure handling → Cart cleared/Error shown

## Current Implementation Status

✅ **Completed:**

- Full checkout page with form validation
- Order summary display
- COD (Cash on Delivery) option
- Shopping cart integration
- User authentication requirement
- Responsive design

⏳ **Pending (Waiting for Razorpay link):**

- Actual Razorpay payment gateway integration
- Payment verification
- Order confirmation system

## Features Included

### Checkout Page Features:

- **Customer Information Form**

  - First Name, Last Name
  - Email, Phone Number
  - Form validation

- **Shipping Address**

  - Complete address form
  - State dropdown for India
  - PIN code validation

- **Payment Options**

  - Razorpay (UPI, Cards, Net Banking, Wallets)
  - Cash on Delivery (+₹50 charges)

- **Order Summary**

  - Item details with images
  - Price breakdown
  - Shipping charges
  - Total calculation

- **Security Features**
  - Login required for checkout
  - Form validation
  - Secure payment integration ready

### User Experience:

- Mobile-responsive design
- Clear navigation (Back to Cart button)
- Loading states during processing
- Error handling
- Success confirmations

## Next Steps

1. Provide your Razorpay credentials/link
2. Test the integration
3. Deploy to production
4. Set up webhooks for payment verification (recommended)

## Support

If you need help with the integration, please provide:

1. Your Razorpay dashboard access details
2. Any specific payment flow requirements
3. Backend technology details (if applicable)
