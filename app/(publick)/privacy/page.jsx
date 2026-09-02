// export const metadata = {
//   title: "Privacy Policy | Affilio",
//   description:
//     "Learn how Affilio collects, uses, and protects your information.",
// };

// export default function PrivacyPage() {
//   return (
//     <main className="min-h-screen bg-background">
//       <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
//         <div className="mb-10">
//           <p className="text-sm font-medium text-primary">
//             Affilio
//           </p>

//           <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
//             Privacy Policy
//           </h1>

//           <p className="mt-3 text-sm text-muted-foreground">
//             Last updated: September 1, 2026
//           </p>
//         </div>

//         <div className="space-y-8 text-sm leading-7 text-muted-foreground">

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               1. Information We Collect
//             </h2>

//             <p>
//               When you create or use an Affilio account, we may
//               collect information such as your name or username,
//               email address, account information, product and
//               order information, affiliate and commission
//               information, and withdrawal or payment-related
//               information.
//             </p>

//             <p className="mt-3">
//               We may also collect basic technical information
//               such as IP address, browser type, device information,
//               and activity on our platform.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               2. How We Use Your Information
//             </h2>

//             <ul className="list-disc space-y-2 pl-6">
//               <li>Create and manage your account</li>
//               <li>Provide affiliate marketing services</li>
//               <li>Process orders and commissions</li>
//               <li>Process withdrawals and payments</li>
//               <li>Send account and platform notifications</li>
//               <li>Improve our services</li>
//               <li>Maintain platform security</li>
//               <li>Prevent fraud and abuse</li>
//               <li>Respond to support requests</li>
//             </ul>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               3. Account Information
//             </h2>

//             <p>
//               You are responsible for keeping your account
//               credentials secure. You should not share your
//               password or authentication information with other
//               people.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               4. Payments
//             </h2>

//             <p>
//               Affilio may process or facilitate payment-related
//               information required for commissions, withdrawals,
//               or other transactions.
//             </p>

//             <p className="mt-3">
//               We do not intentionally store sensitive payment
//               credentials such as complete card numbers unless
//               specifically required and securely supported by
//               our payment providers.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               5. Cookies
//             </h2>

//             <p>
//               Affilio may use cookies and similar technologies
//               to maintain authentication sessions, remember
//               preferences, improve functionality, and provide
//               a secure experience.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               6. Data Security
//             </h2>

//             <p>
//               We take reasonable technical and organizational
//               measures to protect your information from
//               unauthorized access, modification, disclosure,
//               or destruction.
//             </p>

//             <p className="mt-3">
//               However, no online service can guarantee complete
//               security.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               7. Third-Party Services
//             </h2>

//             <p>
//               Affilio may use third-party services for hosting,
//               analytics, authentication, payments, communication,
//               or other platform functionality.
//             </p>

//             <p className="mt-3">
//               These services may process information according
//               to their own privacy policies.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               8. Data Retention
//             </h2>

//             <p>
//               We retain account and transaction information for
//               as long as reasonably necessary to provide our
//               services, maintain records, comply with legal
//               requirements, and resolve disputes.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               9. Your Rights
//             </h2>

//             <p>
//               Depending on applicable law, you may have rights
//               regarding your personal information, including
//               requesting access, correction, or deletion of
//               certain information.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               10. Children&apos;s Privacy
//             </h2>

//             <p>
//               Affilio is not intended for children who are not
//               legally permitted to use online services in their
//               jurisdiction.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               11. Changes to This Privacy Policy
//             </h2>

//             <p>
//               We may update this Privacy Policy from time to time.
//               Any changes will be posted on this page with an
//               updated revision date.
//             </p>
//           </section>

//           <section>
//             <h2 className="mb-3 text-xl font-semibold text-foreground">
//               12. Contact Us
//             </h2>

//             <p>
//               If you have questions about this Privacy Policy or
//               how your information is handled, please contact us
//               through our Contact page.
//             </p>
//           </section>

//         </div>
//       </div>
//     </main>
//   );
// }



// v2
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-medium text-primary">
          Legal
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          Your privacy matters to us. This Privacy Policy explains
          how Affilio collects, uses, protects, and handles your
          information when you use our platform.
        </p>

        <p className="mt-3 text-xs text-muted-foreground">
          Last updated: September 1, 2026
        </p>
      </div>

      {/* Content */}
      <div className="rounded-2xl border bg-background shadow-sm">
        <div className="divide-y">

          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              1. Information We Collect
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We may collect information that you provide when creating
              an account, using our services, contacting us, or
              interacting with features of the platform.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              <li>Name and username</li>
              <li>Email address</li>
              <li>Account and profile information</li>
              <li>Transaction and order information</li>
              <li>Technical and usage information</li>
            </ul>
          </section>

          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              2. How We Use Your Information
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We use collected information to provide, maintain,
              improve, and secure our services.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
              <li>Manage your account</li>
              <li>Process orders and transactions</li>
              <li>Provide customer support</li>
              <li>Send important account notifications</li>
              <li>Prevent fraud and abuse</li>
              <li>Improve our platform and services</li>
            </ul>
          </section>

          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              3. Information Protection
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We take reasonable technical and organizational measures
              to protect your information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              4. Cookies and Similar Technologies
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We may use cookies and similar technologies to maintain
              sessions, remember preferences, improve functionality,
              and understand how our platform is used.
            </p>
          </section>

          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              5. Third-Party Services
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Some features may rely on third-party services. These
              services may process information according to their own
              privacy policies and terms.
            </p>
          </section>

          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              6. Your Rights
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Depending on applicable law, you may have rights regarding
              access, correction, deletion, or restriction of your
              personal information.
            </p>
          </section>

          <section className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              7. Contact Us
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              If you have questions about this Privacy Policy or how
              your information is handled, please contact us through
              our Contact page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

