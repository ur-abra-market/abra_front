import React from 'react';

import { ScrollRestoration } from 'react-router-dom';

import { AdditionalHeaderBlock } from 'elements';
import { Footer } from 'layouts';
import { Paragraph, SimpleLink, Title } from 'ui-kit';

import style from './PrivacyPolicy.module.scss';

export const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <div>
      <ScrollRestoration />
      <AdditionalHeaderBlock />

      <div className={style.container}>
        <Title as="h1" size="xl">
          Abra&apos;s Privacy Policy
        </Title>

        <Title as="h2" size="xs" className={style.title_block}>
          Last Updated: 04/11/2023
        </Title>
        <Paragraph size="m" className={style.text}>
          Welcome to Abra&apos;s Marketplace (hereinafter referred to as
          &quot;Marketplace&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). We
          are committed to protecting your privacy, and this Privacy Policy explains how
          we collect, use, and disclose your personal information when you access or use
          our Marketplace. Please read this Privacy Policy carefully before using our
          Marketplace.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          By using our Marketplace, you consent to the collection, use, and disclosure of
          your personal information in accordance with this Privacy Policy. If you do not
          agree with this Privacy Policy, please do not use our Marketplace.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          1. Information We Collect
        </Title>
        <Paragraph size="m" className={style.text}>
          We may collect the following types of information when you access or use our
          Marketplace:
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          a. Personal Information: We collect personal information you provide when you
          register for an account, update your profile, or make transactions on our
          Marketplace. This may include your name, email address, shipping address,
          billing address, phone number, and payment information.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          b. Usage Information: We automatically collect information about your
          interactions with our Marketplace, such as the pages you visit, the time you
          spend on our site, and the items you view or purchase.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          c. Device and Connection Information: We collect information about your device,
          such as your IP address, device type, operating system, browser type, and
          location data.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          d. Cookies and Similar Technologies: We use cookies and similar technologies to
          collect information about your use of our Marketplace and to remember your
          preferences.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          2. How We Use Your Information
        </Title>
        <Paragraph size="m" className={style.text}>
          We use the information we collect to:
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          a. Provide, maintain, and improve our Marketplace and its features.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          b. Process and fulfill your transactions, including order processing, shipping,
          and billing.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          c. Communicate with you about your account, orders, and promotions.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          d. Personalize your experience and show you relevant content and advertisements.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          e. Detect and prevent fraud, abuse, and unauthorized access to our Marketplace.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          f. Comply with applicable laws, regulations, and legal obligations.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          g. Conduct research, analyze data, and improve our Marketplace.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          3. How We Share Your Information
        </Title>
        <Paragraph size="m" className={style.text}>
          We may share your personal information with:
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          a. Service providers who perform services on our behalf, such as payment
          processing, shipping, and marketing.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          b. Third-party sellers who offer products or services on our Marketplace.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          c. Other users when you publicly post information or interact with them on our
          Marketplace.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          d. Legal authorities when required by law or in response to a legal request.
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          e. In connection with a merger, acquisition, or sale of assets, subject to
          applicable laws and confidentiality agreements.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          4. Your Rights and Choices
        </Title>
        <Paragraph size="m" className={style.text}>
          You have the following rights and choices related to your personal information:
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          a. Access, update, or delete your personal information by logging into your
          account or contacting us at&nbsp;
          <SimpleLink color="accent" to="mailto:service@abra.com">
            service@abra.com
          </SimpleLink>
          .
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          b. Opt-out of marketing communications by clicking the &quot;unsubscribe&quot;
          link in any promotional email or contacting us at&nbsp;
          <SimpleLink color="accent" to="mailto:service@abra.com">
            service@abra.com
          </SimpleLink>
          .
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          c. Disable cookies in your browser settings, although this may affect your
          experience on our Marketplace.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          5. Data Retention and Security
        </Title>
        <Paragraph size="m" className={style.text}>
          We retain your personal information for as long as necessary to fulfill the
          purposes described in this Privacy Policy, unless a longer retention period is
          required or allowed by law. We take appropriate measures to protect your
          personal information from unauthorized access, loss, and misuse.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          6. Changes to This Privacy Policy
        </Title>
        <Paragraph size="m" className={style.text}>
          We may update this Privacy Policy from time to time. If we make significant
          changes, we will notify you by email or through a notice on our Marketplace.
          Your continued use of our Marketplace after the effective date of the revised
          Privacy Policy constitutes your acceptance of the changes.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          7. Contact Us
        </Title>
        <Paragraph size="m" className={style.text}>
          If you have any questions or concerns about this Privacy Policy or our privacy
          practices, please contact us at:
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          Abra, Turkey, Antalya
        </Paragraph>
        <Paragraph size="m" className={style.text}>
          Email:&nbsp;
          <SimpleLink color="accent" to="mailto:service@abra.com">
            service@abra.com
          </SimpleLink>
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          8. International Data Transfers
        </Title>
        <Paragraph size="m" className={style.text}>
          Our Marketplace is accessible to users around the world. By using our
          Marketplace, you acknowledge that your personal information may be transferred
          to, stored, and processed in countries other than your country of residence,
          which may have different data protection laws. We will take appropriate measures
          to ensure that your personal information is treated securely and in accordance
          with this Privacy Policy.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          9. Children&apos;s Privacy
        </Title>
        <Paragraph size="m" className={style.text}>
          Our Marketplace is not intended for individuals under the age of 13 (or the
          minimum age required in your jurisdiction). We do not knowingly collect personal
          information from children under the age of 13. If you become aware that a child
          has provided us with personal information without parental consent, please
          contact us at&nbsp;
          <SimpleLink color="accent" to="mailto:service@abra.com">
            service@abra.com
          </SimpleLink>
          , and we will take steps to remove such information and terminate the
          child&apos;s account.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          10. Third-Party Websites and Services
        </Title>
        <Paragraph size="m" className={style.text}>
          Our Marketplace may contain links to third-party websites, products, or
          services. We are not responsible for the privacy practices or the content of
          these third-party sites. This Privacy Policy does not apply to your interactions
          with third-party websites or services, and we encourage you to review their
          privacy policies before providing any personal information.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          11. Your California Privacy Rights
        </Title>
        <Paragraph size="m" className={style.text}>
          If you are a California resident, you may have certain rights under the
          California Consumer Privacy Act (CCPA). To exercise these rights, please contact
          us at&nbsp;
          <SimpleLink color="accent" to="mailto:service@abra.com">
            service@abra.com
          </SimpleLink>
          . Please note that we may need to verify your identity before fulfilling your
          request.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          12. Your European Privacy Rights
        </Title>
        <Paragraph size="m" className={style.text}>
          If you are a resident of the European Economic Area (EEA), you have certain
          rights under the General Data Protection Regulation (GDPR). To exercise these
          rights, please contact us at&nbsp;
          <SimpleLink color="accent" to="mailto:service@abra.com">
            service@abra.com
          </SimpleLink>
          . Please note that we may need to verify your identity before fulfilling your
          request.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          13. Governing Law
        </Title>
        <Paragraph size="m" className={style.text}>
          This Privacy Policy and any disputes arising out of or relating to it shall be
          governed by and construed in accordance with the laws of Turkey, without regard
          to its conflicts of law principles.
        </Paragraph>

        <Title as="h2" size="xs" className={style.title_block}>
          14. Updates to This Privacy Policy
        </Title>
        <Paragraph size="m" className={style.text}>
          We reserve the right to update or modify this Privacy Policy at any time and
          from time to time without prior notice. Please review this Privacy Policy
          periodically, and especially before you provide any personal information. Your
          continued use of the Marketplace after any changes or revisions to this Privacy
          Policy shall indicate your agreement with the terms of such revised Privacy
          Policy.
        </Paragraph>
      </div>

      <Footer className={style.footer} variant="black" />
    </div>
  );
};
