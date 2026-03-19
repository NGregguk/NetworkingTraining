import type { StudyTopic } from '../schema';

export const subnettingAndCidrTopic: StudyTopic = {
  slug: 'subnetting-and-cidr-in-practice',
  title: 'Subnetting and CIDR in Practice',
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
    'Learn how CIDR prefixes map to subnet masks, how to find network and broadcast addresses, and how to split one IPv4 network into smaller practical subnets.',
  heroNote:
    'Use this page when subnet masks feel abstract and you want a practical way to read prefixes, calculate usable ranges, and divide a network without panic.',
  tags: ['subnetting', 'CIDR', 'prefix length', 'broadcast address', 'usable hosts'],
  learningObjectives: [
    'Explain why subnetting exists and why one large flat network is often the wrong design choice.',
    'Translate common CIDR prefixes such as /24, /25, /26, and /27 into their subnet-mask meaning.',
    'Calculate the network address, broadcast address, and usable host range for a subnet.',
    'Split one larger subnet into several smaller ones for different device groups or sites.',
    'Use quick host-count patterns to estimate whether a prefix is large enough for a requirement.',
    'Connect subnetting decisions to routing, VLAN design, and everyday troubleshooting.',
  ],
  sections: [
    {
      id: 'why-subnetting-exists',
      title: 'Subnetting Exists to Keep Networks Manageable',
      strapline:
        'Addressing becomes more useful once you stop treating one whole site as one giant pool.',
      overview:
        'Subnetting divides a larger IP space into smaller logical networks. That makes addressing easier to manage, limits unnecessary broadcast scope, and gives you a cleaner way to separate users, devices, and services.',
      whyItMatters:
        'If every device sits in one large flat subnet, growth quickly becomes messy. Subnetting creates clearer boundaries for routing, policy, troubleshooting, and future expansion. It is one of the simplest ways to turn raw address space into an actual design.',
      howItWorks: [
        'A subnet is created by deciding how many bits belong to the network portion and how many remain for hosts.',
        'Using more network bits creates more individual subnets, but each one has room for fewer hosts.',
        'Using fewer network bits creates fewer, larger subnets with more host capacity inside each one.',
        'This tradeoff is why subnetting always comes down to two questions: how many separate networks do you need, and how many hosts must each one support?',
        'In practice, subnetting supports real design choices such as separating staff, guests, IoT devices, servers, branches, or lab environments.',
      ],
      examples: [
        'A business may put office PCs in one subnet, guest Wi-Fi in another, and cameras or IoT devices in a third.',
        'A home lab may split servers, client devices, and test systems so the traffic stays easier to understand and secure.',
        'A branch office design may use one subnet per floor or one subnet per role rather than one giant shared address block.',
      ],
      misconceptions: [
        '"Subnetting is only for large enterprises." Even small environments benefit from cleaner separation and growth planning.',
        '"Subnetting is mainly an exam trick." It directly affects routing, DHCP scopes, firewall rules, and troubleshooting.',
        '"One large subnet is simpler, so it is always better." It may feel simpler at first, but it often becomes harder to manage as the network grows.',
      ],
      recap: [
        'Subnetting turns one address block into smaller, more useful network boundaries.',
        'It is about manageability, separation, and growth as much as it is about arithmetic.',
        'The design question is always a balance between number of subnets and hosts per subnet.',
      ],
      connections: [
        {
          label: 'IPv4 addresses lesson',
          href: '/topics/ipv4-addresses#subnet-masks-network-id-and-host-id',
          note: 'Return to the dedicated IPv4 page if you want to reconnect subnetting to masks, private ranges, and the underlying address structure.',
        },
      ],
    },
    {
      id: 'cidr-prefixes-and-masks-describe-the-same-boundary',
      title: 'CIDR Prefixes and Masks Describe the Same Boundary',
      strapline:
        'The slash notation is just a shorter way to say how many bits belong to the network.',
      overview:
        'CIDR, or Classless Inter-Domain Routing, expresses the network boundary as a prefix length such as /24 or /26. That prefix length tells you how many leading bits in the address belong to the network portion, which is the same information a subnet mask is giving you.',
      whyItMatters:
        'You need to be comfortable moving between slash notation and dotted-decimal masks because both appear constantly in networking tools, router interfaces, and study material. Once the equivalence is clear, subnetting becomes much easier to reason about.',
      howItWorks: [
        'A prefix such as /24 means the first 24 bits belong to the network portion and the remaining 8 bits are available for hosts.',
        'That is why /24 corresponds to the dotted-decimal mask 255.255.255.0.',
        'Each time the prefix grows, more bits shift from host space into network space.',
        'Common patterns become easier if you memorise the block progression in the final octet: 128, 192, 224, 240, 248, 252, 254.',
        'Those values correspond to increasingly longer prefixes such as /25, /26, /27, /28, /29, /30, and /31.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: the most common small-network prefixes map like this.',
          code:
            '/24 -> 255.255.255.0\n/25 -> 255.255.255.128\n/26 -> 255.255.255.192\n/27 -> 255.255.255.224\n/28 -> 255.255.255.240\n/29 -> 255.255.255.248\n/30 -> 255.255.255.252',
        },
        'A /24 keeps the last octet for hosts, while a /26 uses two extra bits for subnetting and leaves only 6 host bits.',
        'When a router interface shows `192.168.10.0/26`, it is describing the same boundary you would otherwise write as `255.255.255.192`.',
      ],
      misconceptions: [
        '"CIDR and subnet masks are different systems." They are different notations for the same boundary idea.',
        '"The slash number tells you the host count directly." It tells you the number of network bits first; host capacity is derived from what remains.',
        '"You need to convert every mask from scratch every time." A handful of common prefixes can be learned as quick patterns.',
      ],
      recap: [
        'CIDR prefix length and subnet mask are two views of the same network boundary.',
        'The prefix tells you how many bits are reserved for the network.',
        'Learning the common /24 to /30 patterns removes a lot of subnetting friction.',
      ],
      referenceItems: [
        {
          label: 'CIDR',
          value: 'Classless Inter-Domain Routing',
          detail: 'The slash notation used to show how many bits belong to the network portion.',
        },
        {
          label: '/24',
          value: '255.255.255.0',
          detail: 'A very common small-network prefix with 8 host bits.',
        },
        {
          label: '/26',
          value: '255.255.255.192',
          detail: 'A common way to split a /24 into four smaller subnets.',
        },
      ],
      connections: [
        {
          label: 'Routing basics',
          href: '/topics/routing-basics',
          note: 'Routing decisions depend on the same prefix boundaries you are learning here, so the routing page is the natural next step.',
        },
      ],
    },
    {
      id: 'find-network-broadcast-and-usable-range',
      title: 'Find the Network, Broadcast, and Usable Host Range',
      strapline:
        'The most practical subnetting skill is working out what addresses the subnet really contains.',
      overview:
        'Once you know the prefix, you can determine the network address, the broadcast address, and the usable host range between them. This is what lets you tell whether a host configuration is sensible and whether two devices actually belong to the same subnet.',
      whyItMatters:
        'This is the part of subnetting that shows up directly in design and troubleshooting. If you cannot identify the usable range, you cannot place static addresses safely, validate DHCP scopes, or explain why a device is off-subnet.',
      howItWorks: [
        'The network address is the first address in the subnet and identifies the subnet itself.',
        'The broadcast address is the last address in the subnet and represents all hosts on that subnet in traditional IPv4 broadcast behaviour.',
        'Usable host addresses sit between the network and broadcast addresses.',
        'A simple way to work quickly is to look at the block size in the changing octet. For a /26, the block size is 64, so the subnet boundaries start at 0, 64, 128, and 192.',
        'Once you find the block your address sits inside, you can read the network address at the start of the block and the broadcast address at the end of the block.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: read `192.168.10.70/26` by using a block size of 64.',
          code:
            'Subnets:     0-63, 64-127, 128-191, 192-255\nAddress:     192.168.10.70\nNetwork:     192.168.10.64\nBroadcast:   192.168.10.127\nUsable host: 192.168.10.65 - 192.168.10.126',
        },
        {
          type: 'code',
          intro:
            'Example: a /27 uses blocks of 32 in the last octet.',
          code:
            'Subnets:     0-31, 32-63, 64-95, 96-127, ...\nAddress:     192.168.20.90/27\nNetwork:     192.168.20.64\nBroadcast:   192.168.20.95\nUsable host: 192.168.20.65 - 192.168.20.94',
        },
      ],
      misconceptions: [
        '"Any address inside the visible range is safe to assign." The network and broadcast addresses are not normal host addresses.',
        '"Usable hosts are whatever remains after the prefix." You still have to exclude the network and broadcast addresses for normal IPv4 subnetting.',
        '"If two addresses start with the same first three octets, they must be on the same subnet." The prefix boundary still decides that.',
      ],
      recap: [
        'Every subnet has a network address, a broadcast address, and a usable range in between.',
        'Block size is one of the quickest ways to locate the right subnet boundary.',
        'This is the calculation that makes static addressing and DHCP planning much safer.',
      ],
      interactive: {
        type: 'ipv4-lab',
        title: 'Practise reading a subnet boundary',
        intro:
          'Enter an IPv4 address and subnet mask to inspect the network address, usable range, and where the prefix boundary sits.',
        defaultAddress: '192.168.10.70',
        defaultMask: '255.255.255.192',
      },
      connections: [
        {
          label: 'DNS and DHCP planning',
          href: '/topics/dns-and-dhcp#lease-pools-and-duration',
          note: 'DHCP pool planning becomes much easier once you can see the usable range clearly.',
        },
      ],
    },
    {
      id: 'split-one-network-into-smaller-practical-subnets',
      title: 'Split One Network Into Smaller Practical Subnets',
      strapline:
        'Subnetting becomes easier once you tie the arithmetic to a real design problem.',
      overview:
        'A larger subnet can be divided into several smaller ones when you need different groups of devices to live in different networks. This is the practical heart of subnetting: turning a broad address block into a layout that supports staff, guests, servers, labs, or branches cleanly.',
      whyItMatters:
        'This is where the idea stops being mathematical and becomes architectural. If you can split a /24 into smaller pieces deliberately, you can build cleaner VLANs, separate risk domains, and size networks without wasting huge address ranges.',
      howItWorks: [
        'To create smaller subnets, you borrow bits from the host portion and add them to the network portion.',
        'Each borrowed bit doubles the number of subnets, but halves the host space available inside each subnet.',
        'A /24 can be split into two /25s, four /26s, eight /27s, and so on.',
        'The correct choice depends on how many separate networks you need and how many hosts each one must support.',
        'The goal is not to create the maximum number of tiny subnets. The goal is to choose a prefix that fits the design cleanly.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: splitting one /24 into four /26 subnets for different roles.',
          code:
            '192.168.50.0/24 becomes:\n192.168.50.0/26     -> staff\n192.168.50.64/26    -> guest\n192.168.50.128/26   -> servers\n192.168.50.192/26   -> IoT',
        },
        'A /27 might be enough for a small lab segment, but not for an office floor with dozens of active clients.',
        'A design can be perfectly valid mathematically and still be poor operationally if the subnet is too small for real growth.',
      ],
      misconceptions: [
        '"More subnets is always better." Too many tiny subnets can become awkward if host counts were underestimated.',
        '"A subnet should be sized only for today." Good planning leaves some room for growth.',
        '"If VLANs exist, subnetting is separate from them." In practice they usually travel together because each VLAN needs its own IP subnet.',
      ],
      recap: [
        'Borrowing host bits creates more subnets, but fewer hosts per subnet.',
        'Subnetting choices should be driven by real design needs, not by arithmetic alone.',
        'The best subnet is the one that fits the role, the host count, and the expected growth.',
      ],
      connections: [
        {
          label: 'Network types and VLANs',
          href: '/topics/network-types-and-internet-connections#vlans-split-one-physical-lan-into-multiple-logical-networks',
          note: 'Subnetting and VLAN design usually work together, especially when you separate staff, guests, and IoT devices.',
        },
        {
          label: 'Planning a small network',
          href: '/topics/planning-a-basic-home-and-small-business-network#secure-and-configure-the-core-network',
          note: 'The planning page shows how those subnet decisions turn into real DHCP scopes, SSIDs, and policy boundaries.',
        },
      ],
    },
    {
      id: 'quick-cidr-patterns-help-you-work-faster',
      title: 'Quick CIDR Patterns Help You Work Faster',
      strapline:
        'The goal is not mental suffering. The goal is recognising the common subnet sizes quickly.',
      overview:
        'You do not need to rebuild every subnet from binary every time. A small set of quick patterns makes everyday subnetting much faster, especially for the common small-network prefixes.',
      whyItMatters:
        'Most practical subnetting work repeats the same handful of sizes. Once you recognise those patterns, you can spend more attention on the design and less on re-deriving the same host counts from scratch.',
      howItWorks: [
        'A /25 gives 128 addresses in the block, with 126 usable host addresses.',
        'A /26 gives 64 addresses in the block, with 62 usable host addresses.',
        'A /27 gives 32 addresses in the block, with 30 usable host addresses.',
        'A /28 gives 16 addresses in the block, with 14 usable host addresses.',
        'A /29 gives 8 addresses in the block, with 6 usable host addresses.',
        'A /30 gives 4 addresses in the block, with 2 usable host addresses, which is why it is often associated with point-to-point style thinking.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: common prefixes are easier if you remember both block size and usable hosts.',
          code:
            '/25 -> block 128 -> 126 usable hosts\n/26 -> block 64  -> 62 usable hosts\n/27 -> block 32  -> 30 usable hosts\n/28 -> block 16  -> 14 usable hosts\n/29 -> block 8   -> 6 usable hosts\n/30 -> block 4   -> 2 usable hosts',
        },
        'If you need a guest subnet for about 20 devices, a /27 is a cleaner fit than a /26 or /28.',
        'If you need roughly 50 hosts, a /26 fits better than a /27 because /27 only gives 30 usable addresses.',
      ],
      misconceptions: [
        '"Subnetting always requires long binary working." Quick patterns are often enough for the common prefixes.',
        '"A bigger subnet is always safer." Oversizing every subnet can waste space and hide poor planning.',
        '"Usable hosts are the same as block size." Normal host addressing excludes the network and broadcast addresses.',
      ],
      recap: [
        'A small set of common prefixes covers a lot of real subnetting work.',
        'Block size and usable hosts are the quickest numbers to remember.',
        'Speed improves when you recognise patterns instead of recalculating from zero each time.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the subnetting instinct',
        intro:
          'Use these questions to check whether you can move from prefix to usable range and from host requirement to sensible subnet choice.',
        questions: [
          {
            prompt:
              'What does a `/26` prefix mean at a high level?',
            options: [
              {
                label: '26 bits belong to the network portion and 6 bits remain for hosts',
                isCorrect: true,
                feedback:
                  'Correct. `/26` means 26 network bits and 6 remaining host bits in the 32-bit IPv4 address.',
              },
              {
                label: '26 usable host addresses exist in the subnet',
                isCorrect: false,
                feedback:
                  'The prefix length is not the same thing as the usable host count.',
              },
              {
                label: 'The subnet mask must end with `.26`',
                isCorrect: false,
                feedback:
                  'The slash value is the number of network bits, not a dotted-decimal mask octet.',
              },
            ],
          },
          {
            prompt:
              'If an address is `192.168.10.70/26`, which subnet does it belong to?',
            options: [
              {
                label: '192.168.10.64/26',
                isCorrect: true,
                feedback:
                  'Correct. `/26` creates blocks of 64, so 70 sits inside the 64-127 block.',
              },
              {
                label: '192.168.10.0/26',
                isCorrect: false,
                feedback:
                  'That is the first `/26` block, but 70 does not fall inside the 0-63 range.',
              },
              {
                label: '192.168.10.128/26',
                isCorrect: false,
                feedback:
                  'That block starts too high. 70 is well below 128.',
              },
            ],
          },
          {
            prompt:
              'Which prefix is the best fit for a subnet that needs about 50 usable host addresses?',
            options: [
              {
                label: '/26',
                isCorrect: true,
                feedback:
                  'Correct. `/26` gives 62 usable host addresses, which fits roughly 50 hosts cleanly.',
              },
              {
                label: '/27',
                isCorrect: false,
                feedback:
                  '`/27` only gives 30 usable host addresses, which is too small for about 50 hosts.',
              },
              {
                label: '/28',
                isCorrect: false,
                feedback:
                  '`/28` only gives 14 usable host addresses, so it is much too small.',
              },
            ],
          },
          {
            prompt:
              'Why does subnetting usually matter when you design VLANs?',
            options: [
              {
                label:
                  'Because each separate VLAN normally needs its own IP subnet and addressing plan',
                isCorrect: true,
                feedback:
                  'Correct. VLAN separation and IP subnetting usually go hand in hand in real designs.',
              },
              {
                label:
                  'Because VLANs remove the need for prefixes and masks entirely',
                isCorrect: false,
                feedback:
                  'VLANs and subnets solve related but different parts of the design. Masks and prefixes still matter.',
              },
              {
                label:
                  'Because one VLAN can only ever use one host address',
                isCorrect: false,
                feedback:
                  'That is not how VLANs or subnets work. A VLAN can contain many addresses inside its subnet.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Routing basics',
          href: '/topics/routing-basics',
          note: 'Once prefixes feel natural, routing becomes much easier because routers think in terms of networks and prefixes, not just single IPs.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'cidr',
      term: 'CIDR',
      definition:
        'Classless Inter-Domain Routing, the slash-prefix notation used to describe how many bits belong to the network portion of an address.',
      importance:
        'It is the compact notation used throughout modern routing and subnet design.',
      sectionId: 'cidr-prefixes-and-masks-describe-the-same-boundary',
    },
    {
      id: 'prefix-length',
      term: 'Prefix Length',
      definition:
        'The number after the slash in CIDR notation that tells you how many leading bits belong to the network portion.',
      importance:
        'It is the quickest way to interpret subnet size and routing boundaries.',
      sectionId: 'cidr-prefixes-and-masks-describe-the-same-boundary',
    },
    {
      id: 'network-address',
      term: 'Network Address',
      definition:
        'The first address in a subnet, used to identify the subnet itself rather than an individual host.',
      importance:
        'It is essential for reading route entries, DHCP scopes, and valid host ranges.',
      sectionId: 'find-network-broadcast-and-usable-range',
    },
    {
      id: 'broadcast-address',
      term: 'Broadcast Address',
      definition:
        'The last address in a traditional IPv4 subnet, representing all hosts on that subnet.',
      importance:
        'It explains why the highest address in the block is not normally assigned to a host.',
      sectionId: 'find-network-broadcast-and-usable-range',
    },
    {
      id: 'usable-host-range',
      term: 'Usable Host Range',
      definition:
        'The addresses inside a subnet that can normally be assigned to devices after excluding the network and broadcast addresses.',
      importance:
        'It is what you actually need for DHCP planning, static addressing, and host-capacity estimates.',
      sectionId: 'find-network-broadcast-and-usable-range',
    },
    {
      id: 'block-size',
      term: 'Block Size',
      definition:
        'The size of each repeating subnet interval in the changing octet, used to find subnet boundaries quickly.',
      importance:
        'It is one of the fastest practical shortcuts for working out which subnet an address belongs to.',
      sectionId: 'find-network-broadcast-and-usable-range',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember as a boundary problem. CIDR and subnet masks both tell you where the network ends, block size tells you where the subnet repeats, and the network address, broadcast address, and usable host range all fall out of that same boundary. Good subnetting is then just choosing the right prefix for the number of networks and hosts you actually need.',
    memoryFramework: [
      'Start with the question: how many separate networks do I need, and how many hosts fit in each one?',
      'Read the prefix: `/24`, `/25`, `/26`, and so on all describe the network boundary.',
      'Remember the common mask patterns from `/24` to `/30`.',
      'Use block size to locate the correct subnet quickly.',
      'Find the network and broadcast addresses first, then read the usable range between them.',
      'Choose the subnet size that fits the design rather than blindly choosing the largest or smallest possible block.',
    ],
    checklist: [
      'I can explain why subnetting exists beyond simple maths.',
      'I can convert common prefixes such as `/24`, `/25`, `/26`, and `/27` into subnet masks.',
      'I can explain what the network address and broadcast address are.',
      'I can work out a usable host range from an address and prefix.',
      'I can explain how borrowing host bits creates more subnets but fewer hosts per subnet.',
      'I can choose a sensible prefix for a rough host-count requirement.',
      'I can explain why subnetting and VLAN design often belong together.',
    ],
    questions: [
      'Why does a prefix length matter just as much as the visible IP address itself?',
      'Why is the block-size shortcut useful in practical subnetting?',
      'Why are the first and last addresses in a traditional IPv4 subnet usually not assigned to hosts?',
      'Why can a mathematically correct subnet still be the wrong design choice for a network?',
      'Why is a `/27` too small for about 50 hosts even though it still sounds like a large number?',
      'How does good subnetting make routing, DHCP, and firewall design easier later on?',
    ],
    pitfalls: [
      'Treating CIDR and subnet masks as if they were unrelated ideas.',
      'Forgetting to exclude the network and broadcast addresses from normal host assignment.',
      'Picking prefixes by guesswork instead of by host requirement and growth.',
      'Ignoring the connection between IP subnet boundaries and VLAN boundaries.',
      'Recalculating every common prefix from scratch instead of learning the repeated patterns.',
    ],
  },
  relatedTopicSlugs: [
    'ipv4-addresses',
    'intro-to-ip-addressing',
    'routing-basics',
  ],
};
