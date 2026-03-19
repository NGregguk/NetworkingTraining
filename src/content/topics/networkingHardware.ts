import type { StudyTopic } from '../schema';

export const networkingHardwareTopic: StudyTopic = {
  slug: 'networking-hardware',
  title: 'Networking Hardware',
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
    'Learn what modems, ONTs, routers, switches, access points, firewalls, patch panels, NICs, and PoE devices actually do in a working network.',
  heroNote:
    'Use this page when the hardware names all blur together and you want a clean mental model of where each device sits and what job it performs.',
  tags: ['network hardware', 'router', 'switch', 'access point', 'PoE', 'firewall'],
  learningObjectives: [
    'Differentiate the jobs performed by modems, optical network terminals, routers, switches, access points, firewalls, patch panels, and NICs.',
    'Explain how the provider handoff is converted into a signal that local Ethernet devices can use.',
    'Compare unmanaged and managed switching at a practical support level.',
    'Describe how wireless access points relate to routers and switches in home and business environments.',
    'Explain how Power over Ethernet works, when injectors are needed, and how the common PoE standards differ.',
    'Read a small home or small-business topology by tracing conversion, gateway, switching, wireless bridging, and endpoint power roles.',
  ],
  sections: [
    {
      id: 'provider-edge-and-gateway-devices',
      title: 'Provider Edge Devices Convert the ISP Link',
      strapline:
        'Before the LAN can do anything useful, the incoming service has to be translated into something local Ethernet gear can use.',
      overview:
        'The first hardware in the path is usually not a switch or a laptop. It is the device that takes the provider handoff and turns it into a form your local network can understand. After that, the router becomes the boundary between the outside network and the inside one.',
      whyItMatters:
        'Many learners collapse modem, ONT, and router into one vague "internet box." That works until troubleshooting starts. If you know which device handles conversion and which one handles routing and gateway decisions, the layout of a network becomes much easier to reason about.',
      howItWorks: [
        'A cable or DSL modem converts the provider signal into a digital signal your local network equipment can use.',
        'A fibre connection typically terminates on an optical network terminal, or ONT, which converts optical signalling into the electrical Ethernet-style handoff your local gear expects.',
        'After the provider signal is converted, the router becomes the first true local network device. It connects the wide area network to the local area network.',
        'On small networks, the router often also provides supporting services such as DHCP, NAT, and basic firewall behaviour in addition to acting as the default gateway.',
        'In all-in-one home gear, modem, router, switch, and wireless access point functions can live in one chassis, but the jobs are still logically separate.',
      ],
      examples: [
        'A home cable setup often looks like provider coax -> modem -> router with integrated Wi-Fi -> wired and wireless clients.',
        'A fibre handoff for a small business often looks like provider fibre -> ONT -> router -> switch -> access points and wired endpoints.',
        {
          type: 'code',
          intro:
            'Example: read the provider edge as a sequence of roles instead of as brand names.',
          code:
            'Provider handoff -> Modem or ONT -> Router -> Local network\n\nModem / ONT: convert the service medium\nRouter: join WAN to LAN and forward off-subnet traffic',
        },
      ],
      misconceptions: [
        '"The modem is the router." They may be combined in one appliance, but conversion and routing are different jobs.',
        '"The router only exists to provide Wi-Fi." Wi-Fi may be integrated, but the router role is really about joining networks and acting as the gateway.',
        '"Fibre means there is no conversion step." Fibre still needs an ONT to hand the connection off to local Ethernet-based gear.',
      ],
      recap: [
        'Modems and ONTs translate the provider service into a form the local network can use.',
        'The router is the gateway between the inside network and outside networks such as the internet.',
        'Small devices may combine several hardware roles, but those roles are still distinct when you troubleshoot them.',
      ],
      referenceItems: [
        {
          label: 'Modem',
          value: 'Cable or DSL conversion',
          detail: 'Turns the provider medium into a signal local network devices can use.',
        },
        {
          label: 'ONT',
          value: 'Fibre handoff',
          detail: 'Converts optical signalling to the electrical Ethernet-style handoff used by local hardware.',
        },
        {
          label: 'Router',
          value: 'WAN <-> LAN gateway',
          detail: 'Joins networks together and often hosts DHCP, NAT, and basic edge services.',
        },
      ],
      connections: [
        {
          label: 'Hardware overview in the foundations page',
          href: '/topics/why-networking-is-important#hardware-and-poe',
          note: 'Return to the wider networking survey if you want this hardware layer in the context of the whole course map.',
        },
        {
          label: 'Addressing and support services',
          href: '/topics/intro-to-ip-addressing#dhcp-dns-and-supporting-services',
          note: 'Routers make much more sense once DHCP, DNS, NAT, and gateway behaviour are familiar.',
        },
      ],
    },
    {
      id: 'switches-access-points-and-endpoint-interfaces',
      title: 'Switches, Access Points, and Endpoint Interfaces',
      strapline:
        'Once the gateway is in place, local hardware expands wired access, bridges wireless clients, and gives endpoints a network presence.',
      overview:
        'Local networking depends on several devices working together. A switch expands and forwards wired connectivity, an access point bridges Wi-Fi clients to Ethernet, a firewall filters traffic, a patch panel keeps cabling manageable, and a NIC is the actual interface inside the endpoint.',
      whyItMatters:
        'These names are easy to memorize and easy to confuse. Support work improves when you can say exactly which device expands the LAN, which one bridges wireless traffic, which one filters access, and which one is simply passive cabling infrastructure.',
      howItWorks: [
        'A switch provides multiple wired interfaces and forwards traffic to the correct local interface instead of treating every device as one big shared segment.',
        'Unmanaged switches mainly provide connectivity, while managed switches expose controls such as port settings, shutdown of unused ports, and other administrative features.',
        'A wireless access point bridges wireless clients onto the wired Ethernet network. Home routers often have this function built in, but business environments usually separate the access points from the router.',
        'A firewall filters traffic based on criteria such as protocol, port, application, or policy so only approved communication is allowed through.',
        'A patch panel is not an active forwarding device. It is a termination point that keeps wall runs organised, labelled, and easy to patch into switching gear.',
        'A NIC, or network interface card, is the hardware that connects the endpoint to the network. Every connected device has one, whether it is a desktop adapter or a wireless radio in a phone.',
      ],
      examples: [
        'A 24-port switch in an office can feed many desktops, printers, uplinks, and access points that a small home router could never host directly.',
        'A hotel room Ethernet jack usually terminates back to a patch panel first, then uses a short patch cable into the switch rather than running directly to the switch port through the wall.',
        'A laptop can have both a wired NIC and a wireless NIC, each presenting its own network interface to the operating system.',
      ],
      misconceptions: [
        '"A switch and a router are basically the same." A router joins networks; a switch expands connectivity inside one local network.',
        '"A patch panel is smart network equipment." It improves cabling discipline, but it does not forward traffic intelligently.',
        '"Only servers and desktops have NICs." Every connected endpoint needs a network interface, even if it is small or wireless.',
      ],
      recap: [
        'Switches expand and direct local wired traffic.',
        'Access points bridge wireless users to the wired network.',
        'Firewalls enforce policy, patch panels organise cabling, and NICs give endpoints a real network interface.',
      ],
      referenceItems: [
        {
          label: 'Switch',
          value: 'Local wired distribution',
          detail: 'Provides multiple Ethernet interfaces and forwards traffic to the correct local destination.',
        },
        {
          label: 'Access point',
          value: 'Wireless bridge',
          detail: 'Connects wireless clients to the wired Ethernet network.',
        },
        {
          label: 'Patch panel',
          value: 'Cable termination point',
          detail: 'Organizes structured cabling so ports, rooms, and patch leads can be documented cleanly.',
        },
        {
          label: 'NIC',
          value: 'Endpoint network interface',
          detail: 'Provides the device with network connectivity and its hardware-level identity.',
        },
      ],
      connections: [
        {
          label: 'Ports and firewalls',
          href: '/topics/tcp-and-udp-protocols#ports-in-firewalls-and-access-rules',
          note: 'Firewall hardware matters more when you connect it to the protocol-port rules it is enforcing.',
        },
      ],
    },
    {
      id: 'power-over-ethernet-and-device-power-planning',
      title: 'Power over Ethernet Simplifies Device Placement',
      strapline:
        'Some devices need both data and power, and PoE lets one Ethernet run handle both jobs.',
      overview:
        'Power over Ethernet, or PoE, sends electrical power across the same cable that carries network traffic. That makes it much easier to place devices such as access points, cameras, and IP phones where they work best instead of where a local outlet happens to exist.',
      whyItMatters:
        'PoE is convenient, but it is also a planning detail. A device that needs PoE+, PoE++ Type 3, or PoE++ Type 4 will not behave correctly if you only provide a lower-power port. Support and deployment work both depend on matching the endpoint to the available PoE budget.',
      howItWorks: [
        'A PoE-capable switch can inject electrical power onto the Ethernet run while still carrying normal network traffic.',
        'If the switch does not provide the required PoE level, a PoE injector can be inserted between the switch and the endpoint to add power onto the cable.',
        'Lower-power devices such as many cameras and phones may only need standard PoE, while stronger access points and displays can need PoE+, PoE++ Type 3, or Type 4.',
        'The power requirement is part of the hardware specification. A link can still exist logically, but the device may fail if the available port cannot deliver enough power.',
        'PoE reduces installation complexity because one cable can replace the need for both a local data drop and a nearby power outlet.',
      ],
      examples: [
        'A ceiling-mounted access point can be powered from the wiring closet over one Ethernet run instead of needing an electrician to install an outlet nearby.',
        'If a new Wi-Fi access point requires PoE++ but the switch only supports PoE+, you need an injector or a different switch before the deployment is complete.',
        {
          type: 'code',
          intro:
            'Example: common PoE levels scale mainly by how much power they can deliver to the endpoint.',
          code:
            '802.3af  -> PoE           -> about 12.95 W\n802.3at  -> PoE+          -> about 25.5 W\n802.3bt  -> PoE++ Type 3  -> about 51 W\n802.3bt  -> PoE++ Type 4  -> about 71.3 W',
        },
      ],
      misconceptions: [
        '"Any Ethernet port can power any device." The switch or injector still has to support the right PoE level.',
        '"PoE is only for tiny low-power equipment." Newer PoE standards can drive much more demanding hardware.',
        '"If the data link comes up, the power side must be fine." A device can still fail or underperform if the power budget is wrong.',
      ],
      recap: [
        'PoE lets one Ethernet cable carry both data and electrical power.',
        'Switches often supply PoE, but injectors can add power when the switch cannot.',
        'Matching the endpoint requirement to the available PoE standard is part of correct deployment.',
      ],
      referenceItems: [
        { label: 'PoE', value: '802.3af', detail: 'Around 12.95 watts to the device.' },
        { label: 'PoE+', value: '802.3at', detail: 'Around 25.5 watts to the device.' },
        { label: 'PoE++ Type 3', value: '802.3bt', detail: 'Up to about 51 watts.' },
        { label: 'PoE++ Type 4', value: '802.3bt', detail: 'Up to about 71.3 watts.' },
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the hardware role and PoE fit',
        intro:
          'Use these questions to make sure you can separate device roles cleanly and spot when a power requirement mismatch is the real deployment problem.',
        questions: [
          {
            prompt:
              'Which device is primarily responsible for joining the local network to the internet or another outside network?',
            options: [
              {
                label: 'Router',
                isCorrect: true,
                feedback:
                  'Correct. The router is the network boundary device that joins different networks together and typically acts as the default gateway.',
              },
              {
                label: 'Patch panel',
                isCorrect: false,
                feedback:
                  'A patch panel improves cable organisation, but it is not the device making network-layer forwarding decisions.',
              },
              {
                label: 'NIC',
                isCorrect: false,
                feedback:
                  'A NIC gives an endpoint a network interface, but it is not what joins the LAN to the WAN.',
              },
            ],
          },
          {
            prompt:
              'A new access point requires PoE++ but your switch only supports PoE+. What is the most accurate conclusion?',
            options: [
              {
                label:
                  'You need a higher-power switch port or a PoE injector that can provide the required level',
                isCorrect: true,
                feedback:
                  'Correct. The link path still needs the right power budget, so you must upgrade the supply side or add the proper injector.',
              },
              {
                label:
                  'Any Ethernet port should still power it because PoE levels are all interchangeable',
                isCorrect: false,
                feedback:
                  'PoE levels are not interchangeable. The device requirement and the port capability still have to match.',
              },
              {
                label:
                  'The access point should use the patch panel for extra power instead of the switch',
                isCorrect: false,
                feedback:
                  'A patch panel is passive cabling infrastructure and does not add electrical power to the run.',
              },
            ],
          },
          {
            prompt:
              'Which device most directly bridges wireless users onto the wired Ethernet network?',
            options: [
              {
                label: 'Wireless access point',
                isCorrect: true,
                feedback:
                  'Correct. The access point is the hardware that bridges Wi-Fi clients into the wired side of the network.',
              },
              {
                label: 'Modem',
                isCorrect: false,
                feedback:
                  'A modem converts the provider medium, but it does not serve as the normal wireless bridge for LAN clients.',
              },
              {
                label: 'Managed switch',
                isCorrect: false,
                feedback:
                  'A switch expands wired connectivity, but the Wi-Fi bridge role belongs to the access point.',
              },
            ],
          },
          {
            prompt:
              'Which statement best describes why PoE is operationally useful?',
            options: [
              {
                label:
                  'It lets one Ethernet run carry both network traffic and power, which simplifies placement for devices like cameras, phones, and access points',
                isCorrect: true,
                feedback:
                  'Correct. PoE reduces installation complexity and gives much more flexibility in where network devices can be mounted.',
              },
              {
                label:
                  'It replaces the need for a router by combining traffic forwarding and power conversion into one feature',
                isCorrect: false,
                feedback:
                  'PoE deals with power delivery over Ethernet. It does not replace the router role.',
              },
              {
                label:
                  'It exists mainly to make patch panels intelligent enough to troubleshoot cabling problems',
                isCorrect: false,
                feedback:
                  'Patch panels remain passive cabling components. PoE is about powering endpoints over the network run.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Patching and structured layout',
          href: '#reading-a-small-network-topology',
          note: 'After PoE, the next practical question is how all of these devices fit together in an actual layout.',
        },
      ],
    },
    {
      id: 'reading-a-small-network-topology',
      title: 'Read a Small Network Topology as a Role Chain',
      strapline:
        'The fastest way to understand a diagram is to read each device by the job it performs in the path.',
      overview:
        'Hardware names become far easier to remember once you stop seeing them as isolated boxes and start reading them as a chain of roles. Home networks usually compress many functions into one appliance, while small businesses split them into separate devices for scale, coverage, and control.',
      whyItMatters:
        'This is the bridge between theory and deployment. It helps you explain why a home setup may work with one integrated router, while a multi-room or multi-floor business often needs a router, switch, separate access points, structured patching, and documented PoE links.',
      howItWorks: [
        'A home topology often combines routing, a small switch, and wireless access into one ISP-supplied or consumer router appliance.',
        'A small-business topology more often separates the roles: provider handoff to ONT or modem, then router, then switch, then multiple access points and endpoint runs.',
        'Patch panels provide a physical map between rooms and switch ports, which makes expansion and troubleshooting much more manageable.',
        'Management dashboards often show which switch port an endpoint or access point is attached to, which helps connect the software view back to the physical wiring.',
        'When reading any topology, ask which device is doing conversion, which is acting as gateway, which is distributing local Ethernet, which is bridging wireless traffic, and which links are carrying PoE.',
      ],
      examples: [
        'A home layout may look like ISP -> modem or ONT -> router with built-in Wi-Fi -> desktop, phone, and smart devices.',
        'A two-floor office may look like ISP -> ONT -> router -> switch -> access points on each floor, wall jacks through a patch panel, and wired desktops or phones at the edge.',
        'A switch port marked with PoE or a lightning icon is a strong clue that the endpoint on that run is being powered over Ethernet.',
      ],
      misconceptions: [
        '"A bigger network is just a home router with more clients on it." Growth usually forces roles to separate into dedicated switching, wireless, and structured cabling components.',
        '"If the software map is available, the physical map no longer matters." Real support work often needs both views together.',
        '"Every network diagram is just branding and icons." The point of the diagram is to reveal device roles, uplinks, and access patterns quickly.',
      ],
      recap: [
        'Read network hardware as a path of jobs rather than as a pile of product names.',
        'Home networks often combine roles, while business networks usually separate them.',
        'Structured patching, documented switch ports, and clear PoE planning make larger layouts maintainable.',
      ],
      connections: [
        {
          label: 'Network types and VLANs',
          href: '/topics/why-networking-is-important#network-types-and-access',
          note: 'Use the broader foundations page to connect these hardware layouts to LAN, WLAN, VLAN, and WAN design choices.',
        },
        {
          label: 'Transport and ports',
          href: '/topics/tcp-and-udp-protocols#ports-in-firewalls-and-access-rules',
          note: 'Once the hardware path is clear, service failures often reduce to blocked protocols, ports, or policies.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'modem',
      term: 'Modem',
      definition:
        'A device that converts a provider signal such as cable or DSL into a digital signal your local network equipment can use.',
      importance:
        'It explains why the provider handoff and the router are not always the same hardware function.',
      sectionId: 'provider-edge-and-gateway-devices',
    },
    {
      id: 'ont',
      term: 'Optical Network Terminal',
      definition:
        'A fibre handoff device that converts optical signalling into the electrical Ethernet-style connection used by local network gear.',
      importance:
        'It is the fibre-era equivalent of the conversion role a modem plays on older media.',
      sectionId: 'provider-edge-and-gateway-devices',
    },
    {
      id: 'managed-switch',
      term: 'Managed Switch',
      definition:
        'A switch that allows administrative control over ports, behaviour, and advanced settings instead of only basic connectivity.',
      importance:
        'It is what makes port shutdown, policy tuning, and richer visibility possible in business networks.',
      sectionId: 'switches-access-points-and-endpoint-interfaces',
    },
    {
      id: 'unmanaged-switch',
      term: 'Unmanaged Switch',
      definition:
        'A basic switch that mainly provides connectivity without the same configurable controls offered by managed models.',
      importance:
        'It is useful in simple environments, but it offers less control for support and policy work.',
      sectionId: 'switches-access-points-and-endpoint-interfaces',
    },
    {
      id: 'wireless-access-point',
      term: 'Wireless Access Point',
      definition:
        'A device that bridges wireless clients onto the wired Ethernet network.',
      importance:
        'It clarifies how Wi-Fi access is attached to the rest of the LAN, especially in business environments where the AP is separate from the router.',
      sectionId: 'switches-access-points-and-endpoint-interfaces',
    },
    {
      id: 'patch-panel',
      term: 'Patch Panel',
      definition:
        'A passive termination point that organizes structured cabling and makes it easy to patch room runs into switching equipment.',
      importance:
        'It keeps larger networks maintainable and makes physical tracing much easier than loose cable runs straight into the switch.',
      sectionId: 'switches-access-points-and-endpoint-interfaces',
    },
    {
      id: 'poe-injector',
      term: 'PoE Injector',
      definition:
        'A device placed between a switch and an endpoint to add electrical power onto an Ethernet run.',
      importance:
        'It solves deployment problems when the switch cannot supply the PoE level a device requires.',
      sectionId: 'power-over-ethernet-and-device-power-planning',
    },
    {
      id: 'poe-budget',
      term: 'PoE Budget',
      definition:
        'The available amount of electrical power that a switch or injector can deliver over Ethernet to connected endpoints.',
      importance:
        'It determines whether access points, cameras, phones, and other devices can actually be powered correctly.',
      sectionId: 'power-over-ethernet-and-device-power-planning',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember as a path: the provider signal is converted by a modem or ONT, the router joins WAN to LAN, the switch expands local wired access, the access point bridges wireless clients, the NIC lives inside the endpoint, and PoE solves the power problem for edge devices.',
    memoryFramework: [
      'Start at the provider edge: modem for cable or DSL, ONT for fibre.',
      'Cross the boundary: the router joins outside and inside networks and often hosts gateway services.',
      'Expand the LAN: the switch distributes wired access to many local devices.',
      'Bridge Wi-Fi: the access point connects wireless clients to Ethernet.',
      'Remember the edge details: patch panels organise cabling and NICs live inside the endpoints.',
      'Plan power deliberately: PoE, PoE+, and PoE++ are deployment choices, not just labels.',
    ],
    checklist: [
      'I can explain the difference between a modem or ONT and a router.',
      'I can explain the practical difference between a router and a switch.',
      'I can describe what a wireless access point does in a business network.',
      'I can explain why a patch panel matters even though it is not active network intelligence.',
      'I can describe what a NIC contributes to an endpoint.',
      'I can explain when a PoE injector is needed.',
      'I can recall the rough progression from PoE through PoE++ Type 4.',
      'I can read a home or small-business topology as a chain of device roles.',
    ],
    questions: [
      'Why is it useful to separate the conversion role of a modem or ONT from the gateway role of a router?',
      'What problem does a switch solve that a router alone does not solve in a growing LAN?',
      'Why are access points often separate from the router in business environments?',
      'What does a patch panel improve even though it does not forward traffic?',
      'Why can a device fail even when connected to Ethernet if the PoE level is wrong?',
      'What clues help you recognize which device in a topology is the gateway, the access layer, or the wireless bridge?',
    ],
    pitfalls: [
      'Calling every network box "the router" even when the issue belongs to the modem, ONT, switch, access point, or firewall.',
      'Treating patch panels as optional instead of recognising their value for labelling, tracing, and clean maintenance.',
      'Ignoring the difference between managed and unmanaged switching when planning support visibility and control.',
      'Assuming any PoE-capable port can power any endpoint.',
      'Looking at a topology as a pile of device names instead of as a path of roles from provider edge to client.',
    ],
  },
  relatedTopicSlugs: [
    'why-networking-is-important',
    'intro-to-ip-addressing',
    'tcp-and-udp-protocols',
  ],
};
