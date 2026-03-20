import type { StudyTopic } from '../schema';

export const natPatAndPortForwardingTopic: StudyTopic = {
  slug: 'nat-pat-and-port-forwarding',
  title: 'NAT, PAT, and Port Forwarding',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '35 minutes',
  sourceFile: 'Original site extension topic',
  updatedOn: 'March 19, 2026',
  summary:
    'Learn how private addresses reach the internet through NAT, how PAT lets many clients share one public IPv4 address, and why inbound access needs deliberate port-forwarding rules.',
  heroNote:
    'Use this page when the home router feels like a black box and you want to understand why outbound browsing usually works automatically while inbound access needs a specific rule.',
  tags: ['NAT', 'PAT', 'port forwarding', 'private IP', 'public IP'],
  learningObjectives: [
    'Explain why NAT became so common in IPv4 networks.',
    'Describe how NAT rewrites addressing at the network edge without replacing routing.',
    'Explain how PAT lets many internal sessions share one public IPv4 address at the same time.',
    'Describe what a port-forwarding rule actually does for inbound traffic.',
    'Recognise common causes of failed inbound access such as double NAT, wrong host mapping, or missing service listeners.',
    'Separate NAT behaviour from routing, firewalling, and general internet troubleshooting.',
  ],
  sections: [
    {
      id: 'nat-exists-because-private-addresses-need-a-public-exit',
      title: 'NAT Exists Because Private Addresses Need a Public Exit',
      strapline:
        'Private IPv4 space works well inside the network, but the public internet still needs a public-facing address.',
      overview:
        'Network Address Translation, or NAT, became common because home and business networks needed to use private IPv4 space internally while still reaching public services on the internet. The edge router solves that by rewriting addressing as traffic leaves and returns.',
      whyItMatters:
        'Without this idea, many learners are left with a false picture of one public address per device. NAT explains why dozens of local clients can share one outside address and why the edge router matters so much.',
      howItWorks: [
        'A local client usually starts with a private IPv4 address such as `192.168.x.x`, `10.x.x.x`, or `172.16.x.x` through `172.31.x.x`.',
        'When that client sends traffic toward the public internet, the edge router or firewall rewrites the source address into its own public-facing address before forwarding the packet outward.',
        'When reply traffic returns, the edge device uses the remembered translation state to send the response back to the correct internal client.',
        'This translation is especially associated with IPv4 because public IPv4 addresses are limited and private addressing is so widely used inside local networks.',
        'NAT does not choose the path by itself. Routing still decides where traffic should go, while NAT rewrites the addressing used on that path.',
      ],
      examples: [
        'A phone, laptop, tablet, and smart TV can all browse outward from one home even though the ISP may have supplied only one public IPv4 address.',
        'A small office can use private addressing internally and still let staff reach cloud services through one shared public-facing edge.',
        {
          type: 'code',
          intro:
            'Example: think of the edge as a translation point rather than just a Wi-Fi box.',
          code:
            'Client:        192.168.1.25\nGateway edge:  203.0.113.10\nRemote site:   198.51.100.20\n\nOutbound view:\n192.168.1.25 -> translated at edge -> 203.0.113.10 -> 198.51.100.20',
        },
      ],
      misconceptions: [
        '"NAT is the same thing as routing." Routing chooses the forwarding path, while NAT rewrites addresses on that path.',
        '"If a device has internet access, it must have its own public address." Many internal clients share one public IPv4 address through NAT.',
        '"NAT only exists on very large networks." It is one of the most normal functions on a basic home router.',
      ],
      recap: [
        'NAT lets private internal clients reach public destinations through a translated edge address.',
        'It is an address-rewrite function, not a replacement for routing.',
        'This is one of the reasons a small network can host many devices behind one public IPv4 presence.',
      ],
      imagePlaceholder: {
        title: 'Private address translated to a public edge address',
        label: 'Address flow',
        description:
          'A simple outbound flow would make NAT feel much less like a black box for beginners.',
        callouts: [
          'Show a client with a private IPv4 address sending traffic to the edge device and then out with the public IPv4 address.',
          'Label the translation step separately from the routing path.',
          'Keep the before-and-after addresses visible on the same flow.',
        ],
      },
      connections: [
        {
          label: 'Intro to IP addressing',
          href: '/topics/intro-to-ip-addressing',
          note: 'Return to the addressing lesson if you want the public-versus-private IPv4 foundation refreshed first.',
        },
        {
          label: 'Routing basics',
          href: '/topics/routing-basics',
          note: 'The routing page explains how traffic is forwarded to the edge before NAT rewrites it.',
        },
      ],
    },
    {
      id: 'pat-lets-many-clients-share-one-public-ip',
      title: 'PAT Lets Many Clients Share One Public IP',
      strapline:
        'The everyday version of NAT on small networks usually depends on ports as well as addresses.',
      overview:
        'Port Address Translation, or PAT, is the normal small-network behaviour most people mean when they casually say NAT. Instead of only changing the source address, the edge device also tracks and, when needed, rewrites source ports so many internal sessions can coexist behind one public IPv4 address.',
      whyItMatters:
        'This is the piece that makes the shared-public-address model practical. Without PAT, many internal sessions would collide instead of being tracked as separate conversations.',
      howItWorks: [
        'Each internal client opens outbound sessions from its own local source port.',
        'The edge device records which internal IP and source port belong to which external conversation.',
        'If necessary, the edge also replaces the visible source port on the public side so several clients can share one public IP without ambiguity.',
        'When reply traffic comes back, the translation table tells the edge device which internal host and port should receive it.',
        'This is why one public IP can still support many browsers, phones, calls, and background services at once.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: two internal clients can talk to the same website through one public address because the edge tracks separate translated sessions.',
          code:
            '192.168.1.20:51514 -> 203.0.113.10:40001 -> 198.51.100.20:443\n192.168.1.30:51514 -> 203.0.113.10:40002 -> 198.51.100.20:443',
        },
        'A laptop browsing secure websites and a phone streaming video can both appear from the same public IPv4 address while remaining separate internally.',
        'A busy household can sustain many simultaneous outbound sessions because the router is tracking translated address-port pairs rather than only one blunt address change.',
      ],
      misconceptions: [
        '"PAT means every device uses the same exact port number outside." The edge can rewrite public-facing source ports to keep sessions separate.',
        '"Ports matter only for servers." Outbound client sessions also rely on ports so the edge can track which conversation belongs to which host.',
        '"If the public IP is shared, the router can no longer tell devices apart." The translation table is exactly what preserves that distinction.',
      ],
      recap: [
        'PAT is the common small-network form of address translation.',
        'It uses address and port state together so many internal sessions can share one public IP.',
        'The translation table is what keeps each reply aligned to the correct internal host.',
      ],
      imagePlaceholder: {
        title: 'Many internal sessions sharing one public IP through PAT',
        label: 'Translation table view',
        description:
          'This is the clearest place for a multi-session visual because the whole idea depends on seeing several conversations at once.',
        callouts: [
          'Show two or three internal clients using the same public IP but different translated source ports.',
          'Include a small translation table that maps internal sockets to public-facing sockets.',
          'Use the same remote service on the outside to show why the port distinction matters.',
        ],
      },
      referenceItems: [
        {
          label: 'PAT',
          value: 'Address plus port tracking',
          detail: 'The edge tracks conversations through translated address-port pairs rather than by address alone.',
        },
        {
          label: 'Translation table',
          value: 'Session memory',
          detail: 'The state record that maps public-facing conversations back to the right internal client.',
        },
        {
          label: 'Shared public IPv4',
          value: 'Normal home behaviour',
          detail: 'Many internal devices can browse out through one outside address at the same time.',
        },
      ],
      connections: [
        {
          label: 'TCP, UDP, and ports',
          href: '/topics/tcp-and-udp-protocols#ports-identify-services',
          note: 'The transport page reinforces why ports matter even before you reach server-side firewall rules.',
        },
      ],
    },
    {
      id: 'port-forwarding-opens-a-deliberate-inbound-path',
      title: 'Port Forwarding Opens a Deliberate Inbound Path',
      strapline:
        'Outbound traffic is easy because the edge created the translation. Inbound traffic needs a rule because the internet cannot guess the internal target.',
      overview:
        'Port forwarding is a deliberate rule that tells the edge device to send traffic arriving on a specific public-facing port to a chosen internal host and port. This is how a home lab, camera, game server, or remote-management service can be exposed intentionally from behind NAT.',
      whyItMatters:
        'This is one of the most practical NAT lessons for beginners. Many people understand why browsing out works, but they do not understand why hosting inward fails until they define a forward and point it at the correct service.',
      howItWorks: [
        'The edge device listens for traffic arriving on a chosen external port of the public-facing address.',
        'A rule maps that public port to one internal private IP and one internal service port.',
        'The internal host usually needs a stable address through a reservation or static assignment so the forward keeps pointing to the right device.',
        'The target service also has to be running and allowed locally. A forwarding rule cannot fix a host that is not listening.',
        'Every forward is an exposure decision, so it should exist for a reason and be reviewed carefully.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: expose one internal secure web service from the outside.',
          code:
            'Public side:   203.0.113.10:8443\nForward to:    192.168.1.50:443\nMeaning:       External clients reach the public IP on 8443 and are sent to the internal host on 443',
        },
        'A home lab web service may use an external high port that forwards to the normal internal HTTPS service.',
        'A family might never need any forwards at all because ordinary browsing, streaming, and app use are outbound and tracked automatically by the edge.',
      ],
      misconceptions: [
        '"If the port forward exists, the service must be working." The host still has to be powered on, addressed correctly, and listening on the target port.',
        '"A forward makes a service private because it uses an unusual port." Obscurity is not the same thing as security.',
        '"One public port can be forwarded to several different internal hosts at the same time." One public-facing port mapping points to one chosen target at a time.',
      ],
      recap: [
        'Port forwarding creates a deliberate inbound path through NAT.',
        'It maps one public-facing port to one internal host and service.',
        'The forward, the host address, and the service listener all have to agree for it to work.',
      ],
      imagePlaceholder: {
        title: 'Inbound port forward from public service to internal host',
        label: 'Inbound mapping',
        description:
          'A public-to-private mapping diagram would make this lesson much quicker to understand than text alone.',
        callouts: [
          'Show an external client reaching the public IP on one port and the rule forwarding to a private host and service port.',
          'Label the internal host as needing a stable address and a listening service.',
          'Make it explicit that one public-facing rule points to one chosen target at a time.',
        ],
      },
      connections: [
        {
          label: 'Firewall rules and ACLs',
          href: '/topics/firewall-rules-and-acls',
          note: 'The firewall page explains why a forward alone is not the same thing as an allow policy.',
        },
        {
          label: 'Planning a small network',
          href: '/topics/planning-a-basic-home-and-small-business-network#connect-devices-with-sensible-addressing-defaults',
          note: 'Planning becomes cleaner when the internal host that needs a forward has a predictable address.',
        },
      ],
    },
    {
      id: 'nat-is-not-the-same-as-routing-or-firewalling',
      title: 'NAT Is Not the Same as Routing or Firewalling',
      strapline:
        'Several edge functions sit close together, which is why they are easy to confuse.',
      overview:
        'Small routers often combine routing, NAT, PAT, firewalling, and wireless in one appliance. That convenience is helpful, but it also makes beginners blur those roles together. Clear troubleshooting depends on separating them again.',
      whyItMatters:
        'Many support mistakes come from changing the wrong thing. A path problem, a translation problem, and an allow-rule problem can produce similar symptoms even though the fix belongs in different layers of the edge design.',
      howItWorks: [
        'Routing decides where traffic should be forwarded next based on destination networks and route knowledge.',
        'NAT and PAT rewrite addressing information at the edge so internal clients can share or expose addresses appropriately.',
        'Firewall rules decide which traffic is allowed or blocked based on policy conditions such as source, destination, protocol, and port.',
        'Double NAT happens when two different devices are both translating, such as an ISP gateway in router mode plus your own downstream router.',
        'Carrier-Grade NAT, often shortened to CGNAT, happens when the ISP also shares public IPv4 space upstream, which can break simple inbound hosting expectations.',
      ],
      examples: [
        'A client can have healthy routing to the edge but still fail inbound hosting because the ISP is using CGNAT upstream.',
        'A home setup with an ISP router feeding your own router can browse out normally but make port forwarding confusing because two layers of translation exist.',
        'A service can still fail even with the correct forward if the firewall policy blocks the traffic after the translation step.',
      ],
      misconceptions: [
        '"NAT is a firewall." NAT changes addresses. A firewall enforces policy. Some appliances perform both, but they are not the same function.',
        '"If the public IP is visible on my router, inbound hosting must work." Upstream CGNAT or a second translating device can still break that assumption.',
        '"If the edge device is one box, it must be one networking role." Consumer appliances often combine several roles in one chassis.',
      ],
      recap: [
        'Routing, NAT, and firewalling sit close together but solve different problems.',
        'Double NAT and CGNAT are common reasons simple inbound publishing fails.',
        'Good troubleshooting improves when you ask which edge function is actually failing.',
      ],
      imagePlaceholder: {
        title: 'Separate routing, NAT, and firewall roles at the edge',
        label: 'Function map',
        description:
          'A layered edge diagram would help stop learners from treating all edge behaviour as one vague router function.',
        callouts: [
          'Show the same appliance with separate labels for routing, NAT or PAT, and firewall policy.',
          'Include an optional second upstream translating device to illustrate double NAT or CGNAT.',
          'Use short notes to distinguish path choice, address rewriting, and allow or deny policy.',
        ],
      },
      connections: [
        {
          label: 'Routing basics',
          href: '/topics/routing-basics#read-a-small-network-path-end-to-end',
          note: 'Use the routing page if you want the forwarding path separated clearly from the translation step.',
        },
        {
          label: 'Firewall rules and ACLs',
          href: '/topics/firewall-rules-and-acls#firewalls-and-acls-exist-to-enforce-policy',
          note: 'The firewall page is the right place to reinforce the policy side of edge behaviour.',
        },
      ],
    },
    {
      id: 'read-common-nat-symptoms-before-changing-rules',
      title: 'Read Common NAT Symptoms Before Changing Rules',
      strapline:
        'The cleanest way to troubleshoot publishing problems is to test the path in the right order.',
      overview:
        'When a forward or hosted service fails, the temptation is to start clicking through router menus until something changes. A better workflow is to prove the service internally first, confirm the target address, validate the port mapping, check for double NAT or CGNAT, and test from outside the local network.',
      whyItMatters:
        'NAT issues are often solved much faster when you stop treating them as mystery internet failures. The problem is usually one of a few repeatable patterns.',
      howItWorks: [
        'Confirm the target host has the expected private IP and is actually reachable inside the LAN.',
        'Confirm the service is listening on the internal host and on the intended internal port.',
        'Confirm the port-forwarding rule maps the right external port and protocol to that host and port.',
        'Check whether a second translating device or ISP CGNAT is preventing straightforward inbound access.',
        'Test from an external network such as mobile data, because some routers do not reflect the public test back inward cleanly from the same LAN.',
      ],
      examples: [
        'A student may think the forward is broken when the real issue is that the server changed IP because no reservation was created.',
        'A web service can look published in the router while the host itself is still not listening on the mapped port.',
        'Testing from inside the same Wi-Fi may be misleading on some devices, so a phone on cellular is often a cleaner outside test.',
      ],
      misconceptions: [
        '"If the forward is correct, the rest of the path does not matter." Host state, firewall policy, and upstream addressing still matter.',
        '"Testing from the same network is always enough." Outside testing is often more trustworthy for published-service checks.',
        '"Changing several NAT settings quickly is efficient." It usually makes the evidence worse rather than better.',
      ],
      recap: [
        'Prove the internal service first, then the mapping, then the upstream edge conditions.',
        'Stable host addressing is essential when port forwarding is involved.',
        'The clean troubleshooting sequence is usually faster than random router changes.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the translation logic',
        intro:
          'Use these questions to confirm that you can separate outbound NAT behaviour from deliberate inbound publishing and common edge-case failures.',
        questions: [
          {
            prompt:
              'Why can many home devices browse the internet through one public IPv4 address?',
            options: [
              {
                label: 'Because PAT tracks separate translated sessions by address and port',
                isCorrect: true,
                feedback:
                  'Correct. PAT keeps many conversations separate even when they share one public address.',
              },
              {
                label: 'Because every website ignores source addressing once traffic leaves the router',
                isCorrect: false,
                feedback:
                  'The edge still has to present a valid public-facing source identity for the session.',
              },
              {
                label: 'Because routing removes the need for public addresses entirely',
                isCorrect: false,
                feedback:
                  'Routing and NAT solve different problems. Public destinations still need a public-facing address on the internet side.',
              },
            ],
          },
          {
            prompt:
              'What is the clearest description of a port-forwarding rule?',
            options: [
              {
                label: 'A mapping from a chosen public-facing port to a chosen internal host and service port',
                isCorrect: true,
                feedback:
                  'Correct. That is how inbound traffic is directed through the edge toward one internal service.',
              },
              {
                label: 'A guarantee that any service on the internal host is reachable from anywhere',
                isCorrect: false,
                feedback:
                  'The target service still has to exist and any firewall policy still has to permit the traffic.',
              },
              {
                label: 'A replacement for a default gateway on the internal client',
                isCorrect: false,
                feedback:
                  'Default gateway settings belong to routing, not to inbound publishing rules.',
              },
            ],
          },
          {
            prompt:
              'A service is reachable inside the LAN but not from the internet, even though the forward looks correct. What is one strong next suspicion?',
            options: [
              {
                label: 'Double NAT or CGNAT upstream',
                isCorrect: true,
                feedback:
                  'Correct. A second layer of translation is a classic reason published inbound access fails.',
              },
              {
                label: 'The client must be missing a subnet mask',
                isCorrect: false,
                feedback:
                  'That is much less likely when the service is already reachable inside the local network.',
              },
              {
                label: 'PAT only works for email and not for web services',
                isCorrect: false,
                feedback:
                  'PAT is not limited to one service family in that way.',
              },
            ],
          },
          {
            prompt:
              'Why is testing a published service from mobile data often more useful than testing from the same Wi-Fi?',
            options: [
              {
                label: 'Because it proves the path from outside the LAN instead of relying on local reflection behaviour',
                isCorrect: true,
                feedback:
                  'Correct. An external path test is often clearer for inbound publishing checks.',
              },
              {
                label: 'Because mobile networks ignore NAT entirely',
                isCorrect: false,
                feedback:
                  'Mobile networks still rely on normal networking behaviour; the advantage is that the test is actually outside your LAN.',
              },
              {
                label: 'Because Wi-Fi clients cannot reach public IP addresses at all',
                isCorrect: false,
                feedback:
                  'They can, but local testing does not always prove the same thing as a real outside request.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Network troubleshooting workflow',
          href: '/topics/network-troubleshooting-workflow',
          note: 'The troubleshooting page gives the wider discipline for proving edge, service, and policy issues one step at a time.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'nat',
      term: 'NAT (Network Address Translation)',
      definition:
        'An edge function that rewrites IP addressing as traffic moves between one network context and another, commonly between private internal IPv4 space and the public internet.',
      importance:
        'It explains why many internal devices can reach the internet without each having their own public IPv4 address.',
      sectionId: 'nat-exists-because-private-addresses-need-a-public-exit',
    },
    {
      id: 'pat',
      term: 'PAT (Port Address Translation)',
      definition:
        'The common small-network form of NAT that tracks and, when needed, rewrites ports as well as addresses so many sessions can share one public IP.',
      importance:
        'It is the everyday reason one home router can support many simultaneous outbound connections behind one public-facing address.',
      sectionId: 'pat-lets-many-clients-share-one-public-ip',
    },
    {
      id: 'port-forwarding',
      term: 'Port Forwarding',
      definition:
        'A rule that maps inbound traffic arriving on a chosen public-facing port to a chosen internal host and service port.',
      importance:
        'It is the standard way to expose a service deliberately from behind a NAT boundary.',
      sectionId: 'port-forwarding-opens-a-deliberate-inbound-path',
    },
    {
      id: 'translation-table',
      term: 'Translation Table',
      definition:
        'The state record on the edge device that maps translated public-facing conversations back to the correct internal client or service.',
      importance:
        'It is what makes PAT practical instead of chaotic when many sessions are active at once.',
      sectionId: 'pat-lets-many-clients-share-one-public-ip',
    },
    {
      id: 'double-nat',
      term: 'Double NAT',
      definition:
        'A situation where two different devices on the path are both translating addresses, often causing confusion for inbound publishing and troubleshooting.',
      importance:
        'It is a very common reason home or lab port-forwarding attempts fail unexpectedly.',
      sectionId: 'nat-is-not-the-same-as-routing-or-firewalling',
    },
    {
      id: 'cgnat',
      term: 'CGNAT (Carrier-Grade NAT)',
      definition:
        'An ISP-side address-sharing design where many customers sit behind a shared provider translation layer instead of each receiving their own directly reachable public IPv4 address.',
      importance:
        'It explains why some customers can browse outward normally but cannot host simple inbound services from home.',
      sectionId: 'nat-is-not-the-same-as-routing-or-firewalling',
    },
  ],
  revision: {
    summary:
      'Remember this topic as an edge sequence: routing gets traffic to the boundary, NAT rewrites the address, PAT keeps many sessions separate through ports, and port forwarding creates an intentional inbound exception when a service must be reached from outside.',
    memoryFramework: [
      'Start with the problem: private IPv4 space works internally, but the internet still needs a public-facing address.',
      'Remember NAT as address rewriting at the edge.',
      'Remember PAT as the practical version that also tracks ports so many clients can share one outside IP.',
      'Remember port forwarding as a deliberate inbound mapping, not as a general publishing guarantee.',
      'Separate routing, translation, and firewall policy when troubleshooting the edge.',
      'Check for double NAT or CGNAT when inbound access makes less sense than outbound browsing.',
    ],
    checklist: [
      'I can explain why NAT became common in IPv4 networks.',
      'I can explain how PAT lets many internal devices share one public IPv4 address.',
      'I can describe what a translation table is doing.',
      'I can explain what a port-forwarding rule maps.',
      'I can explain why a forward still fails if the target service is not listening.',
      'I can explain why double NAT or CGNAT can block simple inbound hosting.',
      'I can separate NAT behaviour from routing and firewall policy.',
    ],
    questions: [
      'Why does ordinary browsing usually work behind NAT without extra manual rules?',
      'Why does inbound hosting need a deliberate forward instead of just a working public IP?',
      'Why can one public IPv4 address still support many simultaneous internal users?',
      'Why is stable internal addressing helpful when a service is being published?',
      'Why should double NAT be one of the first suspicions when a forward looks correct but still fails?',
      'Why is NAT not the same thing as a firewall even when one device performs both roles?',
    ],
    pitfalls: [
      'Treating NAT as if it replaces routing.',
      'Assuming a correct forward guarantees that the internal service is healthy.',
      'Forgetting to reserve or stabilise the internal host address used by the forward.',
      'Ignoring double NAT or CGNAT when outside access fails mysteriously.',
      'Testing only from inside the same LAN and assuming the outside path has been proven.',
    ],
  },
  relatedTopicSlugs: [
    'intro-to-ip-addressing',
    'ipv4-addresses',
    'routing-basics',
    'firewall-rules-and-acls',
    'planning-a-basic-home-and-small-business-network',
    'network-troubleshooting-workflow',
  ],
};
