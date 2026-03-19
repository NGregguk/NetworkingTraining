import type { StudyTopic } from '../schema';

export const advancedDnsRecordsTopic: StudyTopic = {
  slug: 'advanced-dns-records',
  title: 'Advanced DNS Records',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '25 minutes',
  sourceFile: 'context files/Networking Hardware.pdf',
  updatedOn: 'March 19, 2026',
  summary:
    'Learn how A, AAAA, MX, TXT, SPF, DKIM, and DMARC records support internal services, public websites, email delivery, and anti-spoofing controls.',
  heroNote:
    'Use this page when basic DNS resolution already makes sense and you want the records that actually publish services and protect a domain.',
  tags: ['DNS records', 'MX', 'TXT', 'SPF', 'DKIM', 'DMARC'],
  learningObjectives: [
    'Explain the difference between basic DNS resolution and record-level service publishing.',
    'Describe how A and AAAA records map names to IPv4 and IPv6 destinations.',
    'Explain how MX records route email indirectly through hostnames and priority.',
    'Describe the broad purpose of TXT records in ownership checks and email policy.',
    'Differentiate SPF, DKIM, and DMARC as complementary anti-spoofing controls.',
    'Connect DNS records to practical home-lab, small-business, and public-service scenarios.',
  ],
  sections: [
    {
      id: 'a-and-aaaa-records-map-names-to-hosts',
      title: 'A and AAAA Records Map Names to Hosts',
      strapline:
        'This is the record layer that turns a DNS name into a reachable service location.',
      overview:
        'An A record maps a name to an IPv4 address, while an AAAA record does the same for IPv6. These records can exist in public DNS for internet-facing services or in private DNS for internal applications such as an intranet or a home-lab host.',
      whyItMatters:
        'This is where DNS stops being an abstract "name resolution service" and becomes a concrete publishing tool. If you want users or applications to reach a host by name, you need the right record type pointing to the right destination.',
      howItWorks: [
        'An A record associates a hostname with an IPv4 address.',
        'An AAAA record associates a hostname with an IPv6 address.',
        'A public DNS zone can use these records to point a website name at its public-facing host or load balancer.',
        'A private DNS zone can use the same idea for internal-only services that should not be reachable from the public internet.',
        'The main point is that the name points to an address record, and the client can then connect to that destination using the right protocol and port.',
      ],
      examples: [
        'A public website can use an A record so `example.com` resolves to the IPv4 address of its front-end service.',
        'An internal company app can use a private A record such as `intranet.example.local` so staff do not need to remember the servers IP manually.',
        'An IPv6-capable service can publish an AAAA record in parallel with an A record so clients can reach it over either IP family.',
      ],
      misconceptions: [
        '"DNS is only for public internet names." Private DNS uses the same ideas to make internal services reachable by name.',
        '"An A record is the DNS service itself." It is one record type inside DNS, not the entire service.',
        '"AAAA is just a duplicate of A." It serves the same role for IPv6 that A serves for IPv4.',
      ],
      recap: [
        'A records point names to IPv4 addresses.',
        'AAAA records point names to IPv6 addresses.',
        'Both public and private DNS rely on these records to publish reachable services.',
      ],
      referenceItems: [
        {
          label: 'A record',
          value: 'IPv4 mapping',
          detail: 'Maps a hostname to an IPv4 destination.',
        },
        {
          label: 'AAAA record',
          value: 'IPv6 mapping',
          detail: 'Maps a hostname to an IPv6 destination.',
        },
      ],
      connections: [
        {
          label: 'DNS and DHCP basics',
          href: '/topics/dns-and-dhcp#dns-and-name-resolution',
          note: 'Return to the basic DNS lesson if you want to reconnect records to resolver behaviour and client-side troubleshooting.',
        },
      ],
    },
    {
      id: 'mx-records-route-mail-through-hostnames-and-priority',
      title: 'MX Records Route Mail Through Hostnames and Priority',
      strapline:
        'Email routing is slightly more layered than simple name-to-address mapping.',
      overview:
        'An MX record tells sending mail systems which hostnames are responsible for receiving email for a domain. The MX record does not directly point to an IP address. Instead, it points to a hostname, and that hostname is then resolved through A or AAAA records.',
      whyItMatters:
        'This is a key practical difference from web publishing. Mail delivery depends on indirection and on priority order, which makes the domain more resilient and more flexible than a single direct address mapping would allow.',
      howItWorks: [
        'An MX record identifies the mail-receiving hostname for a domain.',
        'The receiving hostname is then resolved through normal A or AAAA records to find the actual IP address.',
        'Domains often publish more than one MX record with different priorities so mail can fail over if the primary receiving system is unavailable.',
        'Because mail delivery is so central to business communication, clean MX design is an important service-publishing decision rather than a niche detail.',
      ],
      examples: [
        'A domain can publish one high-priority MX host and one lower-priority backup host so mail continues flowing even when the primary system is down.',
        'A small business using a hosted mail platform still needs the right MX records in its DNS even though it does not run the mail servers itself.',
        'A mail hostname such as `mail.example.com` still needs its own A or AAAA record after the MX record points to it.',
      ],
      misconceptions: [
        '"An MX record points directly to the mail servers IP address." It points to a hostname, not straight to an IP.',
        '"One MX record is enough for every environment." Multiple prioritised records are common for resilience.',
        '"If SMTP is configured, DNS mail records do not matter much." Mail routing depends on DNS as well as on the mail protocol itself.',
      ],
      recap: [
        'MX records tell senders which hostnames accept email for a domain.',
        'Those hostnames then resolve through A or AAAA records.',
        'Priority order makes multi-server mail routing more resilient.',
      ],
      referenceItems: [
        {
          label: 'MX record',
          value: 'Mail exchanger',
          detail: 'Directs mail to the correct receiving hostname for a domain.',
        },
        {
          label: 'Priority',
          value: 'Failover order',
          detail: 'Lower-priority hosts can receive mail if a higher-priority host is unavailable.',
        },
      ],
      connections: [
        {
          label: 'Networked hosts and services',
          href: '/topics/networked-hosts-and-services#server-roles-turn-connectivity-into-usable-services',
          note: 'The host and service page provides the mail-server context that makes MX records easier to place operationally.',
        },
      ],
    },
    {
      id: 'txt-records-carry-verification-and-policy-data',
      title: 'TXT Records Carry Verification and Policy Data',
      strapline:
        'A record that started as simple text notes now carries some of the most useful domain metadata.',
      overview:
        'TXT records began as a flexible place for human-readable text, but in modern DNS they are heavily used for machine-readable verification and policy. They are common in domain ownership checks and in several email-authentication controls.',
      whyItMatters:
        'Many service integrations fail because the required TXT record was never added or was added incorrectly. This record type is one of the easiest places where DNS directly affects cloud setup, mail trust, and domain ownership validation.',
      howItWorks: [
        'A TXT record stores arbitrary text data associated with a DNS name.',
        'Service providers often ask you to place a specific TXT record in DNS to prove that you control the domain.',
        'Email security controls such as SPF, DKIM, and DMARC are often stored through TXT records.',
        'The record type is flexible, but the actual text content must match the expected format for the service that will read it.',
      ],
      examples: [
        'A SaaS platform may ask you to add a TXT value to prove domain ownership before it enables email or identity features for that domain.',
        'A domain may publish several TXT-based policies at once, including ownership verification and email-authentication data.',
        'A DNS zone can be healthy for web browsing but still fail service onboarding if a required TXT record is missing or malformed.',
      ],
      misconceptions: [
        '"TXT records are just comments for admins." They are often critical machine-readable configuration data.',
        '"Only mail systems care about TXT records." Many cloud and SaaS services use them for domain validation too.',
        '"If the domain resolves, the TXT records probably do not matter." Services can fail quietly when verification or policy records are wrong.',
      ],
      recap: [
        'TXT records store flexible text data inside DNS.',
        'They are heavily used for domain ownership verification and email policy.',
        'Correct content matters just as much as correct record type.',
      ],
      referenceItems: [
        {
          label: 'TXT record',
          value: 'Flexible text data',
          detail: 'Often used for verification workflows and policy publication.',
        },
      ],
      connections: [
        {
          label: 'Small-network planning',
          href: '/topics/planning-a-basic-home-and-small-business-network#optimize-for-coverage-capacity-and-priority',
          note: 'The planning page shows where advanced DNS becomes the next step after the local network is stable.',
        },
      ],
    },
    {
      id: 'spf-dkim-and-dmarc-protect-domain-trust',
      title: 'SPF, DKIM, and DMARC Protect Domain Trust',
      strapline:
        'Email anti-spoofing works best when you stop treating each acronym like a separate mystery.',
      overview:
        'SPF, DKIM, and DMARC are complementary controls that help receiving mail systems decide whether a message really came from the domain it claims to represent. All three are commonly published through TXT records, but they solve different parts of the trust problem.',
      whyItMatters:
        'Without these controls, it is much easier for attackers to impersonate your domain in email. With them, you give receiving systems guidance on who may send, how signatures should be checked, and what to do when checks fail.',
      howItWorks: [
        'SPF lists which servers are authorized to send mail for a domain.',
        'DKIM uses cryptographic signing so a receiver can validate that the message was signed by an authorized system and was not altered in transit.',
        'DMARC builds on SPF and DKIM by telling receivers how to handle messages that fail those checks and by supporting reporting.',
        'The goal is not perfect security through one record. The goal is layered evidence that makes spoofing harder and trust decisions clearer.',
      ],
      examples: [
        'A domain with SPF but no DKIM or DMARC has some sender guidance, but the overall anti-spoofing posture is still incomplete.',
        'A strict DMARC policy can tell receivers to quarantine or reject messages that fail domain-authentication checks.',
        'A business using a third-party mail platform still needs its DNS records updated so the platforms authorized senders and DKIM keys are represented correctly.',
      ],
      misconceptions: [
        '"SPF, DKIM, and DMARC are three names for the same feature." They work together, but each solves a different part of the problem.',
        '"Publishing one record means spoofing is solved." The protection improves when the records align correctly and are maintained as sending systems change.',
        '"These records only matter to large enterprises." Any domain that sends email benefits from protecting its identity and reputation.',
      ],
      recap: [
        'SPF says who may send.',
        'DKIM signs the message.',
        'DMARC tells receivers how to enforce and report on failures.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the DNS record fit',
        intro:
          'Use these questions to confirm that you can match the record type to the service behaviour it supports.',
        questions: [
          {
            prompt:
              'Which record type directly maps a hostname to an IPv4 address?',
            options: [
              {
                label: 'A record',
                isCorrect: true,
                feedback:
                  'Correct. A records are the normal IPv4 name-to-address mapping mechanism.',
              },
              {
                label: 'MX record',
                isCorrect: false,
                feedback:
                  'MX records point to mail-receiving hostnames rather than directly mapping a normal host to an IPv4 address.',
              },
              {
                label: 'TXT record',
                isCorrect: false,
                feedback:
                  'TXT records carry text-based verification or policy data rather than direct IPv4 host mapping.',
              },
            ],
          },
          {
            prompt:
              'Why does an MX record not directly point to an IP address?',
            options: [
              {
                label:
                  'Because it points to a receiving hostname, which is then resolved through A or AAAA records',
                isCorrect: true,
                feedback:
                  'Correct. Mail routing uses hostnames in the MX layer and then resolves those names to addresses.',
              },
              {
                label:
                  'Because DNS is not used for mail delivery at all',
                isCorrect: false,
                feedback:
                  'DNS is central to mail delivery. MX is one of the clearest examples of that.',
              },
              {
                label:
                  'Because only IPv6 mail servers can be listed in DNS',
                isCorrect: false,
                feedback:
                  'Mail systems can still be published through normal A and AAAA records as appropriate.',
              },
            ],
          },
          {
            prompt:
              'Which statement best describes SPF?',
            options: [
              {
                label:
                  'It lists which systems are authorized to send mail for the domain',
                isCorrect: true,
                feedback:
                  'Correct. SPF is about authorized senders for the domain.',
              },
              {
                label:
                  'It signs messages cryptographically with a key pair',
                isCorrect: false,
                feedback:
                  'That is the DKIM role rather than the SPF role.',
              },
              {
                label:
                  'It maps the website name to the web servers public IP',
                isCorrect: false,
                feedback:
                  'That is an A or AAAA record function, not SPF.',
              },
            ],
          },
          {
            prompt:
              'What is DMARCs main role once SPF and DKIM checks exist?',
            options: [
              {
                label:
                  'It tells receivers how to handle messages that fail domain-authentication checks and supports reporting',
                isCorrect: true,
                feedback:
                  'Correct. DMARC is the policy and reporting layer built on top of SPF and DKIM.',
              },
              {
                label:
                  'It replaces the need for MX records entirely',
                isCorrect: false,
                feedback:
                  'DMARC is about authentication policy, not basic mail routing.',
              },
              {
                label:
                  'It changes an IPv4-only host into an IPv6-capable service',
                isCorrect: false,
                feedback:
                  'That is unrelated to DMARCs email-authentication role.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Common protocols and ports',
          href: '/topics/common-network-protocols-and-ports#web-browsing-and-email-services',
          note: 'Email records make more sense when you reconnect them to SMTP and the other mail protocols that actually move the messages.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'a-record',
      term: 'A Record',
      definition:
        'A DNS record that maps a hostname to an IPv4 address.',
      importance:
        'It is the most familiar way to publish a reachable service by name.',
      sectionId: 'a-and-aaaa-records-map-names-to-hosts',
    },
    {
      id: 'aaaa-record',
      term: 'AAAA Record',
      definition:
        'A DNS record that maps a hostname to an IPv6 address.',
      importance:
        'It provides the IPv6 counterpart to the classic A record.',
      sectionId: 'a-and-aaaa-records-map-names-to-hosts',
    },
    {
      id: 'mx-record',
      term: 'MX Record',
      definition:
        'A DNS record that identifies which hostnames receive email for a domain and in what priority order.',
      importance:
        'Mail delivery depends on it, and the priority model supports resilience.',
      sectionId: 'mx-records-route-mail-through-hostnames-and-priority',
    },
    {
      id: 'txt-record',
      term: 'TXT Record',
      definition:
        'A DNS record that stores flexible text data used for verification, policy, and other machine-readable metadata.',
      importance:
        'It underpins many service-verification and email-security workflows.',
      sectionId: 'txt-records-carry-verification-and-policy-data',
    },
    {
      id: 'spf',
      term: 'SPF',
      definition:
        'Sender Policy Framework, a DNS-based policy that lists which systems may send email for a domain.',
      importance:
        'It is one of the first layers of anti-spoofing email protection.',
      sectionId: 'spf-dkim-and-dmarc-protect-domain-trust',
    },
    {
      id: 'dkim',
      term: 'DKIM',
      definition:
        'DomainKeys Identified Mail, a method of cryptographically signing email so receivers can validate domain-aligned sending.',
      importance:
        'It helps prove message authenticity and integrity.',
      sectionId: 'spf-dkim-and-dmarc-protect-domain-trust',
    },
    {
      id: 'dmarc',
      term: 'DMARC',
      definition:
        'Domain-based Message Authentication, Reporting, and Conformance, a policy layer that tells receivers how to handle messages that fail domain-authentication checks.',
      importance:
        'It ties SPF and DKIM together into an enforceable anti-spoofing policy.',
      sectionId: 'spf-dkim-and-dmarc-protect-domain-trust',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember by separating the record families. A and AAAA publish host locations. MX publishes the mail-receiving hostnames for a domain. TXT carries verification and policy data. SPF, DKIM, and DMARC are TXT-based email-trust controls that together help protect a domains reputation.',
    memoryFramework: [
      'A = IPv4 host mapping.',
      'AAAA = IPv6 host mapping.',
      'MX = mail hostnames plus priority.',
      'TXT = flexible verification and policy data.',
      'SPF = who may send.',
      'DKIM = sign the message.',
      'DMARC = enforce and report on failures.',
    ],
    checklist: [
      'I can explain the difference between a resolver using DNS and a domain publishing the right DNS records.',
      'I can explain what A and AAAA records do.',
      'I can explain why MX records point to hostnames instead of directly to IPs.',
      'I can explain why TXT records matter beyond simple human-readable notes.',
      'I can distinguish SPF, DKIM, and DMARC at a high level.',
      'I can connect email-delivery trust back to DNS rather than treating it as only an SMTP problem.',
    ],
    questions: [
      'Why do internal applications benefit from private A or AAAA records just as public sites benefit from public DNS records?',
      'Why is mail routing modelled through MX hostnames rather than direct IP mappings alone?',
      'Why do service providers often ask you to add TXT records during onboarding?',
      'Why is SPF useful but incomplete if DKIM and DMARC are missing?',
      'What kind of real-world failure points you toward a DNS-record issue rather than a simple client-resolution issue?',
    ],
    pitfalls: [
      'Thinking about DNS only as a user-side resolver instead of as a service-publishing system.',
      'Forgetting that MX records point to hostnames, not directly to IP addresses.',
      'Treating TXT records as optional notes when they often carry critical verification or security policy.',
      'Assuming one email-authentication record is enough to protect a domain completely.',
      'Changing mail providers without updating the domains DNS records to match.',
    ],
  },
  relatedTopicSlugs: [
    'dns-and-dhcp',
    'common-network-protocols-and-ports',
    'planning-a-basic-home-and-small-business-network',
  ],
};
