import type { StudyTopic } from '../schema';

export const routingBasicsTopic: StudyTopic = {
  slug: 'routing-basics',
  title: 'Routing Basics',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '30 minutes',
  sourceFile: 'Original site extension topic',
  updatedOn: 'March 19, 2026',
  summary:
    'Learn how devices decide whether traffic stays local or goes to a gateway, how route tables and next hops work, and how static and default routes shape packet paths.',
  heroNote:
    'Use this page when IP addressing mostly makes sense but you want to understand how packets actually leave the subnet and reach other networks.',
  tags: ['routing', 'default gateway', 'route table', 'next hop', 'static route'],
  learningObjectives: [
    'Explain why same-subnet traffic behaves differently from off-subnet traffic.',
    'Describe what the default gateway does on a home or small-business network.',
    'Read the role of a route table, a next hop, and a default route.',
    'Explain how static routes differ from the default route and why more specific routes matter.',
    'Trace a simple packet path from a client to a remote network and back.',
    'Connect routing behaviour to addressing, subnetting, NAT, and troubleshooting decisions.',
  ],
  sections: [
    {
      id: 'routing-exists-because-not-every-destination-is-local',
      title: 'Routing Exists Because Not Every Destination Is Local',
      strapline:
        'The first routing question is simple: is the destination on my subnet or not?',
      overview:
        'Devices do not send all traffic the same way. If the destination sits on the same local subnet, the device can communicate directly on that network. If the destination is off-subnet, the traffic has to be handed to a router so it can be forwarded toward another network.',
      whyItMatters:
        'This is the mental split that makes routing understandable. Once you know whether traffic is local or remote, the reason for the default gateway and route table becomes much clearer.',
      howItWorks: [
        'The client uses its IP address and subnet mask to decide whether a destination belongs to the same local subnet.',
        'If the destination is local, the client communicates directly on that subnet without needing the router to forward the packet between networks.',
        'If the destination is remote, the client sends the packet to its default gateway, which is usually the local router.',
        'The router then checks its own routing information to decide where the packet should go next.',
        'This is why a correct subnet mask and correct gateway are both essential to working connectivity.',
      ],
      examples: [
        'A desktop at `192.168.1.10/24` can reach a printer at `192.168.1.50` directly because they are on the same subnet.',
        'That same desktop needs the gateway to reach `192.168.2.50` because that destination is outside the local `192.168.1.0/24` network.',
        'A user may think "the internet is down" when the real problem is simply that the default gateway is missing or wrong.',
      ],
      misconceptions: [
        '"All traffic goes to the router first." Local same-subnet traffic does not need to be routed off the subnet.',
        '"If the IP address looks valid, the route must be valid too." The gateway and subnet mask still determine whether the device can leave the local network properly.',
        '"The gateway is only for internet access." It is for any off-subnet destination, including internal remote networks.',
      ],
      recap: [
        'Routing matters when the destination is outside the local subnet.',
        'Local traffic stays local, while remote traffic is sent to a router or gateway.',
        'Address, mask, and gateway all work together to make this decision possible.',
      ],
      imagePlaceholder: {
        title: 'Same-subnet traffic versus off-subnet traffic',
        label: 'Decision flow',
        description:
          'A visual split between local and remote destinations would make the first routing decision much easier for beginners to internalise.',
        callouts: [
          'Show one device talking directly to a local printer on the same subnet and using the gateway for a remote subnet.',
          'Highlight the client check that uses the IP address and mask to decide local versus remote.',
          'Make it visually clear that not every packet goes to the router first.',
        ],
      },
      connections: [
        {
          label: 'Subnetting and CIDR',
          href: '/topics/subnetting-and-cidr-in-practice',
          note: 'Routing becomes much easier once you are comfortable deciding what is local from the prefix boundary.',
        },
      ],
    },
    {
      id: 'the-default-gateway-and-route-table-shape-the-path',
      title: 'The Default Gateway and Route Table Shape the Path',
      strapline:
        'A router does not guess. It forwards based on what its routing table tells it.',
      overview:
        'The default gateway is the clients local exit point for remote destinations. Inside the router or host, the route table stores the known network paths and the next hops to use for them. If there is no more specific match, the default route becomes the fallback path.',
      whyItMatters:
        'This is the part of routing that turns vague ideas into operational behaviour. When you troubleshoot path problems, you are really asking whether the right route exists and whether the next hop is reachable.',
      howItWorks: [
        'A route table contains destination networks, the prefix that defines them, and the next hop or interface to use.',
        'A default route is the catch-all route used when no more specific route matches. In IPv4 it is commonly written as `0.0.0.0/0`.',
        'On a client, the default gateway is usually the router IP on the local subnet.',
        'On a router, the next hop may be another router, a WAN edge, or a directly connected network interface.',
        'The key logic is simple: if a more specific route exists, it should be preferred over the broad default route.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: a simple client view of local and default routing ideas.',
          code:
            'Client IP:          192.168.10.25/24\nDefault gateway:   192.168.10.1\nLocal network:     192.168.10.0/24\nDefault route:     0.0.0.0/0 via 192.168.10.1',
        },
        'A router with a specific route for `10.20.30.0/24` should use that route instead of sending the traffic out of the generic internet-facing default route.',
        'If the gateway IP is wrong on the client, off-subnet traffic fails even while local traffic may still work.',
      ],
      misconceptions: [
        '"The default gateway and the route table are the same thing." The default gateway is one destination setting on the client, while the route table is the broader set of known path rules.',
        '"A router sends everything out of the same WAN interface no matter what." Specific routes can override the default path.',
        '"If a gateway answers pings, all routing must be healthy." The wrong or missing downstream routes can still break the path beyond that first hop.',
      ],
      recap: [
        'The default gateway is the normal exit point for off-subnet traffic.',
        'The route table stores the network paths and next hops.',
        'The default route is the fallback, not the whole routing story.',
      ],
      imagePlaceholder: {
        title: 'Client gateway and route-table fallback logic',
        label: 'Flow diagram',
        description:
          'This section would benefit from a small route-selection visual instead of leaving the default route as an abstract concept.',
        callouts: [
          'Show a client using the default gateway when no more specific local match exists.',
          'Include a small route-table snippet with a directly connected network and a default route.',
          'Use arrows to show that a more specific route wins before the catch-all path is used.',
        ],
      },
      referenceItems: [
        {
          label: 'Default route',
          value: '0.0.0.0/0',
          detail: 'The catch-all route used when no more specific route exists.',
        },
        {
          label: 'Next hop',
          value: 'Forwarding target',
          detail: 'The next router or interface the packet should be sent to.',
        },
        {
          label: 'Directly connected route',
          value: 'Local network path',
          detail: 'A route the router already knows because the network is attached to one of its interfaces.',
        },
      ],
      connections: [
        {
          label: 'IPv4 and gateway behaviour',
          href: '/topics/dns-and-dhcp#apipa-link-local-and-gateway',
          note: 'The DNS and DHCP page reinforces how important the gateway field is in real client troubleshooting.',
        },
      ],
    },
    {
      id: 'static-routes-and-more-specific-prefixes-guide-traffic-deliberately',
      title: 'Static Routes and More Specific Prefixes Guide Traffic Deliberately',
      strapline:
        'The more precise route should win, which is why subnetting and routing are tightly linked.',
      overview:
        'A static route is a manually defined path to a destination network. It tells the device or router exactly where to forward traffic for that prefix. More specific prefixes matter because routers should prefer the most precise match available rather than the broadest possible route.',
      whyItMatters:
        'This is how routing becomes useful instead of magical. When you understand that a router prefers the best-matching prefix and then forwards to the correct next hop, you can reason about path choices instead of treating them as invisible behaviour.',
      howItWorks: [
        'A static route is created manually by an administrator rather than learned automatically through a routing protocol.',
        'The route includes a destination network and a next hop or exit interface.',
        'A route for `10.10.20.0/24` is more specific than a route for `10.10.0.0/16`, so traffic for `10.10.20.x` should follow the `/24` path if both exist.',
        'This preference for the most specific matching prefix is often described as longest-prefix matching.',
        'In small environments, static routes are common because the topology is stable and easy to describe manually.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: more specific routes win over broader ones.',
          code:
            'Route A: 10.10.0.0/16    via 192.168.1.1\nRoute B: 10.10.20.0/24   via 192.168.1.2\n\nDestination: 10.10.20.55\nChosen route: Route B because /24 is more specific than /16',
        },
        'A small office router may use one static route to reach a lab subnet sitting behind another internal router.',
        'A host can have a working default route and still fail to reach a remote private network if the more specific internal route is missing.',
      ],
      misconceptions: [
        '"The default route is enough for every destination." It is only the fallback when there is no more specific matching path.',
        '"Static routes are only for large enterprise environments." They are common in small, stable topologies too.',
        '"Routers care mainly about the prettiest network name." Routers care about prefix match and next hop, not human-friendly naming.',
      ],
      recap: [
        'Static routes are manually defined paths to specific destination networks.',
        'More specific prefixes should take precedence over broader ones.',
        'This is why subnetting knowledge directly improves routing knowledge.',
      ],
      imagePlaceholder: {
        title: 'Longest-prefix match in practice',
        label: 'Route comparison',
        description:
          'A comparison visual would help learners see why the router prefers the more specific network rather than the broadest one.',
        callouts: [
          'Show two routes, such as /16 and /24, alongside one destination IP.',
          'Highlight the chosen route and state that the longer prefix wins.',
          'Keep the example tight so the takeaway is route specificity rather than platform syntax.',
        ],
      },
      connections: [
        {
          label: 'Subnetting and CIDR',
          href: '/topics/subnetting-and-cidr-in-practice#cidr-prefixes-and-masks-describe-the-same-boundary',
          note: 'Route specificity only makes sense when prefixes and masks already feel natural.',
        },
      ],
    },
    {
      id: 'read-a-small-network-path-end-to-end',
      title: 'Read a Small Network Path End to End',
      strapline:
        'The easiest way to understand routing is to follow one packet through a realistic path.',
      overview:
        'A packet path becomes easier to visualise when you read it as a chain of networks and decisions. The client checks whether the destination is local. If not, it hands the packet to the gateway. The router then uses its route table, forwards to the next hop, and eventually the packet returns the same way or through another valid path.',
      whyItMatters:
        'This turns several separate lessons into one coherent mental model. IP addressing, subnetting, gateways, routers, and NAT all become much easier once you can narrate the path step by step.',
      howItWorks: [
        'The client begins with its own IP, subnet mask, and default gateway configuration.',
        'It determines that the destination is off-subnet and sends the packet to the gateway MAC on the local network.',
        'The router receives the packet, checks the destination prefix against its route table, and forwards it according to the best matching route.',
        'If the packet is heading to the public internet, the edge router may also perform NAT before forwarding the traffic outward.',
        'The reply traffic follows a valid return path back through routers and eventually back to the original client.',
      ],
      examples: [
        'A laptop on `192.168.1.25/24` opening a website needs the gateway for both DNS lookups and HTTPS traffic because both destinations are off-subnet.',
        'A packet to a server on another internal VLAN may still be remote even though it sits inside the same building, because it is a different subnet and needs routing.',
        {
          type: 'code',
          intro:
            'Example: read the packet path in role order.',
          code:
            'Client -> default gateway -> router decision -> next hop -> remote network\n\nIf internet-bound:\nClient -> gateway/router -> NAT at edge -> ISP -> remote service',
        },
      ],
      misconceptions: [
        '"Only internet traffic is routed." Any off-subnet traffic is routed, even between internal VLANs.',
        '"Routing starts only after DNS." DNS queries themselves often need the route to reach the resolver if the resolver is off-subnet.',
        '"NAT is the same thing as routing." NAT rewrites addressing at the edge; routing decides where to forward traffic.',
      ],
      recap: [
        'The client decides local versus remote first.',
        'The gateway and route table then determine the forwarding path.',
        'Routing and NAT often work together, but they are not the same function.',
      ],
      imagePlaceholder: {
        title: 'End-to-end packet path across a small network',
        label: 'Packet path diagram',
        description:
          'A left-to-right packet journey would tie several lessons together and make the section much easier to scan.',
        callouts: [
          'Show client -> default gateway -> router decision -> edge -> remote network -> return path.',
          'Optionally annotate where NAT can appear at the edge without implying it is the same as routing.',
          'Use short labels for local subnet, next hop, and remote destination.',
        ],
      },
      connections: [
        {
          label: 'Networking hardware',
          href: '/topics/networking-hardware#provider-edge-and-gateway-devices',
          note: 'The hardware page gives the physical device roles that sit underneath this routing logic.',
        },
        {
          label: 'Troubleshooting workflow',
          href: '/topics/network-troubleshooting-workflow',
          note: 'The troubleshooting page shows how to prove which part of this path has failed when users report a connectivity problem.',
        },
        {
          label: 'NAT, PAT, and port forwarding',
          href: '/topics/nat-pat-and-port-forwarding',
          note: 'Use the NAT page if you want the edge translation step separated clearly from the routing decision itself.',
        },
      ],
    },
    {
      id: 'routing-problems-often-pretend-to-be-application-problems',
      title: 'Routing Problems Often Pretend to Be Application Problems',
      strapline:
        'Users rarely report "missing route". They report "the app does not work".',
      overview:
        'Routing faults often surface as higher-level symptoms. A user may not be able to reach a remote share, a website, a VPN resource, or another internal subnet. The common thread is that the path to the remote network is wrong, missing, or blocked at some point.',
      whyItMatters:
        'This is where routing knowledge becomes practical support value. If you can separate local communication, gateway reachability, and remote-network routing, you can narrow the problem much faster than by testing the application alone.',
      howItWorks: [
        'If local communication works but off-subnet communication fails, the gateway or routing path becomes a strong suspect.',
        'If the gateway is reachable but the remote network still fails, the missing or incorrect route may be farther upstream.',
        'If one remote network fails but the internet works, the default route may be fine while a more specific route is missing.',
        'Troubleshooting tools such as `ipconfig /all`, `ping`, `tracert`, and `route print` help prove where the path breaks.',
      ],
      examples: [
        'A user who can print locally but cannot reach a server on another VLAN may be facing an inter-VLAN routing issue rather than a printer or application issue.',
        'A branch office that reaches the internet but not a head-office subnet may have a missing static route while the default route still works perfectly.',
        'A host with the wrong default gateway may still talk to neighbours on the same subnet, which can mislead users into thinking the general network is healthy.',
      ],
      misconceptions: [
        '"If one site can browse the web, routing must be healthy everywhere." Internet access only proves that at least one path works.',
        '"Application failure means application debugging should come first." The network path still needs to be proven before drawing that conclusion.',
        '"A reachable gateway guarantees a reachable remote network." The problem may still exist beyond that first hop.',
      ],
      recap: [
        'Routing faults often appear as remote-resource or application failures.',
        'The right question is whether the path to the destination network exists and is being selected correctly.',
        'Good routing troubleshooting separates local success from remote failure deliberately.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the routing logic',
        intro:
          'Use these questions to confirm that you can separate local traffic, default-gateway use, and specific-route behaviour.',
        questions: [
          {
            prompt:
              'When does a client normally use its default gateway?',
            options: [
              {
                label: 'When the destination is outside the local subnet',
                isCorrect: true,
                feedback:
                  'Correct. The gateway is used for off-subnet traffic rather than for same-subnet communication.',
              },
              {
                label: 'For every packet, including local same-subnet traffic',
                isCorrect: false,
                feedback:
                  'Local traffic does not need to be routed off the subnet first.',
              },
              {
                label: 'Only when the destination is on the same switch',
                isCorrect: false,
                feedback:
                  'Switch location does not define the gateway rule. The subnet boundary does.',
              },
            ],
          },
          {
            prompt:
              'What is the purpose of the default route `0.0.0.0/0`?',
            options: [
              {
                label: 'It is the fallback route when no more specific route matches',
                isCorrect: true,
                feedback:
                  'Correct. The default route is the catch-all path for destinations that do not match a more specific prefix.',
              },
              {
                label: 'It always overrides every specific route in the table',
                isCorrect: false,
                feedback:
                  'The opposite is true. More specific routes should be preferred.',
              },
              {
                label: 'It is used only for local same-subnet traffic',
                isCorrect: false,
                feedback:
                  'Local same-subnet traffic does not need the default route to leave the subnet.',
              },
            ],
          },
          {
            prompt:
              'If both `10.10.0.0/16` and `10.10.20.0/24` exist in the route table, which route should be used for `10.10.20.55`?',
            options: [
              {
                label: '`10.10.20.0/24` because it is the more specific match',
                isCorrect: true,
                feedback:
                  'Correct. The longer, more specific prefix should win.',
              },
              {
                label: '`10.10.0.0/16` because it is broader and therefore safer',
                isCorrect: false,
                feedback:
                  'Routing should prefer the more specific route, not the broader one.',
              },
              {
                label: 'Whichever route was added most recently',
                isCorrect: false,
                feedback:
                  'The important rule here is prefix specificity, not simple insertion order.',
              },
            ],
          },
          {
            prompt:
              'A client can reach another host on the same subnet but cannot reach anything remote. What is one of the strongest first suspects?',
            options: [
              {
                label: 'A missing or incorrect default gateway',
                isCorrect: true,
                feedback:
                  'Correct. Local traffic can still work while off-subnet traffic fails if the gateway configuration is wrong.',
              },
              {
                label: 'The local NIC cannot talk on the subnet at all',
                isCorrect: false,
                feedback:
                  'If same-subnet communication is working, the local NIC is at least functioning to some degree.',
              },
              {
                label: 'The host has forgotten its own IP address completely',
                isCorrect: false,
                feedback:
                  'The symptom points more strongly toward a routing boundary problem than to total loss of local addressing.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Network troubleshooting workflow',
          href: '/topics/network-troubleshooting-workflow',
          note: 'Use the workflow page if you want the actual step-by-step command sequence for proving whether the route, gateway, or name-resolution path is the real fault.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'default-gateway',
      term: 'Default Gateway',
      definition:
        'The router or boundary device a client uses to send traffic toward destinations outside its local subnet.',
      importance:
        'It is the normal exit point for off-subnet traffic and one of the most important client settings in basic networking.',
      sectionId: 'routing-exists-because-not-every-destination-is-local',
    },
    {
      id: 'route-table',
      term: 'Route Table',
      definition:
        'A set of known network paths that tells a host or router which next hop or interface to use for different destination networks.',
      importance:
        'It is the structure that turns routing from a guess into an actual forwarding decision.',
      sectionId: 'the-default-gateway-and-route-table-shape-the-path',
    },
    {
      id: 'default-route',
      term: 'Default Route',
      definition:
        'The fallback route used when no more specific path matches a destination, commonly written as `0.0.0.0/0` in IPv4.',
      importance:
        'It explains how internet-bound traffic usually leaves a small network without a custom route for every possible destination.',
      sectionId: 'the-default-gateway-and-route-table-shape-the-path',
    },
    {
      id: 'next-hop',
      term: 'Next Hop',
      definition:
        'The next router or forwarding target a packet should be sent to on its way to the destination network.',
      importance:
        'It is the immediate forwarding instruction inside a route entry.',
      sectionId: 'the-default-gateway-and-route-table-shape-the-path',
    },
    {
      id: 'static-route',
      term: 'Static Route',
      definition:
        'A manually configured path to a destination network that specifies the next hop or exit interface to use.',
      importance:
        'It is common in smaller, stable topologies where the path is easy to describe directly.',
      sectionId: 'static-routes-and-more-specific-prefixes-guide-traffic-deliberately',
    },
    {
      id: 'longest-prefix-match',
      term: 'Longest Prefix Match',
      definition:
        'The routing rule that prefers the most specific matching route when several routes could match the same destination.',
      importance:
        'It explains why the best route is not always the broadest or default route.',
      sectionId: 'static-routes-and-more-specific-prefixes-guide-traffic-deliberately',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember as a forwarding decision chain: first decide whether the destination is local or remote, then send remote traffic to the default gateway, then let the router choose the best matching route based on its route table, next hop, and prefix specificity.',
    memoryFramework: [
      'Start local: same-subnet traffic does not need to be routed off the subnet.',
      'Start remote: off-subnet traffic goes to the default gateway.',
      'Remember the route table: routers forward based on destination networks and next hops.',
      'Remember the default route as the fallback, not the whole routing story.',
      'Remember that the most specific matching route should win.',
      'Connect routing to subnetting, because prefixes define the boundaries routing is comparing.',
    ],
    checklist: [
      'I can explain the difference between local same-subnet traffic and off-subnet traffic.',
      'I can explain what the default gateway does.',
      'I can explain what a route table stores.',
      'I can explain what a next hop is.',
      'I can explain why a default route is useful but not enough to describe every path.',
      'I can explain why a more specific route should be preferred over a broader one.',
      'I can narrate a simple packet path from a client to a remote destination.',
    ],
    questions: [
      'Why can two devices on different VLANs in the same building still require routing to talk to each other?',
      'Why is the default gateway setting so important on a client even when the IP address and mask look correct?',
      'Why does a route table matter more than a users idea of what feels "nearby" on the network?',
      'Why can a missing static route break one remote subnet while internet access still works?',
      'What does it mean when the most specific route wins?',
      'Why does good routing knowledge often solve what first looked like an application problem?',
    ],
    pitfalls: [
      'Thinking that every packet always goes to the router first.',
      'Treating the default route as if it overrides all specific routes.',
      'Forgetting that routing decisions are based on prefixes and destination networks, not just on individual IP familiarity.',
      'Confusing NAT with routing instead of seeing them as separate edge functions that often work together.',
      'Ignoring the gateway setting when only off-subnet destinations are failing.',
    ],
  },
  relatedTopicSlugs: [
    'subnetting-and-cidr-in-practice',
    'ipv4-addresses',
    'nat-pat-and-port-forwarding',
    'network-troubleshooting-workflow',
  ],
};
