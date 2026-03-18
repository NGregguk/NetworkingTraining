import type { StudyTopic } from '../schema';

export const introToIpAddressingTopic: StudyTopic = {
  slug: 'intro-to-ip-addressing',
  title: 'Introduction to IP Addressing',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '35 minutes',
  sourceFile: 'context files/Intro to IP addressing.pdf',
  updatedOn: 'March 18, 2026',
  summary:
    'Understand how devices get identities on a network, how IPv4 and IPv6 differ, how subnetting basics work, and how DHCP, DNS, NAT, and gateways fit together.',
  heroNote:
    'Focus here when you want a deeper understanding of how devices are identified, configured, and made reachable on a network.',
  tags: ['IP addressing', 'IPv4', 'IPv6', 'DHCP', 'DNS'],
  learningObjectives: [
    'Explain what an IP address is and why it is a logical identifier rather than a hardware identity.',
    'Break down an IPv4 address into octets, network portion, and host portion.',
    'Use a subnet mask at a basic level to explain whether traffic is local or must be sent to a gateway.',
    'Differentiate private and public IPv4 addressing and explain the role of NAT.',
    'Explain why IPv6 exists and describe its basic format and abbreviation rules.',
    'Interpret common IP configuration details such as DHCP server, DNS server, lease time, APIPA, and gateway.',
  ],
  sections: [
    {
      id: 'what-ip-addressing-solves',
      title: 'What IP Addressing Solves',
      strapline: 'A network needs a dependable way to identify where traffic should go.',
      overview:
        'IP addressing exists so devices can send data to the correct destination instead of broadcasting blindly and hoping the right system answers. It provides a logical location for each connected endpoint.',
      whyItMatters:
        'Without this concept, every later networking topic becomes much harder to reason about. Addressing is the starting point for connectivity, routing, troubleshooting, and service discovery.',
      howItWorks: [
        'An IP address is a logical numeric address assigned to a device on a network.',
        'It is logical rather than physical, which means it can change over time even when the hardware stays the same.',
        'The Internet Protocol defines the message rules and address model used when devices exchange information across local and interconnected networks.',
        'Every connected device needs some form of address identity so traffic can be delivered accurately.',
      ],
      examples: [
        'A laptop joining office Wi-Fi may receive one IP today and another tomorrow, but it is still the same physical machine.',
        'A printer, a thermostat, and a phone all need addresses if they are going to communicate on the same network.',
      ],
      misconceptions: [
        '"An IP address belongs permanently to a device." Usually it does not, especially on dynamically managed networks.',
        '"Only computers need IP addresses." Any network-connected endpoint can need one.',
      ],
      recap: [
        'IP addressing gives devices a logical identity.',
        'It is the baseline that lets later services such as DNS and DHCP make sense.',
        'A device can keep the same hardware and still receive a different IP later.',
      ],
      connections: [
        {
          label: 'Broader networking foundations page',
          href: '/topics/why-networking-is-important#addressing-and-configuration',
          note: 'Use the foundations page if you want this topic in the larger networking context.',
        },
      ],
    },
    {
      id: 'ipv4-structure',
      title: 'IPv4 Structure, Octets, and Subnet Basics',
      strapline: 'IPv4 stays readable only because binary addressing is shown to humans in decimal.',
      overview:
        'IPv4 is the format most learners meet first. The important ideas are the 32-bit length, the four octets, the decimal representation, and the way a subnet mask separates the network portion from the host portion.',
      whyItMatters:
        'This is the practical core of entry-level networking. If you cannot read an IPv4 address and pair it with a subnet mask, you will struggle to explain why one device is local, remote, or misconfigured.',
      howItWorks: [
        'IPv4 uses 32 bits total, usually written as four decimal numbers separated by periods.',
        'Each number is 8 bits long, which is why each section is called an octet.',
        'Because 8 bits can only count from 0 to 255, no IPv4 octet can exceed 255.',
        'The subnet mask is another 32-bit value that tells you which bits represent the network and which bits represent the host.',
        'In a mask such as 255.255.255.0, the first 24 bits describe the network portion and the last 8 bits describe the host portion.',
        'Classful ranges A, B, and C are still useful as a study shortcut, even though modern networks use more flexible subnetting.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this IPv4 address and mask split the network and host portions like this.',
          code:
            'IP Address:  192.168.123.132\nSubnet Mask: 255.255.255.0\nNetwork ID:  192.168.123\nHost ID:     132',
        },
        'Example: in the traditional classful view, a class C style mask leaves far fewer host addresses than a class A style mask.',
      ],
      misconceptions: [
        '"The dots are the address." The dots are only formatting for humans; the computer is working with bits.',
        '"The last octet is always the host ID." That is only true when the subnet mask makes it true.',
        '"Classes tell you everything you need to know about modern subnetting." They are still useful for study, but they are not the full modern picture.',
      ],
      recap: [
        'IPv4 uses 32 bits split into four octets.',
        'The subnet mask determines where the network ends and the host part begins.',
        'Reading an address without its mask can leave important context missing.',
      ],
      referenceItems: [
        { label: 'IPv4 size', value: '32 bits', detail: 'Four 8-bit octets.' },
        { label: 'Octet range', value: '0-255', detail: 'The maximum decimal value represented by 8 bits.' },
        { label: 'Common mask', value: '255.255.255.0', detail: 'A /24-style split with 24 network bits and 8 host bits.' },
      ],
      connections: [
        {
          label: 'Dedicated IPv4 lesson',
          href: '/topics/ipv4-addresses',
          note: 'Open the focused IPv4 page if you want more depth on octets, subnet masks, address classes, and NAT.',
        },
        {
          label: 'Public and private addressing',
          href: '#public-private-and-nat',
          note: 'Once you can read the structure, the next question is whether the address is private or internet-routable.',
        },
      ],
    },
    {
      id: 'public-private-and-nat',
      title: 'Public vs Private Addressing and NAT',
      strapline: 'IPv4 scarcity forced networks to become smarter about address reuse.',
      overview:
        'IPv4 did not anticipate the number of internet-connected devices now in use, so public addresses are limited. Private ranges and network address translation let many internal devices share a smaller public footprint.',
      whyItMatters:
        'This explains one of the most common points of confusion in home and small-office networking: why internal devices have one address locally but appear as another address to the outside world.',
      howItWorks: [
        'RFC 1918 defines private IPv4 ranges for internal use.',
        'Private addresses are not meant to be routed directly across the public internet.',
        'Routers use NAT to translate private internal addresses into a public address when traffic leaves the local network.',
        'This lets one household or office support many devices while using only one or a small number of public IPv4 addresses.',
      ],
      examples: [
        'Example: two phones on the same Wi-Fi can report the same public IP on a website while still having different private IPs internally.',
        {
          type: 'code',
          intro:
            'Example: these are the classic private IPv4 ranges used inside local networks.',
          code: '10.x.x.x\n172.16.x.x - 172.31.x.x\n192.168.x.x',
        },
      ],
      misconceptions: [
        '"If my laptop and phone show the same public IP, they must have the same network identity." They do not; NAT is translating many internal identities through one public face.',
        '"Private addresses are broken because they do not work on the internet." That is their design, not a failure.',
      ],
      recap: [
        'Private addressing conserves public IPv4 space.',
        'NAT is what makes one public address usable by many private devices.',
        'Understanding private vs public space is essential for router and home-network troubleshooting.',
      ],
      referenceItems: [
        { label: 'Private block', value: '10.0.0.0/8', detail: 'Large private IPv4 space.' },
        { label: 'Private block', value: '172.16.0.0/12', detail: 'Private range from 172.16 to 172.31.' },
        { label: 'Private block', value: '192.168.0.0/16', detail: 'The most familiar home-network private range.' },
      ],
      connections: [
        {
          label: 'Finding your actual configured addresses',
          href: '#finding-and-reading-your-ip',
          note: 'The next section explains how to see both local configuration and public-facing behavior.',
        },
      ],
    },
    {
      id: 'ipv6-fundamentals',
      title: 'IPv6 Fundamentals',
      strapline: 'IPv6 exists because address growth eventually outpaced IPv4.',
      overview:
        'IPv6 expands the address space dramatically and changes the way addresses are written. Even if a network still leans heavily on IPv4, IPv6 is important because it solves the long-term scale problem directly.',
      whyItMatters:
        'You do not need deep mastery of IPv6 abbreviation rules to start, but you do need to understand why it exists, what makes it different, and why mixed IPv4/IPv6 environments are common.',
      howItWorks: [
        'IPv6 uses 128 bits instead of 32, which creates a vastly larger address space.',
        'It is written in hexadecimal blocks separated by colons rather than decimal octets separated by periods.',
        'Leading zeros in a block can be removed, and one contiguous sequence of all-zero blocks can be compressed with a double colon.',
        'IPv6 can coexist alongside IPv4 rather than requiring an immediate full replacement.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: leading zeros in a block can be removed without changing the address value.',
          code: '0063\n63',
        },
        {
          type: 'code',
          intro:
            'Example: one consecutive run of zero blocks can be compressed with `::`.',
          code:
            'Expanded:  2001:0db8:0000:0000:0000:ff00:0042:8329\nShortened: 2001:db8::ff00:42:8329',
        },
      ],
      misconceptions: [
        '"IPv6 is just IPv4 with more numbers." It changes both the size and the representation of the address.',
        '"IPv6 has already replaced IPv4 everywhere." In practice, dual-stack and transitional environments are still common.',
      ],
      recap: [
        'IPv6 exists to avoid IPv4 exhaustion problems.',
        'It uses 128 bits and hexadecimal notation.',
        'It can operate alongside IPv4 while adoption continues.',
      ],
      referenceItems: [
        { label: 'IPv6 size', value: '128 bits', detail: 'Far larger address space than IPv4.' },
        { label: 'Notation', value: 'Hexadecimal blocks', detail: 'Separated by colons instead of periods.' },
        { label: 'Compression rule', value: 'One double-colon use', detail: 'Only one run of consecutive zero blocks can be compressed this way.' },
      ],
      connections: [
        {
          label: 'Dedicated IPv6 lesson',
          href: '/topics/ipv6-addresses',
          note: 'Open the focused IPv6 page if you want more depth on 128-bit structure, hexadecimal notation, and compression rules.',
        },
        {
          label: 'Device-side IP inspection',
          href: '#finding-and-reading-your-ip',
          note: 'The next section shows how IPv4 and IPv6 often appear together in real client configuration.',
        },
      ],
    },
    {
      id: 'finding-and-reading-your-ip',
      title: 'Finding and Reading Your IP Configuration',
      strapline: 'A useful addressing lesson should end with you checking a real machine.',
      overview:
        'Address theory becomes much clearer once you read a live adapter configuration and compare local information with a public IP check.',
      whyItMatters:
        'This is where study becomes troubleshooting. If you can read adapter output, you can often tell whether the issue is local addressing, DNS, missing DHCP, or something farther upstream.',
      howItWorks: [
        'On Windows, `ipconfig /all` shows adapter-specific details such as IPv4 address, IPv6 address, subnet mask, DNS server, DHCP server, lease start, lease expiry, and physical address.',
        'A browser search for your public IP reveals what external systems see, which may differ from your internal private address.',
        'Seeing both values at once is one of the easiest ways to understand NAT in practice.',
        'The demo also reinforces that one system can have multiple adapters and can report separate details for each.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: a local adapter view and a public IP check can describe the same machine from two different angles.',
          code:
            'Local adapter\nIPv4 Address: 192.168.2.133\nSubnet Mask:  255.255.255.0\n\nPublic IP check\nPublic IPv4:   different outward-facing address',
        },
        'Example: if a laptop is connected by both `Ethernet` and `Wi-Fi`, the command can show multiple interface entries.',
      ],
      misconceptions: [
        '"The address in a browser and the address in adapter settings should always match." They often do not because one is public and the other is local.',
        '"`ipconfig /all` is only for network specialists." It is one of the most basic and useful support commands.',
      ],
      recap: [
        'Check the local adapter first, then compare it with public IP behavior if needed.',
        'A command-line check often reveals more useful detail than a visual network icon.',
        'The point is not just to memorize commands, but to learn what each field means.',
      ],
      connections: [
        {
          label: 'Configuration services and supporting concepts',
          href: '#dhcp-dns-and-supporting-services',
          note: 'The address fields only make sense once you understand who supplied them and how they are used.',
        },
      ],
    },
    {
      id: 'dhcp-dns-and-supporting-services',
      title: 'DHCP, DNS, MAC Addresses, APIPA, and the Gateway',
      strapline: 'An address alone is not enough; a working client also needs supporting services.',
      overview:
        'IP addressing becomes fully practical once you understand who assigns the address, how names are resolved, what hardware identity still exists underneath, and what happens when automatic configuration fails.',
      whyItMatters:
        'A device can have a valid-looking IP and still be useless without DNS or a usable gateway. Likewise, DHCP failures, expired leases, and fallback addresses are some of the most common root causes behind access problems.',
      howItWorks: [
        'DHCP assigns addresses dynamically by lease rather than by permanent ownership. Lease duration can be tuned depending on how often devices come and go.',
        'Static addressing is manual and predictable, while dynamic addressing is easier to manage at scale for most client devices.',
        'A MAC address is the hardware-level identifier of the network interface and does not play the same role as the logical IP address.',
        'If DHCP is unavailable, a host may self-assign a link-local or APIPA-style address. In IPv4 this commonly appears in the 169.254.0.0/16 range and usually indicates limited local-only usefulness.',
        'DNS translates names into IP addresses so users do not need to memorize numeric endpoints.',
        'The gateway is the boundary device that forwards traffic out of the local network, usually the router in a home setup.',
      ],
      examples: [
        'Example: a coffee shop may use shorter DHCP lease times because many devices connect briefly and then leave.',
        'Example: a home network may use longer leases because the same devices return repeatedly.',
        'Example: if a client receives a `169.254.x.x` address, that often points to a DHCP problem rather than normal internet access.',
      ],
      misconceptions: [
        '"If I have an IP, everything else should work." A device can still fail if DNS or the gateway is wrong.',
        '"MAC addresses replace IP addresses." They do not; they operate at a different level and solve a different problem.',
        '"APIPA is a normal sign of successful configuration." It is usually a fallback indicator that automatic configuration failed.',
      ],
      recap: [
        'DHCP supplies the settings, DNS resolves names, and the gateway reaches outside networks.',
        'MAC addresses stay with the interface while IP addresses can be reassigned.',
        'Fallback link-local addressing is useful as a clue, not a sign that everything is healthy.',
      ],
      referenceItems: [
        { label: 'Windows check', value: 'ipconfig /all', detail: 'Quick view of adapter addressing, DNS, DHCP, and lease information.' },
        { label: 'APIPA range', value: '169.254.0.0/16', detail: 'Classic IPv4 fallback space when DHCP is unavailable.' },
        { label: 'Lease concept', value: 'Dynamic reservation window', detail: 'Addresses are borrowed for a time period rather than owned forever.' },
      ],
      connections: [
        {
          label: 'Return to the broader foundations topic',
          href: '/topics/why-networking-is-important#addressing-and-configuration',
          note: 'Revisit the bigger networking page if you want to connect addressing to hardware, wireless, and troubleshooting.',
        },
        {
          label: 'Dedicated DNS and DHCP lesson',
          href: '/topics/dns-and-dhcp',
          note: 'Use the focused page if you want more depth on leases, APIPA, DNS resolution, and default-gateway troubleshooting.',
        },
        {
          label: 'Revision page',
          href: '/revision',
          note: 'Use the revision pack to rehearse what each field in a client configuration actually means.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'internet-protocol',
      term: 'Internet Protocol',
      definition:
        'The core addressing and message-delivery rule set used when devices exchange data across networks.',
      importance:
        'It is the framework that makes logical addressing and packet delivery possible.',
      sectionId: 'what-ip-addressing-solves',
    },
    {
      id: 'octet',
      term: 'Octet',
      definition:
        'An 8-bit section of an IPv4 address.',
      importance:
        'It explains why IPv4 is shown as four numeric chunks and why each chunk stays in the 0 to 255 range.',
      sectionId: 'ipv4-structure',
    },
    {
      id: 'classful-addressing',
      term: 'Classful Addressing',
      definition:
        'The older A, B, and C class model used to describe IPv4 network sizes and default mask behavior.',
      importance:
        'It still appears in foundational study material even though modern subnetting is more flexible.',
      sectionId: 'ipv4-structure',
    },
    {
      id: 'rfc-1918',
      term: 'RFC 1918',
      definition:
        'The standard that defines the private IPv4 address ranges used internally on networks.',
      importance:
        'It is the basis for common home and business private addressing.',
      sectionId: 'public-private-and-nat',
    },
    {
      id: 'public-ip-address',
      term: 'Public IP Address',
      definition:
        'An internet-routable address that external systems can see and communicate with.',
      importance:
        'It contrasts directly with private addressing and makes NAT easier to understand.',
      sectionId: 'public-private-and-nat',
    },
    {
      id: 'link-local-address',
      term: 'Link-local Address',
      definition:
        'A locally scoped fallback address used when automatic configuration is unavailable or limited to the local link.',
      importance:
        'It is a common diagnostic clue that a client did not receive normal network configuration.',
      sectionId: 'dhcp-dns-and-supporting-services',
    },
    {
      id: 'oui',
      term: 'Organizationally Unique Identifier',
      definition:
        'The vendor-identifying portion of a MAC address.',
      importance:
        'It helps tie a physical interface back to its manufacturer.',
      sectionId: 'dhcp-dns-and-supporting-services',
    },
    {
      id: 'fqdn',
      term: 'Fully Qualified Domain Name',
      definition:
        'A complete domain name that identifies a specific host or service within DNS.',
      importance:
        'It is what DNS resolves into an IP address when you access a named resource.',
      sectionId: 'dhcp-dns-and-supporting-services',
    },
    {
      id: 'lease-time',
      term: 'Lease Time',
      definition:
        'The amount of time a DHCP-issued address is reserved for a client before renewal or reuse.',
      importance:
        'It affects address availability and device turnover on busy networks.',
      sectionId: 'dhcp-dns-and-supporting-services',
    },
  ],
  revision: {
    summary:
      'This topic works best if you remember it as a chain: an IP identifies the device logically, the subnet mask explains locality, NAT separates internal and public visibility, IPv6 extends the address future, and DHCP/DNS/gateway fields make the address usable in practice.',
    memoryFramework: [
      'Start with the identity: what IP address has the client been given?',
      'Read the shape: IPv4 means 32 bits in four octets; IPv6 means 128 bits in hexadecimal blocks.',
      'Read the boundary: the subnet mask tells you what is local and what is remote.',
      'Read the exposure: private addresses stay inside, public addresses face outward through NAT.',
      'Read the support fields: DHCP gave it, DNS resolves names, the gateway forwards beyond the subnet.',
      'Read the warning signs: APIPA or missing lease information usually means automatic configuration failed.',
    ],
    checklist: [
      'I can explain why an IP address is logical and a MAC address is hardware-based.',
      'I can explain why an IPv4 octet cannot exceed 255.',
      'I can use a subnet mask at a basic level to describe network and host portions.',
      'I can identify the major private IPv4 ranges and explain why NAT is needed.',
      'I can explain why IPv6 was introduced and how its notation differs from IPv4.',
      'I can interpret `ipconfig /all` fields such as DNS server, DHCP server, physical address, and lease time.',
      'I can explain what APIPA or a link-local style address usually signals.',
      'I can explain what the default gateway contributes to internet access.',
    ],
    questions: [
      'Why is it not enough to know an IPv4 address without also knowing the subnet mask?',
      'What practical problem does NAT solve for a home network?',
      'Why can a browser show a different IP from the address seen in adapter settings?',
      'Why is DHCP lease length a design choice rather than a fixed universal value?',
      'What is the difference between a MAC address and an IP address during troubleshooting?',
      'Why does IPv6 use hexadecimal notation instead of IPv4-style dotted decimal?',
      'What does a 169.254.x.x address suggest about the state of a client?',
      'Why does a client still need DNS and a gateway even after receiving an IP address?',
    ],
    pitfalls: [
      'Treating the subnet mask as secondary detail instead of part of the address context.',
      'Confusing local private identity with public internet identity.',
      'Assuming a client with any address at all must therefore be healthy.',
      'Memorizing DHCP and DNS names without understanding what fields they actually supply or translate.',
      'Thinking IPv6 matters only after IPv4 disappears, rather than understanding that both often coexist.',
    ],
  },
  relatedTopicSlugs: [
    'why-networking-is-important',
    'ipv4-addresses',
    'ipv6-addresses',
    'dns-and-dhcp',
  ],
};
