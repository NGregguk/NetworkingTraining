import type { StudyTopic } from '../schema';

export const planningHomeAndSmallBusinessNetworksTopic: StudyTopic = {
  slug: 'planning-a-basic-home-and-small-business-network',
  title: 'Planning a Basic Home and Small Business Network',
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
    'Learn a practical four-step workflow for choosing the ISP, securing the router, segmenting traffic, configuring devices, and optimizing a home or small-business network.',
  heroNote:
    'Use this page when you want to pull the whole course together into one realistic build sequence instead of leaving the ideas as isolated concepts.',
  tags: ['network planning', 'VLAN', 'QoS', 'home office', 'guest network'],
  learningObjectives: [
    'Choose an internet service based on local availability, speed shape, and deployment needs.',
    'Apply secure-first router setup steps such as changing default credentials and reviewing advanced settings.',
    'Design DHCP ranges, VLANs, and SSID layouts that separate trusted, guest, and IoT traffic cleanly.',
    'Configure client devices with sensible dynamic defaults while reserving static addressing for the right cases.',
    'Improve network quality through better access-point placement, mesh or extender use, and QoS prioritisation.',
    'Connect planning decisions back to the hardware, wireless, and service concepts covered across the course.',
  ],
  sections: [
    {
      id: 'choose-and-bring-in-the-internet-service',
      title: 'Choose and Bring In the Internet Service',
      strapline:
        'The first design decision is the provider handoff, because every later choice depends on what reaches the building.',
      overview:
        'A new home or small office network starts with choosing the right ISP based on local availability, features, and price. Once that decision is made, the provider usually delivers the edge equipment needed for the chosen medium, such as an ONT for fibre or a combined gateway appliance for some consumer services.',
      whyItMatters:
        'A strong internal design cannot compensate for a weak or unsuitable provider decision. The external link determines the available upload and download profile, latency, failover options, and even what edge hardware sits at the front of the network.',
      howItWorks: [
        'Start by checking what providers and media types are actually available at the address.',
        'Compare not just price, but also download speed, upload speed, reliability, support options, and whether the service is symmetric.',
        'A fibre service often delivers an ONT and a router, or sometimes an integrated appliance, and the initial physical setup is usually straightforward once the provider has provisioned the line.',
        'The edge hardware becomes the starting point for all later network design because the local router and switching design will sit behind it.',
      ],
      examples: [
        'A work-from-home setup that uploads large files or hosts lab services often benefits more from symmetric fibre than from a cable plan with similar headline download speed.',
        'A small office may keep a 5G backup option on hand if losing the main wired ISP would stop business operations.',
        'A basic new-house build may begin with provider fibre -> ONT -> router in the living room before any local segmentation decisions are made.',
      ],
      misconceptions: [
        '"The ISP choice is just a pricing decision." In practice it shapes performance, resilience, and the whole edge layout.',
        '"Once the provider equipment is installed, the planning is finished." The provider handoff is only the start of the local design.',
        '"A fast advertised download speed means the service is ideal for work." Upload symmetry and latency may be more important depending on the workload.',
      ],
      recap: [
        'Choose the provider based on availability, performance shape, and operational need.',
        'Understand what edge hardware the provider is delivering.',
        'Treat the provider handoff as the first layer of the local design, not as a separate concern.',
      ],
      referenceItems: [
        {
          label: 'Fibre example',
          value: '3 Gbps down / 3 Gbps up',
          detail: 'Illustrates why symmetric services are especially attractive for demanding home-office or small-business use.',
        },
        {
          label: 'Edge hardware',
          value: 'ONT plus router',
          detail: 'Common for fibre-based residential or small-business service delivery.',
        },
      ],
      connections: [
        {
          label: 'Internet connection types',
          href: '/topics/network-types-and-internet-connections#wired-internet-access-trades-speed-symmetry-and-availability',
          note: 'Use the dedicated access page if you want a sharper comparison of fibre, cable, DSL, cellular, satellite, and WISP choices.',
        },
      ],
    },
    {
      id: 'secure-and-configure-the-core-network',
      title: 'Secure and Configure the Core Network',
      strapline:
        'The most important configuration step is not fancy. It is refusing to leave the default state in place.',
      overview:
        'After the provider connection works, the next stage is configuring the local network intentionally. That means finding the router management IP, changing the default administrator credentials immediately, reviewing advanced settings, creating useful VLANs, setting DHCP scopes and lease behaviour, choosing DNS, and defining the wireless layout.',
      whyItMatters:
        'Most avoidable small-network risk starts here. Default credentials, flat trust zones, poorly planned DHCP ranges, and thoughtless wireless defaults create problems that are much harder to clean up later.',
      howItWorks: [
        'Find the router management IP and change the administrator password before making other changes.',
        'Create VLANs or separate logical networks for the default trusted environment, guests, and IoT devices when the hardware supports it.',
        'Configure DHCP scopes deliberately, including subnet choice, address range, and lease duration per network segment.',
        'Keep any planned static addresses outside the active DHCP pool so there is no risk of duplicate assignment.',
        'Choose DNS behaviour either from the ISP defaults or from public or internal resolvers that better fit the environment.',
        'Set SSIDs, band behaviour, and channels with intent rather than leaving every wireless choice on a blind default.',
      ],
      examples: [
        'A guest VLAN might use shorter DHCP leases than the default internal VLAN because devices come and go more often.',
        'A trusted network might reserve lower addresses for servers and infrastructure while the DHCP pool begins higher in the subnet.',
        'A home can run one SSID for normal devices, one for guests, and one for IoT, even if the same access points are broadcasting all three.',
      ],
      misconceptions: [
        '"Default router credentials are fine on a home network." They are one of the first things that should be changed.',
        '"A flat network is simpler, so it must be better." Flat can mean easier to start, but also easier to misuse and harder to secure.',
        '"DHCP range planning is only for enterprises." Even a small network benefits from predictable address boundaries and separation.',
      ],
      recap: [
        'Change default admin credentials immediately.',
        'Segment trusted, guest, and IoT traffic where practical.',
        'Plan DHCP, DNS, and wireless settings deliberately instead of inheriting every default.',
      ],
      referenceItems: [
        {
          label: 'Guest lease example',
          value: '24 hours',
          detail: 'Shorter leases suit high-turnover client groups more naturally.',
        },
        {
          label: 'Trusted network lease example',
          value: '30 days',
          detail: 'Longer leases are often fine for stable devices that return regularly.',
        },
        {
          label: 'Public DNS example',
          value: '8.8.8.8 / 8.8.4.4',
          detail: 'An example of manually chosen resolver settings instead of ISP defaults.',
        },
      ],
      connections: [
        {
          label: 'DNS and DHCP lesson',
          href: '/topics/dns-and-dhcp',
          note: 'Use the focused service page if you want the lease, gateway, APIPA, and resolver logic behind these planning choices.',
        },
        {
          label: 'Wireless technologies',
          href: '/topics/wireless-networking-technologies#bands-and-channels-shape-range-congestion-and-throughput',
          note: 'Wireless planning improves when you reconnect channel and band choices to the actual spectrum tradeoffs.',
        },
      ],
    },
    {
      id: 'connect-devices-with-sensible-addressing-defaults',
      title: 'Connect Devices With Sensible Addressing Defaults',
      strapline:
        'Most client devices should be easy to join. Predictability matters, but over-configuring every endpoint creates its own problems.',
      overview:
        'Once the network foundation is ready, end devices can be connected through Wi-Fi or Ethernet. In most home and small-business cases, clients should use dynamic addressing by default, while only a smaller set of devices or lab services need carefully chosen static IPs outside the DHCP pool.',
      whyItMatters:
        'Many small networks become harder to manage because too many endpoints are manually configured without a real reason. Dynamic defaults reduce mistakes, while selective static addressing preserves predictability only where it is genuinely useful.',
      howItWorks: [
        'Wireless clients usually just need the correct SSID and password to join the right network.',
        'Wired clients usually connect as soon as they are patched into the right switch port or wall jack.',
        'Most devices should remain on dynamic IP addressing because DHCP handles the normal gateway, DNS server, and address assignment automatically.',
        'Static addressing is more appropriate for devices or services that need a predictable location, such as a home lab host, internal service, or management interface.',
        'When static addressing is used, the IP should sit outside the DHCP allocation pool while still remaining inside the correct subnet.',
      ],
      examples: [
        'A laptop, phone, tablet, and smart TV are usually better left on dynamic addressing.',
        'A small web lab server at home may need a predictable internal IP so DNS, bookmarks, or port forwarding rules continue to point at the same host.',
        'A wired desktop in the home office may just need the correct VLAN or switch-port placement, not a fully manual IP configuration.',
      ],
      misconceptions: [
        '"Static IPs are more professional, so every device should have one." Most clients are easier to manage dynamically.',
        '"If DHCP is configured, static devices can be placed anywhere in the subnet." They should be kept outside the active pool to avoid conflicts.',
        '"Wired devices need more manual setup than wireless devices." Often the opposite is true once the switch path is already correct.',
      ],
      recap: [
        'Most endpoints should use dynamic addressing by default.',
        'Static IPs are best reserved for services or devices that truly need predictable placement.',
        'Addressing discipline is about avoiding unnecessary manual work and avoiding conflicts at the same time.',
      ],
      connections: [
        {
          label: 'Intro to IP addressing',
          href: '/topics/intro-to-ip-addressing',
          note: 'Use the dedicated addressing lesson if you want the logic behind gateway, DNS, subnet, and static-versus-dynamic choices in more depth.',
        },
      ],
    },
    {
      id: 'optimize-for-coverage-capacity-and-priority',
      title: 'Optimise for Coverage, Capacity, and Priority',
      strapline:
        'Once the network works, optimisation is about fit, not vanity.',
      overview:
        'Optimisation starts after the baseline setup works. Weak coverage can call for more access points, extenders, or a mesh design. Traffic priority can be improved through QoS. Health and density warnings in management tools can reveal where the physical design or wireless placement needs refinement.',
      whyItMatters:
        'The network can be technically operational and still feel poor in real use. Optimisation turns a merely working setup into one that suits the space, the users, and the most important workloads.',
      howItWorks: [
        'If coverage is weak, the answer is often better access-point placement or additional access points rather than just buying more raw internet bandwidth.',
        'In consumer environments, extenders or mesh systems may be the easiest way to improve coverage across a larger home.',
        'In more managed environments, controller or router dashboards can reveal access-point health, density warnings, and client experience indicators.',
        'Quality of Service, or QoS, lets you prioritise traffic based on factors such as MAC address, IP address, port, or application.',
        'That means a work desktop or business application can be favoured over lower-priority streaming or guest activity when the network is busy.',
      ],
      examples: [
        'A home office desktop can be prioritised above a living-room streaming device when work stability matters more than entertainment traffic.',
        'An access point in a dead zone may need a better location or a companion AP rather than a more expensive ISP plan.',
        'A mesh kit can be the practical answer in a multi-room house where a single ISP router cannot cover the whole property cleanly.',
      ],
      misconceptions: [
        '"Slow Wi-Fi means I need a faster ISP plan." Coverage and interference are often the real bottleneck.',
        '"QoS is only for large enterprises." Even home or small-office networks can benefit when one class of traffic matters more than another.',
        '"If all devices can connect, the access-point layout must be good enough." Connection alone does not prove good capacity or user experience.',
      ],
      recap: [
        'Optimisation is about coverage, density, and priority, not just larger bandwidth numbers.',
        'More access points, mesh, or better placement often solve problems that bandwidth upgrades do not.',
        'QoS helps protect the most important traffic when the network is under load.',
      ],
      referenceItems: [
        {
          label: 'QoS',
          value: 'Traffic prioritisation',
          detail: 'Can prioritise by MAC, IP, port, or application depending on the platform.',
        },
        {
          label: 'Mesh or extender',
          value: 'Coverage expansion',
          detail: 'Useful in homes where one router location cannot provide strong coverage everywhere.',
        },
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the planning sequence',
        intro:
          'Use these questions to confirm that you can move from provider choice to segmentation and then into optimisation without losing the logic of the build.',
        questions: [
          {
            prompt:
              'What is the first security step you should take after gaining access to the new router management interface?',
            options: [
              {
                label: 'Change the default administrator password',
                isCorrect: true,
                feedback:
                  'Correct. Secure-first setup starts by removing the default credentials before refining the rest of the configuration.',
              },
              {
                label: 'Assign static IPs to every client device',
                isCorrect: false,
                feedback:
                  'That creates unnecessary work and is not the first security priority.',
              },
              {
                label: 'Enable the widest possible Wi-Fi channel on every band',
                isCorrect: false,
                feedback:
                  'That is an optimisation choice, not the immediate security step.',
              },
            ],
          },
          {
            prompt:
              'Why should planned static IPs stay outside the active DHCP range?',
            options: [
              {
                label:
                  'To avoid the DHCP server accidentally assigning the same address to a different device',
                isCorrect: true,
                feedback:
                  'Correct. Keeping static addresses outside the lease pool prevents duplicate-address conflicts.',
              },
              {
                label:
                  'Because static addresses cannot exist in the same subnet as DHCP clients',
                isCorrect: false,
                feedback:
                  'They can share the same subnet. The important point is staying outside the active lease pool.',
              },
              {
                label:
                  'Because devices with static addresses do not need DNS or a gateway',
                isCorrect: false,
                feedback:
                  'Static devices still need correct gateway and DNS information if they are to communicate properly.',
              },
            ],
          },
          {
            prompt:
              'A house has acceptable internet speed at the router but poor Wi-Fi in distant rooms. What is the best first optimisation direction?',
            options: [
              {
                label:
                  'Improve coverage with additional access points, a mesh system, or a better AP layout',
                isCorrect: true,
                feedback:
                  'Correct. This is a coverage problem first, not automatically an ISP bandwidth problem.',
              },
              {
                label:
                  'Replace all dynamic client addressing with static IPs',
                isCorrect: false,
                feedback:
                  'That does not solve weak signal or coverage gaps.',
              },
              {
                label:
                  'Remove the guest and IoT segmentation so every device uses one large flat network',
                isCorrect: false,
                feedback:
                  'That would reduce control without addressing the real coverage issue.',
              },
            ],
          },
          {
            prompt:
              'What is QoS mainly for in a home or small-business network?',
            options: [
              {
                label:
                  'Prioritizing more important traffic when the network is busy',
                isCorrect: true,
                feedback:
                  'Correct. QoS helps important workloads keep better experience under congestion.',
              },
              {
                label:
                  'Automatically converting all dynamic clients into static ones',
                isCorrect: false,
                feedback:
                  'QoS deals with traffic priority, not address assignment method.',
              },
              {
                label:
                  'Replacing the need for wireless access points',
                isCorrect: false,
                feedback:
                  'QoS helps with prioritisation, not physical wireless coverage.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Networking tools',
          href: '/topics/networking-tools',
          note: 'The tools page pairs well with this section because optimisation works better when you can prove the problem before changing the design.',
        },
        {
          label: 'Advanced DNS records',
          href: '/topics/advanced-dns-records',
          note: 'Once the local network is stable, the next layer is publishing and protecting named services with the right DNS records.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'isp-handoff',
      term: 'ISP Handoff',
      definition:
        'The provider-delivered connection and edge equipment that present internet access to the local network.',
      importance:
        'It is the starting point for every later routing, switching, and wireless design decision.',
      sectionId: 'choose-and-bring-in-the-internet-service',
    },
    {
      id: 'ssid',
      term: 'SSID',
      definition:
        'The network name broadcast by a wireless network for clients to discover and join.',
      importance:
        'It is often the visible front end of a deeper segmentation or policy decision.',
      sectionId: 'secure-and-configure-the-core-network',
    },
    {
      id: 'dhcp-scope',
      term: 'DHCP Scope',
      definition:
        'The subnet and address range from which a DHCP server leases addresses to clients.',
      importance:
        'It is central to clean address planning and to keeping static assignments outside the active pool.',
      sectionId: 'secure-and-configure-the-core-network',
    },
    {
      id: 'static-ip',
      term: 'Static IP Address',
      definition:
        'A manually assigned IP configuration used when a device needs a predictable address.',
      importance:
        'It is useful for services and infrastructure, but overuse makes a small network harder to manage.',
      sectionId: 'connect-devices-with-sensible-addressing-defaults',
    },
    {
      id: 'qos',
      term: 'Quality of Service',
      definition:
        'A set of controls used to prioritise some network traffic over other traffic during congestion.',
      importance:
        'It helps protect important workloads such as work or business traffic when bandwidth is contested.',
      sectionId: 'optimize-for-coverage-capacity-and-priority',
    },
    {
      id: 'mesh-network',
      term: 'Mesh Network',
      definition:
        'A multi-node wireless coverage design used to improve Wi-Fi reach across a larger home or office.',
      importance:
        'It is a common practical answer when one router location cannot provide strong coverage everywhere.',
      sectionId: 'optimize-for-coverage-capacity-and-priority',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember as a four-step rollout. First choose the right provider and understand the handoff. Then secure and configure the router, VLANs, DHCP, DNS, and SSIDs. Next attach devices with dynamic defaults and selective static assignments. Finally optimise coverage, density, and traffic priority with better AP design and QoS.',
    memoryFramework: [
      'Choose the ISP and edge handoff first.',
      'Change default admin credentials immediately.',
      'Segment trusted, guest, and IoT traffic where practical.',
      'Plan DHCP ranges and keep static addresses outside them.',
      'Let most clients stay dynamic.',
      'Optimise coverage with layout, mesh, or extra APs before blaming bandwidth.',
      'Use QoS when one kind of traffic matters more than another.',
    ],
    checklist: [
      'I can explain how the ISP choice affects the rest of the local network design.',
      'I can describe the first secure-setup actions on a new router.',
      'I can explain why VLANs or separate SSIDs are useful for guests and IoT devices.',
      'I can explain why static addresses should stay outside the DHCP range.',
      'I can explain why most clients are easier to manage dynamically.',
      'I can explain when a coverage issue calls for more APs or mesh rather than more ISP bandwidth.',
      'I can explain what QoS is protecting and when it is worth using.',
    ],
    questions: [
      'Why is the provider choice more than just a price comparison?',
      'Why should router hardening happen before the network grows around insecure defaults?',
      'Why does a guest or IoT segment improve both clarity and security?',
      'Why is manual addressing on every endpoint usually the wrong default?',
      'Why do weak-signal complaints often point to access-point layout rather than to ISP speed?',
      'What kinds of traffic deserve QoS priority in a home-office or small-business environment?',
    ],
    pitfalls: [
      'Leaving the router in its default-admin state for too long.',
      'Building a flat network when guests and IoT devices should be separated.',
      'Overusing static IP addresses and creating unnecessary management overhead.',
      'Placing static devices inside the live DHCP pool.',
      'Treating coverage problems as if they are always bandwidth problems.',
      'Ignoring QoS when the network serves both critical work and lower-priority entertainment or guest traffic.',
    ],
  },
  relatedTopicSlugs: [
    'network-types-and-internet-connections',
    'networking-tools',
    'advanced-dns-records',
  ],
};
