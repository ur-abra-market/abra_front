import React from 'react';

import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

import { WithLayout } from '../../../common/hocs/WithLayout';
import { CONTACT } from '../../../routes';

import style from './FAQ.module.css';

import { ContentBox } from './index';

const FAQData = [
  {
    id: nanoid(),
    question: '1 What is Abra Bulk Marketplace?',
    answer:
      'Abra Bulk Marketplace is a Turkey-based online platform that connects buyers and sellers of bulk products, including agricultural products, textiles, construction materials, and more. Our platform allows users to access the best deals, negotiate prices, and streamline the bulk purchasing process.',
  },
  {
    id: nanoid(),
    question: '2 How do I register on Abra Bulk Marketplace?',
    answer:
      'To register on Abra Bulk Marketplace, visit our website and click on the "Sign Up" button. Fill in the required information, including your name, email address, and phone number. After completing the registration process, you will receive a confirmation email to activate your account.',
  },
  {
    id: nanoid(),
    question: '3 Is there a fee to use the platform?',
    answer:
      'Registration and basic usage of Abra Bulk Marketplace are free. However, we offer premium subscription plans for sellers and buyers who want access to additional features, such as priority listings, advanced search options, and dedicated customer support.',
  },
  {
    id: nanoid(),
    question: '4 How do I list my products on the platform?',
    answer:
      'To list your products on Abra Bulk Marketplace, log into your account and navigate to the "Add Product" section. Provide detailed information about your product, including product name, description, price, and available quantity. Upload clear and high-quality images to showcase your product.',
  },
  {
    id: nanoid(),
    question: '5 How do I find products to buy on Abra Bulk Marketplace?',
    answer:
      'You can search for products by entering keywords in the search bar, or you can browse through product categories. Use the filter options to narrow down your search results based on your preferences, such as price range, location, and product type.',
  },
  {
    id: nanoid(),
    question: '6 How do I contact a seller?',
    answer:
      'To contact a seller on Abra Bulk Marketplace, click on the "ContactSupportPage Seller" button on the product listing page. You will be redirected to a form where you can submit your inquiry. The seller will then respond to your message directly.',
  },
  {
    id: nanoid(),
    question: '7 What payment methods are accepted on Abra Bulk Marketplace?',
    answer:
      "Abra Bulk Marketplace supports various payment methods, including bank transfers, credit cards, and secure online payment gateways. The specific payment options may vary depending on the seller's preferences.",
  },
  {
    id: nanoid(),
    question: '8 How do I track my orders?',
    answer:
      'Once you have completed a transaction, you can track your order by logging into your Abra Bulk Marketplace account and navigating to the "My Orders" section. You will find detailed information about your order status, including shipping updates and estimated delivery times.',
  },
  {
    id: nanoid(),
    question: '9 What if I have a problem with my order?',
    answer:
      'If you encounter any issues with your order, we recommend contacting the seller directly to resolve the matter. If the issue cannot be resolved with the seller, you can reach out to our customer support team for assistance.',
  },
  {
    id: nanoid(),
    question: '10 How can I leave feedbacks for a seller?',
    answer:
      'After receiving your order, you can leave feedbacks for the seller by visiting the "My Orders" section in your account. Click on the "Leave Feedback" button and rate the seller based on your experience. Your feedbacks helps other buyers make informed decisions and contributes to the overall quality of our marketplace.',
  },
  {
    id: nanoid(),
    question: '11 Can I use Abra Bulk Marketplace on my mobile device?',
    answer:
      'Yes, Abra Bulk Marketplace is available on both Android and iOS devices. You can download our mobile app from the Google Play Store or the Apple App Store to access the platform and manage your account on the go.',
  },
];

export const FAQPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.container}>
      <p className={style.title}>FAQs</p>
      <div className={style.content}>
        {FAQData.map(el => (
          <ContentBox key={el.id} question={el.question} answer={el.answer} />
        ))}
      </div>
      <p>
        For any further questions, please visit our Help Center or{' '}
        <Link to={CONTACT}>contact</Link> our Customer Support Team
      </p>
    </div>
  );
});
