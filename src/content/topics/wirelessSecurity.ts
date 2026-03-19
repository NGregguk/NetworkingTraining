import type { StudyTopic } from '../schema';

export const wirelessSecurityTopic: StudyTopic = {
  slug: 'wireless-security',
  title: 'Wireless Security',
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
    'Learn how wireless networks are protected in practice, why WPA2 and WPA3 matter, why hidden SSIDs and WPS are weak substitutes for real security, and how guest isolation reduces risk.',
  heroNote:
    'Use this page when a wireless password feels like the whole story and you want a clearer model of how association, encryption, segmentation, and sensible defaults work together.',
  tags: ['WPA2', 'WPA3', 'WPS', 'guest Wi-Fi', 'wireless security'],
  learningObjectives: [
    'Explain why wireless security starts with the fact that radio traffic extends beyond the room where the access point sits.',
    'Compare open Wi-Fi, WEP, WPA2, and WPA3 at a practical beginner level.',
    'Explain the role of a pre-shared key and why passphrase quality still matters.',
    'Describe why hidden SSIDs and WPS are poor substitutes for proper wireless security.',
    'Explain how guest networks, client isolation, and segmentation reduce the impact of untrusted devices.',
    'Recognise common wireless-security design mistakes in homes and small businesses.',
  ],
  sections: [
    {
      id: 'wireless-security-starts-before-a-client-joins',
      title: 'Wireless Security Starts Before a Client Joins',
      strapline:
        'A wired port lives in one place, but a wireless signal reaches anyone within radio range.',
      overview:
        'Wireless security begins with a basic physical reality: anyone close enough to hear the signal can attempt to interact with it. That means the access point has to control who can join, how traffic is protected in the air, and what newly joined devices are allowed to reach afterwards.',
      whyItMatters:
        'Beginners often think about Wi-Fi security as only a password choice. The better model is admission plus containment. You need to control association and then limit trust sensibly once a client is on the network.',
      howItWorks: [
        'A wireless network advertises or otherwise exposes a service area that nearby clients can detect.',
        'The access point and client need a security method that controls who can associate and how traffic is protected in transit.',
        'Even after a client joins successfully, the design still needs policies around guest access, IoT placement, and internal trust boundaries.',
        'Because the medium is shared and observable over the air, weak defaults are more dangerous than they often feel in a casual home setup.',
        'Good wireless security combines the radio layer, the management defaults, and the broader network segmentation plan.',
      ],
      examples: [
        'A strong office SSID can still be a weak design if guests join the same trusted network as staff laptops.',
        'A home user may have a good passphrase but still leave WPS enabled or reuse the same administrative password on the router.',
        'A camera on Wi-Fi may join successfully, but it should still be treated as less trusted than a work laptop.',
      ],
      misconceptions: [
        '"If the Wi-Fi has a password, the design is secure enough." The password is only one control among several.',
        '"Wireless security only matters in large offices." Small homes and home offices are still exposed to nearby listeners and untrusted devices.',
        '"Joining the network safely means the device should trust everything on the network too." Association and trust scope are not the same thing.',
      ],
      recap: [
        'Wireless security starts with radio exposure, not just with convenience.',
        'The design has to control who joins and what they can reach after joining.',
        'Good Wi-Fi security depends on both authentication and sensible trust boundaries.',
      ],
      connections: [
        {
          label: 'Wireless technologies',
          href: '/topics/wireless-networking-technologies',
          note: 'Return to the wireless foundations page if you want the spectrum and access-point behaviour underneath these security choices.',
        },
      ],
    },
    {
      id: 'wpa2-and-wpa3-are-the-practical-baselines',
      title: 'WPA2 and WPA3 Are the Practical Baselines',
      strapline:
        'Older wireless protection names matter mostly because you need to know what to avoid.',
      overview:
        'Wireless security standards evolved over time. Open networks offer no meaningful link protection. WEP is obsolete and should not be trusted. WPA improved on older designs, but for most modern small-network planning the practical baseline is WPA2 or WPA3, with WPA3 being the newer and stronger option when the clients support it.',
      whyItMatters:
        'This is the section that helps a beginner stop treating all Wi-Fi labels as marketing. The standard choice affects how safely wireless traffic is protected and what sort of clients can join.',
      howItWorks: [
        'An open network allows association without meaningful encryption, which may be acceptable only for intentionally public guest access with other controls around it.',
        'WEP is an older method that is no longer considered a safe choice for normal use.',
        'WPA2 became the long-standing practical baseline for protected personal or business wireless access.',
        'WPA3 is the newer generation and is generally preferred when the access point and clients support it reliably.',
        'Many environments still run WPA2 because of client compatibility, while newer environments may use WPA3 or a mixed transition approach if needed.',
      ],
      examples: [
        'A modern home router should normally be using WPA2 or WPA3 rather than an older legacy option.',
        'A legacy device that cannot join the stronger preferred mode may become the reason a mixed or transitional setup is considered, but that tradeoff should be understood deliberately.',
        {
          type: 'code',
          intro:
            'Example: read the basic security labels in order of practical trust.',
          code:
            'Open network -> no meaningful link protection\nWEP          -> obsolete and unsafe\nWPA2         -> common practical baseline\nWPA3         -> newer stronger baseline when supported',
        },
      ],
      misconceptions: [
        '"All security labels mean roughly the same thing if there is still a password." They do not. The protocol family matters.',
        '"WEP is acceptable for old equipment if the password is long enough." WEP is obsolete and not a safe recommendation.',
        '"The newest standard always works perfectly with every old client." Compatibility still has to be checked in real environments.',
      ],
      recap: [
        'Open and obsolete modes should be treated very differently from modern protected modes.',
        'WPA2 remains common, while WPA3 is the preferred newer option when support is available.',
        'The security label is a real design decision, not a decorative setting.',
      ],
      referenceItems: [
        {
          label: 'Open Wi-Fi',
          value: 'No proper link protection',
          detail: 'Useful only when the lack of protection is understood and other controls are used intentionally.',
        },
        {
          label: 'WPA2',
          value: 'Long-standing protected baseline',
          detail: 'Still common on homes and small businesses because compatibility is broad.',
        },
        {
          label: 'WPA3',
          value: 'Newer protected baseline',
          detail: 'Preferred where client and access-point support is ready for it.',
        },
      ],
      connections: [
        {
          label: 'Planning a small network',
          href: '/topics/planning-a-basic-home-and-small-business-network#secure-and-configure-the-core-network',
          note: 'The planning page shows where these choices sit in the wider rollout of SSIDs, DHCP, and segmentation.',
        },
      ],
    },
    {
      id: 'passphrases-ssids-and-wps-need-sensible-defaults',
      title: 'Passphrases, SSIDs, and WPS Need Sensible Defaults',
      strapline:
        'The easiest wireless mistakes are usually configuration mistakes rather than radio mistakes.',
      overview:
        'Once the security mode is chosen, the next layer is the way the wireless network is presented and managed. Strong passphrases matter. Router administrative credentials matter too. SSID naming should be clear without exposing unnecessary personal details, and WPS should be treated cautiously because convenience features can undermine the security model.',
      whyItMatters:
        'Many avoidable wireless-security problems come from weak human choices rather than from exotic attacks. Sensible defaults remove a lot of risk without making the network harder to use.',
      howItWorks: [
        'A pre-shared key is the shared secret clients use to join a protected personal wireless network.',
        'The key should be strong enough that it is not guessable from names, addresses, birthdays, or basic patterns.',
        'The SSID is the visible network name. It should help users identify the right network without advertising unnecessary personal information.',
        'Hiding an SSID is not a strong security control. It mainly reduces convenience while leaving the network discoverable in other ways.',
        'WPS was designed to make joining easier, but reducing friction is not the same thing as increasing security, so it is usually safer to rely on the normal protected join method instead.',
      ],
      examples: [
        'Naming the wireless network after the street address or full family surname is unnecessary and offers no security benefit.',
        'A long unique passphrase is far more valuable than a hidden SSID if the goal is real wireless protection.',
        'A user may think WPS is helpful for a quick join, but convenience features often deserve extra scrutiny rather than blind trust.',
      ],
      misconceptions: [
        '"A hidden SSID makes the network effectively invisible." It is not strong protection and should not be treated as one.',
        '"WPS is fine because it only helps trusted users join faster." Convenience features still shape the attack surface.',
        '"The Wi-Fi password matters more than the router admin password." Both matter because a weak admin password can undo the rest of the design.',
      ],
      recap: [
        'Strong pre-shared keys matter more than cosmetic tricks such as hiding the SSID.',
        'SSID naming should be clear and boring rather than personal or revealing.',
        'WPS convenience is usually not worth treating as a security strategy.',
      ],
      connections: [
        {
          label: 'Networking tools',
          href: '/topics/networking-tools#wireless-and-packet-analysis-tools-help-you-see-the-problem',
          note: 'The tools page helps with the radio side, but weak management defaults still have to be fixed in configuration.',
        },
      ],
    },
    {
      id: 'guest-networks-and-client-isolation-reduce-risk',
      title: 'Guest Networks and Client Isolation Reduce Risk',
      strapline:
        'The safest wireless design is usually not one trusted flat network for everything.',
      overview:
        'Good wireless design limits trust after association. Guest users, IoT devices, and unknown or temporary clients should not usually land in the same trust zone as work laptops, file shares, printers, or management interfaces. Guest networks and client-isolation features reduce unnecessary reachability between devices.',
      whyItMatters:
        'This is where wireless security becomes practical network design rather than only a password discussion. Segmentation lowers risk because compromise or misuse in one part of the wireless environment does not automatically become access to the rest.',
      howItWorks: [
        'A guest network places visitors on a separate network or policy path from trusted internal devices.',
        'Client isolation prevents wireless clients on the same guest or limited network from talking directly to one another when that behaviour is not needed.',
        'IoT devices often belong on their own SSID or VLAN-backed segment because their security posture is usually less trustworthy.',
        'Internal business services and management interfaces should not normally be reachable from a casual guest wireless segment.',
        'This design keeps wireless access useful without making every joined device an equal insider.',
      ],
      examples: [
        'A guest can browse the internet successfully without gaining access to a family NAS, office printer, or lab server.',
        'A smart bulb and a work laptop may both use Wi-Fi, but they do not deserve the same trust level or access to the same internal resources.',
        'A café-style guest network might intentionally allow internet access only, with no direct client-to-client visibility.',
      ],
      misconceptions: [
        '"If someone knows the Wi-Fi password, they should see everything on the network." Access does not have to mean full trust.',
        '"Guest networks are mainly for etiquette rather than security." Their real value is often reduced blast radius and cleaner policy.',
        '"Client isolation is unnecessary because guests usually behave well." Security design should not depend on assumptions about behaviour.',
      ],
      recap: [
        'Wireless security improves when trust is segmented after association.',
        'Guest access should usually be separated from trusted internal systems.',
        'Client isolation is a practical way to reduce lateral movement on limited wireless segments.',
      ],
      connections: [
        {
          label: 'Network types and VLANs',
          href: '/topics/network-types-and-internet-connections#vlans-split-one-physical-lan-into-multiple-logical-networks',
          note: 'Segmentation works best when you can connect the SSID design back to the underlying logical network boundaries.',
        },
        {
          label: 'Firewall rules and ACLs',
          href: '/topics/firewall-rules-and-acls',
          note: 'The firewall page covers the allow and deny logic often used to enforce guest and trusted network separation.',
        },
      ],
    },
    {
      id: 'connected-does-not-mean-secure-or-correctly-placed',
      title: 'Connected Does Not Mean Secure or Correctly Placed',
      strapline:
        'A client can join successfully and still be unsafe, misplaced, or unable to reach the intended resources.',
      overview:
        'The final wireless-security habit is learning to read the situation clearly. A user can be connected to an open network instead of the protected one. A device can join the guest SSID and then complain about missing access to an internal printer. A router can advertise a secure mode while still keeping weak defaults elsewhere. The solution is to prove the intended network, protection mode, and trust zone rather than stopping at "connected".',
      whyItMatters:
        'This mindset prevents a lot of confused support work. Wireless success should be defined by correct association and correct policy, not just by a link icon.',
      howItWorks: [
        'Confirm the device joined the intended SSID and not a lookalike or less-protected option.',
        'Confirm the wireless security mode matches the design expectation, such as WPA2 or WPA3 rather than open or legacy modes.',
        'Confirm the client is on the right trust segment, especially when guest and trusted SSIDs both exist.',
        'Confirm the router or access point is using sensible admin credentials and not relying on weak convenience features such as WPS.',
        'Treat security review as part of wireless troubleshooting rather than as a separate afterthought.',
      ],
      examples: [
        'A user can report "Wi-Fi is broken" when the real issue is that they joined the guest SSID and are being blocked from an internal service by design.',
        'A home network can seem protected because it has a password while still carrying extra risk because WPS remains enabled and the admin password was never changed.',
        'A device that roams onto the wrong remembered SSID can create both connectivity confusion and security confusion at the same time.',
      ],
      misconceptions: [
        '"If the client is online, the security review can wait." The wrong network or weak settings may be the actual problem.',
        '"Security checks slow down support." They often shorten it by exposing the real mismatch early.',
        '"Wireless security is too advanced for ordinary home support." Basic wireless security mistakes are some of the most common support issues around.',
      ],
      recap: [
        'Connected is not the same thing as protected or correctly placed.',
        'Support should prove the SSID, security mode, and trust segment deliberately.',
        'Wireless security review belongs inside normal troubleshooting and planning, not outside it.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the wireless-security instinct',
        intro:
          'Use these questions to confirm that you can separate real wireless protection from weak convenience or misleading success signals.',
        questions: [
          {
            prompt:
              'Which option is the strongest practical statement about hidden SSIDs?',
            options: [
              {
                label: 'They are not a strong substitute for real wireless security controls',
                isCorrect: true,
                feedback:
                  'Correct. Hiding the network name does not replace proper protection modes, strong passphrases, or segmentation.',
              },
              {
                label: 'They are the best main defence for any home Wi-Fi network',
                isCorrect: false,
                feedback:
                  'A hidden SSID is not the main protection mechanism a secure design should rely on.',
              },
              {
                label: 'They remove the need for a strong pre-shared key',
                isCorrect: false,
                feedback:
                  'A strong key remains one of the basic requirements on a protected personal wireless network.',
              },
            ],
          },
          {
            prompt:
              'Why is a guest network valuable even when the guest is trustworthy?',
            options: [
              {
                label: 'Because it reduces unnecessary access to trusted internal devices and services',
                isCorrect: true,
                feedback:
                  'Correct. The main benefit is reduced blast radius and cleaner access policy.',
              },
              {
                label: 'Because guest networks automatically increase internet speed',
                isCorrect: false,
                feedback:
                  'Guest separation is a trust and policy decision, not an automatic performance upgrade.',
              },
              {
                label: 'Because a guest network uses a different radio technology from the main network',
                isCorrect: false,
                feedback:
                  'The difference is usually policy and segmentation rather than a different radio protocol.',
              },
            ],
          },
          {
            prompt:
              'What is one sensible default stance on WPS?',
            options: [
              {
                label: 'Treat it cautiously and do not rely on it as a security strength',
                isCorrect: true,
                feedback:
                  'Correct. Convenience features should not be confused with stronger security design.',
              },
              {
                label: 'Use it as the main way to keep unknown users off the network',
                isCorrect: false,
                feedback:
                  'WPS is about convenient joining, not about being the core security defence.',
              },
              {
                label: 'Prefer it over WPA2 or WPA3 when the signal is weak',
                isCorrect: false,
                feedback:
                  'Signal conditions and security method are separate design questions.',
              },
            ],
          },
          {
            prompt:
              'A user joins Wi-Fi successfully but cannot reach the office printer, while internet browsing works. What is one strong explanation?',
            options: [
              {
                label: 'The user joined a guest or isolated network where printer access is intentionally blocked',
                isCorrect: true,
                feedback:
                  'Correct. Successful association does not guarantee the client is on the right trust segment.',
              },
              {
                label: 'WPA3 always blocks printer traffic by default',
                isCorrect: false,
                feedback:
                  'The issue points more strongly toward network placement or policy than to the security mode label itself.',
              },
              {
                label: 'A strong passphrase disables internal services automatically',
                isCorrect: false,
                feedback:
                  'Passphrase strength does not work that way. The likely explanation is segmentation or policy.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Network troubleshooting workflow',
          href: '/topics/network-troubleshooting-workflow',
          note: 'Use the troubleshooting page if you want a general sequence for proving whether the issue is configuration, policy, DNS, or path.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'wep',
      term: 'WEP',
      definition:
        'An older wireless protection method that is now obsolete and not a safe recommendation for normal use.',
      importance:
        'It is useful mostly as a recognition term so you know it belongs in the avoid category.',
      sectionId: 'wpa2-and-wpa3-are-the-practical-baselines',
    },
    {
      id: 'wpa2',
      term: 'WPA2',
      definition:
        'A long-standing wireless security standard that became the common protected baseline for many home and business Wi-Fi environments.',
      importance:
        'It remains one of the most recognisable and widely deployed protected wireless modes.',
      sectionId: 'wpa2-and-wpa3-are-the-practical-baselines',
    },
    {
      id: 'wpa3',
      term: 'WPA3',
      definition:
        'A newer generation of wireless security that is generally preferred when the access point and clients support it properly.',
      importance:
        'It is the modern target mode for stronger protected wireless access where compatibility allows.',
      sectionId: 'wpa2-and-wpa3-are-the-practical-baselines',
    },
    {
      id: 'pre-shared-key',
      term: 'Pre-Shared Key (PSK)',
      definition:
        'The shared secret or passphrase clients use to join a protected personal wireless network.',
      importance:
        'It is the practical entry point for most home and small-business protected Wi-Fi designs.',
      sectionId: 'passphrases-ssids-and-wps-need-sensible-defaults',
    },
    {
      id: 'guest-network',
      term: 'Guest Network',
      definition:
        'A separate wireless network or policy path intended for visitors or less-trusted devices instead of the main trusted internal segment.',
      importance:
        'It reduces unnecessary access to internal systems and keeps the trust model cleaner.',
      sectionId: 'guest-networks-and-client-isolation-reduce-risk',
    },
    {
      id: 'client-isolation',
      term: 'Client Isolation',
      definition:
        'A wireless feature that prevents clients on the same limited network from talking directly to one another when that communication is not needed.',
      importance:
        'It reduces lateral movement and unnecessary peer-to-peer visibility on guest or restricted segments.',
      sectionId: 'guest-networks-and-client-isolation-reduce-risk',
    },
    {
      id: 'wps',
      term: 'WPS',
      definition:
        'A convenience feature intended to simplify wireless joining, which should not be treated as a substitute for a strong security design.',
      importance:
        'It is a common beginner-facing label that deserves caution rather than blind trust.',
      sectionId: 'passphrases-ssids-and-wps-need-sensible-defaults',
    },
  ],
  revision: {
    summary:
      'Remember wireless security as a layered decision: choose a modern protected mode, use a strong pre-shared key, avoid weak shortcuts such as treating hidden SSIDs or WPS as serious protection, then separate guest and untrusted devices from the trusted core.',
    memoryFramework: [
      'Start with the medium: radio reaches beyond the room, so nearby listeners matter.',
      'Choose the baseline: avoid open or obsolete modes for normal protected use, prefer WPA2 or WPA3.',
      'Use strong basics: a strong PSK and strong router admin password matter more than cosmetic tricks.',
      'Treat hidden SSIDs and WPS as poor substitutes for real protection.',
      'Segment trust: guests and IoT devices should not usually land in the main trusted network.',
      'Remember that connected does not mean secure or correctly placed.',
    ],
    checklist: [
      'I can explain why wireless security starts with the shared radio environment.',
      'I can explain why WEP is an avoid label rather than a valid recommendation.',
      'I can compare WPA2 and WPA3 at a practical beginner level.',
      'I can explain what a pre-shared key is.',
      'I can explain why hidden SSIDs are not strong security by themselves.',
      'I can explain why guest networks and client isolation reduce risk.',
      'I can explain why a device can be connected successfully but still be on the wrong network for the job.',
    ],
    questions: [
      'Why is wireless security more than just picking a password?',
      'Why should a home or small office prefer modern protected modes over older legacy ones?',
      'Why is a long unique passphrase more valuable than hiding the SSID?',
      'Why can a guest wireless design be useful even when the guests are trusted people?',
      'Why is a wireless support case sometimes really a security-placement problem rather than a signal-strength problem?',
      'Why should router management credentials be part of the wireless-security conversation too?',
    ],
    pitfalls: [
      'Treating a wireless password as the only meaningful security choice.',
      'Keeping obsolete or weak wireless modes enabled for convenience without understanding the tradeoff.',
      'Using personal details in SSID names or passphrases.',
      'Treating hidden SSIDs or WPS as if they are serious substitutes for proper protection.',
      'Putting guests, IoT, and trusted work devices on one flat wireless segment.',
    ],
  },
  relatedTopicSlugs: [
    'wireless-networking-technologies',
    'network-types-and-internet-connections',
    'planning-a-basic-home-and-small-business-network',
    'firewall-rules-and-acls',
    'network-troubleshooting-workflow',
  ],
};
