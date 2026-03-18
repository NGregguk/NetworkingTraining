import type { StudyTopic } from '../schema';

export const commonNetworkProtocolsAndPortsTopic: StudyTopic = {
  slug: 'common-network-protocols-and-ports',
  title: 'Common Network Protocols and Ports',
  module: {
    id: 'networking-foundations',
    title: 'Networking Foundations',
    summary:
      'Core networking concepts that explain how devices identify each other, move traffic, share services, and form reliable home or business networks.',
  },
  level: 'Foundational',
  estimatedStudyTime: '30 minutes',
  sourceFile: 'context files/common protocols and the ports they use.pdf',
  updatedOn: 'March 18, 2026',
  summary:
    'Learn what the most common network protocols actually do, which default ports they use, how secure and legacy options differ, and why protocol-port knowledge matters in both revision and real troubleshooting.',
  heroNote:
    'Use this page when the port list feels like disconnected memorisation and you want to group the protocols by the job they perform.',
  tags: ['protocols', 'ports', 'HTTP', 'HTTPS', 'SSH', 'RDP'],
  learningObjectives: [
    'Explain why default ports matter even when a service can technically be moved to a custom one.',
    'Match common protocols to their default ports and to the service families they belong to.',
    'Differentiate secure and legacy pairs such as SSH versus Telnet and HTTP versus HTTPS.',
    'Distinguish sending email from retrieving or managing a mailbox.',
    'Explain why infrastructure services such as DNS, DHCP, and LDAP are more operationally important than they first appear.',
    'Use protocol and port knowledge to reason about firewall blocks, support incidents, and role-specific study priorities.',
  ],
  sections: [
    {
      id: 'ports-map-services-to-endpoints',
      title: 'Ports Map Services to Reachable Endpoints',
      strapline:
        'An IP address gets you to the host, but the port tells the network which service on that host you actually want.',
      overview:
        'Application protocols such as HTTP, SSH, SMTP, and RDP do not just exist as abstract names. Each one is commonly associated with a default port, and that port becomes the practical endpoint clients, firewalls, and administrators talk about. The defaults are not unchangeable law, but they are the common language that makes service access understandable.',
      whyItMatters:
        'This is where port knowledge becomes operational instead of theoretical. A device can be online, resolvable by name, and still fail to provide the service you need because the expected protocol-port pair is blocked, changed, or not listening at all.',
      howItWorks: [
        'A protocol defines how a particular kind of service communicates, while the port identifies the expected endpoint for that service on a host.',
        'Clients usually try the well-known default port first unless the service documentation tells them to use a custom one.',
        'Firewalls, access-control rules, and support documents often refer to the service by protocol and port together because that is what turns a general network path into usable application access.',
        'Changing a service to a custom port is possible, but the default port still matters because it is the reference point users and administrators learn first.',
      ],
      examples: [
        'Typing a secure website into a browser normally means the client will expect HTTPS on TCP 443.',
        'A router may be reachable by IP, but remote command-line administration still depends on SSH listening on TCP 22 or another configured port.',
        'A Windows server may answer pings while still refusing file sharing if SMB on TCP 445 is blocked.',
      ],
      misconceptions: [
        '"If I know the IP address, I know enough." The target service still depends on the correct protocol and port.',
        '"A network port is the same thing as a switch port." One is a logical service endpoint; the other is a physical connection on hardware.',
        '"Default ports never change." They are defaults, not an absolute requirement, but they remain the most important starting point.',
      ],
      recap: [
        'The protocol describes the service behaviour.',
        'The port identifies the common service endpoint.',
        'Protocol-plus-port knowledge is what makes access and troubleshooting specific instead of vague.',
      ],
      connections: [
        {
          label: 'Transport and port foundations',
          href: '/topics/tcp-and-udp-protocols#ports-identify-services',
          note: 'Use the transport lesson if you want the fuller explanation of how ports sit on top of TCP and UDP.',
        },
        {
          label: 'Broader networking overview',
          href: '/topics/why-networking-is-important#transport-and-ports',
          note: 'Return to the foundations page if you want ports in the wider context of addressing, hardware, and support work.',
        },
      ],
      referenceItems: [
        {
          label: 'Key idea',
          value: 'Protocol plus port',
          detail: 'This is the pairing that turns a service name into a reachable endpoint.',
        },
        {
          label: 'Operational use',
          value: 'Firewall and documentation',
          detail: 'Allow rules, troubleshooting notes, and service guides usually refer to both together.',
        },
      ],
    },
    {
      id: 'file-transfer-and-command-line-administration',
      title: 'File Transfer and Command-Line Administration',
      strapline:
        'The first protocol family to group together is moving files and managing devices from the command line.',
      overview:
        'FTP, SSH, and Telnet are easier to remember when you connect them to their jobs instead of treating them as random exam facts. FTP exists for file transfer, SSH exists for secure command-level administration, and Telnet represents the older unsecured way of doing similar administrative work.',
      whyItMatters:
        'These protocols appear directly in support, infrastructure, and networking work. They also show the difference between simply knowing a port number and understanding why that service exists, when it is appropriate, and when it creates unnecessary risk.',
      howItWorks: [
        'FTP uses TCP ports 20 and 21 and is associated with moving files between systems through an FTP client and server relationship.',
        'SSH uses TCP 22 and is the preferred secure way to manage devices or servers from the command line.',
        'Telnet uses TCP 23 and can provide command-line access too, but it does not provide the same security protections as SSH.',
        'The secure-versus-legacy contrast matters because older devices may still expose Telnet even though SSH is the modern preference.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this first protocol group becomes easier to recall when you tie each port to a specific administration job.',
          code:
            'FTP    TCP 20 / 21 -> file transfer\nSSH    TCP 22      -> secure command-line management\nTelnet TCP 23      -> legacy unsecured command-line management',
        },
        'If a network engineer cannot reach a switch command line securely, checking TCP 22 is a far better first step than guessing randomly.',
        'If a legacy appliance still exposes Telnet, the main risk is not the port number itself but the lack of secure transport for administrative access.',
      ],
      misconceptions: [
        '"FTP is automatically secure because it is a file-transfer service." The protocol name alone does not make the transfer secure.',
        '"Telnet is too old to matter." It is still worth recognising because older devices and study material still reference it.',
        '"SSH is only relevant to Linux administrators." Network devices, firewalls, switches, and many other systems rely on it too.',
      ],
      recap: [
        'FTP is the classic file-transfer example on TCP 20 and 21.',
        'SSH on TCP 22 is the secure command-line management standard.',
        'Telnet on TCP 23 is the legacy, insecure comparison point.',
      ],
      referenceItems: [
        {
          label: 'FTP',
          value: 'TCP 20 / 21',
          detail: 'Common exam pair for classic file transfer.',
        },
        {
          label: 'SSH',
          value: 'TCP 22',
          detail: 'Secure administration of servers and network devices.',
        },
        {
          label: 'Telnet',
          value: 'TCP 23',
          detail: 'Legacy unsecured remote administration.',
        },
      ],
      connections: [
        {
          label: 'Firewall troubleshooting angle',
          href: '#ports-matter-for-revision-and-troubleshooting',
          note: 'Use the final section if you want to connect these ports to blocked-service incidents and role-based prioritisation.',
        },
      ],
    },
    {
      id: 'web-browsing-and-email-services',
      title: 'Web Browsing and Email Services',
      strapline:
        'HTTP, HTTPS, SMTP, POP3, and IMAP are easiest to remember when you separate sending, reading, and securing traffic.',
      overview:
        'Web and email protocols show why service roles matter. HTTP and HTTPS both deliver web pages, but HTTPS protects the exchange with encryption. SMTP sends mail, while POP3 and IMAP are mailbox-access protocols used to retrieve or manage email from a server.',
      whyItMatters:
        'These are some of the most user-visible services on a network, so they are both exam-critical and operationally useful. They also teach a deeper lesson: protocol names often look similar, but they are solving different parts of the user experience.',
      howItWorks: [
        'HTTP uses TCP 80 and represents traditional unencrypted web traffic.',
        'HTTPS uses TCP 443 and protects web traffic with TLS or SSL-based encryption.',
        'SMTP uses TCP 25 and is associated with sending or relaying email between systems.',
        'POP3 uses TCP 110 to retrieve email from a server, while IMAP uses TCP 143 for richer remote mailbox access and management.',
        'The important distinction is that sending mail and reading a mailbox are different jobs, so they rely on different protocols.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: grouping the protocols by user-facing job makes them easier to remember than learning the numbers in isolation.',
          code:
            'HTTP  TCP 80  -> unencrypted web browsing\nHTTPS TCP 443 -> encrypted web browsing\nSMTP  TCP 25  -> sending or relaying email\nPOP3  TCP 110 -> retrieving email from a server\nIMAP  TCP 143 -> remote mailbox access and management',
        },
        'If a user can open a website only after switching from `http://` to `https://`, that is not just a cosmetic change. It points to a different protocol and default port.',
        'A mail client can send successfully through SMTP while still failing to display messages if the mailbox-access side is broken.',
      ],
      misconceptions: [
        '"SMTP is what I use to read my inbox." SMTP handles sending or relay, not normal mailbox retrieval.',
        '"HTTP and HTTPS are basically identical apart from the number." The security model and risk profile are part of the difference too.',
        '"POP3 and IMAP are interchangeable." They are both mail-access protocols, but IMAP is designed for richer remote mailbox interaction.',
      ],
      recap: [
        'HTTP 80 and HTTPS 443 cover web browsing, with HTTPS providing the secure path.',
        'SMTP 25 sends mail.',
        'POP3 110 and IMAP 143 retrieve or manage mailbox content.',
      ],
      referenceItems: [
        {
          label: 'Web',
          value: 'TCP 80 / 443',
          detail: 'The core web pair that separates unencrypted and encrypted browsing.',
        },
        {
          label: 'Mail transfer',
          value: 'TCP 25',
          detail: 'SMTP is the sending and relay side of email.',
        },
        {
          label: 'Mailbox access',
          value: 'TCP 110 / 143',
          detail: 'POP3 and IMAP cover reading or managing messages from the server side.',
        },
      ],
      connections: [
        {
          label: 'DNS and DHCP page',
          href: '/topics/dns-and-dhcp#dns-and-name-resolution',
          note: 'Web access still depends on DNS if users are typing names instead of raw IP addresses.',
        },
      ],
    },
    {
      id: 'infrastructure-and-directory-services',
      title: 'Infrastructure and Directory Services',
      strapline:
        'DNS, DHCP, and LDAP sit underneath many other network tasks, which is why they matter more than students first expect.',
      overview:
        'Some protocols are less visible to end users but far more central to daily support work. DNS resolves names, DHCP gives clients usable settings, and LDAP helps systems query and maintain directory information such as the kind of data used by Active Directory.',
      whyItMatters:
        'This group explains why a network can feel broken in broad, confusing ways even when the real fault is one support service underneath everything else. If DNS, DHCP, or LDAP is unavailable, many other services begin failing as a side effect.',
      howItWorks: [
        'DNS uses port 53 on both TCP and UDP because name-resolution workflows can involve both transports.',
        'DHCP uses UDP 67 and 68 because it needs to communicate with clients before those clients are fully established in a normal TCP-style session.',
        'LDAP uses port 389 on both TCP and UDP and is associated with accessing or maintaining distributed directory information.',
        'These protocols often matter more in practice than beginners expect because they support identity, naming, and initial network configuration.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this service family is easiest to remember by the job each protocol performs under the surface.',
          code:
            'DNS  TCP / UDP 53 -> name resolution\nDHCP UDP 67 / 68 -> automatic client configuration\nLDAP TCP / UDP 389 -> directory access and maintenance',
        },
        'If a client cannot resolve names, a user may report that websites and apps are broken even though the deeper problem is simply DNS.',
        'If a new laptop joins the network but never receives normal settings, DHCP is a far more relevant check than web ports.',
      ],
      misconceptions: [
        '"DNS is only about public websites." Private networks rely on name resolution too.',
        '"A protocol this important should use TCP by default." DHCP is important precisely because it has to work before a client is fully configured for a normal TCP conversation.',
        '"LDAP is only for huge enterprises." Directory-backed identity and lookup patterns appear in many environments, not just the biggest ones.',
      ],
      recap: [
        'DNS handles names on port 53.',
        'DHCP handles client configuration on UDP 67 and 68.',
        'LDAP handles directory access on TCP and UDP 389.',
      ],
      referenceItems: [
        {
          label: 'DNS',
          value: 'TCP / UDP 53',
          detail: 'The name-resolution pair worth memorising early.',
        },
        {
          label: 'DHCP',
          value: 'UDP 67 / 68',
          detail: 'Classic client-configuration pair that appears constantly in troubleshooting.',
        },
        {
          label: 'LDAP',
          value: 'TCP / UDP 389',
          detail: 'Directory communication for identity and enterprise administration contexts.',
        },
      ],
      connections: [
        {
          label: 'Dedicated DNS and DHCP lesson',
          href: '/topics/dns-and-dhcp',
          note: 'Use the focused service page if you want lease timing, APIPA, and gateway troubleshooting explained in more depth.',
        },
      ],
    },
    {
      id: 'windows-services-and-remote-access',
      title: 'Windows Services and Remote Access',
      strapline:
        'Windows-oriented services introduce the ports you are most likely to meet in support and systems administration work.',
      overview:
        'NetBIOS, RDP, SMB, and CIFS matter because they sit close to everyday Windows administration and file access. Some are older, some are still central, and several show up immediately when support work moves from generic connectivity to remote desktop sessions or shared folders.',
      whyItMatters:
        'This group turns abstract port study into practical support language. If someone says Remote Desktop will not connect, or a file share cannot be reached, you should be able to jump straight to the likely service and default port instead of starting from zero.',
      howItWorks: [
        'NetBIOS over TCP/IP uses TCP and UDP ports 137 through 139 and is associated with older Windows naming and session services.',
        'RDP uses TCP 3389 and enables a user or administrator to view and control a remote graphical desktop session.',
        'SMB uses TCP 445 and underpins Microsoft-oriented file sharing and related network communication.',
        'CIFS is a Microsoft implementation closely associated with SMB, which is why the two names often appear together in documentation or exam material.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: this Windows-oriented group is easier to learn once you map each port to the job a support engineer would actually recognise.',
          code:
            'NetBIOS over TCP/IP TCP / UDP 137-139 -> older Windows naming and session services\nRDP                  TCP 3389      -> remote graphical desktop access\nSMB / CIFS           TCP 445       -> Windows file sharing',
        },
        'If a server is online but Remote Desktop times out, TCP 3389 should be one of the first checks.',
        'If users can reach a machine but cannot open its network share, TCP 445 is a more useful starting point than guessing at the whole network path.',
      ],
      misconceptions: [
        '"RDP and SSH are basically the same tool." Both provide remote access, but one is a graphical desktop session and the other is command-line administration.',
        '"NetBIOS and SMB are exactly the same thing." They are closely related in Windows networking history, but they are not simply one single protocol with one number.',
        '"If SMB is blocked, the whole server must be offline." A single blocked service port can fail while other services continue working.',
      ],
      recap: [
        'NetBIOS uses 137 through 139.',
        'RDP uses 3389 for remote desktop access.',
        'SMB and CIFS are strongly associated with TCP 445 for Windows file sharing.',
      ],
      referenceItems: [
        {
          label: 'NetBIOS',
          value: 'TCP / UDP 137-139',
          detail: 'Older Windows-oriented naming and session services.',
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
      connections: [
        {
          label: 'Blocked-port troubleshooting',
          href: '/topics/tcp-and-udp-protocols#ports-in-firewalls-and-access-rules',
          note: 'Use the transport lesson if you want the fuller blocked-port troubleshooting pattern explained step by step.',
        },
      ],
    },
    {
      id: 'ports-matter-for-revision-and-troubleshooting',
      title: 'Ports Matter for Revision and Troubleshooting',
      strapline:
        'The value of memorising ports changes by role, but the ability to ask the right service question never stops mattering.',
      overview:
        'This topic becomes more manageable once you accept two truths at the same time. First, if you are preparing for a networking exam, you should know the major protocol-port pairs directly. Second, in day-to-day work, the ports that matter most depend on your role, but the skill of reasoning from service to port remains valuable throughout your career.',
      whyItMatters:
        'Without protocol-port awareness, a support ticket stays vague. With it, you can move from "it will not connect" to "which service, over which protocol, on which default port, and where could that path be blocked?" That question structure is the real long-term value of learning this material.',
      howItWorks: [
        'Exam preparation usually rewards broad memorisation of the common defaults, especially the high-frequency ones.',
        'Daily work then narrows your focus based on role: systems administration may lean on RDP, SMB, LDAP, and SSH, while web work may lean more on HTTP, HTTPS, SMTP, and DNS.',
        'Firewall and security rules often allow or deny traffic by protocol and port, so blocked access can be caused by a single missing rule rather than a total network failure.',
        'A reachable IP address does not prove a service is available; the specific service path still has to be listening and permitted.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: one useful way to revise is to memorise the ports in role-shaped groups instead of as one long flat list.',
          code:
            'High-value first\nSSH   22\nDNS   53\nDHCP  67 / 68\nHTTP  80\nHTTPS 443\nRDP   3389\nSMB   445\n\nRole examples\nWeb-focused work: HTTP, HTTPS, SMTP, DNS\nSystems admin work: SSH, LDAP, RDP, SMB\nGeneral support: DNS, DHCP, HTTPS, RDP, SMB',
        },
        'If Remote Desktop fails after a firewall change, you do not need to start by blaming the whole network. You need to inspect whether TCP 3389 is still allowed.',
        'If a website is reachable only by raw IP and not by name, DNS is a much stronger suspect than HTTPS itself.',
      ],
      misconceptions: [
        '"Port memorisation becomes useless after the exam." The specific list you use changes by role, but the reasoning skill stays valuable.',
        '"If one service on a host works, every service should work." Firewalls and listening services are granular.',
        '"Only internet-edge firewalls care about ports." Host firewalls, cloud rules, and internal segmentation all use the same idea.',
      ],
      recap: [
        'Memorise the high-value defaults first, then group the rest by service family.',
        'Use protocol-port knowledge to narrow troubleshooting quickly.',
        'The real skill is not just recall, but asking the right service-path question.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check your protocol and port judgement',
        intro:
          'These questions focus on service identity rather than transport theory. Use them to test whether you can move from a user problem to the right protocol-port pair.',
        questions: [
          {
            prompt:
              'A network engineer needs secure command-line access to a switch. Which default protocol-port pair should come to mind first?',
            options: [
              {
                label: 'SSH on TCP 22',
                isCorrect: true,
                feedback:
                  'Correct. SSH is the secure command-line administration protocol and TCP 22 is the default port to remember.',
              },
              {
                label: 'Telnet on TCP 23',
                isCorrect: false,
                feedback:
                  'Telnet is the legacy unsecured comparison point, not the preferred secure choice.',
              },
              {
                label: 'RDP on TCP 3389',
                isCorrect: false,
                feedback:
                  'RDP is for remote graphical desktop access rather than secure command-line management.',
              },
            ],
          },
          {
            prompt:
              'Which protocol is specifically associated with sending or relaying email rather than reading a mailbox?',
            options: [
              {
                label: 'SMTP on TCP 25',
                isCorrect: true,
                feedback:
                  'Correct. SMTP handles mail transfer and relay, while POP3 and IMAP are mailbox-access protocols.',
              },
              {
                label: 'POP3 on TCP 110',
                isCorrect: false,
                feedback:
                  'POP3 retrieves email from a server rather than sending it onward.',
              },
              {
                label: 'IMAP on TCP 143',
                isCorrect: false,
                feedback:
                  'IMAP is for mailbox access and management, not normal mail transfer between systems.',
              },
            ],
          },
          {
            prompt:
              'A user can open a website only over HTTPS and not over plain HTTP. Which default ports are involved in that comparison?',
            options: [
              {
                label: 'TCP 80 and TCP 443',
                isCorrect: true,
                feedback:
                  'Correct. HTTP is associated with TCP 80 and HTTPS with TCP 443.',
              },
              {
                label: 'UDP 67 and UDP 68',
                isCorrect: false,
                feedback:
                  'Those are DHCP ports, not web-browsing ports.',
              },
              {
                label: 'TCP 110 and TCP 143',
                isCorrect: false,
                feedback:
                  'Those ports belong to POP3 and IMAP mailbox access.',
              },
            ],
          },
          {
            prompt:
              'Why is DHCP commonly associated with UDP 67 and 68 instead of a normal TCP session?',
            options: [
              {
                label:
                  'Because the client is still trying to obtain usable configuration before a normal TCP-style conversation makes sense',
                isCorrect: true,
                feedback:
                  'Correct. DHCP has to help the client get configured before the client can behave like a fully established endpoint.',
              },
              {
                label:
                  'Because DHCP is a web protocol and web protocols always use UDP',
                isCorrect: false,
                feedback:
                  'DHCP is not a web protocol, and web traffic commonly relies on TCP rather than UDP.',
              },
              {
                label:
                  'Because TCP cannot be used on private networks',
                isCorrect: false,
                feedback:
                  'TCP works perfectly well on private networks. The issue is the stage of client configuration, not the network scope.',
              },
            ],
          },
          {
            prompt:
              'A Windows administrator can reach a server generally, but a Remote Desktop session times out. Which port should be checked first?',
            options: [
              {
                label: 'TCP 3389',
                isCorrect: true,
                feedback:
                  'Correct. RDP is strongly associated with TCP 3389, so that is a first-check firewall and service port.',
              },
              {
                label: 'TCP 445',
                isCorrect: false,
                feedback:
                  'TCP 445 is more closely tied to SMB and Windows file sharing than to Remote Desktop.',
              },
              {
                label: 'TCP 25',
                isCorrect: false,
                feedback:
                  'TCP 25 belongs to SMTP mail transfer, not Remote Desktop.',
              },
            ],
          },
          {
            prompt:
              'Which statement best explains why protocol-port knowledge stays useful after the exam?',
            options: [
              {
                label:
                  'It lets you turn vague access failures into specific service-path questions',
                isCorrect: true,
                feedback:
                  'Correct. The long-term value is not just recall, but using the service-port pairing to troubleshoot accurately.',
              },
              {
                label:
                  'Once you know the host IP, the exact service port no longer matters',
                isCorrect: false,
                feedback:
                  'A host can be reachable while one specific service path is blocked or unavailable.',
              },
              {
                label:
                  'Only certification exams care about ports because real firewalls never filter by service',
                isCorrect: false,
                feedback:
                  'Real firewalls and security rules commonly allow or deny traffic by protocol and port.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Transport and firewall lesson',
          href: '/topics/tcp-and-udp-protocols',
          note: 'Use the TCP and UDP page if you want this reference material tied back to transport behaviour and blocked-port logic.',
        },
        {
          label: 'Revision page',
          href: '/revision',
          note: 'Use the revision area once you can identify the main protocol families and their default ports without hesitation.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'well-known-port',
      term: 'Well-known Port',
      definition:
        'A commonly recognised default port associated with a widely used network service.',
      importance:
        'It gives administrators and learners a stable reference point even when a service can technically be moved to another port.',
      sectionId: 'ports-map-services-to-endpoints',
    },
    {
      id: 'hypertext-transfer-protocol',
      term: 'Hypertext Transfer Protocol',
      definition:
        'The web protocol used to request and deliver page content, commonly abbreviated as HTTP.',
      importance:
        'It helps anchor the difference between traditional unencrypted browsing on TCP 80 and secure HTTPS on TCP 443.',
      sectionId: 'web-browsing-and-email-services',
    },
    {
      id: 'directory-service',
      term: 'Directory Service',
      definition:
        'A service that stores and provides structured information about users, systems, and other network objects.',
      importance:
        'It gives practical context to why LDAP matters in identity-aware and enterprise environments.',
      sectionId: 'infrastructure-and-directory-services',
    },
    {
      id: 'remote-access-protocol',
      term: 'Remote Access Protocol',
      definition:
        'A protocol used to administer or interact with another system across the network.',
      importance:
        'It helps distinguish command-line tools such as SSH from graphical access tools such as RDP.',
      sectionId: 'windows-services-and-remote-access',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember as grouped service families: FTP, SSH, and Telnet for transfer and command-line administration; HTTP, HTTPS, SMTP, POP3, and IMAP for web and email; DNS, DHCP, and LDAP for infrastructure; and NetBIOS, RDP, and SMB for Windows-oriented support work.',
    memoryFramework: [
      'Start with the service job, not the number: file transfer, administration, web, mail, infrastructure, or Windows support.',
      'Learn secure-versus-legacy pairs together: SSH versus Telnet, HTTP versus HTTPS.',
      'Separate email flow from mailbox access: SMTP sends, POP3 and IMAP retrieve or manage.',
      'Remember the infrastructure trio early: DNS 53, DHCP 67/68, LDAP 389.',
      'Remember the Windows support trio early: NetBIOS 137-139, RDP 3389, SMB 445.',
      'Use the high-value shortlist first: 22, 53, 67/68, 80, 443, 3389, and 445.',
      'When troubleshooting, ask which service should work, on which default port, and whether that port is allowed.',
    ],
    checklist: [
      'I can explain why ports are useful even when services can use custom values.',
      'I can distinguish FTP, SSH, and Telnet by both job and default port.',
      'I can distinguish HTTP and HTTPS by both purpose and security model.',
      'I can explain the difference between SMTP, POP3, and IMAP.',
      'I can explain why DHCP uses UDP 67 and 68 and why DNS and LDAP can use both TCP and UDP.',
      'I can recall the main Windows-oriented defaults: NetBIOS 137-139, RDP 3389, and SMB 445.',
      'I can explain why a reachable host can still fail to deliver the one service a user actually needs.',
    ],
    questions: [
      'Why are default ports still worth learning even though administrators can change them?',
      'Why is SSH a better administrative default than Telnet on untrusted networks?',
      'Why is it useful to separate sending email from reading a mailbox when memorising protocols?',
      'Why do DNS, DHCP, and LDAP often matter more to support work than students first expect?',
      'Why can a Windows server respond generally on the network while Remote Desktop or file sharing still fails?',
      'What makes protocol-port knowledge more useful than a flat list of numbers during troubleshooting?',
    ],
    pitfalls: [
      'Memorising port numbers without remembering what service job each protocol actually performs.',
      'Assuming that knowing the host IP is enough to prove a service should work.',
      'Confusing secure and legacy protocol pairs such as SSH and Telnet or HTTP and HTTPS.',
      'Treating SMTP, POP3, and IMAP as if they all do the same email task.',
      'Ignoring infrastructure protocols because they feel less visible than web or desktop tools.',
      'Forgetting that a single blocked port can break one service while the rest of the host still appears healthy.',
    ],
  },
  relatedTopicSlugs: [
    'tcp-and-udp-protocols',
    'dns-and-dhcp',
    'why-networking-is-important',
  ],
};
