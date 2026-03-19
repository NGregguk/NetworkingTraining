import type { StudyTopic } from '../schema';

export const ipv4AddressesTopic: StudyTopic = {
  slug: 'ipv4-addresses',
  title: 'IPv4 Addresses',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '30 minutes',
  sourceFile: 'context files/IPv4 Addresses.pdf',
  updatedOn: 'March 18, 2026',
  summary:
    'Learn how IPv4 addresses are built, how subnet masks split network and host portions, why address classes still matter in basic study, and how private addressing with NAT keeps modern networks working.',
  heroNote:
    'Use this page when you want to move past "an IP is just a number" and actually read what an IPv4 address is telling you.',
  tags: ['IPv4', 'subnet mask', 'NAT', 'private addressing', 'address classes'],
  learningObjectives: [
    'Explain why IPv4 remains important even though public address space is limited.',
    'Break an IPv4 address into four octets and explain why no octet can exceed 255.',
    'Use a subnet mask at a basic level to distinguish the network portion from the host portion.',
    'Explain the legacy class A, B, and C model as a study aid for network size and default mask behaviour.',
    'Differentiate private and public IPv4 addressing and explain why NAT is needed.',
    'Read a practical IPv4 example from a client device and connect it to real troubleshooting.',
  ],
  sections: [
    {
      id: 'why-ipv4-still-matters',
      title: 'Why IPv4 Still Matters',
      strapline: 'IPv4 is old, but it still sits underneath a huge amount of real networking.',
      overview:
        'IPv4 has existed since 1981 and is still deeply embedded in home, business, and internet-connected environments. Even though the public address pool is exhausted, IPv4 remains essential because many networks still rely on it every day.',
      whyItMatters:
        'A student can easily hear that IPv6 is the future and assume IPv4 is no longer worth learning. That would be a mistake. Entry-level troubleshooting, router configuration, and device support still depend heavily on understanding IPv4.',
      howItWorks: [
        'IPv4 is a 32-bit addressing system maintained within the global internet numbering structure.',
        'Those 32 bits create about 4.2 billion address possibilities, which once seemed enormous.',
        'As internet-connected devices multiplied, the public IPv4 space became exhausted.',
        'Even with that exhaustion, IPv4 remains widely used because existing networks, applications, and providers still depend on it.',
      ],
      examples: [
        'A home router, a printer, a laptop, and a phone may all still use IPv4 internally even when the user never thinks about it.',
        'An IT support issue on a small office network often starts with reading the client IPv4 address and subnet mask before anything more advanced is checked.',
      ],
      misconceptions: [
        '"IPv4 is obsolete because IPv6 exists." IPv6 is important, but IPv4 is still active across many real networks.',
        '"Address exhaustion means IPv4 stopped working." It means public addresses became scarce, not that IPv4 disappeared.',
      ],
      recap: [
        'IPv4 is old but still operationally important.',
        'Its public space is limited, yet it remains central to day-to-day support work.',
        'You need IPv4 fluency before many routing and troubleshooting tasks feel natural.',
      ],
      referenceItems: [
        {
          label: 'Release era',
          value: '1981',
          detail: 'IPv4 has been part of networking for decades.',
        },
        {
          label: 'Address size',
          value: '32 bits',
          detail: 'This is the full length of every IPv4 address.',
        },
        {
          label: 'Address count',
          value: 'About 4.2 billion',
          detail: 'Large at the time, but not enough for modern global growth.',
        },
      ],
      connections: [
        {
          label: 'Introduction to IP addressing',
          href: '/topics/intro-to-ip-addressing#what-ip-addressing-solves',
          note: 'Go back if you want the wider role of addressing before narrowing in on IPv4.',
        },
        {
          label: 'Dedicated IPv6 lesson',
          href: '/topics/ipv6-addresses',
          note: 'Compare IPv4 limits with the larger address model and notation used by IPv6.',
        },
      ],
    },
    {
      id: 'reading-the-address',
      title: 'Reading the 32-Bit Address',
      strapline: 'Dotted decimal is only the human-friendly view of a binary address.',
      overview:
        'An IPv4 address is written as four decimal numbers separated by periods, but that format exists for readability. Underneath, the address is still binary, and each of the four decimal sections represents one 8-bit octet.',
      whyItMatters:
        'If you understand the shape of the address, you stop treating it like a random label. That makes subnetting, address planning, and misconfiguration detection much easier.',
      howItWorks: [
        'IPv4 always contains four numbers separated by periods.',
        'Each number represents 8 bits, also called one octet.',
        'Four octets multiplied by 8 bits each gives the full 32-bit address length.',
        'Because 8 bits can only represent decimal values from 0 to 255, no IPv4 octet can be greater than 255.',
        'The visible periods do not carry meaning for the computer; they are only a way to present the binary value in a format humans can read quickly.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this is one IPv4 address shown as four decimal octets.',
          code: '192.168.123.132',
        },
        {
          type: 'code',
          intro: 'Example: any octet above `255` makes the address invalid.',
          code: 'Valid:   192.168.123.132\nInvalid: 192.168.300.10',
        },
      ],
      misconceptions: [
        '"The address is made of four separate small addresses." It is one address, just displayed in four octets.',
        '"The dots are part of the network logic." They are formatting for people, not how the host fundamentally stores the value.',
        '"Any four numbers separated by periods must be valid IPv4." Each octet still has to stay in the 0 to 255 range.',
      ],
      recap: [
        'IPv4 uses four octets.',
        'Each octet is 8 bits.',
        'The decimal format helps humans, but the underlying value is binary.',
      ],
      referenceItems: [
        {
          label: 'Octet size',
          value: '8 bits',
          detail: 'One byte per section.',
        },
        {
          label: 'Max octet',
          value: '255',
          detail: 'The highest decimal value that 8 bits can represent.',
        },
        {
          label: 'Display format',
          value: 'Dotted decimal',
          detail: 'Four decimal octets separated by periods.',
        },
      ],
      connections: [
        {
          label: 'Subnet mask interpretation',
          href: '#subnet-masks-network-id-and-host-id',
          note: 'Once you can read the shape, the next step is deciding which part identifies the network.',
        },
      ],
    },
    {
      id: 'subnet-masks-network-id-and-host-id',
      title: 'Subnet Masks, Network ID, and Host ID',
      strapline: 'An IPv4 address only becomes meaningful when you pair it with the subnet mask.',
      overview:
        'A subnet mask tells a device which bits in the IPv4 address belong to the network portion and which bits identify the host. Without the mask, you cannot reliably say which part is local structure and which part is the individual endpoint.',
      whyItMatters:
        'This is the turning point between memorising addresses and actually understanding them. The mask determines whether another destination is on the same subnet or whether traffic must be sent to a router or gateway.',
      howItWorks: [
        'A subnet mask is also a 32-bit value.',
        'The mask is lined up against the IPv4 address to identify which bits belong to the network portion.',
        'Bits set to 1 in the mask mark the network portion.',
        'Bits left as 0 mark the host portion.',
        'In the example 192.168.123.132 with a mask of 255.255.255.0, the first 24 bits identify the network and the remaining 8 bits identify the host.',
        'That is why the same visible address can mean something different if the mask changes.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this address and subnet mask produce the following split.',
          code:
            'IP Address:  192.168.123.132\nSubnet Mask: 255.255.255.0\nNetwork ID:  192.168.123\nHost ID:     132',
        },
        'Example: a support engineer reading an address without the subnet mask has only part of the story and may draw the wrong conclusion about whether a destination is local.',
      ],
      misconceptions: [
        '"The last octet is always the host." That is only true when the subnet mask makes the split happen there.',
        '"A subnet mask is extra detail you can ignore." It is part of the essential context needed to interpret the address correctly.',
        '"The network ID is just whatever looks grouped together." The mask, not visual habit, defines the split.',
      ],
      recap: [
        'The subnet mask separates network bits from host bits.',
        'An IPv4 address cannot be interpreted fully on its own.',
        'Understanding the mask is the basis for routing decisions and troubleshooting.',
      ],
      referenceItems: [
        {
          label: 'Example IP',
          value: '192.168.123.132',
          detail: 'Used here to show how the split is interpreted.',
        },
        {
          label: 'Example mask',
          value: '255.255.255.0',
          detail: 'A 24-bit network portion and 8-bit host portion.',
        },
        {
          label: 'Key rule',
          value: '1s = network, 0s = host',
          detail: 'This is the simple study rule behind the mask.',
        },
      ],
      interactive: {
        type: 'ipv4-lab',
        title: 'Try splitting an IPv4 address yourself',
        intro:
          'Enter an IPv4 address and mask to see the network address, host value, usable range, and the exact bit split.',
        defaultAddress: '192.168.123.132',
        defaultMask: '255.255.255.0',
      },
      connections: [
        {
          label: 'Broader IP addressing lesson',
          href: '/topics/intro-to-ip-addressing#ipv4-structure',
          note: 'Use the wider addressing page if you want IPv4, IPv6, DHCP, DNS, and NAT explained together.',
        },
        {
          label: 'Dedicated subnetting and CIDR lesson',
          href: '/topics/subnetting-and-cidr-in-practice',
          note: 'Open the focused subnetting page if you want masks, prefixes, usable ranges, and subnet splitting covered in more depth.',
        },
      ],
    },
    {
      id: 'address-classes-and-scale',
      title: 'Address Classes and Network Scale',
      strapline: 'Classful addressing is older, but it is still useful as a learning shortcut.',
      overview:
        'IPv4 addresses were historically grouped into classes A through E, with A, B, and C being the ones most relevant in common study contexts. Modern networks use more flexible approaches, but the class model still helps learners visualize how address space can be divided between networks and hosts.',
      whyItMatters:
        'Classful addressing is not the full modern story, but it gives you a fast mental model for why some address patterns support many hosts and others support far fewer.',
      howItWorks: [
        'The first octet gives a quick clue about the address class.',
        'If the first octet is between 1 and 126, it is treated as class A in the traditional model.',
        'If the first octet is between 128 and 191, it is treated as class B.',
        'If the first octet is between 192 and 223, it is treated as class C.',
        'Class A uses only the first 8 bits for the network portion in the traditional default view, leaving a very large host space.',
        'Class C uses much more of the address for the network, leaving room for far fewer hosts, commonly remembered as 254 usable hosts in the default classful pattern.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: the first octet gives a quick traditional class clue.',
          code:
            '10.x.x.x  -> Class A\n172.x.x.x -> Class B\n192.x.x.x -> Class C',
        },
        'Example: these classes are a study shortcut for understanding default network size, not the full modern subnetting picture.',
      ],
      misconceptions: [
        '"Classes are how every modern network is always designed." They are a learning aid and historical model, not the whole modern picture.',
        '"If I know the class, I know everything about the subnet." The actual subnet mask still matters.',
        '"Class C means tiny and unimportant." It simply means less host space in the old default model.',
      ],
      recap: [
        'Class A, B, and C help you reason about network scale.',
        'The first octet is the quickest traditional clue to the class.',
        'Use classes as a study support, but do not confuse them with all modern subnetting practice.',
      ],
      referenceItems: [
        {
          label: 'Class A',
          value: '1-126',
          detail: 'Traditional first-octet range.',
        },
        {
          label: 'Class B',
          value: '128-191',
          detail: 'Traditional first-octet range.',
        },
        {
          label: 'Class C',
          value: '192-223',
          detail: 'Traditional first-octet range.',
        },
      ],
      connections: [
        {
          label: 'Private address ranges',
          href: '#private-addressing-and-nat',
          note: 'After learning the broad class idea, connect it to the private ranges you see most often in real environments.',
        },
      ],
    },
    {
      id: 'private-addressing-and-nat',
      title: 'Private Addressing and NAT',
      strapline: 'IPv4 scarcity is why internal addresses and translation matter so much.',
      overview:
        'Because public IPv4 addresses are limited, networks commonly use private address ranges internally and rely on routers to translate that traffic to public addresses when it leaves the network. This is one of the most important practical ideas in everyday networking.',
      whyItMatters:
        'Without this concept, users often become confused about why a device has one address locally but appears under a different address to external websites or services. It is also the reason a whole home or office can function with only one public IPv4 address.',
      howItWorks: [
        'RFC 1918 defines private IPv4 ranges for internal use.',
        'Private addresses are not routed directly over the public internet.',
        'Common private ranges start with 10, 172.16 through 172.31, or 192.168.',
        'Routers perform Network Address Translation to remap private internal addresses to a public address when traffic leaves the local network.',
        'This allows many internal devices to communicate outward while sharing one public-facing IPv4 identity.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: two internal devices can keep different private addresses while sharing one outward-facing public identity through NAT.',
          code:
            'Phone:  192.168.1.10\nLaptop: 192.168.1.11\nPublic side: one shared public IPv4 address',
        },
        'Example: a device with a `192.168.x.x` or `10.x.x.x` address is using private space internally rather than a directly internet-routable public address.',
      ],
      misconceptions: [
        '"If two devices show the same public IP, they must be the same on the network." NAT is allowing distinct private clients to share one public-facing address.',
        '"Private addresses are second-rate or broken." They are intentionally designed for internal use.',
        '"The router only passes traffic through unchanged." In many home and small business setups, it is actively translating private traffic to public traffic.',
      ],
      recap: [
        'Private ranges conserve public IPv4 space.',
        'NAT is what lets many devices share one public address.',
        'Understanding local versus public identity is essential for troubleshooting internet access.',
      ],
      referenceItems: [
        {
          label: 'Private range',
          value: '10.0.0.0/8',
          detail: 'A very large private block.',
        },
        {
          label: 'Private range',
          value: '172.16.0.0/12',
          detail: 'Covers 172.16 through 172.31.',
        },
        {
          label: 'Private range',
          value: '192.168.0.0/16',
          detail: 'The most familiar home-network private block.',
        },
      ],
      connections: [
        {
          label: 'Public versus private in the wider IP lesson',
          href: '/topics/intro-to-ip-addressing#public-private-and-nat',
          note: 'Compare this focused IPv4 treatment with the wider addressing page.',
        },
      ],
    },
    {
      id: 'reading-ipv4-on-a-real-device',
      title: 'Reading IPv4 on a Real Device',
      strapline: 'The theory is much easier to remember once you inspect a live client configuration.',
      overview:
        'A practical IPv4 lesson should end with reading a real machine. Looking at adapter information and comparing it with the public-facing address makes subnet masks, private addressing, and NAT feel concrete instead of abstract.',
      whyItMatters:
        'Troubleshooting starts by checking what the client actually has, not what you assume it has. This is where addressing knowledge becomes operational instead of purely academic.',
      howItWorks: [
        'On Windows, `ipconfig /all` shows the IPv4 address, subnet mask, gateway, DNS server, DHCP information, and other adapter details.',
        'The IPv4 address shown on the adapter is usually the local address the device is currently using inside the network.',
        'A browser-based public IP check shows the outward-facing public address seen by internet services.',
        'If the local adapter address and the public address differ, that is often normal and reflects NAT behaviour rather than an error.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: a local adapter view and a public IP check can both be correct at the same time.',
          code:
            'Local adapter\nIPv4 Address: 192.168.2.133\nSubnet Mask:  255.255.255.0\n\nPublic IP check\nPublic IPv4:   203.0.113.25',
        },
        'Example: checking two devices on the same Wi-Fi often reveals different private IPv4 addresses internally but the same public IPv4 address externally.',
      ],
      misconceptions: [
        '"The adapter address and public address should always match." They often should not, especially behind a home router.',
        '"Reading `ipconfig /all` is only useful for experts." It is one of the most practical starting points for basic support work.',
        '"If a user knows their public IP, they already know their client configuration." Public visibility and local configuration are different layers of information.',
      ],
      recap: [
        'Read the local IPv4 address and subnet mask first.',
        'Compare with the public address only when you need to understand outside visibility.',
        'Seeing both views together makes NAT and subnetting easier to remember.',
      ],
      connections: [
        {
          label: 'Revision pack',
          href: '/revision',
          note: 'Use the revision page after reading this section to test whether you can explain the full chain from local address to public visibility.',
        },
        {
          label: 'Return to foundations',
          href: '/topics/why-networking-is-important#addressing-and-configuration',
          note: 'Reconnect this IPv4 lesson to the wider networking picture when you are done.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'dotted-decimal-notation',
      term: 'Dotted Decimal Notation',
      definition:
        'The human-readable way of writing an IPv4 address as four decimal octets separated by periods.',
      importance:
        'It explains why IPv4 addresses look readable even though the system underneath is binary.',
      sectionId: 'reading-the-address',
    },
    {
      id: 'network-id',
      term: 'Network ID',
      definition:
        'The portion of an IP address that identifies the network or subnet a device belongs to.',
      importance:
        'It is what helps determine whether traffic is local or must be sent toward a router.',
      sectionId: 'subnet-masks-network-id-and-host-id',
    },
    {
      id: 'host-id',
      term: 'Host ID',
      definition:
        'The portion of an IP address that identifies the individual device within a network or subnet.',
      importance:
        'It distinguishes one endpoint from another inside the same network portion.',
      sectionId: 'subnet-masks-network-id-and-host-id',
    },
    {
      id: 'subnet',
      term: 'Subnet',
      definition:
        'A subnetwork identified by the network portion of an IP address and its subnet mask.',
      importance:
        'It is the boundary a device uses when deciding whether a destination is local or remote.',
      sectionId: 'subnet-masks-network-id-and-host-id',
    },
    {
      id: 'internet-assigned-numbers-authority',
      term: 'Internet Assigned Numbers Authority',
      definition:
        'The organisation responsible for coordinating important internet numbering resources, including address-space administration.',
      importance:
        'It helps place IPv4 addressing in the wider structure of global internet coordination.',
      sectionId: 'why-ipv4-still-matters',
    },
    {
      id: 'class-a-address',
      term: 'Class A Address',
      definition:
        'A traditional IPv4 class identified by a first octet between 1 and 126.',
      importance:
        'It is part of the historical class model used to study large host capacity.',
      sectionId: 'address-classes-and-scale',
    },
    {
      id: 'class-b-address',
      term: 'Class B Address',
      definition:
        'A traditional IPv4 class identified by a first octet between 128 and 191.',
      importance:
        'It helps learners understand medium-scale network sizing in the classful model.',
      sectionId: 'address-classes-and-scale',
    },
    {
      id: 'class-c-address',
      term: 'Class C Address',
      definition:
        'A traditional IPv4 class identified by a first octet between 192 and 223.',
      importance:
        'It is the class most closely associated with smaller default host counts in the classful model.',
      sectionId: 'address-classes-and-scale',
    },
  ],
  revision: {
    summary:
      'Remember IPv4 as a chain of interpretation: the address has four octets, the subnet mask tells you where the network ends, classes provide an old but useful scale model, and private ranges with NAT explain how modern local networks still function despite public IPv4 scarcity.',
    memoryFramework: [
      'Start with the size: IPv4 means 32 bits split into four octets.',
      'Read each octet: every section stays between 0 and 255 because it is only 8 bits.',
      'Read the mask next: the subnet mask tells you which part is network and which part is host.',
      'Use classes as a study shortcut: A is large, B is medium, C is smaller in the old default model.',
      'Check visibility: private ranges stay internal, while NAT presents a public address outward.',
      'Validate on a device: compare `ipconfig /all` with a public IP check to see the model in action.',
    ],
    checklist: [
      'I can explain why no IPv4 octet can be greater than 255.',
      'I can describe an IPv4 address as four 8-bit octets.',
      'I can explain why the subnet mask is needed to interpret network and host portions.',
      'I can identify the traditional first-octet ranges for class A, B, and C.',
      'I can recognise the major private IPv4 ranges.',
      'I can explain why a router uses NAT in a home or small business network.',
      'I can explain why a local IPv4 address and a public IP address are often different.',
    ],
    questions: [
      'Why is an IPv4 address incomplete information without the subnet mask?',
      'Why can no IPv4 octet exceed 255?',
      'How does the subnet mask tell you what part of the address is network versus host?',
      'Why are class A, B, and C still worth learning even though networking moved beyond strict classful design?',
      'Why can many devices on one Wi-Fi network appear under one public IPv4 address?',
      'What does it mean if a device has a private IPv4 address locally but a different public address on the internet?',
    ],
    pitfalls: [
      'Treating the dotted decimal format as if it were the real underlying logic rather than a readable display format.',
      'Assuming the last octet is always the host portion without checking the subnet mask.',
      'Using address classes as if they fully describe all modern subnetting practice.',
      'Confusing a local private address with the public identity seen by internet services.',
      'Memorising private ranges without understanding why NAT is needed alongside them.',
    ],
  },
  relatedTopicSlugs: ['intro-to-ip-addressing', 'ipv6-addresses', 'why-networking-is-important'],
};
