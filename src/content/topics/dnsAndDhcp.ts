import type { StudyTopic } from '../schema';

export const dnsAndDhcpTopic: StudyTopic = {
  slug: 'dns-and-dhcp',
  title: 'DNS and DHCP',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '30 minutes',
  sourceFile: 'context files/DNS and DHCP.pdf',
  updatedOn: 'March 18, 2026',
  summary:
    'Learn how devices receive IP settings automatically, why those settings are leased rather than permanent, how DNS turns names into reachable destinations, and how APIPA and gateway details help you troubleshoot.',
  heroNote:
    'Use this page when you want DHCP, DNS, lease timing, APIPA, and gateway behaviour to feel practical instead of like a list of acronyms.',
  tags: ['DNS', 'DHCP', 'lease time', 'APIPA', 'gateway'],
  learningObjectives: [
    'Differentiate static addressing from dynamic addressing and explain when each approach is useful.',
    'Explain why DHCP assigns configuration by lease instead of permanent ownership.',
    'Describe how DHCP pools and lease duration affect busy networks differently from stable home networks.',
    'Explain how DNS maps names to IP addresses for both public and private networks.',
    'Recognise APIPA or link-local fallback as a clue that normal DHCP-based configuration failed.',
    'Read DHCP server, DNS server, MAC address, and lease details from a real client configuration.',
  ],
  sections: [
    {
      id: 'static-vs-dynamic-addressing',
      title: 'Static and Dynamic Addressing',
      strapline:
        'The first configuration question is whether a device is being set manually or receiving its settings automatically.',
      overview:
        'Devices can receive network settings in two broad ways. Static addressing means someone enters the values by hand, while dynamic addressing means a service assigns them automatically when the device joins the network.',
      whyItMatters:
        'This distinction affects both convenience and predictability. Client devices benefit from automatic configuration, while some infrastructure devices benefit from fixed, predictable settings.',
      howItWorks: [
        'A static configuration requires you to enter the IP address, subnet mask, gateway, DNS server, and related details manually.',
        'A dynamic configuration relies on DHCP to supply those details when the device connects.',
        'Dynamic addressing reduces human error and makes it much easier to manage many changing clients.',
        'Static addressing is still useful when you want a device, service, or management interface to stay at a known address.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: these two approaches deliver the same kinds of settings, but they are obtained differently.',
          code:
            'Static\nIP Address:  192.168.10.20\nSubnet Mask: 255.255.255.0\nGateway:     192.168.10.1\nDNS Server:  192.168.10.1\n\nDynamic\nDevice joins network\nDHCP server supplies the same fields automatically',
        },
        'Example: a laptop on guest Wi-Fi is usually better suited to dynamic addressing, while a router management IP is often easier to keep static.',
      ],
      misconceptions: [
        '"Dynamic" does not mean the network is uncontrolled or random. It means the assignment is automated through a defined service.',
        '"Static" does not automatically mean better. It simply means manual and predictable, which is useful only in the right situations.',
      ],
      recap: [
        'Static addressing is manual.',
        'Dynamic addressing is automatic through DHCP.',
        'The right choice depends on whether convenience or fixed predictability matters more for that device.',
      ],
      connections: [
        {
          label: 'Broader IP addressing lesson',
          href: '/topics/intro-to-ip-addressing#dhcp-dns-and-supporting-services',
          note: 'Return to the wider addressing page if you want DNS and DHCP in the larger IP context.',
        },
      ],
    },
    {
      id: 'dhcp-assigns-configuration-by-lease',
      title: 'DHCP Assigns Configuration by Lease',
      strapline:
        'A DHCP address is borrowed for a period of time, not owned permanently by the client.',
      overview:
        'DHCP exists so devices can receive working network settings quickly when they connect. The important idea is that the assignment is a lease, which means it lasts for a defined period and can later be renewed or returned to the available pool.',
      whyItMatters:
        'Many beginners assume that once a device gets an IP address, that address belongs to it forever. That assumption causes confusion when a device renews the same address, receives a different one later, or loses a usable address after a lease problem.',
      howItWorks: [
        'When a device joins the network, it checks for a DHCP server that can assign configuration details.',
        'The DHCP server provides the client IP address and usually related settings such as subnet mask, DNS server, and default gateway.',
        'That assignment lasts only for a configured lease duration rather than permanent ownership.',
        'If the client remains active, the lease can be renewed. If the client disappears, the address can return to the pool for someone else to use later.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: a DHCP lease can be read as a temporary reservation, not a permanent identity.',
          code:
            'Client joins network\nDHCP server assigns:\n  IP Address:  192.168.2.133\n  Subnet Mask: 255.255.255.0\n  Gateway:     192.168.2.1\n  DNS Server:  192.168.2.1\n  Lease:       24 hours',
        },
        'Example: a frequently used laptop may keep renewing the same address for days, while an infrequently used tablet may lose its old address and receive a different one later.',
      ],
      misconceptions: [
        '"DHCP only gives an IP address." In practice, it usually supplies several settings needed for a usable connection.',
        '"A dynamically assigned address should constantly change." It may change, but active clients often keep renewing the same lease.',
      ],
      recap: [
        'DHCP automates client configuration.',
        'The address is leased, not permanently owned.',
        'Lease renewal and reuse are normal parts of how DHCP keeps networks manageable.',
      ],
      referenceItems: [
        {
          label: 'Core idea',
          value: 'Lease model',
          detail: 'Addresses are reserved for a time window rather than owned forever.',
        },
        {
          label: 'Typical small-network pattern',
          value: 'Router as DHCP server',
          detail: 'Many home routers assign client settings directly.',
        },
      ],
      connections: [
        {
          label: 'Real client example',
          href: '#reading-dns-and-dhcp-on-a-real-client',
          note: 'The final section shows where these lease details appear in adapter output.',
        },
      ],
    },
    {
      id: 'lease-pools-and-duration',
      title: 'Lease Pools, Duration, and Address Planning',
      strapline:
        'A DHCP server is managing a finite pool, so duration and range design matter.',
      overview:
        'DHCP is not just about handing out addresses. It is also about managing a pool of usable addresses and deciding how long each one should stay reserved before it can be reused.',
      whyItMatters:
        'This is where networking stops being abstract and becomes operational. Lease time and pool design affect whether a busy environment runs smoothly or starts refusing new clients because the available space is tied up unnecessarily.',
      howItWorks: [
        'A DHCP server usually works from a defined range of addresses that it is allowed to assign.',
        'Lease duration determines how long an address stays reserved for a client before it can be reclaimed or renewed.',
        'A high-turnover environment, such as guest Wi-Fi in a cafe, often benefits from shorter leases so addresses return to the pool faster.',
        'A stable environment, such as a home network, can often use longer leases because the same devices return regularly.',
        'If you plan to give some devices manual addresses, keep those outside the active DHCP pool to avoid duplicate-address conflicts.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: one simple way to separate static devices from dynamic clients is to keep them in different parts of the same subnet.',
          code:
            'Subnet:      192.168.6.0/24\nRouter:      192.168.6.1\nStatic range: 192.168.6.2 - 192.168.6.49\nDHCP pool:    192.168.6.50 - 192.168.6.254',
        },
        {
          type: 'code',
          intro:
            'Example: different environments often justify different lease durations.',
          code:
            'Coffee shop guest Wi-Fi: shorter lease, such as 60 minutes\nHome network:          longer lease, such as 24 hours or more',
        },
      ],
      misconceptions: [
        '"Shorter leases are always better." They help only when device turnover is high enough to justify them.',
        '"If a subnet has many possible addresses, lease time does not matter." Poor lease timing can still waste usable addresses in a busy environment.',
        '"Manual addresses can safely sit inside the DHCP pool." That creates a risk of the DHCP server assigning the same address to someone else.',
      ],
      recap: [
        'DHCP depends on a finite address pool.',
        'Lease duration should match how often clients come and go.',
        'Static addresses should sit outside the active DHCP range when possible.',
      ],
      referenceItems: [
        {
          label: 'Demo lease time',
          value: '86,400 seconds',
          detail: 'Equivalent to 24 hours in the router example.',
        },
        {
          label: 'Usable host example',
          value: '254 hosts',
          detail: 'A common small-network scale for a /24-style layout.',
        },
      ],
      connections: [
        {
          label: 'Private IPv4 ranges and NAT',
          href: '/topics/ipv4-addresses#private-addressing-and-nat',
          note: 'Use the IPv4 page if you want a closer look at the address space these pools usually come from.',
        },
      ],
    },
    {
      id: 'dns-and-name-resolution',
      title: 'DNS and Name Resolution',
      strapline:
        'DNS matters because people remember names much more easily than numeric addresses.',
      overview:
        'DNS translates domain names into IP addresses so users and applications can request services by name. It is one of the most important support services in networking because an address can be perfectly valid and still feel unusable if name resolution is broken.',
      whyItMatters:
        'Most users do not know or care what IP address a site uses. They type a name. If DNS fails, many network problems look like "the internet is down" even when the real problem is just name resolution.',
      howItWorks: [
        'When a user enters a name such as `pluralsight.com`, the client asks a DNS server how to reach it.',
        'The DNS server returns the IP information the client needs in order to connect.',
        'This works on the public internet and also inside private networks where internal names point to internal systems.',
        'Small networks may point clients at the router for DNS, while other environments may use separate primary and secondary DNS servers.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: DNS turns a human-friendly request into something the network can route.',
          code:
            'Name entered: pluralsight.com\nDNS response: corresponding IP address\nClient action: connect to that IP',
        },
        {
          type: 'code',
          intro:
            'Example: a small network can use one DNS server locally and keep a fallback as well.',
          code:
            'Primary DNS:   192.168.2.1\nSecondary DNS: 8.8.8.8',
        },
      ],
      misconceptions: [
        '"DNS is only for public websites." Private networks also rely on DNS to make internal resources easier to reach.',
        '"If DNS is working, the whole network must be healthy." DNS is one support service among several, not the entire path.',
        '"DNS replaces IP addressing." It depends on IP addressing underneath and makes it easier for humans to use.',
      ],
      recap: [
        'DNS maps names to IP addresses.',
        'It works for public and private networks.',
        'Name-resolution failure can look like a general connectivity problem until you inspect it carefully.',
      ],
      referenceItems: [
        {
          label: 'Primary job',
          value: 'Name to IP translation',
          detail: 'This is the core reason DNS exists.',
        },
        {
          label: 'Typical small-network pattern',
          value: 'Router as DNS forwarder',
          detail: 'Home networks often point clients at the router first.',
        },
      ],
      connections: [
        {
          label: 'Broader DNS record context',
          href: '/topics/why-networking-is-important#tools-and-practical-design',
          note: 'The wider foundations page extends DNS into records such as A, MX, SPF, DKIM, and DMARC.',
        },
      ],
    },
    {
      id: 'apipa-link-local-and-gateway',
      title: 'APIPA, Link-Local Fallback, and the Default Gateway',
      strapline:
        'A client can have an address and still be in trouble if it fell back to the wrong kind of address or lacks a route out.',
      overview:
        'If DHCP is unavailable, an IPv4 client may assign itself an APIPA or link-local address in the 169.254.0.0/16 range. That lets it function only in a very limited local way. A healthy client also needs a usable default gateway if it is going to reach destinations beyond its own subnet.',
      whyItMatters:
        'This is one of the most practical troubleshooting patterns in entry-level networking. Seeing a 169.254.x.x address is not a random detail. It is often the first clue that normal automatic configuration failed.',
      howItWorks: [
        'When DHCP is unavailable or something goes wrong during automatic configuration, an IPv4 host may self-assign an APIPA address.',
        'That address supports only limited local communication and is not a normal sign of successful internet access.',
        'The default gateway is the device at the edge of the local network that forwards traffic outward.',
        'On a home network, the router usually serves as that gateway.',
        'A usable client typically needs all three pieces to work together: valid addressing, working DNS, and a reachable gateway.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: these two client states look very different once you read the address and gateway together.',
          code:
            'Healthy client\nIPv4 Address: 192.168.2.133\nGateway:      192.168.2.1\n\nDHCP failure clue\nIPv4 Address: 169.254.88.14\nGateway:      missing or unusable',
        },
        'Example: a user may report "Wi-Fi connected but internet not working" when the real issue is that the client fell back to APIPA and never received normal DHCP settings.',
      ],
      misconceptions: [
        '"Any IP address means the client is configured correctly." A fallback 169.254.x.x address usually signals the opposite.',
        '"DNS and the gateway do the same job." DNS resolves names, while the gateway forwards traffic beyond the local subnet.',
        '"APIPA is a good long-term addressing method." It is primarily a fallback clue, not a normal design target for client internet access.',
      ],
      recap: [
        'APIPA usually means DHCP failed.',
        'A gateway is how traffic leaves the local network.',
        'A usable client needs more than just a number in the IP address field.',
      ],
      referenceItems: [
        {
          label: 'IPv4 fallback range',
          value: '169.254.0.0/16',
          detail: 'Classic APIPA or link-local space.',
        },
        {
          label: 'Gateway role',
          value: 'Boundary device',
          detail: 'Forwards traffic between the local network and other networks.',
        },
      ],
      connections: [
        {
          label: 'IPv4 troubleshooting context',
          href: '/topics/ipv4-addresses#reading-ipv4-on-a-real-device',
          note: 'Use the IPv4 page if you want to connect this fallback behaviour to client-side address reading more broadly.',
        },
      ],
    },
    {
      id: 'reading-dns-and-dhcp-on-a-real-client',
      title: 'Reading DNS and DHCP on a Real Client',
      strapline:
        'The concepts become much easier to remember once you can point to the exact lines on a real adapter.',
      overview:
        'A client configuration dump turns this topic from theory into evidence. Instead of memorising acronyms, you can see where the DHCP server, DNS server, lease timing, MAC address, and current client IP all appear together.',
      whyItMatters:
        'This is the bridge into troubleshooting. A single command can tell you whether the client received a lease, which server supplied it, whether the router is acting as DNS, and whether the current address looks healthy.',
      howItWorks: [
        'On Windows, `ipconfig /all` exposes adapter details such as the physical address, current IP settings, DHCP server, DNS server, and lease timestamps.',
        'The physical address line is the MAC address of the network interface.',
        'In many small networks, the same router IP may appear as both the DHCP server and the DNS server.',
        'Lease obtained and lease expiry fields help you understand whether the address is current, renewable, or close to expiration.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this style of client output tells you far more than just the IP address alone.',
          code:
            'Physical Address: F4-60-3F-A6-12-34\nIPv4 Address:    192.168.2.133\nDHCP Server:     192.168.2.1\nDNS Server:      192.168.2.1\nLease Obtained:  March 16, 2:40 PM\nLease Expires:   March 17, 2:51 PM',
        },
        'Example: if the DHCP server and DNS server both show the router IP on a home network, that is often normal rather than suspicious.',
      ],
      misconceptions: [
        '"The physical address line is just another IP field." It is the MAC address, which identifies the interface hardware rather than the logical network location.',
        '"If the DHCP server and DNS server match, something must be wrong." On smaller networks, one router commonly provides both services.',
        '"A client command is too limited to tell you anything useful." It often reveals enough to distinguish between lease failure, DNS issues, and broader upstream problems.',
      ],
      recap: [
        'Use `ipconfig /all` to turn theory into evidence.',
        'Check the DHCP server, DNS server, lease times, and MAC address together.',
        'A real client view makes DNS and DHCP much easier to troubleshoot accurately.',
      ],
      referenceItems: [
        {
          label: 'Client-side check',
          value: 'ipconfig /all',
          detail: 'Quick Windows view of DNS, DHCP, lease, and adapter details.',
        },
        {
          label: 'Small-network pattern',
          value: '192.168.2.1',
          detail: 'Example router IP acting as both DHCP and DNS in the lesson demo.',
        },
      ],
      interactive: {
        type: 'quiz',
        title: 'Practice reading the client output',
        intro:
          'Use the fields below the way you would during troubleshooting: identify the MAC, interpret the shared router services, and spot the failure clue.',
        questions: [
          {
            prompt:
              'Which line identifies the hardware interface rather than the logical network address?',
            supportingCode:
              'Physical Address: F4-60-3F-A6-12-34\nIPv4 Address:    192.168.2.133\nDHCP Server:     192.168.2.1\nDNS Server:      192.168.2.1',
            options: [
              {
                label: 'Physical Address',
                isCorrect: true,
                feedback:
                  'Correct. The physical address is the MAC address tied to the network interface hardware.',
              },
              {
                label: 'IPv4 Address',
                isCorrect: false,
                feedback:
                  'The IPv4 address is the logical network identity, not the hardware identifier.',
              },
              {
                label: 'DHCP Server',
                isCorrect: false,
                feedback:
                  'That field identifies the server that assigned the lease, not the client interface hardware.',
              },
            ],
          },
          {
            prompt:
              'If both the DHCP server and DNS server show `192.168.2.1` on a home network, what is the best explanation?',
            options: [
              {
                label: 'The router is providing both services to the client',
                isCorrect: true,
                feedback:
                  'Correct. On smaller networks, one router commonly acts as both the DHCP server and the DNS forwarder.',
              },
              {
                label: 'The client is misreading the fields and should ignore them',
                isCorrect: false,
                feedback:
                  'Those fields are useful. Matching values are often normal when the router provides multiple services.',
              },
              {
                label: 'The website the user opened is forcing both addresses to match',
                isCorrect: false,
                feedback:
                  'Website traffic is unrelated to whether the local router is supplying DHCP and DNS.',
              },
            ],
          },
          {
            prompt:
              'What does this client state most strongly suggest?',
            supportingCode:
              'IPv4 Address: 169.254.88.14\nDefault Gateway: missing',
            options: [
              {
                label: 'Normal DHCP service with full internet access',
                isCorrect: false,
                feedback:
                  'A 169.254.x.x address is usually the opposite: the client fell back because normal DHCP configuration failed.',
              },
              {
                label: 'DHCP failure with APIPA or link-local fallback',
                isCorrect: true,
                feedback:
                  'Correct. That address range is a classic clue that the client did not receive normal DHCP settings.',
              },
              {
                label: 'A NAT issue outside the local network',
                isCorrect: false,
                feedback:
                  'NAT happens later at the network edge. This clue appears directly on the client before that point.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Revision page',
          href: '/revision',
          note: 'Use the revision pack once you can interpret these fields without guessing.',
        },
        {
          label: 'Foundations overview',
          href: '/topics/why-networking-is-important#addressing-and-configuration',
          note: 'Reconnect this focused lesson to the wider addressing and troubleshooting picture when you are done.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'static-ip-address',
      term: 'Static IP Address',
      definition:
        'An IP configuration entered manually so the device keeps a known, predictable address until someone changes it.',
      importance:
        'It contrasts directly with DHCP-based dynamic addressing and is often used where predictability matters.',
      sectionId: 'static-vs-dynamic-addressing',
    },
    {
      id: 'dynamic-ip-address',
      term: 'Dynamic IP Address',
      definition:
        'An IP configuration assigned automatically, usually by DHCP, when a device joins the network.',
      importance:
        'It is the default pattern for most client devices because it scales and reduces manual errors.',
      sectionId: 'static-vs-dynamic-addressing',
    },
    {
      id: 'dhcp-lease',
      term: 'DHCP Lease',
      definition:
        'The time-limited reservation of an IP address and related network settings for a client.',
      importance:
        'It explains why an address can be renewed, expire, or return to the available pool later.',
      sectionId: 'dhcp-assigns-configuration-by-lease',
    },
    {
      id: 'dhcp-pool',
      term: 'DHCP Pool',
      definition:
        'The range of addresses a DHCP server is allowed to assign dynamically to clients.',
      importance:
        'It is central to preventing address exhaustion and avoiding overlap with static assignments.',
      sectionId: 'lease-pools-and-duration',
    },
    {
      id: 'dns-server',
      term: 'DNS Server',
      definition:
        'A server that answers name-resolution requests by translating names into IP information.',
      importance:
        'It is what turns human-friendly names into destinations the network can actually reach.',
      sectionId: 'dns-and-name-resolution',
    },
    {
      id: 'default-gateway',
      term: 'Default Gateway',
      definition:
        'The router or other boundary device a client uses when sending traffic beyond its local subnet.',
      importance:
        'It is the next hop that makes off-subnet communication possible.',
      sectionId: 'apipa-link-local-and-gateway',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember as a working chain: DHCP gives the client usable settings, lease timing controls how long those settings stay reserved, DNS translates names into reachable destinations, APIPA warns you when automatic configuration failed, and the gateway carries traffic beyond the local subnet.',
    memoryFramework: [
      'Start with how the client got its settings: static by hand or dynamic through DHCP.',
      'Read the lease model: a DHCP address is borrowed for a defined time, not owned forever.',
      'Read the pool: busy networks may need shorter leases or larger ranges than stable home networks.',
      'Read the name service: DNS converts names into IP destinations.',
      'Read the warning sign: 169.254.x.x usually points to DHCP trouble.',
      'Read the path out: the default gateway is how the client reaches other networks.',
      'Validate on a client: `ipconfig /all` shows whether the theory matches reality.',
    ],
    checklist: [
      'I can explain the difference between static and dynamic addressing.',
      'I can explain why DHCP uses leases rather than permanent ownership.',
      'I can explain why a coffee shop might use shorter leases than a home network.',
      'I can explain why static addresses should not overlap the active DHCP pool.',
      'I can explain what DNS contributes after a client already has an IP address.',
      'I can explain what a 169.254.x.x address usually tells me.',
      'I can explain what role the default gateway plays in internet access.',
      'I can read DHCP server, DNS server, lease times, and MAC information from `ipconfig /all`.',
    ],
    questions: [
      'Why is dynamic addressing easier to manage for most client devices than static addressing?',
      'Why is a DHCP address described as a lease instead of permanent ownership?',
      'Why would a high-turnover guest network care more about lease duration than a quiet home network?',
      'Why can a client have a valid-looking IP address and still fail to reach the internet?',
      'Why is DNS still required after a client already has an IP address, subnet mask, and gateway?',
      'What does a 169.254.x.x address suggest about the state of the client?',
      'Why can the router appear as both the DHCP server and the DNS server on a small network?',
    ],
    pitfalls: [
      'Treating DHCP as if it assigns only an IP address and nothing else.',
      'Assuming a leased address is permanently tied to one client forever.',
      'Putting manually assigned devices inside the same range the DHCP server is actively using.',
      'Mistaking an APIPA address for a sign of healthy configuration.',
      'Confusing DNS name resolution with the gateway role of forwarding traffic out of the subnet.',
    ],
  },
  relatedTopicSlugs: [
    'intro-to-ip-addressing',
    'ipv4-addresses',
    'why-networking-is-important',
  ],
};
