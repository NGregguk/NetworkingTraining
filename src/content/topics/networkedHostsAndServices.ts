import type { StudyTopic } from '../schema';

export const networkedHostsAndServicesTopic: StudyTopic = {
  slug: 'networked-hosts-and-services',
  title: 'Networked Hosts and Their Services',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '35 minutes',
  sourceFile: 'context files/Networking Hardware.pdf',
  updatedOn: 'March 19, 2026',
  summary:
    'Learn the practical roles of common servers, internet security appliances, legacy and embedded systems, and IoT devices that all sit on real networks.',
  heroNote:
    'Use this page when the network itself makes sense but you want a clearer picture of the systems and services that make the network useful and risky at the same time.',
  tags: ['servers', 'AAA', 'proxy', 'UTM', 'IoT', 'SCADA'],
  learningObjectives: [
    'Differentiate the most common server roles found on small and enterprise networks.',
    'Explain what load balancers, proxy servers, spam gateways, and UTM appliances actually do.',
    'Describe why legacy and embedded systems are still present on modern networks and why they require careful protection.',
    'Explain why IoT devices should often be segmented and monitored separately.',
    'Connect network services back to the ports, protocols, and DNS or DHCP behaviours they depend on.',
    'Reason about whether a failure belongs to the host, the service, the path, or a policy control in between.',
  ],
  sections: [
    {
      id: 'server-roles-turn-connectivity-into-usable-services',
      title: 'Server Roles Turn Connectivity Into Usable Services',
      strapline:
        'A network matters because it delivers services, not because cables happen to link devices together.',
      overview:
        'Networks become valuable when they host useful systems. A web server delivers web content, a file server centralises documents, a print server manages printer access, a mail server handles email, and services such as DNS, DHCP, AAA, syslog, and databases sit underneath daily operations even when users never notice them directly.',
      whyItMatters:
        'This is where support work becomes more precise. If you know the service role a system is supposed to play, you can ask whether the host is down, whether the protocol-port path is blocked, whether name resolution failed, or whether permissions prevented access.',
      howItWorks: [
        'A web server delivers browser-based content, whether that content is public on the internet or private inside an organisation.',
        'A file server provides a central location for shared documents so users do not each carry separate local copies of the same information.',
        'A print server manages print jobs and gives administrators one place to control and monitor printer use.',
        'A mail server handles inbound and outbound email services, while DNS and DHCP support naming and client configuration around those services.',
        'A syslog server consolidates logs from many systems in one place so activity can be reviewed centrally.',
        'AAA services handle authentication, authorisation, and accounting, while database servers store and provide structured application data.',
      ],
      examples: [
        'An intranet site depends on a web server, DNS records, and some form of user authentication even though the user only sees a browser page.',
        'A mapped drive letter inside a company usually points back to a central file share on a file server.',
        'A user unable to print may have a printer-path issue, a print server issue, or a permissions issue rather than a general network outage.',
      ],
      misconceptions: [
        '"A server" is just any large computer. What matters is the service role it performs for the network.',
        '"DNS and DHCP are background details, not real services." In practice they are some of the most operationally important services on the network.',
        '"If a user cannot access a resource, the network must be down." The host, the service, or the permissions can all be the actual issue.',
      ],
      recap: [
        'A network exists to deliver services such as web, files, mail, naming, addressing, and authentication.',
        'Each server role answers a distinct operational need.',
        'Knowing the role helps you narrow the failure domain much faster.',
      ],
      referenceItems: [
        {
          label: 'AAA',
          value: 'Authentication, Authorisation, Accounting',
          detail: 'Verifies identity, checks permissions, and records activity.',
        },
        {
          label: 'Syslog',
          value: 'Centralised logging',
          detail: 'Collects events from routers, servers, firewalls, and other systems.',
        },
        {
          label: 'Database server',
          value: 'Structured application data',
          detail: 'Stores and serves the data many business applications depend on.',
        },
      ],
      connections: [
        {
          label: 'Protocol and port reference',
          href: '/topics/common-network-protocols-and-ports',
          note: 'These service roles make more sense when you reconnect them to the protocol-port pairs clients actually use.',
        },
        {
          label: 'DNS and DHCP page',
          href: '/topics/dns-and-dhcp',
          note: 'Naming and client configuration are some of the most common support dependencies underneath these services.',
        },
      ],
    },
    {
      id: 'internet-appliances-shape-flow-security-and-resilience',
      title: 'Internet Appliances Shape Flow, Security, and Resilience',
      strapline:
        'Not every important network system is a classic server role.',
      overview:
        'Some of the most important network devices sit in front of or beside servers rather than replacing them. Load balancers spread traffic, proxy servers mediate outbound requests, spam gateways filter malicious or unwanted email, and UTM appliances combine many security features in one managed platform.',
      whyItMatters:
        'These appliances often explain why traffic behaves differently from what the end user expects. They can improve resilience and security, but they can also become the policy point that blocks or rewrites the traffic path.',
      howItWorks: [
        'A load balancer distributes requests across multiple back-end resources so demand is spread and failed servers can be removed from rotation.',
        'A proxy server sits between users and external destinations so it can filter, cache, mask client identity, or enforce content policy.',
        'A spam gateway inspects inbound email before it reaches the mail server and often includes anti-malware or attachment screening.',
        'A Unified Threat Management appliance combines security functions such as routing, firewalling, VPN, intrusion prevention, and sometimes spam filtering in one system.',
        'These appliances are often transparent to the user, which is why they are easy to forget until a policy or health issue changes the path.',
      ],
      examples: [
        'A web application may appear to be one server to the user while a load balancer quietly distributes requests across several real back-end servers.',
        'A proxy can block categories of websites, cache popular content, or hide the users true public IP from the destination.',
        'An email can fail to arrive because a spam gateway quarantined it before the mail server ever accepted it.',
      ],
      misconceptions: [
        '"A load balancer just makes things faster." It also adds resilience by removing unhealthy back-end systems from the path.',
        '"A proxy is only about privacy." Proxies can also filter, cache, and enforce policy.',
        '"UTM means one feature with a new acronym." The point is the combination of several security features in one managed appliance.',
      ],
      recap: [
        'Load balancers, proxies, spam gateways, and UTM appliances shape traffic before it reaches the user or the server.',
        'They are often invisible until they block, redirect, or protect a service path.',
        'Understanding them helps separate service failure from policy enforcement.',
      ],
      referenceItems: [
        {
          label: 'Load balancer',
          value: 'Traffic distribution',
          detail: 'Spreads requests across multiple resources and improves resilience.',
        },
        {
          label: 'Proxy server',
          value: 'Mediated outbound access',
          detail: 'Can filter content, hide identity, and serve cached responses.',
        },
        {
          label: 'UTM',
          value: 'Combined security platform',
          detail: 'Brings multiple security controls into one appliance.',
        },
      ],
      connections: [
        {
          label: 'TCP, UDP, and firewalls',
          href: '/topics/tcp-and-udp-protocols#ports-in-firewalls-and-access-rules',
          note: 'Many of these appliances make decisions based on the protocol and port combinations covered in the transport lesson.',
        },
      ],
    },
    {
      id: 'legacy-and-embedded-systems-need-special-care',
      title: 'Legacy and Embedded Systems Need Special Care',
      strapline:
        'Some of the most fragile networked systems are still the ones the business cannot easily replace.',
      overview:
        'Legacy systems survive because they are business critical, difficult to migrate, or no longer actively supported by a vendor. Embedded systems are built for one narrow purpose and often operate machinery, sensors, valves, or industrial control processes. SCADA environments sit in this space and were not originally designed with modern network security expectations in mind.',
      whyItMatters:
        'This is a major real-world lesson: old systems do not vanish just because better ones exist. Networks often have to protect systems that cannot easily be patched, replaced, or redesigned without operational risk.',
      howItWorks: [
        'A legacy system is typically an old or outdated platform that remains because migration is expensive, risky, or unsupported.',
        'An embedded system usually combines hardware and software for a single dedicated function rather than acting as a general-purpose workstation.',
        'SCADA, or Supervisory Control and Data Acquisition, is a common industrial-control framework used around sensors, valves, motors, utilities, pipelines, and other operational technology.',
        'Because many of these environments were not designed for modern internet-connected threat models, the surrounding network often has to compensate through segmentation, monitoring, and restrictive access design.',
      ],
      examples: [
        'A factory controller that still runs a stable but aging platform may remain in service because taking it offline would disrupt production.',
        'A water or energy management environment may use SCADA-linked devices that were designed first for operational reliability, not internet-era security.',
        'An embedded system controlling a pump does one job very well, but it may have fewer security controls than a modern general-purpose server.',
      ],
      misconceptions: [
        '"If it is old and risky, the company should just replace it." In practice the business dependency often makes that much harder than it sounds.',
        '"Embedded" means too small to matter." Small dedicated devices can still be business critical and security sensitive.',
        '"If a system was never meant for the internet, it is automatically safe." Legacy assumptions can become a weakness once the system is networked.',
      ],
      recap: [
        'Legacy and embedded systems stay on networks because the business still needs them.',
        'SCADA environments often require especially careful segmentation and access control.',
        'The network often has to compensate for the security limitations of these systems.',
      ],
      referenceItems: [
        {
          label: 'Legacy system',
          value: 'Old but still required',
          detail: 'Business dependency often keeps it alive long after ideal replacement dates.',
        },
        {
          label: 'Embedded system',
          value: 'Single-purpose device',
          detail: 'Built for one focused operational function rather than general computing.',
        },
        {
          label: 'SCADA',
          value: 'Industrial control framework',
          detail: 'Common in utilities, manufacturing, pipelines, and other operational technology environments.',
        },
      ],
      connections: [
        {
          label: 'Network types and VLANs',
          href: '/topics/network-types-and-internet-connections#vlans-split-one-physical-lan-into-multiple-logical-networks',
          note: 'Segmentation becomes much easier to justify when you connect it to legacy and embedded system risk.',
        },
      ],
    },
    {
      id: 'iot-expands-visibility-but-raises-the-security-bar',
      title: 'IoT Expands Visibility but Raises the Security Bar',
      strapline:
        'Internet-connected "small" devices create large design consequences.',
      overview:
        'IoT extends network connectivity into devices that used to be isolated or "dumb," such as plugs, doorbells, locks, sensors, speakers, cameras, appliances, and lights. That creates useful automation and telemetry, but it also increases attack surface because vendor security quality is highly uneven.',
      whyItMatters:
        'IoT is one of the clearest places where convenience and risk arrive together. The safest default design is usually to isolate these devices onto their own network segment and to watch their behaviour instead of trusting them as if they were laptops or servers.',
      howItWorks: [
        'IoT devices typically use the network to report state, receive commands, or integrate with vendor cloud services.',
        'A smart device may use very little data in normal operation, which makes unusual traffic volume a useful warning sign.',
        'Because IoT devices often come from many different vendors, their update and security posture can vary significantly.',
        'Segmentation places them on their own network so compromise in one device does not become easy access to the rest of the environment.',
        'Monitoring can reveal which access point the device is using, how much traffic it sends, and whether behaviour looks abnormal for that device type.',
      ],
      examples: [
        'A smart plug that uses only a few megabytes per month may be behaving normally, while gigabytes of activity from the same kind of device would deserve investigation.',
        'A home can keep doorbells, speakers, bulbs, and plugs on a separate IoT network while laptops and phones remain on the default trusted network.',
        'An office may use sensors for environmental monitoring while still limiting what those devices can talk to internally.',
      ],
      misconceptions: [
        '"IoT is harmless because the devices are simple." Simplicity does not guarantee good security or low risk.',
        '"If the device vendor is popular, it must be safe enough for the main network." Segmentation is still the safer default.',
        '"Monitoring usage is overkill for small devices." Unusual traffic patterns are one of the easiest compromise clues available.',
      ],
      recap: [
        'IoT devices add convenience, visibility, and automation, but also attack surface.',
        'The safest default design is usually separate segmentation and sensible monitoring.',
        'Normal behaviour for a tiny smart device should usually look tiny on the network too.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the service and security model',
        intro:
          'Use these questions to confirm that you can separate service roles, appliance roles, and device-risk decisions on a real network.',
        questions: [
          {
            prompt:
              'Which server role is most directly responsible for translating a domain name into an IP address?',
            options: [
              {
                label: 'DNS server',
                isCorrect: true,
                feedback:
                  'Correct. DNS is the service that maps names to the IP information clients need.',
              },
              {
                label: 'Print server',
                isCorrect: false,
                feedback:
                  'A print server manages printer jobs and access, not domain name resolution.',
              },
              {
                label: 'Database server',
                isCorrect: false,
                feedback:
                  'Databases store and serve application data, but DNS is the naming service described here.',
              },
            ],
          },
          {
            prompt:
              'What is the best high-level description of a load balancer?',
            options: [
              {
                label:
                  'A device or service that distributes traffic across multiple back-end resources and can improve resilience',
                isCorrect: true,
                feedback:
                  'Correct. Load balancers spread demand and can stop sending traffic to failed back-end systems.',
              },
              {
                label:
                  'A tool that assigns IP addresses to clients on first connection',
                isCorrect: false,
                feedback:
                  'That is the role of DHCP rather than a load balancer.',
              },
              {
                label:
                  'A protocol used to encrypt email between two mail servers',
                isCorrect: false,
                feedback:
                  'That description does not match the traffic-distribution role of a load balancer.',
              },
            ],
          },
          {
            prompt:
              'Why should IoT devices often be placed on a separate network segment?',
            options: [
              {
                label:
                  'Because vendor security quality varies, and segmentation limits how much damage one compromised device can do',
                isCorrect: true,
                feedback:
                  'Correct. Segmentation is one of the safest default controls for smart-device environments.',
              },
              {
                label:
                  'Because IoT devices cannot function at all on the same switching hardware as anything else',
                isCorrect: false,
                feedback:
                  'They can share hardware. The issue is policy and risk isolation, not physical impossibility.',
              },
              {
                label:
                  'Because IoT devices always require public IP addresses',
                isCorrect: false,
                feedback:
                  'They do not. The segmentation reason is security and control, not public addressing.',
              },
            ],
          },
          {
            prompt:
              'Why do legacy and SCADA-like systems often deserve stricter surrounding network controls?',
            options: [
              {
                label:
                  'Because they may be business critical, hard to replace, and not designed for modern network security expectations',
                isCorrect: true,
                feedback:
                  'Correct. The network often has to compensate for the limitations of fragile or aging operational systems.',
              },
              {
                label:
                  'Because they are too old to communicate on normal networks at all',
                isCorrect: false,
                feedback:
                  'They often still communicate just fine, which is exactly why they remain present and need protection.',
              },
              {
                label:
                  'Because every legacy system automatically includes the same security features as modern endpoints',
                isCorrect: false,
                feedback:
                  'The problem is usually the opposite: they often lack modern security assumptions or update models.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Small-network planning',
          href: '/topics/planning-a-basic-home-and-small-business-network#secure-and-configure-the-core-network',
          note: 'The planning page shows how guest and IoT segmentation becomes an actual router and access-point configuration choice.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'aaa',
      term: 'AAA',
      definition:
        'Authentication, Authorisation, and Accounting, a security model for identity validation, permission checking, and activity recording.',
      importance:
        'It clarifies one of the most common identity-service ideas used across enterprise networks.',
      sectionId: 'server-roles-turn-connectivity-into-usable-services',
    },
    {
      id: 'syslog-server',
      term: 'Syslog Server',
      definition:
        'A centralised logging system that receives event data from multiple devices and services.',
      importance:
        'It supports monitoring, auditing, and troubleshooting across the network.',
      sectionId: 'server-roles-turn-connectivity-into-usable-services',
    },
    {
      id: 'proxy-server',
      term: 'Proxy Server',
      definition:
        'An intermediary that handles traffic between clients and external services and can filter, cache, or mask requests.',
      importance:
        'It explains why user traffic may be shaped or blocked before it reaches the internet directly.',
      sectionId: 'internet-appliances-shape-flow-security-and-resilience',
    },
    {
      id: 'utm',
      term: 'Unified Threat Management',
      definition:
        'A platform that combines multiple security functions such as routing, firewalling, VPN, and intrusion prevention in one appliance.',
      importance:
        'It is a common way to simplify security control in smaller or branch environments.',
      sectionId: 'internet-appliances-shape-flow-security-and-resilience',
    },
    {
      id: 'scada',
      term: 'SCADA',
      definition:
        'Supervisory Control and Data Acquisition, an industrial-control framework used in operational technology environments.',
      importance:
        'It highlights that many networked systems are not office PCs or cloud services at all.',
      sectionId: 'legacy-and-embedded-systems-need-special-care',
    },
    {
      id: 'iot',
      term: 'Internet of Things',
      definition:
        'The extension of network connectivity into devices such as sensors, plugs, locks, appliances, speakers, and lights.',
      importance:
        'It explains why small consumer or operational devices can have large security and design implications.',
      sectionId: 'iot-expands-visibility-but-raises-the-security-bar',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember by moving from useful services to protective controls. Servers provide web, file, print, mail, naming, addressing, logging, identity, and data functions. Appliances such as load balancers, proxies, spam gateways, and UTMs shape or secure the path to those services. Legacy, embedded, and IoT systems remind you that not every host on the network was designed with modern trust assumptions.',
    memoryFramework: [
      'Start with service roles: web, file, print, mail, DNS, DHCP, syslog, AAA, and database.',
      'Then add traffic-shaping appliances: load balancer, proxy, spam gateway, and UTM.',
      'Remember that old and embedded systems often stay because the business still depends on them.',
      'Treat SCADA and operational technology as networked, but differently constrained, environments.',
      'Treat IoT as convenient but untrusted by default.',
      'When something fails, ask whether the issue is the host, the service, the path, or the policy.',
    ],
    checklist: [
      'I can describe the role of web, file, print, mail, DNS, DHCP, syslog, AAA, and database servers.',
      'I can explain what a load balancer, proxy server, spam gateway, and UTM appliance do.',
      'I can explain why old business-critical systems are often still present on networks.',
      'I can explain what makes SCADA and embedded environments operationally different from office IT.',
      'I can explain why IoT devices often belong on their own segment.',
      'I can use abnormal traffic volume as one clue that a small smart device may be behaving badly.',
    ],
    questions: [
      'Why is a service role a more useful description than simply calling something "a server"?',
      'Why can a user-facing problem actually be caused by a proxy, spam gateway, or load balancer rather than the final server itself?',
      'Why are legacy systems often retained even when their security posture is weak?',
      'Why does the network have to compensate for many embedded or SCADA-like systems?',
      'Why is segmentation such a common recommendation for IoT devices?',
      'What kinds of clues help you separate a service outage from a policy enforcement decision?',
    ],
    pitfalls: [
      'Thinking about servers as generic boxes instead of as specific service roles.',
      'Ignoring hidden intermediaries such as proxies or load balancers when tracing a traffic path.',
      'Assuming legacy or embedded systems are rare edge cases rather than common operational realities.',
      'Treating IoT devices as low-risk just because they are small or consumer-facing.',
      'Failing to connect service failures back to DNS, DHCP, port access, or authentication dependencies.',
    ],
  },
  relatedTopicSlugs: [
    'common-network-protocols-and-ports',
    'dns-and-dhcp',
    'planning-a-basic-home-and-small-business-network',
  ],
};
