import React from 'react';

import style from './PrivacyPolicy.module.css';

import { Footer } from 'layouts';
import HeaderForChangePages from 'old-components/HeaderForChangePages';

export const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <div>
      <HeaderForChangePages />
      <div className={style.container}>
        <h1 className={style.title}>Privacy Policy</h1>
        <div className={style.container_text}>
          <div className={style.title_block}>Abra&apos;s Privacy Policy</div>
          <div className={style.title_block}>Last updated: 04/11/2023</div>
          <p className={style.text}>
            Welcome to Abra&apos;s Marketplace (hereinafter referred to as
            &quot;Marketplace&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;).
            We are committed to protecting your privacy, and this Privacy Policy explains
            how we collect, use, and disclose your personal information when you access or
            use our Marketplace. Please read this Privacy Policy carefully before using
            our Marketplace.
          </p>
          <p className={style.text}>
            By using our Marketplace, you consent to the collection, use, and disclosure
            of your personal information in accordance with this Privacy Policy. If you do
            not agree with this Privacy Policy, please do not use our Marketplace.
          </p>
          <div className={style.title_block}>1. Information We Collect</div>
          <p className={style.text}>
            We may collect the following types of information when you access or use our
            Marketplace:
            <ul>
              <li>
                a. Personal Information: We collect personal information you provide when
                you register for an account, update your profile, or make transactions on
                our Marketplace. This may include your name, email address, shipping
                address, billing address, phone number, and payment information.
              </li>
              <li>
                b. Usage Information: We automatically collect information about your
                interactions with our Marketplace, such as the pages you visit, the time
                you spend on our site, and the items you view or purchase.
              </li>
              <li>
                c. Device and Connection Information: We collect information about your
                device, such as your IP address, device type, operating system, browser
                type, and location data.
              </li>
              <li>
                d. Cookies and Similar Technologies: We use cookies and similar
                technologies to collect information about your use of our Marketplace and
                to remember your preferences.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>2. How We Use Your Information</div>
          <p className={style.text}>
            We use the information we collect to:
            <ul>
              <li>a. Provide, maintain, and improve our Marketplace and its features.</li>
              <li>
                b. Process and fulfill your transactions, including order processing,
                shipping, and billing.
              </li>
              <li>c. Communicate with you about your account, orders, and promotions.</li>
              <li>
                d. Personalize your experience and show you relevant content and
                advertisements.
              </li>
              <li>
                e. Detect and prevent fraud, abuse, and unauthorized access to our
                Marketplace.
              </li>
              <li>f. Comply with applicable laws, regulations, and legal obligations.</li>
              <li>g. Conduct research, analyze data, and improve our Marketplace.</li>
            </ul>
          </p>
          <div className={style.title_block}>3. How We Share Your Information</div>
          <p className={style.text}>
            We may share your personal information with:
            <ul>
              <li>
                a. Service providers who perform services on our behalf, such as payment
                processing, shipping, and marketing.
              </li>
              <li>
                b. Third-party sellers who offer products or services on our Marketplace.
              </li>
              <li>
                c. Other users when you publicly post information or interact with them on
                our Marketplace.
              </li>
              <li>
                d. Legal authorities when required by law or in response to a legal
                request.
              </li>
              <li>
                e. In connection with a merger, acquisition, or sale of assets, subject to
                applicable laws and confidentiality agreements.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>4. Your Rights and Choices</div>
          <p className={style.text}>
            You have the following rights and choices related to your personal
            information:
            <ul>
              <li>
                a. Access, update, or delete your personal information by logging into
                your account or contacting us at service@abra.com.
              </li>
              <li>
                b. Opt-out of marketing communications by clicking the
                &quot;unsubscribe&quot; link in any promotional email or contacting us at
                service@abra.com.
              </li>
              <li>
                c. Disable cookies in your browser settings, although this may affect your
                experience on our Marketplace.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>5. Data Retention and Security</div>
          <p className={style.text}>
            We retain your personal information for as long as necessary to fulfill the
            purposes described in this Privacy Policy, unless a longer retention period is
            required or allowed by law. We take appropriate measures to protect your
            personal information from unauthorized access, loss, and misuse.
          </p>
          <div className={style.title_block}>6. Changes to This Privacy Policy</div>
          <p className={style.text}>
            We may update this Privacy Policy from time to time. If we make significant
            changes, we will notify you by email or through a notice on our Marketplace.
            Your continued use of our Marketplace after the effective date of the revised
            Privacy Policy constitutes your acceptance of the changes.
          </p>
          <div className={style.title_block}>7. Contact Us</div>
          <p className={style.text}>
            If you have any questions or concerns about this Privacy Policy or our privacy
            practices, please contact us at:
            <ul>
              <li>Abra</li>
              <li>Turkey, Antalya</li>
              <li>Email: service@abra.com</li>
            </ul>
          </p>
          <div className={style.title_block}>8. International Data Transfers</div>
          <p className={style.text}>
            Our Marketplace is accessible to users around the world. By using our
            Marketplace, you acknowledge that your personal information may be transferred
            to, stored, and processed in countries other than your country of residence,
            which may have different data protection laws. We will take appropriate
            measures to ensure that your personal information is treated securely and in
            accordance with this Privacy Policy.
          </p>
          <div className={style.title_block}>9. Children&apos;s Privacy</div>
          <p className={style.text}>
            Our Marketplace is not intended for individuals under the age of 13 (or the
            minimum age required in your jurisdiction). We do not knowingly collect
            personal information from children under the age of 13. If you become aware
            that a child has provided us with personal information without parental
            consent, please contact us at service@abra.com, and we will take steps to
            remove such information and terminate the child&apos;s account.
          </p>
          <div className={style.title_block}>10. Third-Party Websites and Services</div>
          <p className={style.text}>
            Our Marketplace may contain links to third-party websites, products, or
            services. We are not responsible for the privacy practices or the content of
            these third-party sites. This Privacy Policy does not apply to your
            interactions with third-party websites or services, and we encourage you to
            review their privacy policies before providing any personal information.
          </p>
          <div className={style.title_block}>11. Your California Privacy Rights</div>
          <p className={style.text}>
            If you are a California resident, you may have certain rights under the
            California Consumer Privacy Act (CCPA). To exercise these rights, please
            contact us at service@abra.com. Please note that we may need to verify your
            identity before fulfilling your request.
          </p>
          <div className={style.title_block}>12. Your European Privacy Rights</div>
          <p className={style.text}>
            If you are a resident of the European Economic Area (EEA), you have certain
            rights under the General Data Protection Regulation (GDPR). To exercise these
            rights, please contact us at service@abra.com. Please note that we may need to
            verify your identity before fulfilling your request.
          </p>
          <div className={style.title_block}>13. Governing Law</div>
          <p className={style.text}>
            This Privacy Policy and any disputes arising out of or relating to it shall be
            governed by and construed in accordance with the laws of Turkey, without
            regard to its conflicts of law principles.
          </p>
          <div className={style.title_block}>14. Updates to This Privacy Policy</div>
          <p className={style.text}>
            We reserve the right to update or modify this Privacy Policy at any time and
            from time to time without prior notice. Please review this Privacy Policy
            periodically, and especially before you provide any personal information. Your
            continued use of the Marketplace after any changes or revisions to this
            Privacy Policy shall indicate your agreement with the terms of such revised
            Privacy Policy.
          </p>
        </div>
      </div>
      <Footer variant="default" />
    </div>
  );
};
