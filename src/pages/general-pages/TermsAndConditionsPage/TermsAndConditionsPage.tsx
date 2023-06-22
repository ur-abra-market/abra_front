import React from 'react';

import HeaderForChangePages from '../../../old-components/HeaderForChangePages';

import style from './TermsAndConditions.module.css';

import { Footer } from 'layouts';

export const TermsAndConditionsPage = (): JSX.Element => {
  return (
    <div>
      <HeaderForChangePages />
      <div className={style.container}>
        <h1 className={style.title}>Terms & conditions</h1>
        <div className={style.container_text}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div className={style.title_block}>Terms of Use for Abra</div>
          <div className={style.title_block}>Last Updated: 4/18/2023</div>
          <p className={style.text}>
            Welcome to the Bulk Marketplace in Turkey (hereinafter referred to as
            &quot;Platform&quot;). The Platform is operated by Abra (hereinafter referred
            to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company
            incorporated under the laws of Turkey.
          </p>
          <p className={style.text}>
            These Terms of Use (the &quot;Terms&quot;) govern your access to and use of
            our Platform and services (collectively, the &quot;Services&quot;). By
            accessing or using our Services, you agree to be bound by these Terms, our
            Privacy Policy, and any additional terms, conditions, policies, or agreements
            that may be applicable to specific features or sections of our Services.
          </p>
          <div className={style.title_block}>1. Eligibility</div>
          <p className={style.text}>
            To use our Services, you must:
            <ul>
              <li className={style.li}>
                1.1. Be at least 18 years old or the age of majority in your jurisdiction,
                whichever is greater.
              </li>
              <li className={style.li}>
                1.2. Be a resident of Turkey or authorized to do business in Turkey if you
                plan to sell on the Platform
              </li>
              <li className={style.li}>
                1.3. Be able to form legally binding contracts under applicable law.
              </li>
            </ul>
            By accessing or using our Services, you represent and warrant that you meet
            all of the above eligibility requirements.
          </p>
          <div className={style.title_block}>2. Registration and Account Security</div>
          <p className={style.text}>
            To access certain features of our Services, you may be required to register
            for an account. You agree to:
            <ul>
              <li className={style.li}>
                2.1. Provide accurate, current, and complete information during the
                registration process.
              </li>
              <li className={style.li}>
                2.2. Maintain and promptly update your account information to keep it
                accurate, current, and complete.
              </li>
              <li className={style.li}>
                2.3. Keep your account login information secure and confidential.
              </li>
              <li className={style.li}>
                2.4. Notify us immediately of any unauthorized use of your account or any
                other breach of security.
              </li>
              <li className={style.li}>
                2.5. Accept responsibility for all activities that occur under your
                account.
              </li>
            </ul>
            We reserve the right to suspend or terminate your account at any time if we
            believe that you have violated these Terms or for any other reason at our sole
            discretion.
          </p>
          <div className={style.title_block}>3. Use of the Services</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                3.1. You may use our Services only for lawful purposes and in compliance
                with all applicable laws, regulations, and ordinances.
              </li>
              <li className={style.li}>
                3.2. You may not use our Services in any manner that infringes on the
                rights of any third party, including but not limited to intellectual
                property rights, privacy rights, and other proprietary rights.
              </li>
              <li className={style.li}>
                3.3. You may not use our Services to engage in any fraudulent, deceptive,
                or misleading activities or to promote or sell illegal or harmful products
                or services.
              </li>
              <li className={style.li}>
                3.4. You are solely responsible for the content you submit, post, or
                otherwise make available on or through our Services. We may, but are not
                obligated to, monitor, review, or remove any content at our sole
                discretion.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>4. Intellectual Property</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                4.1. The Services and all content, materials, trademarks, logos, and other
                intellectual property rights displayed on or available through our
                Services are owned by us or our licensors and are protected by copyright,
                trademark, and other intellectual property laws. You may not copy,
                reproduce, distribute, or create derivative works from any such content
                without our prior written consent.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>5. Limitation of Liability</div>
          <p className={style.text}>
            To the maximum extent permitted by law, we and our affiliates, officers,
            employees, agents, suppliers, and licensors shall not be liable for any
            indirect, incidental, special, consequential, or exemplary damages, including
            but not limited to damages for loss of profits, goodwill, use, data, or other
            intangible losses, resulting from your use or inability to use our Services,
            any unauthorized access to or alteration of your account, any content you
            submit or post on our Services, or any other matter relating to our Services.
          </p>
          <div className={style.title_block}>6. Indemnification</div>
          <p className={style.text}>
            You agree to indemnify, defend, and hold harmless us and our affiliates,
            officers, employees, agents, suppliers, and licensors from and against any and
            all claims, liabilities, damages, losses, expenses, and costs (including
            reasonable attorneys&apos; fees) arising out of or in connection with your
            access to or use of our Services, your violation of these Terms, your
            infringement of any third party&apos;s rights, or any disputes between you and
            other users of our Services.
          </p>
          <div className={style.title_block}>7. Termination</div>
          <p className={style.text}>
            We may, in our sole discretion, suspend or terminate your access to or use of
            our Services at any time, for any reason, and without notice. We may also
            modify, discontinue, or restrict any aspect of our Services at any time, for
            any reason, and without notice. You may also terminate your account and
            discontinue using our Services at any time. Upon termination, all rights and
            obligations under these Terms shall cease, except for those provisions which
            by their nature are intended to survive termination.
          </p>
          <div className={style.title_block}>8. Governing Law and Dispute Resolution</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                8.1. These Terms shall be governed by and construed in accordance with the
                laws of Turkey, without regard to its conflict of law principles.
              </li>
              <li className={style.li}>
                8.2. Any dispute, claim, or controversy arising out of or relating to
                these Terms or the use of our Services shall be resolved through amicable
                negotiations between the parties. If the parties fail to reach an amicable
                settlement within thirty (30) days from the date of the dispute, claim, or
                controversy arising, either party may submit the dispute to the competent
                courts of Turkey for resolution.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>9. Changes to These Terms</div>
          <p className={style.text}>
            We may modify or update these Terms at any time at our sole discretion. When
            we do so, we will post the updated Terms on our Platform, and the &quot;Last
            Updated&quot; date at the top of these Terms will be revised. It is your
            responsibility to review these Terms periodically. Your continued use of our
            Services after the posting of the revised Terms constitutes your acceptance of
            the changes.
          </p>
          <div className={style.title_block}>10. Miscellaneous</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                10.1. If any provision of these Terms is held to be invalid or
                unenforceable by a court of competent jurisdiction, such provision shall
                be struck, and the remaining provisions shall continue in full force and
                effect.
              </li>
              <li className={style.li}>
                10.2. Our failure to exercise or enforce any right or provision of these
                Terms shall not constitute a waiver of such right or provision.
              </li>{' '}
              <li className={style.li}>
                10.3. These Terms, together with our Privacy Policy and any other
                agreements or policies incorporated by reference, constitute the entire
                agreement between you and us concerning your use of our Services and
                supersede any prior or contemporaneous agreements, communications, or
                proposals, whether oral or written, between you and us.{' '}
              </li>
            </ul>
          </p>
          <div className={style.title_block}>11. Contact Information</div>
          <p className={style.text}>
            If you have any questions or concerns about these Terms, our Services, or any
            related matter, please contact us at:
            <ul>
              <li className={style.li}>Abra</li>
              <li className={style.li}>Antalya, Turkey</li>
              <li className={style.li}>support@abra-market.com </li>
            </ul>
          </p>
          <div className={style.title_block}>12. User Conduct</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                12.1. You agree not to use our Services to:
                <ul>
                  <li>
                    a. Post, upload, or distribute content that is unlawful, defamatory,
                    libelous, offensive, harassing, abusive, fraudulent, or otherwise
                    objectionable.
                  </li>
                  <li>
                    b. Violate any third party&apos;s rights, including but not limited to
                    intellectual property rights, privacy rights, or other proprietary
                    rights.
                  </li>
                  <li>
                    c. Engage in any activity that would constitute a criminal offense or
                    give rise to civil liability.
                  </li>
                  <li>
                    d. Impersonate any person or entity or misrepresent your affiliation
                    with any person or entity.
                  </li>
                  <li>
                    e. Transmit or introduce any viruses, worms, or other harmful software
                    to our Services.
                  </li>
                </ul>
              </li>
              <li className={style.li}>
                12.2. We reserve the right, but have no obligation, to investigate and
                take appropriate legal action against anyone who, in our sole discretion,
                violates these Terms, including but not limited to removing the offending
                content from our Services, suspending or terminating the account of such
                violators, and reporting the violator to the appropriate legal
                authorities.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>13. Third-Party Websites and Services</div>
          <p className={style.text}>
            Our Services may contain links to third-party websites or services that are
            not owned or controlled by us. We have no control over, and assume no
            responsibility for, the content, privacy policies, or practices of any
            third-party websites or services. You acknowledge and agree that we shall not
            be responsible or liable, directly or indirectly, for any damage or loss
            caused or alleged to be caused by or in connection with your use of or
            reliance on any such content, goods, or services available on or through any
            such third-party websites or services.
          </p>
          <div className={style.title_block}>14. Force Majeure</div>
          <p className={style.text}>
            We shall not be liable for any failure or delay in the performance of our
            obligations under these Terms or for any loss or damage that you may incur as
            a result of any event or circumstance beyond our reasonable control, including
            but not limited to acts of God, war, terrorism, civil unrest, labor strikes,
            power outages, or governmental actions.
          </p>
          <div className={style.title_block}>15. Assignment</div>
          <p className={style.text}>
            These Terms, and any rights and licenses granted hereunder, may not be
            transferred or assigned by you, but may be assigned by us without restriction.
          </p>
          <div className={style.title_block}>16. Severability</div>
          <p className={style.text}>
            If any provision of these Terms is deemed invalid by a court of competent
            jurisdiction, the invalidity of such provision shall not affect the validity
            of the remaining provisions of these Terms, which shall remain in full force
            and effect.
          </p>
          <div className={style.title_block}>17. Headings</div>
          <p className={style.text}>
            The headings in these Terms are for convenience only and have no legal or
            contractual effect.
          </p>
          <div className={style.title_block}>18. No Third-Party Beneficiaries</div>
          <p className={style.text}>
            You agree that, except as otherwise expressly provided in these Terms, there
            shall be no third-party beneficiaries to these Terms.
          </p>
          <div className={style.title_block}>19. Entire Agreement</div>
          <p className={style.text}>
            These Terms, together with our Privacy Policy, any other legal notices
            published by us on our Services, and any applicable written agreement between
            you and us, constitute the entire agreement between you and us concerning the
            use of our Services and supersede any prior agreements, communications, or
            proposals, whether oral or written, between you and us.
          </p>
          <div className={style.title_block}>20. Notices</div>
          <p className={style.text}>
            All notices, requests, consents, claims, demands, waivers, and other
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            communications under these Terms (collectively, "Notices") shall be in writing
            and sent to the following address:
            <ul>
              <li className={style.li}>Abra</li>
              <li className={style.li}>Antalya, Turkey</li>
              <li className={style.li}>support@abra-market.com </li>
            </ul>
            Notices shall be deemed to have been given on the date of receipt if delivered
            personally, or on the date of sending if sent by email. We may also provide
            Notices to you through posting on our Platform or by other reasonable means of
            communication.
          </p>
          <div className={style.title_block}>21. Feedback</div>
          <p className={style.text}>
            We welcome and encourage you to provide feedback, comments, and suggestions
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            for improvements to our Services ("Feedback"). You may submit Feedback by
            contacting us through the contact information provided in Section 11. By
            submitting Feedback, you grant us a non-exclusive, worldwide, royalty-free,
            irrevocable, sub-licensable, perpetual license to use and publish any ideas,
            concepts, know-how, techniques, or other intellectual property rights
            contained in your Feedback for any purpose, without compensation to you.
          </p>
          <div className={style.title_block}>22. Language</div>
          <p className={style.text}>
            These Terms have been prepared in English, which shall be the controlling
            language in all respects. Any translations of these Terms into other languages
            are provided for convenience only and shall not be binding or have any legal
            effect.
          </p>
          <div className={style.title_block}>23. No Waiver</div>
          <p className={style.text}>
            Our failure to enforce any right or provision of these Terms will not be
            considered a waiver of those rights. The waiver of any such right or provision
            will be effective only if in writing and signed by a duly authorized
            representative of Abra. Except as expressly set forth in these Terms, the
            exercise by either party of any of its remedies under these Terms will be
            without prejudice to its other remedies under these Terms or otherwise.
          </p>
          <div className={style.title_block}>24. Relationship of the Parties</div>
          <p className={style.text}>
            Nothing in these Terms shall be construed to create a partnership, joint
            venture, agency, or employment relationship between you and us. You
            acknowledge that you have no authority to bind us in any respect and that you
            are an independent contractor in your use of our Services.
          </p>
          <div className={style.title_block}>25. Questions and Contact Information</div>
          <p className={style.text}>
            If you have any questions or concerns about these Terms or our Services,
            please do not hesitate to contact us at the contact information provided in
            Section 11.
          </p>
          <div className={style.title_block}>26. Compliance with Laws</div>
          <p className={style.text}>
            You agree to comply with all applicable local, national, and international
            laws, rules, and regulations in connection with your use of our Services. You
            are also responsible for obtaining any necessary licenses, permissions, or
            authorizations required for your use of our Services, including but not
            limited to any import or export restrictions, customs regulations, or other
            requirements applicable to the products or services you buy or sell on our
            Platform.
          </p>
          <div className={style.title_block}>27. Taxes</div>
          <p className={style.text}>
            You are solely responsible for determining and fulfilling any tax obligations
            related to your use of our Services, including but not limited to sales,
            income, or value-added taxes. You agree to indemnify and hold us harmless from
            any tax liabilities, penalties, or other costs that may arise as a result of
            your failure to properly fulfill your tax obligations.
          </p>
          <div className={style.title_block}>28. Disclaimers</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                28.1. Our Services are provided on an &quot;as-is&quot; and
                &quot;as-available&quot; basis. To the fullest extent permitted by law, we
                disclaim all warranties, express or implied, including but not limited to
                implied warranties of merchantability, fitness for a particular purpose,
                and non-infringement.
              </li>
              <li className={style.li}>
                28.2. We do not warrant that our Services will be uninterrupted,
                error-free, secure, or free of viruses or other harmful components. You
                assume all risks associated with your use of our Services, including but
                not limited to the risk of data loss, unauthorized access to your account,
                or other security breaches.
              </li>
              <li className={style.li}>
                28.3. We make no representations or warranties about the accuracy,
                reliability, completeness, or timeliness of any content, information, or
                materials provided by our Services. You are responsible for verifying any
                information before relying on it.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>29. Reporting Violations</div>
          <p className={style.text}>
            If you become aware of any violations of these Terms by other users, you agree
            to promptly report such violations to us at the contact information provided
            in Section 11. We reserve the right, but have no obligation, to investigate
            and take appropriate legal action against anyone who, in our sole discretion,
            violates these Terms.
          </p>
          <div className={style.title_block}>30. Amendments and Modifications</div>
          <p className={style.text}>
            We reserve the right to amend, modify, or discontinue, temporarily or
            permanently, all or any part of our Services, with or without notice, at any
            time at our sole discretion. You agree that we shall not be liable to you or
            any third party for any such amendment, modification, or discontinuance of our
            Services.
          </p>
          <p className={style.text}>
            By continuing to access or use our Services after we have posted any changes
            to these Terms or our Privacy Policy, you agree to be bound by the modified
            Terms and Privacy Policy. If you do not agree to the modified Terms or Privacy
            Policy, you must stop using our Services.
          </p>
          <div className={style.title_block}>31. Confidentiality</div>
          <p className={style.text}>
            You agree to maintain the confidentiality of any non-public information that
            you may receive from us or other users of our Services in connection with your
            use of our Services, including but not limited to pricing, financial, or other
            sensitive information, and not to disclose such information to any third party
            without our prior written consent or as required by law.
          </p>
          <div className={style.title_block}>32. Prohibited Activities</div>
          <p className={style.text}>
            In addition to any other restrictions set forth in these Terms, you agree not
            to engage in the following activities while using our Services:
            <ul>
              <li className={style.li}>
                32.1. Accessing or attempting to access any of our Services by any means
                other than through the interfaces provided by us, or circumventing or
                attempting to circumvent any security or authentication measures
                implemented by us.
              </li>
              <li className={style.li}>
                32.2. Decompiling, reverse engineering, or otherwise attempting to obtain
                the source code or underlying ideas or information of or relating to our
                Services, except as permitted by applicable law.
              </li>
              <li className={style.li}>
                32.3. Using any automated means, including but not limited to robots,
                spiders, or scripts, to access, monitor, or collect information from our
                Services without our prior written consent.
              </li>
              <li className={style.li}>
                32.4. Interfering with or disrupting the operation of our Services or the
                servers or networks used to provide our Services, or violating any
                requirements, procedures, policies, or regulations of such networks.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>33. Export Controls</div>
          <p className={style.text}>
            You acknowledge and agree that the products or services you buy or sell on our
            Platform may be subject to applicable export control laws and regulations. You
            agree to comply with all such laws and regulations and to obtain any necessary
            licenses, permissions, or authorizations required for the export, re-export,
            or import of such products or services.
          </p>
          <div className={style.title_block}>34. Sanctions Compliance</div>
          <p className={style.text}>
            You represent and warrant that neither you nor any party related to or
            associated with you is subject to any trade sanctions, embargoes, or other
            restrictions under applicable laws, including but not limited to the laws of
            Turkey and the United States. You agree not to use our Services to engage in
            any transactions or dealings with any individuals or entities that are subject
            to such sanctions, embargoes, or restrictions.
          </p>
          <div className={style.title_block}>35. Acknowledgment</div>
          <p className={style.text}>
            By using our Services, you acknowledge that you have read, understood, and
            agree to be bound by these Terms, our Privacy Policy, and any other applicable
            agreements or policies incorporated by reference. If you do not agree to these
            Terms, you must not access or use our Services.
          </p>
          <div className={style.title_block}>36. Electronic Communications</div>
          <p className={style.text}>
            By using our Services, you consent to receive communications from us
            electronically, including but not limited to email or notifications posted on
            our Platform. You agree that all agreements, notices, disclosures, and other
            communications that we provide to you electronically satisfy any legal
            requirement that such communications be in writing.
          </p>
          <div className={style.title_block}>37. Indemnification</div>
          <p className={style.text}>
            You agree to defend, indemnify, and hold harmless [Company Name], its
            affiliates, and their respective officers, directors, employees, and agents
            from and against any and all claims, damages, obligations, losses,
            liabilities, costs, and expenses (including but not limited to attorney&apos;s
            fees) arising from:
            <ul>
              <li className={style.li}>37.1. Your use of and access to our Services;</li>
              <li className={style.li}>
                37.2. Your violation of any term of these Terms;
              </li>
              <li className={style.li}>
                37.3. Your violation of any third-party right, including without
                limitation any copyright, property, or privacy right; or
              </li>
              <li className={style.li}>
                37.4. Any claim that your content caused damage to a third party.
              </li>
            </ul>
            This defense and indemnification obligation will survive these Terms and your
            use of our Services.
          </p>
          <div className={style.title_block}>38. Limitation of Liability</div>
          <p className={style.text}>
            In no event shall Abra, its affiliates, or their respective officers,
            directors, employees, or agents be liable for any direct, indirect,
            incidental, special, consequential, or exemplary damages, including but not
            limited to damages for loss of profits, goodwill, use, data, or other
            intangible losses (even if we have been advised of the possibility of such
            damages), arising out of or in connection with your use of our Services or
            these Terms, whether based on warranty, contract, tort (including negligence),
            strict liability, or any other legal theory.Some jurisdictions do not allow
            the exclusion of certain warranties or the limitation or exclusion of
            liability for certain damages. Accordingly, some of the above limitations and
            disclaimers may not apply to you. To the extent that we may not, as a matter
            of applicable law, disclaim any implied warranty or limit our liabilities, the
            scope and duration of such warranty and the extent of our liability shall be
            the minimum permitted under such applicable law.
          </p>
          <div className={style.title_block}>39. International Users</div>
          <p className={style.text}>
            Our Services are controlled and operated from Turkey. We make no
            representation that our Services are appropriate or available for use outside
            of Turkey. If you access our Services from outside Turkey, you do so at your
            own risk and are responsible for compliance with the laws of your
            jurisdiction.
          </p>
          <div className={style.title_block}>40. Notices to Us</div>
          <p className={style.text}>
            Any notices or other communications that you wish to provide to us under these
            Terms should be sent to the contact information provided in Section 11.
          </p>
          <div className={style.title_block}>
            41. Digital Millennium Copyright Act (DMCA) Compliance
          </div>
          <p className={style.text}>
            If you believe that your copyrighted work has been copied and is accessible on
            our Services in a way that constitutes copyright infringement, please provide
            our designated Copyright Agent with the following information:
            <ul>
              <li className={style.li}>
                41.1. A description of the copyrighted work that you claim has been
                infringed;
              </li>
              <li className={style.li}>
                41.2. A description of where the material that you claim is infringing is
                located on our Services;
              </li>
              <li className={style.li}>
                41.3. Your address, telephone number, and email address;
              </li>
              <li className={style.li}>
                41.4. A statement by you that you have a good faith belief that the
                disputed use is not authorized by the copyright owner, its agent, or the
                law; and
              </li>
              <li className={style.li}>
                41.5. A statement by you, made under penalty of perjury, that the above
                information in your notice is accurate and that you are the copyright
                owner or authorized to act on the copyright owner&apos;s behalf.
              </li>
              Our designated Copyright Agent for notice of claims of copyright
              infringement on our Services can be reached at the contact information
              provided in Section 11.
            </ul>
          </p>
          <div className={style.title_block}>42. Governing Law and Jurisdiction</div>
          <p className={style.text}>
            These Terms shall be governed by and construed in accordance with the laws of
            Turkey, without regard to its conflict of law principles. Any dispute or claim
            arising out of or in connection with these Terms or their subject matter or
            formation (including non-contractual disputes or claims) shall be subject to
            the exclusive jurisdiction of the courts of Turkey.
          </p>
          <div className={style.title_block}>43. Dispute Resolution</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                43.1. If a dispute arises between you and us in connection with your use
                of our Services or these Terms, the parties shall first attempt to resolve
                the dispute through good faith negotiations.
              </li>
              <li className={style.li}>
                43.2. If the parties are unable to resolve the dispute through good faith
                negotiations within thirty (30) days, either party may submit the dispute
                to binding arbitration in accordance with the rules of the applicable
                arbitration organization in Turkey. The arbitration shall be conducted by
                a single arbitrator mutually agreed upon by the parties, or, if the
                parties cannot agree on an arbitrator, an arbitrator appointed by the
                president of the applicable arbitration organization. The
                arbitrator&apos;s decision shall be final and binding on the parties, and
                judgment upon the award rendered by the arbitrator may be entered in any
                court having jurisdiction thereof.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>44. Miscellaneous</div>
          <p className={style.text}>
            <ul>
              <li className={style.li}>
                44.1. These Terms and the relationship between you and us shall be
                governed by the laws of Turkey, without regard to its conflict of law
                provisions.
              </li>
              <li className={style.li}>
                44.2. If any provision of these Terms is found by a court of competent
                jurisdiction to be invalid, the parties nevertheless agree that the court
                should endeavor to give effect to the parties&apos; intentions as
                reflected in the provision, and the other provisions of these Terms remain
                in full force and effect.
              </li>
              <li className={style.li}>
                44.3. Our failure to exercise or enforce any right or provision of these
                Terms shall not constitute a waiver of such right or provision unless
                acknowledged and agreed to by us in writing.
              </li>
              <li className={style.li}>
                44.4. The section titles in these Terms are for convenience only and have
                no legal or contractual effect.
              </li>
            </ul>
          </p>
          <div className={style.title_block}>45. Changes to These Terms</div>
          <p className={style.text}>
            We reserve the right, at our sole discretion, to modify or replace these Terms
            at any time. If a revision is material, we will provide at least 30 days&apos;
            notice prior to any new terms taking effect. What constitutes a material
            change will be determined at our sole discretion.
          </p>
          <p className={style.text}>
            By continuing to access or use our Services after any revisions become
            effective, you agree to be bound by the revised terms. If you do not agree to
            the new terms, you are no longer authorized to use our Services.
          </p>
          <div className={style.title_block}>46. Contact Information</div>
          <p className={style.text}>
            If you have any questions about these Terms, please contact us at:
            <ul>
              <li className={style.li}>Abra</li>
              <li className={style.li}>Antalya, Turkey</li>
              <li className={style.li}>support@abra-market.com </li>
            </ul>
          </p>
          <div className={style.title_block}>47. Entire Agreement</div>
          <p className={style.text}>
            These Terms, together with our Privacy Policy and any other agreements or
            policies incorporated by reference, constitute the entire agreement between
            you and us with respect to your access to and use of our Services, and
            supersede all prior or contemporaneous agreements, understandings,
            negotiations, and communications, whether written or oral, between you and us
            with respect to the subject matter hereof.
          </p>
          <div className={style.title_block}>48. Assignment</div>
          <p className={style.text}>
            You may not assign or transfer your rights or obligations under these Terms,
            by operation of law or otherwise, without our prior written consent. Any
            attempt by you to assign or transfer your rights or obligations under these
            Terms without such consent will be null and void. We may assign or transfer
            our rights and obligations under these Terms at our sole discretion, without
            restriction. Subject to the foregoing, these Terms will bind and insure to the
            benefit of the parties, their successors, and permitted assigns.
          </p>
          <div className={style.title_block}>49. Force Majeure</div>
          <p className={style.text}>
            Neither party shall be liable for any failure or delay in the performance of
            its obligations under these Terms (except for any payment obligations) due to
            any cause beyond its reasonable control, including but not limited to acts of
            God, war, terrorism, civil unrest, labor disputes, natural disasters,
            epidemics, pandemics, failure of communication systems, or any governmental
            action, provided that such party gives prompt written notice of such cause to
            the other party and uses its reasonable efforts to resume performance as soon
            as practicable.
          </p>
          <div className={style.title_block}>50. Survival</div>
          <p className={style.text}>
            All provisions of these Terms that, by their nature, should survive
            termination or expiration of these Terms, including but not limited to
            ownership provisions, warranty disclaimers, indemnity, limitations of
            liability, and dispute resolution provisions, shall continue in full force and
            effect after the termination or expiration of these Terms.
          </p>
          <div className={style.title_block}>51. Headings</div>
          <p className={style.text}>
            The headings used in these Terms are for reference purposes only and shall not
            affect the meaning or interpretation of these Terms.
          </p>
          <div className={style.title_block}>52. Interpretation</div>
          <p className={style.text}>
            In the event of any conflict between these Terms and any other document that
            is incorporated by reference herein, these Terms shall control. If any
            provision of these Terms is held to be invalid, illegal, or unenforceable in
            any respect under any applicable law or rule in any jurisdiction, such
            invalidity, illegality, or unenforceability shall not affect the validity,
            legality, or enforceability of any other provision or any other jurisdiction,
            and these Terms shall be reformed, construed, and enforced in such
            jurisdiction as if such provision had never been contained herein.
          </p>
          <div className={style.title_block}>53. No Third-Party Beneficiaries</div>
          <p className={style.text}>
            Except as expressly provided in these Terms, there are no third-party
            beneficiaries to these Terms. Nothing in these Terms is intended to confer any
            rights or remedies on any person other than the parties to these Terms.
          </p>
          <div className={style.title_block}>54. Language</div>
          <p className={style.text}>
            These Terms have been drafted in English, and the English-language version of
            these Terms shall control in all respects. Any translations of these Terms
            into any other language are provided for reference purposes only and shall
            have no legal or other effect.
          </p>
          <div className={style.title_block}>55. No Agency</div>
          <p className={style.text}>
            No agency, partnership, joint venture, employee-employer, or
            franchisor-franchisee relationship is intended or created by these Terms.
            Neither party has the authority to bind the other or to incur any obligation
            on its behalf.
          </p>
          <div className={style.title_block}>56. Notices to You</div>
          <p className={style.text}>
            We may provide notices to you in connection with these Terms by posting them
            on our Platform or by sending them to the email address you have provided to
            us. You are responsible for ensuring that your email address is current and
            accurate. Notices provided by posting on our Platform will be deemed effective
            on the date they are posted. Notices provided by email will be deemed
            effective on the date they are sent.
          </p>
          <div className={style.title_block}>57. Equitable Relief</div>
          <p className={style.text}>
            You acknowledge and agree that a breach or threatened breach by you of any of
            your obligations under these Terms would cause us irreparable harm for which
            monetary damages would not be an adequate remedy, and that, in the event of
            such breach or threatened breach, we shall be entitled to seek injunctive or
            other equitable relief as an appropriate and adequate remedy for such breach
            or threatened breach, without the necessity of posting a bond or other
            security.
          </p>
          <div className={style.title_block}>58. Severability</div>
          <p className={style.text}>
            If any provision of these Terms is held to be invalid or unenforceable by a
            court of competent jurisdiction, that provision will be deemed severable from
            these Terms and will not affect the validity and enforceability of the
            remaining provisions. The parties agree to negotiate in good faith a valid,
            enforceable substitute provision that most nearly affects the parties&apos;
            intent in entering into these Terms.
          </p>
          <div className={style.title_block}>59. No Waiver</div>
          <p className={style.text}>
            Our failure to enforce any right or provision of these Terms will not be
            considered a waiver of those rights or provisions. The waiver of any such
            right or provision will be effective only if in writing and signed by a duly
            authorized representative of [Company Name]. Except as expressly set forth in
            these Terms, the exercise by either party of any of its remedies under these
            Terms will be without prejudice to its other remedies under these Terms or
            otherwise.
          </p>
          <div className={style.title_block}>60. Feedback and Suggestions</div>
          <p className={style.text}>
            We welcome and encourage you to provide feedback, suggestions, and ideas for
            improvements to our Services (&quot;Feedback&quot;). You acknowledge and agree
            that any Feedback you provide will be the sole and exclusive property of Abra
            and you hereby irrevocably assign to us all of your right, title, and interest
            in and to all Feedback, including without limitation all worldwide patent,
            copyright, trade secret, moral, and other proprietary or intellectual property
            rights therein.
          </p>
          <div className={style.title_block}>61. Mobile Devices</div>
          <p className={style.text}>
            If you use our Services on a mobile device, you are responsible for any
            applicable data charges, fees, or other costs associated with your use of our
            Services on your mobile device. You should check with your mobile carrier for
            details about your data plan and any applicable data charges, fees, or other
            costs.
          </p>
          <div className={style.title_block}>62. Beta Features</div>
          <p className={style.text}>
            From time to time, we may make new features or functionality available on a
            test or &quot;beta&quot; basis as part of our Services. You acknowledge and
            agree that such beta features or functionality may be subject to additional
            terms and conditions, which will be made available to you before you access or
            use such features or functionality. Your use of any beta features or
            functionality is at your own risk and may be subject to greater risks and
            uncertainties than our generally available Services.
          </p>
          <div className={style.title_block}>63. Local Laws</div>
          <p className={style.text}>
            You are solely responsible for compliance with any applicable local laws and
            regulations governing your access to and use of our Services, including but
            not limited to import and export laws and regulations, privacy laws, and any
            other laws and regulations that may apply to your use of our Services.
          </p>
          <div className={style.title_block}>64. Questions and Contact Information</div>
          <p className={style.text}>
            If you have any questions, concerns, or comments regarding these Terms, please
            contact us at the contact information provided in Section 46. We will make
            every effort to respond to your inquiry promptly.
          </p>
          <p className={style.text}>
            Please note that by accepting these Terms, you acknowledge that you have read,
            understood, and agreed to be bound by these Terms, our Privacy Policy, and any
            other applicable agreements or policies incorporated by reference. If you do
            not agree to these Terms, you must not access or use our Services.
          </p>
        </div>
      </div>

      <Footer variant="default" />
    </div>
  );
};
