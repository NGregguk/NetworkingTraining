import type { StudyTopic } from '../schema';

export const firewallRulesAndAclsTopic: StudyTopic = {
  slug: 'firewall-rules-and-acls',
  title: 'Firewall Rules and ACLs',
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
    'Learn how firewalls and ACLs enforce network policy, how to read source, destination, protocol, and port in the right order, and why rule order and state matter in real troubleshooting.',
  heroNote:
    'Use this page when firewall rules feel like random allow or block lines and you want a clear way to read them as actual traffic decisions.',
  tags: ['firewall', 'ACL', 'allow rules', 'deny rules', 'stateful inspection'],
  learningObjectives: [
    'Explain why firewalls and ACLs exist as policy tools rather than as vague security labels.',
    'Read the key parts of a rule: direction, source, destination, protocol, port, and action.',
    'Explain why rule order and implicit deny behaviour matter so much.',
    'Describe the practical difference between stateful firewall behaviour and simpler ACL-style matching.',
    'Apply firewall logic to common small-network scenarios such as guest access, printer access, and published services.',
    'Troubleshoot blocked-service symptoms by checking policy deliberately instead of changing rules blindly.',
  ],
  sections: [
    {
      id: 'firewalls-and-acls-exist-to-enforce-policy',
      title: 'Firewalls and ACLs Exist to Enforce Policy',
      strapline:
        'The point is not "security" as a slogan. The point is deciding which traffic should be allowed at all.',
      overview:
        'A firewall or ACL exists because not every device should be able to reach every destination over every protocol and port. These controls express policy in traffic terms. They decide whether a flow is allowed, denied, or sometimes logged for review.',
      whyItMatters:
        'This turns security from something abstract into something readable. When you know a rule is a policy statement about traffic, the whole topic becomes easier to reason about and troubleshoot.',
      howItWorks: [
        'A rule typically evaluates where the traffic is coming from, where it is going, what protocol it uses, which service or port it targets, and what action should be taken.',
        'A firewall often sits at a network boundary and applies policy to traffic crossing that boundary.',
        'An ACL is a rule list that matches traffic against defined conditions and then permits or denies it.',
        'In practice, the same environment may use both firewall features and ACL-style lists depending on the platform and the place in the network.',
        'The most useful beginner mindset is simple: a rule is a statement of who can talk to what, how, and whether that is allowed.',
      ],
      examples: [
        'A guest network may be allowed to reach the internet but denied access to internal printers and file shares.',
        'A branch firewall may allow HTTPS to a specific cloud application while denying other less-needed outbound services.',
        'A home lab service may be published intentionally while most other inbound traffic remains blocked by default.',
      ],
      misconceptions: [
        '"A firewall just makes the network safer somehow." It makes the network safer by enforcing specific traffic decisions.',
        '"ACLs are only for giant enterprise networks." Even small environments benefit from clear allow or deny logic.',
        '"If something is blocked, the rule must be wrong." The policy may actually be behaving exactly as intended.',
      ],
      recap: [
        'Firewalls and ACLs exist to enforce network policy in traffic terms.',
        'They answer who can talk to what, over which protocol or port, and whether that should be allowed.',
        'Understanding the policy logic is the first step in both design and troubleshooting.',
      ],
      connections: [
        {
          label: 'TCP, UDP, and ports',
          href: '/topics/tcp-and-udp-protocols',
          note: 'The transport page gives the protocol and port context that firewall rules depend on.',
        },
        {
          label: 'Common network protocols and ports',
          href: '/topics/common-network-protocols-and-ports',
          note: 'The protocol catalogue is the quickest place to reconnect rule logic to familiar service defaults.',
        },
      ],
    },
    {
      id: 'read-source-destination-protocol-and-port-carefully',
      title: 'Read Source, Destination, Protocol, and Port Carefully',
      strapline:
        'Most firewall confusion comes from reading rules too fast and in the wrong order.',
      overview:
        'A firewall rule becomes much clearer when you read it field by field instead of treating it as one intimidating sentence. Direction matters, source matters, destination matters, and a service definition usually depends on protocol plus port together rather than on a port number alone.',
      whyItMatters:
        'This reading habit prevents some of the most common support mistakes. A rule that looks "close enough" can still be wrong if the source network, destination object, direction, or protocol does not match the real traffic path.',
      howItWorks: [
        'Start by asking whether the rule is describing inbound, outbound, or internal cross-segment traffic.',
        'Read the source carefully, because the same destination service may be permitted for one network and denied for another.',
        'Read the destination carefully, because a rule can apply to one host, one subnet, one service group, or the whole internet.',
        'Read the protocol and port together. `TCP 443` and `UDP 443` are not the same thing just because the number matches.',
        'Only after reading those conditions should you look at the final action such as permit, deny, or log.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: read the fields in a simple policy line instead of skimming only the action.',
          code:
            'Source:      Guest VLAN\nDestination: Internet\nProtocol:    TCP\nPort:        443\nAction:      Allow',
        },
        {
          type: 'code',
          intro:
            'Example: a second rule can block a different destination for the same source.',
          code:
            'Source:      Guest VLAN\nDestination: Internal printers subnet\nProtocol:    Any\nPort:        Any\nAction:      Deny',
        },
        'A printer may be reachable from the staff network but intentionally denied from the guest network even though both are inside the same building.',
      ],
      misconceptions: [
        '"If the port number matches, the protocol does not matter." Protocol is part of the service definition.',
        '"An allow to the internet means an allow to internal services too." Destination scope still matters.',
        '"Rules are mainly about ports." Source, destination, and direction are just as important.',
      ],
      recap: [
        'Read rules field by field: direction, source, destination, protocol, port, then action.',
        'Protocol and port belong together when you reason about a service path.',
        'A rule that is almost right can still block the exact traffic you care about.',
      ],
      referenceItems: [
        {
          label: 'Source',
          value: 'Where the traffic starts',
          detail: 'Could be one host, one subnet, one VLAN, or a wider group of systems.',
        },
        {
          label: 'Destination',
          value: 'Where the traffic is going',
          detail: 'Could be one internal server, a subnet, or a general internet zone.',
        },
        {
          label: 'Protocol plus port',
          value: 'The service definition',
          detail: 'The same port number does not mean the same thing across all protocols.',
        },
      ],
      connections: [
        {
          label: 'NAT, PAT, and port forwarding',
          href: '/topics/nat-pat-and-port-forwarding#port-forwarding-opens-a-deliberate-inbound-path',
          note: 'The NAT page reinforces why a published port mapping still needs the right policy behind it.',
        },
      ],
    },
    {
      id: 'rule-order-and-implicit-deny-shape-the-result',
      title: 'Rule Order and Implicit Deny Shape the Result',
      strapline:
        'The right rule in the wrong place can still behave like the wrong rule.',
      overview:
        'Many rule engines evaluate traffic from top to bottom and stop when a matching rule is found. That means order matters. A broad deny early in the list can block traffic before a later narrow allow is ever considered. Many systems also rely on an implicit deny idea, where traffic not explicitly matched by an allow is blocked by default.',
      whyItMatters:
        'This is one of the highest-value ideas in firewall troubleshooting. When a service fails unexpectedly, the problem is often not that no allow exists, but that a broader earlier match or the final default deny is taking effect instead.',
      howItWorks: [
        'Rules are often evaluated in order until one match is found.',
        'Specific allows usually need to sit above broader denies if the platform follows a first-match model.',
        'An implicit deny means unmatched traffic is refused even if no explicit deny line is visible at the end of the list.',
        'A clean policy usually moves from deliberate specific permits into broader denials, rather than relying on vague overlapping logic.',
        'This is why rule review is partly a reading-order exercise, not just a checklist of whether the desired allow exists somewhere.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: first-match order changes the result.',
          code:
            '1. Deny  Guest VLAN -> Internal networks  Any\n2. Allow Guest VLAN -> Internal printer  TCP 9100\n\nResult on a first-match platform: the deny may block the printer rule before it is ever used',
        },
        'A helpful allow added to the bottom of the list can look correct in a screenshot while still never being reached by the traffic.',
        'A default deny can be the real answer even when nobody remembers that the platform treats unmatched traffic that way.',
      ],
      misconceptions: [
        '"If the allow rule exists anywhere, the traffic will eventually find it." Rule engines do not work like that.',
        '"Only explicit deny lines can block traffic." Unmatched traffic may still be blocked by an implicit deny model.',
        '"Broad early rules are harmless if later rules are more precise." On many platforms, early broad matches win.',
      ],
      recap: [
        'Rule order matters because many platforms stop at the first match.',
        'Specific permits often need to appear before broader denies.',
        'Implicit deny means unmatched traffic can still be blocked without a visible final deny line.',
      ],
      connections: [
        {
          label: 'Network troubleshooting workflow',
          href: '/topics/network-troubleshooting-workflow#change-one-thing-and-keep-the-evidence-clean',
          note: 'Troubleshooting becomes cleaner when you test one policy hypothesis at a time instead of rearranging several rules blindly.',
        },
      ],
    },
    {
      id: 'stateful-firewalls-track-conversations-while-basic-acls-match-rules',
      title: 'Stateful Firewalls Track Conversations While Basic ACLs Match Rules',
      strapline:
        'Some security controls remember that a conversation is already established. Others just evaluate each packet against the rule list.',
      overview:
        'A stateful firewall understands that a permitted outbound connection creates an established conversation, so the matching return traffic can usually come back without a separate manual rule for every reply packet. Simpler ACL-style logic is often closer to packet-by-packet matching without the same conversation awareness.',
      whyItMatters:
        'This explains why firewall policy can feel more practical than a purely stateless rule list. It also helps you understand why different platforms or devices may need different rule designs for the same intended traffic.',
      howItWorks: [
        'A stateful firewall records connection state after a permitted flow begins.',
        'That recorded state lets the return path of the same conversation be recognised and handled appropriately.',
        'A simpler ACL usually just checks whether the traffic matches the rule conditions presented at that moment.',
        'In small networks, the edge device is often stateful, while router or switch ACL features may feel closer to straightforward permit or deny matching.',
        'The difference matters most when you are reasoning about reply traffic, asymmetric behaviour, or why one platform needed fewer explicit rules than another.',
      ],
      examples: [
        'A client allowed to browse out over HTTPS usually receives the return traffic because the firewall understands the conversation state.',
        'A simpler ACL design may need more deliberate thinking about both directions of the path when the platform does not provide the same state awareness.',
        'A beginner can save a lot of confusion by remembering that not every rule engine behaves with the same amount of memory.',
      ],
      misconceptions: [
        '"Stateful and stateless controls are just two names for the same thing." They describe different matching behaviour.',
        '"If outbound access is allowed, return traffic needs a completely separate broad allow every time." Stateful behaviour often handles that more intelligently.',
        '"A simple ACL is broken if it needs more explicit thinking." It is just a different model of policy matching.',
      ],
      recap: [
        'Stateful firewalls remember established conversations.',
        'Simpler ACLs are closer to direct condition matching without the same conversation memory.',
        'Knowing which model you are using makes rule design and troubleshooting much clearer.',
      ],
      referenceItems: [
        {
          label: 'Stateful behaviour',
          value: 'Conversation aware',
          detail: 'Return traffic is evaluated with awareness of the session that created it.',
        },
        {
          label: 'ACL behaviour',
          value: 'Condition matching',
          detail: 'Traffic is matched against rule conditions more directly without the same conversation tracking.',
        },
      ],
      connections: [
        {
          label: 'Networked hosts and services',
          href: '/topics/networked-hosts-and-services#internet-appliances-shape-flow-security-and-resilience',
          note: 'The hosts and services page places these policy controls beside proxies, UTMs, load balancers, and other middle-path devices.',
        },
      ],
    },
    {
      id: 'read-small-network-policy-scenarios-clearly',
      title: 'Read Small-Network Policy Scenarios Clearly',
      strapline:
        'Most firewall work at this level is not about massive enterprise complexity. It is about reading a few decisions cleanly.',
      overview:
        'A small home or small-business firewall usually serves a handful of clear goals: let normal users browse safely, protect the inside from unsolicited inbound traffic, keep guests away from trusted resources, and expose only the few services that truly need publishing. That makes this a very good beginner topic because the policy ideas are concrete and testable.',
      whyItMatters:
        'The best beginner outcome is confidence in reading a rule and predicting the result. Once you can do that, service failures become far less mysterious and design choices become far more deliberate.',
      howItWorks: [
        'Start from the traffic goal, such as staff printing, guest browsing, or a published lab service.',
        'Translate that goal into source, destination, protocol, and port language.',
        'Check whether the rule order allows the intended path before a broader deny catches it.',
        'Check whether stateful behaviour or NAT behaviour changes what you need to define explicitly.',
        'When troubleshooting, prove the service and path first so you do not blame the firewall for an application that is not even listening.',
      ],
      examples: [
        'A guest Wi-Fi should usually browse outward while remaining blocked from internal printers, NAS shares, and management addresses.',
        'A published home-lab service may need both a correct port forward and a policy that actually permits the inbound path.',
        'A trusted office laptop may be allowed to reach a printer subnet while a guest phone is denied the same destination entirely.',
      ],
      misconceptions: [
        '"Firewall policy is only for specialists." Beginner-sized networks still need clear policy decisions.',
        '"If a service fails, the firewall is the most likely cause." The host, the listener, DNS, routing, or NAT may be the real failure instead.',
        '"Good firewalling means allowing everything internal by default." Good policy is shaped by need, not by convenience alone.',
      ],
      recap: [
        'Small-network firewall work is about clean policy goals and readable traffic decisions.',
        'Translate the requirement into source, destination, protocol, and port before touching the rules.',
        'Troubleshooting improves when you prove service health and path logic alongside the policy review.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the firewall-reading instinct',
        intro:
          'Use these questions to confirm that you can read rules in the right order and predict which policy should apply.',
        questions: [
          {
            prompt:
              'Why can a correct-looking allow rule still fail to help the traffic?',
            options: [
              {
                label: 'Because an earlier broader match or implicit deny may still take effect first',
                isCorrect: true,
                feedback:
                  'Correct. Rule order and default behaviour matter as much as the presence of the allow itself.',
              },
              {
                label: 'Because allow rules only work on weekends',
                isCorrect: false,
                feedback:
                  'That does not describe firewall logic.',
              },
              {
                label: 'Because TCP ports do not apply to firewall policy',
                isCorrect: false,
                feedback:
                  'Protocol and port are central parts of many firewall decisions.',
              },
            ],
          },
          {
            prompt:
              'What is one practical value of stateful firewall behaviour?',
            options: [
              {
                label: 'It can recognise reply traffic as part of an established allowed conversation',
                isCorrect: true,
                feedback:
                  'Correct. Stateful tracking helps the device handle established return traffic more intelligently.',
              },
              {
                label: 'It removes the need to think about source and destination',
                isCorrect: false,
                feedback:
                  'Those fields still matter in policy design and review.',
              },
              {
                label: 'It guarantees every application is reachable if the host is online',
                isCorrect: false,
                feedback:
                  'Stateful behaviour does not override the need for actual permits and healthy services.',
              },
            ],
          },
          {
            prompt:
              'A guest device can browse the internet but cannot reach an internal printer. What is the strongest interpretation?',
            options: [
              {
                label: 'The guest policy is likely blocking access to internal resources by design',
                isCorrect: true,
                feedback:
                  'Correct. That is a very common and sensible small-network policy outcome.',
              },
              {
                label: 'The internet rule must automatically allow printer traffic too',
                isCorrect: false,
                feedback:
                  'Internet access and internal resource access are different destinations and often different policies.',
              },
              {
                label: 'The printer must always be broken if guests cannot reach it',
                isCorrect: false,
                feedback:
                  'The more likely explanation is policy rather than printer failure.',
              },
            ],
          },
          {
            prompt:
              'What should you read first when looking at a firewall rule?',
            options: [
              {
                label: 'The traffic conditions such as source, destination, protocol, and port',
                isCorrect: true,
                feedback:
                  'Correct. Reading the conditions first keeps you from misreading the action in isolation.',
              },
              {
                label: 'Only the final allow or deny action',
                isCorrect: false,
                feedback:
                  'That skips the traffic the rule is actually describing.',
              },
              {
                label: 'Only the colour or icon used in the management interface',
                isCorrect: false,
                feedback:
                  'Visual styling is not the logic of the rule.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Planning a small network',
          href: '/topics/planning-a-basic-home-and-small-business-network',
          note: 'The planning page turns these policy ideas into practical guest, IoT, and trusted-network design choices.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'acl',
      term: 'ACL',
      definition:
        'Access Control List, a rule list that matches traffic against defined conditions and then permits or denies it.',
      importance:
        'It is one of the core policy mechanisms learners will keep seeing across routers, firewalls, and switches.',
      sectionId: 'firewalls-and-acls-exist-to-enforce-policy',
    },
    {
      id: 'firewall-rule',
      term: 'Firewall Rule',
      definition:
        'A policy statement that describes which traffic is allowed, denied, or logged based on conditions such as source, destination, protocol, and port.',
      importance:
        'It turns vague security goals into actual network behaviour.',
      sectionId: 'firewalls-and-acls-exist-to-enforce-policy',
    },
    {
      id: 'implicit-deny',
      term: 'Implicit Deny',
      definition:
        'The idea that traffic not explicitly permitted by the rule set is blocked by default, even if no visible final deny line is shown.',
      importance:
        'It explains a large number of rule-reading mistakes and troubleshooting surprises.',
      sectionId: 'rule-order-and-implicit-deny-shape-the-result',
    },
    {
      id: 'stateful-inspection',
      term: 'Stateful Inspection',
      definition:
        'Firewall behaviour that remembers an allowed conversation and recognises matching return traffic as part of that established session.',
      importance:
        'It explains why many firewalls need fewer explicit reply rules than a simple ACL model would.',
      sectionId: 'stateful-firewalls-track-conversations-while-basic-acls-match-rules',
    },
    {
      id: 'ingress',
      term: 'Ingress',
      definition:
        'Traffic entering an interface, network segment, or security boundary from the point of view of the device applying policy.',
      importance:
        'It helps learners read direction-sensitive rules more accurately.',
      sectionId: 'read-source-destination-protocol-and-port-carefully',
    },
    {
      id: 'egress',
      term: 'Egress',
      definition:
        'Traffic leaving an interface, network segment, or security boundary from the point of view of the device applying policy.',
      importance:
        'It is the counterpart to ingress and is central to reading direction in policy rules.',
      sectionId: 'read-source-destination-protocol-and-port-carefully',
    },
    {
      id: 'least-privilege',
      term: 'Least Privilege',
      definition:
        'A design principle that grants only the access genuinely needed instead of broad unnecessary reachability.',
      importance:
        'It is one of the clearest ways to judge whether a firewall policy is disciplined or overly permissive.',
      sectionId: 'rule-order-and-implicit-deny-shape-the-result',
    },
  ],
  revision: {
    summary:
      'Remember firewall policy as a reading discipline: start with the traffic goal, translate it into source, destination, protocol, and port, check the action and rule order, then remember that stateful behaviour and implicit deny can change what happens even when the rule list looks simple.',
    memoryFramework: [
      'Start with policy, not with fear: decide who should talk to what at all.',
      'Read rules field by field: direction, source, destination, protocol, port, then action.',
      'Remember order: a broad early match can beat a later specific permit.',
      'Remember implicit deny: not being explicitly allowed may still mean blocked.',
      'Remember state: a stateful firewall can recognise reply traffic from an established conversation.',
      'Design around least privilege rather than around broad trust.',
    ],
    checklist: [
      'I can explain what a firewall rule is really describing.',
      'I can read source, destination, protocol, and port in the right order.',
      'I can explain why rule order matters.',
      'I can explain what implicit deny means.',
      'I can explain the practical difference between stateful firewall behaviour and simpler ACL matching.',
      'I can apply policy logic to guest access, published services, and internal resource access.',
      'I can troubleshoot a blocked-service symptom without assuming the firewall is always the cause.',
    ],
    questions: [
      'Why is "allow the app" an incomplete firewall instruction unless you know the real traffic path?',
      'Why can an earlier broad deny block a later specific allow?',
      'Why does protocol plus port matter more than the port number alone?',
      'Why do guest and trusted networks often need different firewall policy even if they use the same internet connection?',
      'Why does stateful behaviour reduce some of the explicit reply logic a simpler ACL might need?',
      'Why is least privilege a better design instinct than broad internal trust by default?',
    ],
    pitfalls: [
      'Reading only the final allow or deny action instead of the full rule conditions.',
      'Forgetting that rule order may decide the result before the desired permit is even reached.',
      'Treating protocol and port as separate unrelated facts.',
      'Assuming a firewall is the cause before the service, routing, and NAT path have been checked.',
      'Writing overly broad rules for convenience and then forgetting what was actually exposed.',
    ],
  },
  relatedTopicSlugs: [
    'tcp-and-udp-protocols',
    'common-network-protocols-and-ports',
    'nat-pat-and-port-forwarding',
    'networked-hosts-and-services',
    'planning-a-basic-home-and-small-business-network',
    'network-troubleshooting-workflow',
  ],
};
