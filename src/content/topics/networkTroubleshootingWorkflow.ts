import type { StudyTopic } from '../schema';

export const networkTroubleshootingWorkflowTopic: StudyTopic = {
  slug: 'network-troubleshooting-workflow',
  title: 'Network Troubleshooting Workflow',
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
    'Learn a disciplined way to diagnose network problems by checking scope, physical state, IP settings, DNS, route path, and listening services in a sensible order.',
  heroNote:
    'Use this page when you want a practical support workflow that stops you from jumping straight to random fixes and instead proves what is actually broken.',
  tags: ['troubleshooting', 'ping', 'tracert', 'nslookup', 'arp', 'netstat'],
  learningObjectives: [
    'Start a network investigation by narrowing the symptom, scope, and recent changes.',
    'Separate physical-link, local-addressing, name-resolution, and remote-path problems.',
    'Use core troubleshooting commands such as `ipconfig /all`, `ping`, `tracert`, `pathping`, `nslookup`, `arp -a`, and `netstat -ano` appropriately.',
    'Interpret simple test results rather than running commands without a reason.',
    'Change one thing at a time and document what the evidence is saying.',
    'Use a repeatable workflow that scales from home support to small-business troubleshooting.',
  ],
  sections: [
    {
      id: 'start-with-scope-symptom-and-whats-changed',
      title: 'Start With Scope, Symptom, and What Changed',
      strapline:
        'The first troubleshooting tool is not a command. It is the quality of the question you ask.',
      overview:
        'Good troubleshooting begins by tightening the problem statement. Is one device affected or many? Is the issue all connectivity, one website, one remote share, one printer, one VLAN, or only Wi-Fi in one room? Did anything change just before the failure appeared?',
      whyItMatters:
        'If the problem is framed poorly, every later command becomes less useful. The aim is to reduce the failure domain before you start touching the network.',
      howItWorks: [
        'Ask whether the issue affects one device, one user group, one service, one location, or the whole site.',
        'Ask whether the symptom is total loss of connectivity, name-resolution failure, poor speed, intermittent loss, or access to only one remote resource.',
        'Ask what changed recently, such as a new cable, new access point, new DNS setting, new firewall rule, or new ISP issue.',
        'Use that scope to decide whether you should start locally on the client, at a shared service, or at a wider network boundary.',
      ],
      examples: [
        'If only one laptop cannot browse, the starting point is different from a whole office losing internet access at the same time.',
        'If every user can reach external websites but not one internal file share, the likely failure domain is narrower than "the network".',
        'If the issue began right after a router or VLAN change, that change should be part of the first hypothesis rather than a late discovery.',
      ],
      misconceptions: [
        '"No internet" is a useful enough symptom description. It usually is not.',
        '"The fastest way to solve a fault is to start changing settings immediately." That often destroys the evidence you need.',
        '"If users describe the same symptom, the root cause must be the same." Similar symptoms can still come from different failure points.',
      ],
      recap: [
        'Define the scope before you touch the tools.',
        'Ask what changed, who is affected, and what specifically fails.',
        'A smaller failure domain makes every later test more meaningful.',
      ],
      connections: [
        {
          label: 'Routing basics',
          href: '/topics/routing-basics#routing-problems-often-pretend-to-be-application-problems',
          note: 'The routing page shows why many users report an application symptom even though the real issue is path selection or gateway logic.',
        },
      ],
    },
    {
      id: 'check-link-state-and-local-configuration-first',
      title: 'Check Link State and Local Configuration First',
      strapline:
        'Before testing the whole path, prove the client has a working local starting point.',
      overview:
        'The next step is to confirm that the client is actually connected and configured. That means checking physical link or Wi-Fi association, then inspecting the adapter configuration to see the IP address, subnet mask, gateway, DNS server, DHCP information, and lease details.',
      whyItMatters:
        'Many faults are much simpler than they first appear. A disabled adapter, disconnected cable, wrong SSID, missing gateway, or APIPA address can make every higher-level test misleading unless you notice it first.',
      howItWorks: [
        'Check whether the Ethernet link or Wi-Fi connection is actually up and whether the client is on the expected network.',
        'Use `ipconfig /all` on Windows to inspect the adapters current IP settings and service information.',
        'Look for the IPv4 address, subnet mask, default gateway, DNS server, DHCP server, lease times, and physical address.',
        'A `169.254.x.x` IPv4 address is a strong clue that DHCP did not complete successfully.',
        'If the gateway or DNS server is missing or clearly wrong, the problem may already be explained before further testing.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: `ipconfig /all` is one of the fastest ways to turn guesswork into evidence.',
          code:
            'IPv4 Address . . . . . . . . . . : 192.168.10.25\nSubnet Mask  . . . . . . . . . . : 255.255.255.0\nDefault Gateway . . . . . . . . . : 192.168.10.1\nDNS Servers . . . . . . . . . . . : 192.168.10.1\nDHCP Server . . . . . . . . . . . : 192.168.10.1',
        },
        {
          type: 'code',
          intro:
            'Example: a fallback APIPA address points to a client-side configuration failure rather than healthy internet access.',
          code:
            'IPv4 Address . . . . . . . . . . : 169.254.88.14\nDefault Gateway . . . . . . . . . :',
        },
        'A user on the guest SSID may be connected successfully but still unable to reach an internal service because they are on the wrong network for that purpose.',
      ],
      misconceptions: [
        '"If the Wi-Fi icon says connected, the configuration must be correct." Association and correct configuration are not the same thing.',
        '"You can skip adapter inspection and go straight to remote tests." Local misconfiguration often invalidates those later tests.',
        '"A self-assigned IPv4 address is close enough to normal." It usually means DHCP failed and the client is only in a limited fallback state.',
      ],
      recap: [
        'Prove the link and the local IP configuration first.',
        'Use `ipconfig /all` to read the clients real state rather than assuming it.',
        'Fixing an obvious local configuration problem often ends the incident quickly.',
      ],
      connections: [
        {
          label: 'DNS and DHCP lesson',
          href: '/topics/dns-and-dhcp#reading-dns-and-dhcp-on-a-real-client',
          note: 'The dedicated service page goes deeper on lease timing, APIPA, gateway meaning, and how to read the adapter output accurately.',
        },
      ],
    },
    {
      id: 'separate-reachability-from-name-resolution',
      title: 'Separate Reachability From Name Resolution',
      strapline:
        'One of the highest-value troubleshooting habits is proving whether the problem is DNS or the path itself.',
      overview:
        'Once local configuration looks sensible, the next job is to separate raw reachability from naming. A host can reach an IP but fail to resolve a name, or resolve a name but still fail on the actual service path. Good troubleshooting deliberately distinguishes those cases.',
      whyItMatters:
        'This single distinction resolves a large number of "the internet is down" complaints. If IP reachability works but names fail, DNS becomes the likely focus. If neither works, the problem is probably lower in the path.',
      howItWorks: [
        'Use `ping` to test reachability in a deliberate sequence rather than at random.',
        'Start locally if needed, then test the default gateway, then a known remote IP, then a known hostname.',
        'If the remote IP works but the hostname does not, DNS is a stronger suspect than general connectivity.',
        'Use `nslookup` to query DNS directly and see whether the resolver can answer the name request.',
        'If DNS resolves correctly but the application still fails, the problem may be the service itself or the relevant port path rather than naming.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: a simple troubleshooting ladder on Windows.',
          code:
            'ping 127.0.0.1\nping 192.168.10.1\nping 8.8.8.8\nping example.com\nnslookup example.com',
        },
        'If `ping 8.8.8.8` works but `ping example.com` fails, DNS is now much more suspicious than the internet path in general.',
        'If `nslookup` returns the correct IP for a site but the site still does not open, the next question becomes the actual application path or blocked port rather than DNS.',
      ],
      misconceptions: [
        '"If one ping fails, the entire network diagnosis is complete." The target and the sequence still matter.',
        '"DNS problems and connectivity problems feel different to users." They often do not; both are reported as "it does not work".',
        '"If a name resolves, the service must work." Name resolution only proves one layer of the path.',
      ],
      recap: [
        'Reachability and name resolution are related, but they are not the same test.',
        'Use `ping` and `nslookup` to separate path problems from DNS problems.',
        'A structured test order produces much clearer evidence than random command use.',
      ],
      referenceItems: [
        {
          label: 'Ping',
          value: 'Reachability test',
          detail: 'Useful for checking local, gateway, remote-IP, and hostname reachability in sequence.',
        },
        {
          label: 'Nslookup',
          value: 'DNS query tool',
          detail: 'Lets you inspect whether the resolver can answer for the hostname you are testing.',
        },
      ],
      connections: [
        {
          label: 'Common protocols and ports',
          href: '/topics/common-network-protocols-and-ports#ports-matter-for-revision-and-troubleshooting',
          note: 'Once DNS and basic reachability are proven, service-specific protocol and port paths become the next likely fault domain.',
        },
      ],
    },
    {
      id: 'trace-the-path-and-inspect-local-evidence',
      title: 'Trace the Path and Inspect Local Evidence',
      strapline:
        'When simple reachability tests are not enough, inspect the route, the neighbours, and the listening state.',
      overview:
        'If the fault still is not clear, move deeper into path and state inspection. `tracert` and `pathping` show where packets are travelling and where delay or loss begins. `arp -a` reveals local neighbour resolution. `netstat -ano` reveals active connections and listening ports. Together they help turn a vague remote failure into a narrower explanation.',
      whyItMatters:
        'These tools help you move from "something in the middle is wrong" to "the path breaks after this hop", "the client is not learning the local neighbour", or "the service is not actually listening on the expected port".',
      howItWorks: [
        'Use `tracert` to see the hop-by-hop path a packet takes toward a destination.',
        'Use `pathping` when you want more information about latency and packet loss over time across the route.',
        'Use `arp -a` to inspect the local ARP cache and see which nearby IP-to-MAC relationships the host has learned.',
        'Use `netstat -ano` to inspect active connections, listening ports, and the local process IDs associated with them.',
        'When routing is a suspect, `route print` can help reveal which routes the host believes it has available.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: deeper path and state inspection commands on Windows.',
          code:
            'tracert 8.8.8.8\npathping 8.8.8.8\narp -a\nroute print\nnetstat -ano',
        },
        'If `tracert` fails after the first hop, the issue may sit at or beyond the gateway rather than on the local host.',
        'If `arp -a` never learns the gateways MAC on a local Ethernet problem, the issue may still be near the local link rather than far upstream.',
        'If `netstat -ano` shows that the expected service is not listening, the problem may be on the server or application side rather than in the network path.',
      ],
      misconceptions: [
        '"Tracert tells you exactly what is broken every time." It helps narrow the path, but you still have to interpret what each hop result means.',
        '"ARP is only for network engineers." It is often useful when local neighbour communication is the real fault.',
        '"Netstat is unrelated to networking because it is local to the host." Local listening state and active connections often explain whether the service side exists at all.',
      ],
      recap: [
        'Use `tracert` and `pathping` to inspect the route and where trouble begins.',
        'Use `arp -a` to inspect local neighbour learning.',
        'Use `netstat -ano` to check whether the host is actually listening or connected as expected.',
      ],
      connections: [
        {
          label: 'Routing basics',
          href: '/topics/routing-basics',
          note: 'The routing page provides the forwarding logic behind what `tracert` and `route print` are helping you inspect.',
        },
        {
          label: 'Networking tools',
          href: '/topics/networking-tools',
          note: 'The tools page covers the physical and wireless proof tools that belong earlier in the workflow when the link itself is in doubt.',
        },
      ],
    },
    {
      id: 'change-one-thing-and-keep-the-evidence-clean',
      title: 'Change One Thing and Keep the Evidence Clean',
      strapline:
        'A messy fix sequence often creates a second problem and hides the first one.',
      overview:
        'The final part of a good troubleshooting workflow is restraint. Once you have a reasonable hypothesis, change one thing, retest, and record what happened. That keeps the evidence usable and reduces the chance of "fixing" the symptom while obscuring the actual cause.',
      whyItMatters:
        'This is what separates a random fix attempt from repeatable support practice. It also makes handoffs, incident notes, and future pattern recognition much easier.',
      howItWorks: [
        'Form a hypothesis from the evidence you already have rather than changing settings blindly.',
        'Make one controlled change at a time and retest the relevant symptom immediately.',
        'If the change did not help, revert or record it clearly so you do not lose track of the systems current state.',
        'Document the symptom, scope, commands run, results observed, and final resolution so the same issue is faster next time.',
      ],
      examples: [
        'If the client is on the wrong SSID, moving it to the correct one is a clean single change followed by immediate retest.',
        'If the DNS server setting looks wrong, fix that alone and retest name resolution before touching unrelated firewall or routing settings.',
        'If a server service is not listening, restarting that service is a different change from changing the network path, and the two should not be blended together casually.',
      ],
      misconceptions: [
        '"If I change five things and the problem goes away, that is efficient troubleshooting." It is fast in the moment, but poor for learning and risky for stability.',
        '"Documentation is optional if the user is working again." The next incident will take longer if the evidence was never captured.',
        '"A hypothesis is overkill for simple problems." Even basic incidents benefit from one clear idea being tested at a time.',
      ],
      recap: [
        'Work from evidence toward one hypothesis at a time.',
        'Make one change, retest, and keep notes.',
        'Clean troubleshooting is usually faster in the long run than frantic troubleshooting.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the workflow instinct',
        intro:
          'Use these questions to test whether you can choose the next sensible troubleshooting step instead of jumping around the stack.',
        questions: [
          {
            prompt:
              'A client has a `169.254.x.x` IPv4 address and no default gateway. What is the strongest immediate interpretation?',
            options: [
              {
                label: 'DHCP likely failed, so local configuration should be the first focus',
                isCorrect: true,
                feedback:
                  'Correct. That address pattern strongly suggests the client fell back instead of receiving normal DHCP configuration.',
              },
              {
                label: 'The website the user wants must be offline',
                isCorrect: false,
                feedback:
                  'The evidence is pointing much earlier in the path than the remote website.',
              },
              {
                label: 'The client definitely has a routing-table corruption issue',
                isCorrect: false,
                feedback:
                  'The clearer first clue is missing DHCP-style configuration rather than an advanced route-table conclusion.',
              },
            ],
          },
          {
            prompt:
              'Which result most strongly suggests a DNS issue rather than a general connectivity issue?',
            options: [
              {
                label: '`ping 8.8.8.8` works but `ping example.com` fails',
                isCorrect: true,
                feedback:
                  'Correct. Reachability to the remote IP suggests the path exists, while hostname failure points much more strongly to DNS.',
              },
              {
                label: 'The Ethernet cable is unplugged',
                isCorrect: false,
                feedback:
                  'That is a local physical-link problem, not a DNS problem.',
              },
              {
                label: 'The user cannot reach the local printer on the same subnet',
                isCorrect: false,
                feedback:
                  'That points you much lower in the path than external DNS resolution.',
              },
            ],
          },
          {
            prompt:
              'Why might `tracert` be useful after gateway reachability is already confirmed?',
            options: [
              {
                label:
                  'Because it can show where farther along the path delay or failure begins',
                isCorrect: true,
                feedback:
                  'Correct. `tracert` is especially useful when the first hop works but something beyond it does not.',
              },
              {
                label:
                  'Because it replaces the need to inspect local IP configuration',
                isCorrect: false,
                feedback:
                  'Local configuration still matters and should usually be checked earlier in the workflow.',
              },
              {
                label:
                  'Because it is the best tool for building Ethernet cables',
                isCorrect: false,
                feedback:
                  'That is unrelated to what `tracert` does.',
              },
            ],
          },
          {
            prompt:
              'What is the best reason to change only one thing at a time during troubleshooting?',
            options: [
              {
                label:
                  'It keeps the evidence clean and makes it clear which change actually affected the symptom',
                isCorrect: true,
                feedback:
                  'Correct. Single, controlled changes make troubleshooting more reliable and easier to document.',
              },
              {
                label:
                  'Because every network issue always has only one possible cause',
                isCorrect: false,
                feedback:
                  'Incidents can have multiple contributing factors. The one-change rule is about evidence quality, not about assuming simplicity.',
              },
              {
                label:
                  'Because documentation matters less if the change is small',
                isCorrect: false,
                feedback:
                  'Even small changes should still be understood and documented when they affect the diagnosis.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Planning a small network',
          href: '/topics/planning-a-basic-home-and-small-business-network',
          note: 'The better the original design and segmentation, the easier this troubleshooting workflow becomes when something eventually fails.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'failure-domain',
      term: 'Failure Domain',
      definition:
        'The smallest practical part of the environment that could reasonably contain the fault you are investigating.',
      importance:
        'Reducing the failure domain early makes every later test much more efficient.',
      sectionId: 'start-with-scope-symptom-and-whats-changed',
    },
    {
      id: 'ipconfig-all',
      term: 'ipconfig /all',
      definition:
        'A Windows command that shows adapter settings such as IP address, subnet mask, DNS server, DHCP server, and lease details.',
      importance:
        'It is one of the most valuable starting points for client-side network troubleshooting.',
      sectionId: 'check-link-state-and-local-configuration-first',
    },
    {
      id: 'nslookup',
      term: 'nslookup',
      definition:
        'A command-line tool used to query DNS and inspect how names are being resolved.',
      importance:
        'It helps separate a DNS fault from a general connectivity or application fault.',
      sectionId: 'separate-reachability-from-name-resolution',
    },
    {
      id: 'ping',
      term: 'ping',
      definition:
        'A command that sends a simple network test to a target and reports whether it replies, helping you check basic IP reachability.',
      importance:
        'It is the quickest way to separate "can I reach it at all?" from higher-level service or name-resolution problems.',
      sectionId: 'separate-reachability-from-name-resolution',
    },
    {
      id: 'tracert',
      term: 'tracert',
      definition:
        'A Windows command that shows the hop-by-hop route packets take toward a destination.',
      importance:
        'It helps narrow where along the path delay or failure begins.',
      sectionId: 'trace-the-path-and-inspect-local-evidence',
    },
    {
      id: 'arp-cache',
      term: 'ARP Cache',
      definition:
        'The local table of recently learned IP-to-MAC mappings used for nearby network communication.',
      importance:
        'It can reveal whether the host is learning local neighbours such as the gateway properly.',
      sectionId: 'trace-the-path-and-inspect-local-evidence',
    },
    {
      id: 'netstat',
      term: 'netstat',
      definition:
        'A command-line tool that shows active connections, listening ports, and related local network state.',
      importance:
        'It helps confirm whether the expected service is actually listening or connected.',
      sectionId: 'trace-the-path-and-inspect-local-evidence',
    },
    {
      id: 'pathping',
      term: 'pathping',
      definition:
        'A Windows command that combines route tracing with packet-loss and latency measurement over time.',
      importance:
        'It helps when `tracert` shows the route but you need stronger evidence about where loss or delay is building.',
      sectionId: 'trace-the-path-and-inspect-local-evidence',
    },
    {
      id: 'route-print',
      term: 'route print',
      definition:
        'A Windows command that displays the local route table the host uses to decide where traffic should go.',
      importance:
        'It helps confirm whether the machine has the expected gateway, interface, and network-path entries.',
      sectionId: 'trace-the-path-and-inspect-local-evidence',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember as a narrowing sequence: define the symptom and scope, prove the local link and configuration, separate reachability from DNS, inspect the path and host state more deeply if needed, then make one change at a time and document what the evidence showed.',
    memoryFramework: [
      'Start with scope: who is affected, what exactly fails, and what changed?',
      'Check the local reality first: link state, adapter settings, gateway, DNS, and DHCP.',
      'Separate IP reachability from hostname resolution.',
      'Trace the path when simple tests are not enough.',
      'Inspect neighbour and listening state with ARP and netstat when needed.',
      'Change one thing, retest, and keep notes.',
    ],
    checklist: [
      'I can explain why scope and recent changes matter before any command is run.',
      'I can use `ipconfig /all` to inspect a client properly.',
      'I can use `ping` and `nslookup` to separate DNS faults from raw connectivity faults.',
      'I can explain when `tracert` or `pathping` becomes useful.',
      'I can explain what `arp -a` and `netstat -ano` can tell me.',
      'I can explain why one controlled change is better than several random ones.',
      'I can document an incident clearly enough that the same issue would be easier next time.',
    ],
    questions: [
      'Why is a good symptom description more useful than a generic "network issue" label?',
      'Why should you usually inspect local adapter settings before tracing the remote path?',
      'Why does a working ping to a remote IP but not a hostname point toward DNS?',
      'Why can the path beyond the gateway still be broken even when the gateway itself is reachable?',
      'Why is ARP useful when the failure still seems local to the subnet?',
      'Why does changing one thing at a time protect the quality of your troubleshooting evidence?',
    ],
    pitfalls: [
      'Changing settings before reducing the failure domain first.',
      'Running commands without knowing what question each one is meant to answer.',
      'Confusing DNS failure with general internet failure.',
      'Stopping at the first successful ping even though the application path still is not proven.',
      'Failing to document what changed and what result followed from that change.',
    ],
  },
  relatedTopicSlugs: [
    'routing-basics',
    'dns-and-dhcp',
    'networking-tools',
  ],
};
