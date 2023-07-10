import React from 'react';

import style from './AboutUsPage.module.scss';

import { WithLayout } from 'common/hocs/WithLayout';

export const AboutUsPage = WithLayout((): JSX.Element => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>About Us</h2>

      <div className={style.container_text}>
        <div className={style.title_block}>
          Abra Bulk Marketplace: Your One-Stop Destination for Quality Turkish Products
        </div>

        <div className={style.title_block}>Introduction</div>
        <p className={style.text}>
          Abra Bulk Marketplace, based in the heart of Turkey, is an industry-leading
          wholesale platform that brings together the finest Turkish products under one
          virtual roof. Our mission is to provide businesses worldwide with easy access to
          the best of Turkey&apos;s offerings, while ensuring a seamless and hassle-free
          shopping experience.
        </p>

        <p className={style.text}>
          Our diverse product range, combined with our commitment to excellence in
          customer service, makes Abra Bulk Marketplace the ultimate destination for
          businesses seeking authentic, high-quality Turkish products.
        </p>

        <div className={style.title_block}>Why Choose Abra Bulk Marketplace?</div>
        <div className={style.text}>
          <ul>
            <li>
              <b>1.</b>
              Wide Range of Products: We pride ourselves on offering an extensive product
              range, from textiles and apparel to food and beverages, home decor, and
              more. Our carefully curated selection ensures that you&apos;ll find the
              perfect product for your business, no matter your industry or niche.
            </li>

            <li>
              <b>2.</b> Unmatched Quality: At Abra Bulk Marketplace, quality is our top
              priority. We work closely with our suppliers to ensure that all products
              meet our strict quality standards. Our team of experts handpicks each item,
              ensuring that only the finest products make their way to our customers.
            </li>

            <li>
              <b>3.</b> Competitive Pricing: As a leading wholesale platform, we
              understand the importance of competitive pricing. We work tirelessly to
              provide our customers with the best deals on the market, helping them
              maximize their profit margins.
            </li>

            <li>
              <b>4.</b> Reliable Shipping: We collaborate with renowned shipping partners
              to ensure timely and secure delivery of your orders, regardless of your
              location. Our streamlined logistics process guarantees that your products
              reach you safely and in perfect condition.
            </li>

            <li>
              <b>5.</b> Exceptional Customer Service: Our dedicated customer support
              available around the clock to address any questions or concerns you may
              have. We prioritize building long-lasting relationships with our clients,
              making sure you receive the personalized attention you deserve.
            </li>

            <li>
              <b>6.</b> Easy and Secure Payment Options: We offer a range of secure
              payment payment options, including credit cards, bank transfers, and more.
              equipped with top-of-the-line security measures to protect your sensitive
              information, giving you peace of mind while shopping with us. Discover the
              Best of Turkey with Abra Bulk Marketplace
            </li>
          </ul>
        </div>

        <p className={style.default_text}>
          At Abra Bulk Marketplace, we believe that every business deserves access to the
          finest Turkish products at competitive prices. Our platform simplifies the
          process of sourcing and purchasing wholesale items, allowing you to focus on
          growing your business. By choosing Abra Bulk
        </p>

        <p className={style.default_text}>
          Marketplace, you&apos;re not only investing in quality Turkish products, but
          also in a partnership that values your success and satisfaction.
        </p>

        <p className={style.default_text}>
          Join us today and experience the Abra Bulk Marketplace difference. Let&apos;s
          embark on a journey of mutual growth and success, bringing the best of Turkey to
          the world.
        </p>
      </div>
    </div>
  );
});
