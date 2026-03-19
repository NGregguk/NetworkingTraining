import type { StudyTopic } from '../schema';

export const networkTypesAndInternetConnectionsTopic: StudyTopic = {
  slug: 'network-types-and-internet-connections',
  title: 'Network Types and Internet Connection Types',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '30 minutes',
  sourceFile: 'context files/Networking Hardware.pdf',
  updatedOn: 'March 19, 2026',
  summary:
    'Learn how PAN, LAN, WLAN, MAN, WAN, SAN, and VLAN fit together, then compare DSL, cable, fibre, satellite, cellular, and rural wireless internet options.',
  heroNote:
    'Use this page when network scope names and ISP service names all blur together and you want one practical map of what each label is really describing.',
  tags: ['PAN', 'LAN', 'VLAN', 'WAN', 'fibre', 'satellite'],
  learningObjectives: [
    'Differentiate PAN, LAN, WLAN, MAN, WAN, and SAN by scope and purpose.',
    'Explain how VLANs create logical separation on one shared physical network.',
    'Compare DSL, cable, and fibre in terms of media, speed shape, and practical tradeoffs.',
    'Explain when satellite, cellular, or wireless ISP connections are used instead of wired services.',
    'Choose an internet connection type by weighing speed, upload needs, latency, geography, and availability.',
    'Read a small-network segmentation design without confusing physical hardware with logical networks.',
  ],
  sections: [
    {
      id: 'network-types-describe-scope-and-purpose',
      title: 'Network Types Describe Scope and Purpose',
      strapline:
        'The label is not just about size. It tells you what kind of network problem you are looking at.',
      overview:
        'Network type names help you reason about scope before you touch any hardware. A PAN is about very close device communication, a LAN is about a local site, a MAN expands across a city or campus, a WAN spans wider geography, and a SAN is built specifically for shared server storage.',
      whyItMatters:
        'These labels give context to both troubleshooting and design. If you know whether the problem sits inside a local office LAN, across a WAN link, or inside a storage network, the next questions become much sharper.',
      howItWorks: [
        'A Personal Area Network, or PAN, covers a very small area such as a phone paired to a headset, speaker, or keyboard.',
        'A Local Area Network, or LAN, covers a home, office, or other single site where devices share local resources.',
        'A Wireless Local Area Network, or WLAN, is still a LAN. The difference is that endpoint access happens wirelessly rather than only through cables.',
        'A Metropolitan Area Network, or MAN, links networks across a campus, city, or small region.',
        'A Wide Area Network, or WAN, spans broader geography and joins distant networks together. The internet is the best-known WAN because it interconnects many other networks.',
        'A Storage Area Network, or SAN, is different from user access networking because it delivers high-speed shared storage to servers.',
      ],
      examples: [
        'A wireless mouse, keyboard, and headset around one laptop fit the PAN idea better than the LAN idea.',
        'A house with one router, a few switches, and several phones, laptops, and TVs is a LAN or WLAN environment.',
        'A business with one office in London and another in Manchester connected through provider links is dealing with a WAN problem when the sites cannot reach each other.',
      ],
      misconceptions: [
        '"WAN" just means the internet. The internet is one WAN, but any wider-area interconnection can count as a WAN.',
        '"WLAN" is a completely different class of network from a LAN. It is still a LAN. The distinction is how clients attach.',
        '"SAN" is just another name for any server network. SAN specifically focuses on shared storage access for servers.',
      ],
      recap: [
        'PAN, LAN, WLAN, MAN, WAN, and SAN describe different kinds of scope and purpose.',
        'These names help you frame the problem before you jump into commands or hardware.',
        'The internet is the most familiar WAN, but it is not the only WAN concept.',
      ],
      referenceItems: [
        {
          label: 'PAN',
          value: 'Personal Area Network',
          detail: 'Short-range communication between nearby personal devices.',
        },
        {
          label: 'LAN / WLAN',
          value: 'Single-site networking',
          detail: 'Home or office networking, with WLAN referring to wireless endpoint access.',
        },
        {
          label: 'SAN',
          value: 'Storage Area Network',
          detail: 'High-speed shared storage delivered to servers.',
        },
      ],
      connections: [
        {
          label: 'Foundations overview',
          href: '/topics/why-networking-is-important#network-types-and-access',
          note: 'Return to the broader survey if you want network types kept alongside hardware, wireless, and services in one page.',
        },
      ],
    },
    {
      id: 'vlans-split-one-physical-lan-into-multiple-logical-networks',
      title: 'VLANs Split One Physical LAN into Multiple Logical Networks',
      strapline:
        'Segmentation does not always require separate switches for every group of devices.',
      overview:
        'Virtual LANs, or VLANs, let one physical switching environment carry multiple logical networks. That means the same hardware can still enforce separation between default devices, guests, IoT equipment, or other groups that should not share identical rules.',
      whyItMatters:
        'This is one of the most useful small-network ideas in the whole course. VLANs let you keep the hardware simple while still applying different DHCP scopes, firewall rules, bandwidth limits, or access policies to different kinds of devices.',
      howItWorks: [
        'A VLAN creates a logical network boundary on shared switching hardware.',
        'Wireless networks can map separate SSIDs to different VLANs so guests, staff, and IoT devices land in different segments even when the access points are the same physical devices.',
        'Wired switch ports can also be assigned to different VLANs, which lets one building run multiple logical networks through the same switching fabric.',
        'Because the traffic is segmented, each VLAN can have its own subnet, DHCP lease policy, DNS settings, and access rules.',
        'This makes it practical to keep a guest network more restricted than a default internal network or to isolate IoT devices from laptops and servers.',
      ],
      examples: [
        'A home lab can run one default VLAN for trusted devices, one guest VLAN for visitors, and one IoT VLAN for smart plugs and cameras.',
        'Three Wi-Fi names on one access point can still map to three different logical networks with different policies behind them.',
        {
          type: 'code',
          intro:
            'Example: one small network can stay physically simple while still enforcing separate policy zones.',
          code:
            'Default VLAN -> trusted laptops, desktops, printers\nIoT VLAN     -> plugs, cameras, smart speakers\nGuest VLAN   -> visitor phones and tablets\n\nSame switch and access points\nDifferent subnets, leases, and rules',
        },
      ],
      misconceptions: [
        '"If it is one switch, it must be one network." VLANs exist specifically to avoid that limitation.',
        '"VLANs are only worth it in large enterprises." Even a small home or office gains security and clarity from simple segmentation.',
        '"A guest SSID is enough on its own." The real separation comes from the network policy and VLAN design behind the SSID.',
      ],
      recap: [
        'VLANs create logical network boundaries on shared hardware.',
        'They are useful for guests, IoT devices, servers, and any traffic that should follow different rules.',
        'One of the biggest advantages is policy separation without extra physical switching for every segment.',
      ],
      referenceItems: [
        {
          label: 'Default VLAN',
          value: 'Trusted internal devices',
          detail: 'Often used for laptops, desktops, and normal business or home traffic.',
        },
        {
          label: 'Guest VLAN',
          value: 'Restricted visitor access',
          detail: 'Can use different lease times, internet limits, or access rules.',
        },
        {
          label: 'IoT VLAN',
          value: 'Separate smart-device segment',
          detail: 'Useful when vendor security quality is uneven and devices should be isolated.',
        },
      ],
      connections: [
        {
          label: 'Planning a small network',
          href: '/topics/planning-a-basic-home-and-small-business-network',
          note: 'Use the planning page to see VLANs placed into a full home or small-business rollout.',
        },
        {
          label: 'Networked hosts and services',
          href: '/topics/networked-hosts-and-services#iot-expands-visibility-but-raises-the-security-bar',
          note: 'IoT segmentation becomes easier to justify once you connect VLAN design to the device risk profile.',
        },
      ],
    },
    {
      id: 'wired-internet-access-trades-speed-symmetry-and-availability',
      title: 'Wired Internet Access Trades Speed, Symmetry, and Availability',
      strapline:
        'The best provider choice is rarely about download speed alone.',
      overview:
        'DSL, cable, and fibre all get internet into a building, but they do it over different media and with different performance shapes. The medium, the upload speed, and even the distance to the provider can change the experience significantly.',
      whyItMatters:
        'When you choose or troubleshoot a provider link, advertised download speed is only part of the story. Upload speed, latency, local availability, and how the technology behaves under distance or congestion all matter in real networks.',
      howItWorks: [
        'DSL uses existing phone wiring. In practice it is usually asymmetric, which means download speed is much higher than upload speed.',
        'Distance matters a lot for DSL. The farther the building is from the provider equipment or repeater, the worse the performance usually gets.',
        'Cable internet uses coaxial lines and DOCSIS standards. It can provide strong download speeds, but upload capacity is often much lower than the download side.',
        'Fibre uses optical cabling and usually provides the best overall speed and latency. It often offers much more symmetric performance than cable or DSL.',
        'A fibre service might still be sold in different speed tiers, but the underlying medium usually gives the provider the strongest performance headroom.',
      ],
      examples: [
        'A home office that uploads backups, video meetings, and large project files often benefits much more from fibre than from an asymmetric cable or DSL plan.',
        'A 940 Mbps cable service can still feel weaker for content creation or remote work than a slower but symmetric fibre service if upload matters heavily.',
        'An older DSL line may look acceptable on paper until the distance to the provider knocks speeds down well below the advertised maximum.',
      ],
      misconceptions: [
        '"If the download number is high, the service is automatically the best choice." Upload speed and latency can matter just as much.',
        '"Cable and fibre are basically the same because both can be fast." The upload profile and signalling medium are still very different.',
        '"DSL is just slower cable." DSL has its own media and distance-related behaviour that cable does not share in the same way.',
      ],
      recap: [
        'DSL, cable, and fibre all solve the same problem through different media.',
        'Fibre is usually the strongest overall option when it is available.',
        'Choosing a link well means considering symmetry, latency, and site constraints as well as headline speed.',
      ],
      referenceItems: [
        {
          label: 'DSL',
          value: 'Phone wiring, asymmetric',
          detail: 'Performance often drops with distance from provider equipment.',
        },
        {
          label: 'Cable',
          value: 'Coax plus DOCSIS',
          detail: 'Often strong on download, but commonly weaker on upload than fibre.',
        },
        {
          label: 'Fibre',
          value: 'Optical service',
          detail: 'Usually the best mix of bandwidth, latency, and upload performance.',
        },
      ],
      connections: [
        {
          label: 'Networking hardware',
          href: '/topics/networking-hardware#provider-edge-and-gateway-devices',
          note: 'Provider medium choices make more sense once you connect them to the modem or ONT at the edge.',
        },
      ],
    },
    {
      id: 'wireless-and-rural-internet-options-fill-coverage-gaps',
      title: 'Wireless and Rural Internet Options Fill Coverage Gaps',
      strapline:
        'When wired service is weak or unavailable, wireless access methods become the practical path.',
      overview:
        'Satellite, cellular home internet, and wireless internet service providers solve the availability problem from different angles. They are especially important in rural areas, temporary sites, backup designs, and mobile scenarios where a wired handoff is weak or impossible.',
      whyItMatters:
        'A network design that ignores geography is not a real design. Rural and mobile environments often force different choices, and those choices bring different tradeoffs in latency, throughput, line-of-sight requirements, or monthly cost.',
      howItWorks: [
        'Satellite sends traffic to space and back through provider ground stations, which makes it useful almost anywhere but also increases latency.',
        'Modern 5G home internet uses the cellular network and can provide respectable speeds without wired infrastructure entering the building.',
        'Cellular internet can also work well as a backup connection when the main fibre or cable service fails.',
        'Wireless internet service providers, or WISPs, use towers connected back to fibre and then deliver service to customer receiver dishes over radio frequency links.',
        'Because WISP towers are much closer than satellites, they can often deliver lower latency than satellite, but they usually require direct line of sight to the tower.',
      ],
      examples: [
        'A house in a town with fibre available will almost always prefer fibre to satellite, even if satellite is technically possible.',
        'A small business can keep a 5G gateway ready as a failover option when the main wired ISP goes down.',
        'A farm or remote workshop with no cable or fibre may use a WISP if there is direct visibility to the provider tower.',
      ],
      misconceptions: [
        '"Satellite is just wireless fibre." It solves reach, not parity with wired performance.',
        '"5G home internet replaces wired access in every case." It can be excellent, but the result still depends on local signal quality and provider conditions.',
        '"Rural wireless means the same thing as satellite." WISPs and satellite solve the problem through very different paths.',
      ],
      recap: [
        'Satellite is about maximum reach, but it usually carries higher latency.',
        'Cellular home internet is increasingly practical and is also useful as a backup path.',
        'WISPs can outperform satellite in some rural areas if tower coverage and line of sight are good.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the scope and access choice',
        intro:
          'Use these questions to confirm that you can separate network type names from internet delivery methods and choose the right tradeoff for the situation.',
        questions: [
          {
            prompt:
              'Which network type best describes short-range communication between a phone and wireless earbuds?',
            options: [
              {
                label: 'PAN',
                isCorrect: true,
                feedback:
                  'Correct. A Personal Area Network covers very close device communication around one user.',
              },
              {
                label: 'MAN',
                isCorrect: false,
                feedback:
                  'A MAN covers a city, campus, or small regional scale rather than one person and a few nearby devices.',
              },
              {
                label: 'SAN',
                isCorrect: false,
                feedback:
                  'A SAN is about shared storage for servers, not peripheral devices around a user.',
              },
            ],
          },
          {
            prompt:
              'Which statement best describes why VLANs are useful on a small network?',
            options: [
              {
                label:
                  'They let one shared hardware environment carry separate logical networks with different rules',
                isCorrect: true,
                feedback:
                  'Correct. VLANs allow segmentation for guests, IoT devices, and other groups without separate physical switches for each one.',
              },
              {
                label:
                  'They replace the need for a router by making every switch port into a gateway',
                isCorrect: false,
                feedback:
                  'VLANs create logical separation, but they do not replace routing or gateway functions.',
              },
              {
                label:
                  'They are mainly for increasing raw internet speed',
                isCorrect: false,
                feedback:
                  'The main benefit is segmentation and policy control, not faster internet throughput.',
              },
            ],
          },
          {
            prompt:
              'Which wired internet type is usually the strongest fit when you need high upload speed and low latency and it is available at the site?',
            options: [
              {
                label: 'Fibre',
                isCorrect: true,
                feedback:
                  'Correct. Fibre is usually the best overall choice when it is available, especially for symmetric performance and low latency.',
              },
              {
                label: 'DSL',
                isCorrect: false,
                feedback:
                  'DSL is usually asymmetric and much more sensitive to distance from provider equipment.',
              },
              {
                label: 'Satellite',
                isCorrect: false,
                feedback:
                  'Satellite helps with reach, but it does not usually match fibre for latency or throughput.',
              },
            ],
          },
          {
            prompt:
              'Why can a WISP be a better rural option than satellite in some places?',
            options: [
              {
                label:
                  'Because the radio link goes to a much closer tower, which can reduce latency if line of sight is available',
                isCorrect: true,
                feedback:
                  'Correct. WISPs often perform better than satellite when a nearby provider tower and direct line of sight are available.',
              },
              {
                label:
                  'Because WISPs always deliver symmetric fibre speeds over any distance',
                isCorrect: false,
                feedback:
                  'WISPs can be strong rural options, but they are not simply fibre over the air with unlimited reach.',
              },
              {
                label:
                  'Because WISPs do not need any provider backhaul infrastructure',
                isCorrect: false,
                feedback:
                  'WISP towers still need backhaul, often through fibre or other upstream connectivity.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Small-network planning',
          href: '/topics/planning-a-basic-home-and-small-business-network#choose-and-bring-in-the-internet-service',
          note: 'The planning page turns these provider tradeoffs into an actual first-step decision for a new house or office.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'pan',
      term: 'PAN (Personal Area Network)',
      definition:
        'A very small network around one user, such as a phone communicating with nearby peripherals.',
      importance:
        'It clarifies that not every network concept starts at the scale of a home or office.',
      sectionId: 'network-types-describe-scope-and-purpose',
    },
    {
      id: 'lan',
      term: 'LAN',
      definition:
        'Short for Local Area Network, the normal network inside one home, office, classroom, or similar site.',
      importance:
        'It is the baseline network scope most day-to-day switching, Wi-Fi, and client troubleshooting starts from.',
      sectionId: 'network-types-describe-scope-and-purpose',
    },
    {
      id: 'man',
      term: 'MAN',
      definition:
        'Short for Metropolitan Area Network, a network scope that links sites across a town, city, or larger campus footprint.',
      importance:
        'It helps separate local building networks from broader regional connectivity.',
      sectionId: 'network-types-describe-scope-and-purpose',
    },
    {
      id: 'wan',
      term: 'WAN',
      definition:
        'Short for Wide Area Network, a network that connects sites or services across large geographical distances.',
      importance:
        'It explains why internet access and multi-site links are treated differently from one-building LAN traffic.',
      sectionId: 'network-types-describe-scope-and-purpose',
    },
    {
      id: 'wlan',
      term: 'WLAN (Wireless Local Area Network)',
      definition:
        'A local area network where endpoint access is provided wirelessly.',
      importance:
        'It helps separate the network scope from the physical access method.',
      sectionId: 'network-types-describe-scope-and-purpose',
    },
    {
      id: 'vlan',
      term: 'VLAN',
      definition:
        'A Virtual LAN that creates a logical network segment on shared physical switching hardware.',
      importance:
        'It is one of the most practical ways to segment guests, IoT devices, and trusted devices without adding separate hardware for each group.',
      sectionId: 'vlans-split-one-physical-lan-into-multiple-logical-networks',
    },
    {
      id: 'docsis',
      term: 'DOCSIS',
      definition:
        'A standard used to deliver data services over cable internet infrastructure.',
      importance:
        'It explains how modern cable internet keeps using coaxial media for network access.',
      sectionId: 'wired-internet-access-trades-speed-symmetry-and-availability',
    },
    {
      id: 'isp',
      term: 'ISP',
      definition:
        'Short for Internet Service Provider, the company or organisation that supplies a site with internet access.',
      importance:
        'It is the outside provider that determines the service medium, support path, and handoff you start with.',
      sectionId: 'wired-internet-access-trades-speed-symmetry-and-availability',
    },
    {
      id: 'wisp',
      term: 'WISP (Wireless Internet Service Provider)',
      definition:
        'A provider that delivers internet over radio links from towers to customer receiver equipment, often in rural areas.',
      importance:
        'It is a useful alternative when wired options are unavailable and satellite is not the only path.',
      sectionId: 'wireless-and-rural-internet-options-fill-coverage-gaps',
    },
    {
      id: 'backhaul',
      term: 'Backhaul',
      definition:
        'The upstream connection that links an access network, tower, or local system back into the wider provider network.',
      importance:
        'It explains why a wireless service can still depend on a strong wired or high-capacity upstream path behind the scenes.',
      sectionId: 'wireless-and-rural-internet-options-fill-coverage-gaps',
    },
    {
      id: 'san',
      term: 'SAN (Storage Area Network)',
      definition:
        'A dedicated high-speed network that provides shared storage access to servers.',
      importance:
        'It prevents confusion between user-access networks and storage-focused infrastructure.',
      sectionId: 'network-types-describe-scope-and-purpose',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember in two layers: first identify the scope of the network with PAN, LAN, WLAN, MAN, WAN, or SAN, then identify how the site reaches the outside world through DSL, cable, fibre, satellite, cellular, or a WISP. VLANs sit in the middle as the tool that lets one shared LAN behave like several separate networks.',
    memoryFramework: [
      'Start with scope: PAN for one person, LAN or WLAN for one site, MAN for a city or campus, WAN for broad geography, SAN for shared storage.',
      'Remember VLANs as logical segmentation, not extra physical hardware.',
      'Read DSL as phone-line based and distance-sensitive.',
      'Read cable as coax with strong download but often weaker upload.',
      'Read fibre as the strongest overall option when available.',
      'Read satellite, cellular, and WISP as coverage-gap solutions with different tradeoffs.',
      'Choose links by availability, latency, upload needs, and resilience, not download speed alone.',
    ],
    checklist: [
      'I can explain the practical difference between PAN, LAN, WLAN, MAN, WAN, and SAN.',
      'I can explain why VLANs are useful on a home or small-business network.',
      'I can compare DSL, cable, and fibre in terms of media and performance shape.',
      'I can explain why fibre is often preferred when upload speed matters.',
      'I can explain why satellite is valuable even though it has higher latency.',
      'I can explain how a WISP differs from both satellite and cellular internet.',
      'I can choose an access method by balancing geography, speed, and resilience requirements.',
    ],
    questions: [
      'Why is a WLAN still considered a LAN rather than a completely different network class?',
      'Why can one set of switches and access points still host multiple separate networks through VLANs?',
      'Why might a home office care more about upload symmetry than a casual streaming-only household?',
      'Why can satellite be the right answer even when it is slower and higher latency than fibre?',
      'Why is a 5G gateway sometimes more valuable as a backup path than as the primary connection?',
      'What design clue tells you a problem is about network scope rather than internet medium?',
    ],
    pitfalls: [
      'Treating all network type labels as if they are only about how many devices exist.',
      'Assuming one switch or one access point means one logical network.',
      'Choosing providers from download numbers alone without checking upload speed, latency, or geography.',
      'Treating satellite, cellular, and WISP as interchangeable when they solve availability in different ways.',
      'Forgetting that SAN refers to storage networking rather than general user connectivity.',
    ],
  },
  relatedTopicSlugs: [
    'why-networking-is-important',
    'networking-hardware',
    'planning-a-basic-home-and-small-business-network',
  ],
};
