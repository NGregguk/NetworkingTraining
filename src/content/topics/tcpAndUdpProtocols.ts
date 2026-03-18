import type { StudyTopic } from '../schema';

export const tcpAndUdpProtocolsTopic: StudyTopic = {
  slug: 'tcp-and-udp-protocols',
  title: 'TCP and UDP Protocols',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '35 minutes',
  sourceFile: 'context files/TCP and UDP Protocols.pdf',
  updatedOn: 'March 18, 2026',
  summary:
    'Learn how TCP and UDP differ, why ports exist, which common protocols use which defaults, and how port awareness turns vague access failures into precise troubleshooting steps.',
  heroNote:
    'Use this page when TCP, UDP, and port numbers feel like isolated exam facts and you want them to connect into one practical transport-layer model.',
  tags: ['TCP', 'UDP', 'ports', 'transport protocols', 'firewall troubleshooting'],
  learningObjectives: [
    'Explain how TCP and UDP sit on top of IP and solve different delivery problems.',
    'Compare TCP and UDP in terms of session setup, ordering, retransmission, and delivery guarantees.',
    'Match transport choice to real workloads such as web traffic, file transfer, live media, and online games.',
    'Explain what a port is and why the same host can expose many services at one IP address.',
    'Recall the default ports for high-value protocols such as FTP, SSH, SMTP, DNS, DHCP, HTTP, HTTPS, LDAP, RDP, and SMB.',
    'Use protocol and port knowledge to reason about firewall rules and service-access failures.',
  ],
  sections: [
    {
      id: 'transport-protocols-sit-above-ip',
      title: 'Transport Protocols Sit Above IP',
      strapline:
        'IP gets traffic toward the right host, but transport decides how that application data should be delivered.',
      overview:
        'Addressing and routing tell the network where traffic belongs, but they do not by themselves decide whether the sender should wait for acknowledgements, preserve order, or simply keep sending the freshest data possible. TCP and UDP sit above IP and provide those delivery behaviours. Port numbers then identify which service on the destination should receive the traffic.',
      whyItMatters:
        'Students often learn IP addresses, protocols, and port numbers as separate facts. In practice they only make sense together. A device can be reachable by IP and still fail at the application layer because the wrong transport is in use or the expected port is blocked.',
      howItWorks: [
        'IP provides logical addressing and a path between devices or networks.',
        'TCP and UDP both run on top of IP and carry application data from one endpoint to another.',
        'Port numbers act as communication endpoints so one host can run many networked services at the same time.',
        'Applications choose TCP or UDP based on whether reliable ordered delivery or low-overhead timeliness matters more.',
      ],
      examples: [
        'Opening a secure website depends on an IP path to the server, TCP as the transport behaviour, and port 443 as the expected HTTPS endpoint.',
        'A single server can offer SSH on port 22, HTTPS on port 443, and SMB on port 445 because ports separate the conversations even when the host IP is the same.',
        'A device can answer a ping or resolve in DNS and still fail to provide the actual service if the right protocol-port path is not available.',
      ],
      misconceptions: [
        '"If the IP address is reachable, the application should work." The correct service still needs the right transport and the right port.',
        '"Ports are only for servers." Clients target ports too, because that is how they reach the service they want.',
        '"TCP and UDP replace IP." They depend on IP rather than replacing it.',
      ],
      recap: [
        'IP answers where traffic should go.',
        'TCP or UDP answers how it should be delivered.',
        'Ports answer which service on the destination should receive it.',
      ],
      connections: [
        {
          label: 'Broader foundations overview',
          href: '/topics/why-networking-is-important#transport-and-ports',
          note: 'Return to the wider networking lesson if you want transport and ports in the context of hardware, Wi-Fi, and troubleshooting tools.',
        },
        {
          label: 'Intro to IP addressing',
          href: '/topics/intro-to-ip-addressing#what-ip-addressing-solves',
          note: 'Revisit the IP basics if you want the transport discussion anchored more directly to logical addressing first.',
        },
      ],
    },
    {
      id: 'tcp-reliability-and-session-control',
      title: 'TCP Prioritises Reliable Ordered Delivery',
      strapline:
        'Connection-oriented traffic spends extra effort to make sure complete data arrives correctly.',
      overview:
        'TCP is connection-oriented, which means the endpoints establish a session before normal data transfer begins. During the exchange, TCP tracks delivery, preserves ordering, and can retransmit data when needed. When the conversation is complete, the session is closed.',
      whyItMatters:
        'Many business and support tasks depend on completeness rather than pure speed. A half-loaded web page, a corrupt file transfer, or a partially delivered email is not useful, so TCP exists to add the reliability controls those workloads need.',
      howItWorks: [
        'TCP establishes a connection before full data transfer begins.',
        'The sender and receiver exchange information that helps confirm successful delivery.',
        'If data is lost in transit, TCP can retransmit the missing pieces instead of silently ignoring the problem.',
        'TCP also keeps the data in order so the application receives it as a coherent stream rather than out-of-sequence fragments.',
        'All of that reliability adds overhead, which is why TCP is usually slower and heavier than UDP.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: TCP adds a controlled conversation instead of just throwing data onto the network.',
          code:
            'TCP flow\n1. Establish connection\n2. Send data\n3. Receive acknowledgement\n4. Retransmit missing data if needed\n5. Close connection',
        },
        'Web pages, email transfer, image downloads, and many file-copy operations prefer TCP because the complete data matters more than shaving off a little overhead.',
        'If a large file arrives with missing or out-of-order pieces, the application may fail entirely, which is exactly the kind of problem TCP is designed to reduce.',
      ],
      misconceptions: [
        '"TCP is always better because it is more reliable." Reliability is valuable, but it also costs time and bandwidth overhead.',
        '"TCP guarantees the user experience can never fail." Applications can still fail for many other reasons; TCP only improves transport reliability.',
        '"TCP is only for websites." Many other services use it whenever correctness and order matter.',
      ],
      recap: [
        'TCP establishes a session before exchanging data.',
        'It preserves order and supports retransmission when loss occurs.',
        'Use TCP when complete and correct delivery matters more than immediacy.',
      ],
      referenceItems: [
        {
          label: 'Transport style',
          value: 'Connection-oriented',
          detail: 'The endpoints form a session before normal data flow begins.',
        },
        {
          label: 'Strength',
          value: 'Reliability',
          detail: 'TCP preserves order and can retransmit lost data.',
        },
        {
          label: 'Tradeoff',
          value: 'More overhead',
          detail: 'Those reliability controls cost time and additional traffic.',
        },
      ],
      connections: [
        {
          label: 'Secure web example',
          href: '#common-protocols-and-default-ports',
          note: 'Scroll down to see how TCP shows up in protocols such as HTTPS, SSH, and SMTP.',
        },
      ],
    },
    {
      id: 'udp-speed-and-timeliness',
      title: 'UDP Prioritises Speed and Freshness',
      strapline:
        'Connectionless traffic accepts fewer guarantees so the newest data can keep moving quickly.',
      overview:
        'UDP is connectionless, which means it does not build the same kind of managed session before sending data. It sends datagrams with much less delivery management than TCP, which lowers overhead but also reduces the built-in guarantees around ordering and recovery.',
      whyItMatters:
        'Not every workload wants to wait for acknowledgements and retransmissions. In live or real-time situations, late data may be less useful than missing data. That is why UDP is common in broadcasts, online games, voice, video, and other time-sensitive traffic.',
      howItWorks: [
        'UDP sends traffic without the same session-establishment and teardown behaviour used by TCP.',
        'It has much less built-in delivery management, which keeps it lighter and faster.',
        'If a packet is missed, UDP itself usually does not pause to recover it the way TCP would.',
        'Applications that use UDP either tolerate some loss or handle recovery in their own way at a higher level.',
        'DHCP is a good example of UDP in use because the client is still trying to obtain usable network settings and does not begin with a fully established higher-level conversation.',
      ],
      examples: [
        'A live sports stream may freeze for a moment and then jump back to the current play instead of replaying every missed second.',
        'An online game can show a sudden position correction or "rubber band" effect because the newest state matters more than waiting to recover every lost update.',
        'DHCP uses UDP 67/68 during initial client configuration because the device is still in the process of getting its addressing information.',
      ],
      misconceptions: [
        '"UDP is broken because it does not guarantee delivery." It is a deliberate design choice for workloads that value timeliness over perfect recovery.',
        '"UDP has no value in serious networks." Many important services and real-time applications depend on it.',
        '"UDP means absolutely no checking of any kind." The more accurate point is that UDP has far less built-in control and recovery than TCP.',
      ],
      recap: [
        'UDP is connectionless and lower overhead.',
        'It favors timeliness over retransmission and ordered recovery.',
        'Use UDP when current-state delivery matters more than perfect historical completeness.',
      ],
      connections: [
        {
          label: 'DHCP and lease behaviour',
          href: '/topics/dns-and-dhcp#dhcp-assigns-configuration-by-lease',
          note: 'Reconnect UDP to a concrete service that needs to talk to clients before they are fully configured.',
        },
      ],
    },
    {
      id: 'ports-identify-services',
      title: 'Ports Identify Services on the Same Host',
      strapline:
        'One IP address can support many different services because each service listens on its own endpoint.',
      overview:
        'A port is a logical communication endpoint tied to an application or service. It allows the same destination host to accept different kinds of traffic at the same time without confusing web traffic, management traffic, file sharing, and other services with one another.',
      whyItMatters:
        'Port awareness makes troubleshooting more precise. Instead of stopping at "the server is up," you can ask whether the expected service is listening and whether the network allows the correct protocol-port combination through.',
      howItWorks: [
        'The IP address identifies the destination host, while the port identifies the destination service on that host.',
        'Clients typically connect to the well-known default port for a service unless the service is reconfigured to use a custom one.',
        'The same host can expose many services at one IP address because each service binds to a different port.',
        'Firewalls, access-control rules, and security policies often allow or deny traffic based on protocol and port.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: the same host can expose multiple network services by separating them with port numbers.',
          code:
            '203.0.113.25:22   -> SSH management\n203.0.113.25:443  -> HTTPS web service\n203.0.113.25:445  -> SMB file sharing\n203.0.113.25:3389 -> Remote Desktop',
        },
        'A system can be online and reachable by IP while one specific service remains unavailable because only that service port is blocked or the application is not listening.',
        'Changing a service to a custom port is possible, but the client must know the new port or the connection attempt will fail.',
      ],
      misconceptions: [
        '"A network port number is the same thing as a physical switch port." One is a logical service endpoint; the other is a hardware connection point.',
        '"One IP address means one application." A single host can serve many applications simultaneously through different ports.',
        '"Default ports can never change." Defaults are common and important to learn, but services can be customised.',
      ],
      recap: [
        'IP identifies the host.',
        'The port identifies the service on that host.',
        'Protocol and port together are a practical shortcut for firewall and service troubleshooting.',
      ],
      connections: [
        {
          label: 'Firewall troubleshooting example',
          href: '#ports-in-firewalls-and-access-rules',
          note: 'See how a blocked protocol-port pair can break one service without breaking the whole host.',
        },
      ],
    },
    {
      id: 'common-protocols-and-default-ports',
      title: 'Common Protocols and Their Default Ports',
      strapline:
        'Memorisation is easier when you group the ports by what the service actually does.',
      overview:
        'The most useful way to study common ports is by grouping them into service families: file transfer, administration, email, naming, web access, directory services, and remote access. This gives the numbers context and makes them easier to remember later under exam or troubleshooting pressure.',
      whyItMatters:
        'Port knowledge turns a vague symptom like "it will not connect" into a more useful question: which service, over which transport, on which default port? That is valuable for firewall rules, remote support, service documentation, and certification study.',
      howItWorks: [
        'File-transfer services such as FTP use their own default ports, while secure administration uses SSH and legacy unencrypted administration uses Telnet.',
        'Email delivery and mailbox access use different protocols because sending mail is not the same task as retrieving or managing a mailbox.',
        'Infrastructure services such as DNS, DHCP, and LDAP often matter more to daily support work than students expect, because they sit underneath many other network functions.',
        'Some protocols use only TCP, some only UDP, and some can use both depending on the service design and communication pattern.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: a grouped cheat sheet is easier to remember than isolated numbers.',
          code:
            'File transfer and administration\nFTP                  TCP 20 / 21\nSSH                  TCP 22\nTelnet               TCP 23\n\nMail, web, and core services\nSMTP                 TCP 25\nDNS                  TCP/UDP 53\nDHCP                 UDP 67 / 68\nHTTP                 TCP 80\nPOP3                 TCP 110\nIMAP                 TCP 143\nHTTPS                TCP 443\n\nDirectory, Windows, and remote access\nLDAP                 TCP/UDP 389\nNetBIOS over TCP/IP  TCP/UDP 137-139\nRDP                  TCP 3389\nSMB / CIFS           TCP 445',
        },
        'DNS uses port 53 on both TCP and UDP, which is a useful reminder that not every protocol fits cleanly into a one-transport-only rule.',
        'DHCP uses UDP 67/68 because the client is still trying to obtain working configuration rather than starting with a mature application session.',
      ],
      misconceptions: [
        '"Learning ports is just rote exam trivia." Port knowledge is directly useful when reading firewall rules and service documentation.',
        '"Only web ports matter in real life." Infrastructure, directory, management, and remote-access ports often matter more during troubleshooting.',
        '"Secure and insecure protocols are basically the same except for the number." The security model and operational risk are part of the distinction, not just the port change.',
      ],
      recap: [
        'Group ports by job category instead of memorising them as random numbers.',
        'Remember the especially high-value ports first: SSH 22, DNS 53, DHCP 67/68, HTTP 80, HTTPS 443, RDP 3389, and SMB 445.',
        'Mixed TCP/UDP use is normal for some services and worth remembering.',
      ],
      referenceItems: [
        {
          label: 'FTP',
          value: 'TCP 20 / 21',
          detail: 'Classic file transfer using separate default control and data ports.',
        },
        {
          label: 'SSH',
          value: 'TCP 22',
          detail: 'Secure command-line administration of network devices and servers.',
        },
        {
          label: 'Telnet',
          value: 'TCP 23',
          detail: 'Legacy unencrypted command-line management.',
        },
        {
          label: 'SMTP',
          value: 'TCP 25',
          detail: 'Mail transfer between systems and mail services.',
        },
        {
          label: 'DNS',
          value: 'TCP / UDP 53',
          detail: 'Name resolution and related DNS communication.',
        },
        {
          label: 'DHCP',
          value: 'UDP 67 / 68',
          detail: 'Automatic client configuration before the host is fully set up.',
        },
        {
          label: 'Web',
          value: 'TCP 80 / 443',
          detail: 'HTTP and HTTPS for unencrypted and encrypted web traffic.',
        },
        {
          label: 'Mailbox access',
          value: 'TCP 110 / 143',
          detail: 'POP3 and IMAP for retrieving or interacting with mailboxes.',
        },
        {
          label: 'LDAP',
          value: 'TCP / UDP 389',
          detail: 'Directory access for systems such as Active Directory.',
        },
        {
          label: 'NetBIOS',
          value: 'TCP / UDP 137-139',
          detail: 'Long-standing Windows-oriented naming and session services.',
        },
        {
          label: 'RDP',
          value: 'TCP 3389',
          detail: 'Remote Desktop access to a graphical session.',
        },
        {
          label: 'SMB / CIFS',
          value: 'TCP 445',
          detail: 'Windows file sharing and related Microsoft network communication.',
        },
      ],
      interactive: {
        type: 'quiz',
        title: 'Practice the transport and port decisions',
        intro:
          'Use these questions the way you would during study or troubleshooting: identify the right transport behaviour, then match the service to the correct default port.',
        questions: [
          {
            prompt:
              'Which statement best captures why TCP is described as connection-oriented?',
            options: [
              {
                label:
                  'It establishes a session, tracks delivery, and closes the conversation when finished',
                isCorrect: true,
                feedback:
                  'Correct. TCP forms a managed session and uses that structure to support reliability and ordering.',
              },
              {
                label:
                  'It sends traffic continuously without waiting for any confirmation',
                isCorrect: false,
                feedback:
                  'That behaviour is much closer to UDP than to TCP.',
              },
              {
                label:
                  'It only works after DNS resolves a host name to an IP address',
                isCorrect: false,
                feedback:
                  'DNS can help applications find destinations, but it is not what makes TCP connection-oriented.',
              },
            ],
          },
          {
            prompt:
              'A live sports stream freezes briefly and then jumps back to the current play instead of replaying every missed second. Which transport style does that resemble most closely?',
            options: [
              {
                label: 'UDP',
                isCorrect: true,
                feedback:
                  'Correct. That behaviour matches a timeliness-first model where old missing data may no longer be useful.',
              },
              {
                label: 'TCP',
                isCorrect: false,
                feedback:
                  'TCP is usually chosen when complete ordered delivery matters more than immediate freshness.',
              },
              {
                label: 'SMB',
                isCorrect: false,
                feedback:
                  'SMB is an application protocol for file sharing, not the general transport behaviour described here.',
              },
            ],
          },
          {
            prompt:
              'Why does DHCP commonly rely on UDP 67/68 instead of TCP during initial client setup?',
            options: [
              {
                label:
                  'The client is still trying to get working network configuration and has not started with a full TCP-style session model',
                isCorrect: true,
                feedback:
                  'Correct. DHCP is part of how the client gets configured in the first place, so UDP fits the early low-overhead exchange better.',
              },
              {
                label:
                  'Because DHCP only works on encrypted protocols and TCP is not encrypted',
                isCorrect: false,
                feedback:
                  'TCP is not defined by encryption. DHCP uses UDP for transport behaviour, not because TCP lacks encryption.',
              },
              {
                label:
                  'Because port 67 is reserved for secure shell administration',
                isCorrect: false,
                feedback:
                  'SSH uses TCP 22, not UDP 67.',
              },
            ],
          },
          {
            prompt:
              'Which default protocol-port pair should you associate first with name resolution?',
            options: [
              {
                label: 'TCP/UDP 53',
                isCorrect: true,
                feedback:
                  'Correct. DNS is the name-resolution protocol and commonly uses port 53 on both transports.',
              },
              {
                label: 'TCP 443',
                isCorrect: false,
                feedback:
                  'TCP 443 is HTTPS, which is secure web traffic rather than name resolution.',
              },
              {
                label: 'TCP 3389',
                isCorrect: false,
                feedback:
                  'TCP 3389 is associated with Remote Desktop Protocol.',
              },
            ],
          },
          {
            prompt:
              'A network administrator wants secure command-line access to a router. Which default choice is correct?',
            options: [
              {
                label: 'SSH on TCP 22',
                isCorrect: true,
                feedback:
                  'Correct. SSH is the secure replacement for Telnet for command-level management.',
              },
              {
                label: 'Telnet on TCP 23',
                isCorrect: false,
                feedback:
                  'Telnet is the legacy unsecured option, not the secure one.',
              },
              {
                label: 'SMTP on TCP 25',
                isCorrect: false,
                feedback:
                  'SMTP handles mail transfer rather than secure interactive administration.',
              },
            ],
          },
          {
            prompt:
              'A Windows server is online and reachable by IP, but a Remote Desktop session times out. Which default protocol-port pair should you check at the firewall first?',
            options: [
              {
                label: 'TCP 3389',
                isCorrect: true,
                feedback:
                  'Correct. RDP commonly depends on TCP 3389, so that is a first place to check in firewall rules.',
              },
              {
                label: 'UDP 67/68',
                isCorrect: false,
                feedback:
                  'Those are DHCP ports and would not be the primary RDP access path.',
              },
              {
                label: 'TCP 445',
                isCorrect: false,
                feedback:
                  'TCP 445 is usually associated with SMB file sharing rather than Remote Desktop.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'DNS and DHCP page',
          href: '/topics/dns-and-dhcp',
          note: 'Use the dedicated service page if you want the port discussion tied back to lease behaviour, gateway details, and practical client configuration.',
        },
      ],
    },
    {
      id: 'ports-in-firewalls-and-access-rules',
      title: 'Ports Show Up in Firewalls and Access Rules',
      strapline:
        'Many access failures are not general network outages at all, but blocked service paths.',
      overview:
        'A service can fail even when the host is powered on, addressed correctly, and otherwise reachable. The missing piece is often a blocked protocol-port combination in a firewall, security rule, or filtering device somewhere along the path.',
      whyItMatters:
        'This is one of the most practical reasons port knowledge matters. Without it, a support problem can feel mysterious. With it, you can separate "the host is unreachable" from "the host is reachable but the service path is blocked."',
      howItWorks: [
        'Firewalls and similar controls often evaluate traffic by protocol and port number.',
        'If the required service port is blocked, the application can fail even though the device still exists on the network.',
        'Removing an allow rule for Remote Desktop, for example, can stop the session while leaving the machine powered on and otherwise healthy.',
        'The same logic applies to web services, file sharing, mail, directory queries, and many other applications.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: a host can stay online while one specific service path is disabled.',
          code:
            'Host reachable by IP: yes\nFirewall rule for TCP 3389: allowed  -> Remote Desktop works\nFirewall rule for TCP 3389: removed  -> Remote Desktop fails\nOther ports such as 443 may still work',
        },
        'A machine that responds to basic network checks can still reject or time out on the one service the user actually needs.',
        'Blocking the wrong port at a firewall can look like "the app is broken" until you trace the expected protocol and endpoint carefully.',
      ],
      misconceptions: [
        '"If the network is up, every service on the host should be available." Service access still depends on the right protocol and port being allowed.',
        '"Port filtering only matters at the internet edge." Internal firewalls, host firewalls, cloud security rules, and segmentation controls all use the same idea.',
        '"Once one port is open, the host is generally open." Access is granular; one service can work while another is blocked.',
      ],
      recap: [
        'A blocked port can break one service without breaking the whole host.',
        'Protocol-plus-port knowledge shortens troubleshooting dramatically.',
        'When access fails, ask which service should work, over which transport, on which default port.',
      ],
      connections: [
        {
          label: 'Return to the foundations summary',
          href: '/topics/why-networking-is-important#transport-and-ports',
          note: 'Jump back to the broader networking page if you want to reconnect this lesson to the bigger picture.',
        },
        {
          label: 'Open revision pack',
          href: '/revision',
          note: 'Use the revision page once you can explain transport choice, key ports, and firewall impact without reading from the page.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'port',
      term: 'Port',
      definition:
        'A logical communication endpoint used to identify a specific network service or application on a host.',
      importance:
        'It explains how one IP address can support many different services without their traffic being mixed together.',
      sectionId: 'ports-identify-services',
    },
    {
      id: 'connection-oriented-protocol',
      term: 'Connection-oriented Protocol',
      definition:
        'A protocol style that establishes and manages a session between endpoints before and during data transfer.',
      importance:
        'It helps explain why TCP can track order and recovery rather than simply sending traffic without coordination.',
      sectionId: 'tcp-reliability-and-session-control',
    },
    {
      id: 'connectionless-protocol',
      term: 'Connectionless Protocol',
      definition:
        'A protocol style that sends traffic without maintaining the same session-management model used by connection-oriented transports.',
      importance:
        'It clarifies why UDP can stay lightweight and fast while offering fewer delivery guarantees.',
      sectionId: 'udp-speed-and-timeliness',
    },
    {
      id: 'retransmission',
      term: 'Retransmission',
      definition:
        'The process of sending data again when delivery was not successfully completed the first time.',
      importance:
        'It is one of the key reasons TCP is more reliable but also more expensive in overhead than UDP.',
      sectionId: 'tcp-reliability-and-session-control',
    },
    {
      id: 'ftp',
      term: 'FTP',
      definition:
        'File Transfer Protocol, a classic protocol for moving files between systems.',
      importance:
        'It is a common exam and reference example for remembering TCP ports 20 and 21.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'secure-shell',
      term: 'Secure Shell',
      definition:
        'A secure command-line management protocol commonly abbreviated as SSH.',
      importance:
        'It is the preferred secure alternative to Telnet for administering servers and network devices.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'telnet',
      term: 'Telnet',
      definition:
        'A legacy command-line remote administration protocol that does not provide the same security as SSH.',
      importance:
        'It still appears in study material because older devices may still support it even though it is not preferred on untrusted networks.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'smtp',
      term: 'SMTP',
      definition:
        'Simple Mail Transfer Protocol, used for sending or relaying email between systems.',
      importance:
        'It is the standard example for remembering TCP port 25 in mail-transfer scenarios.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'pop3',
      term: 'POP3',
      definition:
        'Post Office Protocol version 3, used to retrieve email from a server.',
      importance:
        'It is commonly memorised alongside TCP port 110 and compared with IMAP mailbox access.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'https',
      term: 'HTTPS',
      definition:
        'Hypertext Transfer Protocol Secure, the encrypted form of web traffic typically protected with TLS.',
      importance:
        'It is one of the most important ports to remember because secure web access commonly uses TCP 443.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'ldap',
      term: 'LDAP',
      definition:
        'Lightweight Directory Access Protocol, used to query and maintain directory information.',
      importance:
        'It matters in identity and enterprise administration contexts and is commonly tied to port 389.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'netbios-over-tcp-ip',
      term: 'NetBIOS over TCP/IP',
      definition:
        'A long-standing Windows networking protocol suite that uses ports 137 through 139.',
      importance:
        'It appears in foundational study material because older Windows-style naming and session services still show up in support contexts.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'remote-desktop-protocol',
      term: 'Remote Desktop Protocol',
      definition:
        'A protocol used to remotely access the graphical desktop of another system, commonly abbreviated as RDP.',
      importance:
        'It is a classic troubleshooting example because blocking TCP 3389 can break remote access even when the host is otherwise reachable.',
      sectionId: 'ports-in-firewalls-and-access-rules',
    },
    {
      id: 'server-message-block',
      term: 'Server Message Block',
      definition:
        'A Microsoft-centric file-sharing and service protocol commonly abbreviated as SMB.',
      importance:
        'It underpins common Windows file-sharing scenarios and is strongly associated with TCP port 445.',
      sectionId: 'common-protocols-and-default-ports',
    },
    {
      id: 'common-internet-file-system',
      term: 'Common Internet File System',
      definition:
        'A Microsoft implementation historically associated with SMB and often treated as closely related in Windows file-sharing discussions.',
      importance:
        'It helps students understand why SMB and CIFS often appear together in older documentation or exam language.',
      sectionId: 'common-protocols-and-default-ports',
    },
  ],
  revision: {
    summary:
      'Remember this topic as a chain: IP gets traffic to the host, the port selects the service, TCP adds session control and reliable recovery, UDP removes much of that overhead for timeliness, and firewall rules often decide whether the final service path is actually available.',
    memoryFramework: [
      'Start with the stack: IP handles the destination path, while TCP or UDP handles delivery style.',
      'Ask what the application needs: completeness and order usually point to TCP, while freshness and low delay often point to UDP.',
      'Add the endpoint: the port number tells you which service on the destination is supposed to receive the traffic.',
      'Group your memorisation: file transfer, admin, mail, core services, directory, and remote access.',
      'Remember the high-value defaults: SSH 22, DNS 53, DHCP 67/68, HTTP 80, HTTPS 443, RDP 3389, SMB 445.',
      'Troubleshoot precisely: if a service fails, ask whether the required protocol-port pair is listening and allowed.',
    ],
    checklist: [
      'I can explain the difference between a connection-oriented and a connectionless transport.',
      'I can explain why TCP is usually slower than UDP.',
      'I can describe why a real-time stream may prefer UDP over TCP.',
      'I can explain what a port is without confusing it with a physical switch port.',
      'I can recall the default ports for SSH, DNS, DHCP, HTTP, HTTPS, RDP, and SMB.',
      'I can explain why DNS and LDAP can use both TCP and UDP.',
      'I can explain why DHCP uses UDP during initial client configuration.',
      'I can describe how a firewall can block one service even when the device itself is still online.',
    ],
    questions: [
      'Why is TCP considered connection-oriented, and what practical benefit does that provide?',
      'Why can UDP be the better choice for live traffic even though it offers fewer guarantees?',
      'What does a port number identify that an IP address alone does not identify?',
      'Why can a server be reachable at its IP address but still fail to provide the service you want?',
      'Why is knowing DNS 53 and DHCP 67/68 more useful than memorising them as isolated numbers?',
      'What kind of troubleshooting question becomes possible once you know the expected protocol-port pair for a service?',
    ],
    pitfalls: [
      'Treating TCP as universally better instead of recognising that reliability has a cost.',
      'Treating UDP as careless design instead of recognising that timeliness can be the correct priority.',
      'Confusing service ports with physical switch ports or cabling interfaces.',
      'Memorising port numbers without remembering what job each protocol performs.',
      'Assuming a host that answers one service must therefore answer every other service too.',
      'Forgetting that protocol and port usually need to be checked together rather than as separate facts.',
    ],
  },
  relatedTopicSlugs: [
    'why-networking-is-important',
    'intro-to-ip-addressing',
    'dns-and-dhcp',
  ],
};
