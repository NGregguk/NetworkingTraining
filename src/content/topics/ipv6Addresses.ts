import type { StudyTopic } from '../schema';

export const ipv6AddressesTopic: StudyTopic = {
  slug: 'ipv6-addresses',
  title: 'IPv6 Addresses',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '25 minutes',
  sourceFile: 'context files/IPv6 addresses.pdf',
  updatedOn: 'March 18, 2026',
  summary:
    'Learn why IPv6 was introduced, how 128-bit hexadecimal addresses are structured, how shortening rules work, and why IPv4 and IPv6 often coexist in real networks.',
  heroNote:
    'Use this page when you want IPv6 to feel readable instead of looking like an intimidating string of colons and hex digits.',
  tags: ['IPv6', 'hexadecimal', 'address compression', '128-bit addressing', 'coexistence'],
  learningObjectives: [
    'Explain why IPv6 was introduced and how it addresses IPv4 exhaustion.',
    'Describe an IPv6 address as a 128-bit value divided into 16-bit blocks.',
    'Explain why IPv6 uses hexadecimal notation instead of IPv4-style dotted decimal.',
    'Apply the core IPv6 shortening rules for leading zeros and one double-colon compression.',
    'Explain why IPv4 and IPv6 often coexist rather than one instantly replacing the other.',
    'Read a practical IPv6 example from a client device and connect it to real-world adoption.',
  ],
  sections: [
    {
      id: 'why-ipv6-exists',
      title: 'Why IPv6 Exists',
      strapline: 'IPv6 was created so the internet would not repeat the scaling limits of IPv4.',
      overview:
        'IPv6 was introduced because IPv4 address space became too limited for the long-term growth of internet-connected systems. Instead of making small adjustments to IPv4, networking moved to a much larger address model.',
      whyItMatters:
        'If you only memorize that IPv6 is "the newer one," you miss the actual reason it exists. IPv6 matters because address planning had to account for a world with far more devices, services, and always-connected endpoints than IPv4 originally expected.',
      howItWorks: [
        'IPv5 did exist as an experimental protocol, but it was never widely adopted.',
        'IPv6 was created to avoid the address exhaustion problems that affected IPv4.',
        'IPv4 uses 32 bits, while IPv6 uses 128 bits.',
        'That jump creates an extremely large address space, often summarized as about 340 undecillion possible addresses.',
      ],
      examples: [
        'Example: a world filled with laptops, phones, cameras, smart speakers, cars, and cloud services creates far more addressing demand than the original IPv4 model expected.',
        'Example: moving from 32 bits to 128 bits is why IPv6 is a new address system rather than a small patch to IPv4.',
      ],
      misconceptions: [
        '"IPv6 exists only because engineers wanted a newer version number." It exists because IPv4 space was too limited for long-term growth.',
        '"IPv5 failed and IPv6 is just its direct continuation." IPv5 was experimental, not a widely deployed predecessor that everything depended on.',
      ],
      recap: [
        'IPv6 was created to solve the scale problem that IPv4 could not handle forever.',
        'It moves from 32 bits to 128 bits.',
        'Its existence is about capacity, not cosmetic redesign.',
      ],
      referenceItems: [
        {
          label: 'IPv4 size',
          value: '32 bits',
          detail: 'The older address length that became constrained at internet scale.',
        },
        {
          label: 'IPv6 size',
          value: '128 bits',
          detail: 'The much larger address length used by IPv6.',
        },
        {
          label: 'Address scale',
          value: 'About 340 undecillion',
          detail: 'A common way to express the size of the IPv6 address space.',
        },
      ],
      connections: [
        {
          label: 'Dedicated IPv4 lesson',
          href: '/topics/ipv4-addresses#why-ipv4-still-matters',
          note: 'Compare the IPv6 scaling model with the older IPv4 limits and workarounds.',
        },
      ],
    },
    {
      id: 'ipv6-structure-and-notation',
      title: '128 Bits, 16-Bit Blocks, and Hexadecimal Notation',
      strapline: 'IPv6 looks different because both the size and the way it is written are different.',
      overview:
        'IPv6 addresses are built from 128 bits and are usually written in hexadecimal rather than decimal. Instead of four octets separated by periods, IPv6 is expressed as blocks separated by colons.',
      whyItMatters:
        'Most learners find IPv6 confusing because the notation looks unfamiliar at first glance. Once you understand the bit length, the 16-bit grouping, and the hexadecimal display, the format becomes much more manageable.',
      howItWorks: [
        'An IPv6 address contains 128 bits total.',
        'Those bits are grouped into 16-bit blocks for human readability.',
        'The address is shown in hexadecimal rather than decimal, which is why letters appear alongside numbers.',
        'Each block is separated by a colon symbol instead of a period.',
        'The computer still works with bits internally, but the hexadecimal display makes long values more readable to people.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this is an IPv6 address written as hexadecimal blocks separated by colons.',
          code: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        },
        'Example: the block `8a2e` contains letters because IPv6 uses hexadecimal digits `0-9` and `a-f`, not just decimal numbers.',
      ],
      misconceptions: [
        '"IPv6 is just IPv4 with more digits." The size, grouping, and notation are all different.',
        '"The letters mean the address is no longer numeric." Hexadecimal is still numeric notation, just base 16 instead of base 10.',
        '"Colons serve the same role as IPv4 periods." They are separators in a different address format, not a direct reuse of IPv4 structure.',
      ],
      recap: [
        'IPv6 uses 128 bits.',
        'It is shown in 16-bit blocks.',
        'It uses hexadecimal notation and colons instead of dotted decimal.',
      ],
      referenceItems: [
        {
          label: 'Block size',
          value: '16 bits',
          detail: 'IPv6 groups the full address into readable blocks of this size.',
        },
        {
          label: 'Number system',
          value: 'Hexadecimal',
          detail: 'Base 16 notation used to display IPv6 addresses.',
        },
        {
          label: 'Separator',
          value: 'Colon',
          detail: 'Blocks are separated by colons rather than periods.',
        },
      ],
      connections: [
        {
          label: 'Shortening rules',
          href: '#shortening-ipv6-addresses',
          note: 'Once the structure makes sense, the next step is understanding how IPv6 addresses are compressed for readability.',
        },
      ],
    },
    {
      id: 'shortening-ipv6-addresses',
      title: 'Shortening IPv6 Addresses',
      strapline: 'IPv6 is long enough that readable shortening rules are essential.',
      overview:
        'IPv6 includes standard shortening rules so long addresses do not have to be written in their fullest form every time. These rules do not change the address itself; they only change how it is displayed.',
      whyItMatters:
        'If you cannot recognize shortened IPv6 forms, the same address may look different in notes, documentation, tools, and configuration screens. Learning the compression rules prevents that confusion.',
      howItWorks: [
        'Leading zeros inside a block can be omitted.',
        'For example, a block such as 0063 can be written as 63.',
        'If two or more blocks contain consecutive zeros, that run can be replaced with a double colon.',
        'This double-colon compression can only be used once in a single IPv6 address.',
        'If additional zero-valued blocks remain elsewhere, they can still be written as a single 0 rather than being removed with another double colon.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: leading zeros can be removed inside one block without changing the address value.',
          code: '0063\n63',
          outro: 'The shorter second line means the same thing as the first.',
        },
        {
          type: 'code',
          intro:
            'Example: a longer IPv6 address can be compressed by removing leading zeros and replacing one consecutive zero run with `::`.',
          code:
            'Expanded:  2001:0db8:0000:0000:0000:ff00:0042:8329\nShortened: 2001:db8::ff00:42:8329',
        },
      ],
      misconceptions: [
        '"You can use the double colon anywhere as many times as you want." The compression rule is limited to one use per address.',
        '"Shortening changes the address." It changes only the written representation, not the underlying value.',
        '"All zeros can simply disappear everywhere." Leading-zero omission and double-colon compression follow specific rules.',
      ],
      recap: [
        'Leading zeros can be removed inside a block.',
        'One run of consecutive zero blocks can be replaced with a double colon.',
        'Compressed notation is still the same address underneath.',
      ],
      referenceItems: [
        {
          label: 'Example block',
          value: '0063 -> 63',
          detail: 'Leading zeros can be dropped in a single block.',
        },
        {
          label: 'Compression limit',
          value: 'One double colon',
          detail: 'Only one consecutive zero run can be compressed this way per address.',
        },
        {
          label: 'Purpose',
          value: 'Readability',
          detail: 'Shortening exists so long IPv6 addresses are practical to read and share.',
        },
      ],
      interactive: {
        type: 'ipv6-lab',
        title: 'Try shortening or expanding an IPv6 address',
        intro:
          'Type an IPv6 address in expanded or shortened form and the lab will show the full 8-block version plus the shortest standard form.',
        defaultValue: '2001:0db8:0000:0000:0000:ff00:0042:8329',
      },
      connections: [
        {
          label: 'Introductory IPv6 overview',
          href: '/topics/intro-to-ip-addressing#ipv6-fundamentals',
          note: 'Return to the wider IP lesson if you want this compression topic alongside IPv4, NAT, DHCP, and DNS.',
        },
      ],
    },
    {
      id: 'coexistence-and-adoption',
      title: 'Coexistence and Ongoing Adoption',
      strapline: 'IPv6 is important, but real networks often still run both address families side by side.',
      overview:
        'IPv6 can coexist with IPv4 instead of forcing an all-at-once replacement. That matters because adoption has taken time, and many environments still depend on a mixed reality.',
      whyItMatters:
        'A learner can hear about IPv6 for years and wonder why IPv4 is still everywhere. The answer is that rollout happens gradually. Understanding coexistence is more useful than assuming one protocol has completely replaced the other.',
      howItWorks: [
        'IPv6 was designed to coexist with IPv4.',
        'That means a network or endpoint may support both rather than immediately dropping IPv4.',
        'IPv6 has been discussed and promoted for a long time, yet it is still not the default standard everywhere.',
        'Adoption continues to expand over time, and some governments and providers actively encourage faster deployment.',
      ],
      examples: [
        'Example: a laptop can keep an IPv4 address for older services while also having an IPv6 address on the same network connection.',
        'Example: an ISP may still provide public IPv4 broadly while gradually enabling IPv6 in parallel instead of switching every customer at once.',
      ],
      misconceptions: [
        '"IPv6 has already replaced IPv4 everywhere." In practice, mixed environments remain common.',
        '"If IPv6 exists, IPv4 should disappear immediately." Real network transitions usually happen gradually, not instantly.',
        '"Coexistence means IPv6 adoption failed." It usually means networks are moving in stages while maintaining compatibility.',
      ],
      recap: [
        'IPv6 and IPv4 can coexist.',
        'Adoption is real, but rollout is gradual.',
        'Mixed environments are normal and important to understand.',
      ],
      referenceItems: [
        {
          label: 'Relationship',
          value: 'Coexists with IPv4',
          detail: 'IPv6 does not require an instant global cutover.',
        },
        {
          label: 'Deployment reality',
          value: 'Gradual adoption',
          detail: 'Many networks still operate in mixed IPv4 and IPv6 conditions.',
        },
        {
          label: 'Operational lesson',
          value: 'Expect both',
          detail: 'Real support work often means interpreting environments that use both families.',
        },
      ],
      connections: [
        {
          label: 'Broader networking foundations',
          href: '/topics/why-networking-is-important#addressing-and-configuration',
          note: 'Reconnect IPv6 adoption to the bigger addressing and configuration picture.',
        },
      ],
    },
    {
      id: 'finding-ipv6-on-a-device',
      title: 'Finding IPv6 on a Real Device',
      strapline: 'IPv6 becomes much clearer once you see it beside IPv4 on a live adapter.',
      overview:
        'A practical IPv6 lesson should end with a real machine. Looking at adapter details shows that IPv6 is not a distant theory: it can appear on the same client that also has an IPv4 address.',
      whyItMatters:
        'Reading live configuration turns abstraction into troubleshooting. You stop thinking of IPv6 as a special case and start recognizing it as one of the actual addresses a client may already have.',
      howItWorks: [
        'On Windows, `ipconfig /all` can display both IPv6 and IPv4 information for the same adapter.',
        'The command can also show multiple adapters, which matters when a device is connected in more than one way.',
        'A public IP check may show a public IPv4 address while no public IPv6 address is present.',
        'That pattern can simply mean the internet service provider is still using public IPv4 rather than exposing public IPv6 in that environment.',
      ],
      examples: [
        'Example: `ipconfig /all` can show both an `IPv6 Address` line and an `IPv4 Address` line under the same Wi-Fi adapter.',
        'Example: a browser-based public IP site may show only a public IPv4 value even though the adapter itself still has local IPv6 information.',
      ],
      misconceptions: [
        '"If I see IPv6 locally, the public internet must also be using IPv6 for me." Local adapter information and public exposure are not always the same.',
        '"No public IPv6 means IPv6 is absent from the device." A system can still hold local IPv6 information even if the provider path remains IPv4-focused.',
        '"`ipconfig /all` is only about IPv4." It is useful for viewing both address families on the client.',
      ],
      recap: [
        'Check local adapter data to see whether IPv6 is present on the machine.',
        'Compare local and public views carefully instead of assuming they must match.',
        'Real IPv6 understanding improves when you see it beside IPv4 in the same client output.',
      ],
      connections: [
        {
          label: 'Revision page',
          href: '/revision',
          note: 'Use the revision questions once you can recognize IPv6 structure and explain why coexistence is normal.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'hexadecimal',
      term: 'Hexadecimal',
      definition:
        'A base-16 numbering system used to display IPv6 blocks more compactly than long binary strings.',
      importance:
        'It explains why IPv6 addresses include letters as well as numbers.',
      sectionId: 'ipv6-structure-and-notation',
    },
    {
      id: 'sixteen-bit-block',
      term: '16-Bit Block',
      definition:
        'One of the grouped sections used to display an IPv6 address in readable form.',
      importance:
        'It helps you understand why IPv6 is shown as separated blocks rather than one uninterrupted number.',
      sectionId: 'ipv6-structure-and-notation',
    },
    {
      id: 'leading-zero-omission',
      term: 'Leading Zero Omission',
      definition:
        'The rule that allows zeros at the start of an IPv6 block to be removed when writing the address.',
      importance:
        'It is one of the main rules that keeps IPv6 notation readable.',
      sectionId: 'shortening-ipv6-addresses',
    },
    {
      id: 'double-colon-compression',
      term: 'Double-Colon Compression',
      definition:
        'The rule that allows one consecutive run of all-zero IPv6 blocks to be replaced by a double colon.',
      importance:
        'It is a core IPv6 shortening rule and a common source of confusion if you have not learned it explicitly.',
      sectionId: 'shortening-ipv6-addresses',
    },
    {
      id: 'address-exhaustion',
      term: 'Address Exhaustion',
      definition:
        'The condition where an address pool becomes too limited to keep scaling comfortably for future demand.',
      importance:
        'It is the core reason IPv6 had to be introduced after the limits of IPv4 became clear.',
      sectionId: 'why-ipv6-exists',
    },
    {
      id: 'address-space',
      term: 'Address Space',
      definition:
        'The total range of unique addresses a protocol can provide.',
      importance:
        'It is the simplest way to compare why IPv6 has far more long-term capacity than IPv4.',
      sectionId: 'why-ipv6-exists',
    },
  ],
  revision: {
    summary:
      'Remember IPv6 as the long-term addressing answer to IPv4 exhaustion: it expands the address space to 128 bits, uses hexadecimal blocks separated by colons, shortens long forms with clear rules, and often appears alongside IPv4 rather than replacing it overnight.',
    memoryFramework: [
      'Start with the reason: IPv6 exists because IPv4 space became too limited.',
      'Read the size: IPv6 means 128 bits instead of 32.',
      'Read the shape: the address is shown as hexadecimal blocks separated by colons.',
      'Read the shortening rules: leading zeros can drop and one run of zero blocks can use a double colon.',
      'Read the deployment reality: IPv6 often coexists with IPv4.',
      'Check a real client: `ipconfig /all` can show both address families on one machine.',
    ],
    checklist: [
      'I can explain why IPv6 was introduced after IPv4 address exhaustion concerns.',
      'I can describe IPv6 as a 128-bit address shown in hexadecimal blocks.',
      'I can explain why IPv6 uses colons instead of IPv4-style dotted decimal notation.',
      'I can explain the difference between leading-zero omission and double-colon compression.',
      'I know that the double colon can only be used once in a single IPv6 address.',
      'I can explain why IPv4 and IPv6 often coexist in real networks.',
      'I can explain why a device may show local IPv6 information while still lacking a public IPv6 address.',
    ],
    questions: [
      'Why did moving from 32 bits to 128 bits matter so much for long-term network growth?',
      'Why does IPv6 use hexadecimal notation instead of IPv4-style dotted decimal?',
      'What is the purpose of shortening rules in IPv6?',
      'Why can a double colon only be used once in an IPv6 address?',
      'Why is it normal to see IPv4 and IPv6 together on the same network or endpoint?',
      'What can it mean if a client shows local IPv6 configuration but no public IPv6 address?',
    ],
    pitfalls: [
      'Treating IPv6 as if it were just a longer version of IPv4 instead of a different addressing format.',
      'Assuming shortened IPv6 forms represent different addresses from their expanded forms.',
      'Using the double colon more than once in the same written address.',
      'Expecting IPv6 adoption to look like an instant replacement of IPv4.',
      'Confusing local adapter IPv6 presence with guaranteed public IPv6 exposure on the internet.',
    ],
  },
  relatedTopicSlugs: ['intro-to-ip-addressing', 'ipv4-addresses', 'why-networking-is-important'],
};
