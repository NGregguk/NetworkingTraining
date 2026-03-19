import type { StudyTopic } from '../schema';

export const wirelessNetworkingTechnologiesTopic: StudyTopic = {
  slug: 'wireless-networking-technologies',
  title: 'Wireless Networking Technologies',
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
    'Learn how Wi-Fi standards evolved, how 2.4 GHz, 5 GHz, and 6 GHz differ, how channels and analysers affect performance, and where Bluetooth, NFC, and RFID fit.',
  heroNote:
    'Use this page when "wireless" feels too vague and you want a practical model of which protocol is built for speed, range, low power, or very short-range exchange.',
  tags: ['Wi-Fi 6', 'Wi-Fi 7', 'Bluetooth', 'NFC', 'RFID'],
  learningObjectives: [
    'Explain why wireless networking includes more than Wi-Fi alone.',
    'Compare the major Wi-Fi generations from 802.11a and b through Wi-Fi 7.',
    'Describe the tradeoff between 2.4 GHz, 5 GHz, and 6 GHz in terms of range, congestion, and throughput.',
    'Explain why channel width and channel selection affect performance in crowded environments.',
    'Use Wi-Fi analyser data to reason about congestion, channel use, signal strength, and optimisation opportunities.',
    'Differentiate Bluetooth, NFC, and RFID by range, purpose, power use, and real-world examples.',
  ],
  sections: [
    {
      id: 'wireless-is-a-family-of-technologies-not-one-thing',
      title: 'Wireless Is a Family of Technologies, Not One Thing',
      strapline:
        'The word "wireless" hides very different design goals under one label.',
      overview:
        'Most users casually call every wireless interaction Wi-Fi, but that is only one part of the picture. Different wireless technologies are optimised for very different tradeoffs such as throughput, battery life, close-range transactions, or item tracking.',
      whyItMatters:
        'If you treat every wireless problem as a Wi-Fi problem, you miss the real design question. The first question is what kind of wireless relationship the device actually needs: high-speed network access, low-power peripheral pairing, tap-to-pay, or inventory tracking.',
      howItWorks: [
        'Wi-Fi is the main wireless technology for local network access and internet connectivity.',
        'Bluetooth is designed for low-power short-range communication, especially in personal-area use cases such as headsets, keyboards, and controllers.',
        'NFC is designed for extremely close-range communication, often measured in centimetres rather than metres.',
        'RFID is designed for tag reading and identification without requiring direct optical line of sight like a barcode scanner.',
        'Because the goals differ, the performance expectations differ too. The best wireless technology depends on what problem you are solving, not on which label is most famous.',
      ],
      examples: [
        'A laptop joining the office SSID is a Wi-Fi scenario.',
        'A wireless mouse or earbuds paired to a computer are usually Bluetooth scenarios.',
        'A payment card or phone tapped on a reader is an NFC scenario.',
        'A warehouse reader identifying tagged inventory is an RFID scenario.',
      ],
      misconceptions: [
        '"Wireless" and "Wi-Fi" are the same thing. Wi-Fi is only one member of the wireless family.',
        '"The fastest wireless technology is always the best one." Battery life, distance, and interaction style often matter more than raw speed.',
        '"If a device has no screen, it probably is not really networked." Many small wireless and IoT devices still communicate constantly.',
      ],
      recap: [
        'Wireless technologies exist for different purposes, not just different brands.',
        'The correct choice depends on the job: access, pairing, tap, or tag reading.',
        'Knowing the purpose first makes the rest of wireless networking far easier to reason about.',
      ],
      connections: [
        {
          label: 'Network types and internet connections',
          href: '/topics/network-types-and-internet-connections',
          note: 'Return to the broader scope discussion if you want to reconnect WLAN design to overall network type and segmentation choices.',
        },
      ],
    },
    {
      id: 'wi-fi-standards-show-how-wireless-capability-evolved',
      title: 'Wi-Fi Standards Show How Wireless Capability Evolved',
      strapline:
        'The standards look like a list until you connect each one to band choice, speed, and compatibility.',
      overview:
        'Wi-Fi standards evolved from 802.11a and 802.11b into the consumer-friendly Wi-Fi 4, 5, 6, 6E, and 7 labels. Each generation changed the usable bands, the theoretical throughput, or the way multiple antennas and channels were used.',
      whyItMatters:
        'This is what helps you interpret what a client or access point is actually capable of. It also explains why older devices may still connect but fail to benefit from newer spectrum and efficiency improvements.',
      howItWorks: [
        '802.11a used 5 GHz and could theoretically reach 54 Mbps, but it had limited range and is mainly relevant now as a historical reference point.',
        '802.11b used 2.4 GHz, provided longer reach, and topped out at 11 Mbps, but it was more vulnerable to household interference on that crowded band.',
        '802.11g kept the 2.4 GHz band while raising the theoretical maximum to 54 Mbps and staying backward compatible with 802.11b.',
        '802.11n, also known as Wi-Fi 4, brought both 2.4 GHz and 5 GHz support and introduced MIMO, which enabled much higher throughput up to 600 Mbps theoretical.',
        '802.11ac, or Wi-Fi 5, focused on 5 GHz and used wider channels and additional streams to push throughput much higher.',
        '802.11ax, or Wi-Fi 6, works on both 2.4 GHz and 5 GHz. Wi-Fi 6E extends that family into 6 GHz, and Wi-Fi 7 adds multi-link operation and much higher top-end theoretical throughput across 2.4 GHz, 5 GHz, and 6 GHz.',
      ],
      examples: [
        {
          type: 'code',
          intro:
            'Example: the standards become easier to remember when you map them as a progression of bands and capability.',
          code:
            '802.11a  -> 5 GHz only  -> 54 Mbps theoretical\n802.11b  -> 2.4 GHz    -> 11 Mbps theoretical\n802.11g  -> 2.4 GHz    -> 54 Mbps theoretical\nWi-Fi 4  -> 2.4 + 5    -> up to 600 Mbps theoretical\nWi-Fi 5  -> 5 GHz only -> multi-gigabit theoretical\nWi-Fi 6  -> 2.4 + 5    -> higher efficiency and throughput\nWi-Fi 6E -> adds 6 GHz -> cleaner spectrum for newer clients\nWi-Fi 7  -> 2.4 + 5 + 6 -> multi-link operation and much higher theoretical throughput',
        },
        'A Wi-Fi 6E-capable phone can still join 5 GHz, but its real advantage appears when a 6 GHz network is available.',
        'An older 2.4 GHz-only device may still connect in a modern environment, but it may force different expectations than a newer Wi-Fi 6 or Wi-Fi 7 client.',
      ],
      misconceptions: [
        '"Newer Wi-Fi just means one larger speed number." Band support, efficiency, and client compatibility matter as much as raw throughput.',
        '"If a router advertises Wi-Fi 7, every connected device benefits equally." Clients still need the right radio capability to take advantage of the newest features.',
        '"The theoretical speed is the same as expected real throughput." Real-world performance is usually lower because environment, congestion, and client capability still matter.',
      ],
      recap: [
        'Wi-Fi standards evolved through both better radio design and better use of multiple bands and streams.',
        'Wi-Fi 4 introduced MIMO, Wi-Fi 6E opened 6 GHz, and Wi-Fi 7 adds multi-link operation.',
        'Standard names matter because they describe what the client and access point can realistically negotiate.',
      ],
      referenceItems: [
        {
          label: 'Wi-Fi 4',
          value: '802.11n',
          detail: '2.4 GHz and 5 GHz, introduces MIMO, up to 600 Mbps theoretical.',
        },
        {
          label: 'Wi-Fi 6E',
          value: '802.11ax on 6 GHz',
          detail: 'Extends Wi-Fi 6 into cleaner 6 GHz spectrum for newer devices.',
        },
        {
          label: 'Wi-Fi 7',
          value: '802.11be',
          detail: 'Supports 2.4 GHz, 5 GHz, and 6 GHz with multi-link operation.',
        },
      ],
      connections: [
        {
          label: 'Wi-Fi analyser usage',
          href: '#wi-fi-analyzers-turn-signal-complaints-into-evidence',
          note: 'The standard only matters operationally once you can read it from real analyser data.',
        },
      ],
    },
    {
      id: 'bands-and-channels-shape-range-congestion-and-throughput',
      title: 'Bands and Channels Shape Range, Congestion, and Throughput',
      strapline:
        'Speed problems are often really spectrum problems.',
      overview:
        'The 2.4 GHz, 5 GHz, and 6 GHz bands behave differently in range, cleanliness, and channel availability. On top of that, channel selection and channel width determine how efficiently the access point uses the spectrum it has available.',
      whyItMatters:
        'This is where wireless design stops being marketing and becomes practical engineering. A network can have new hardware and still perform badly if it is using crowded channels, overly wide channels in a noisy environment, or the wrong band for the room.',
      howItWorks: [
        'The 2.4 GHz band usually travels farther and penetrates obstacles better, but it is also the most crowded and vulnerable to interference.',
        'The 5 GHz band generally offers better throughput and more spectrum, but its range is shorter than 2.4 GHz.',
        'The 6 GHz band offers especially clean spectrum for newer devices, but it depends on newer client support and still has range characteristics closer to higher-frequency Wi-Fi than to 2.4 GHz.',
        'In North America, the 2.4 GHz range typically uses channels 1 through 11, with 1, 6, and 11 being the classic non-overlapping choices.',
        'The 5 GHz and 6 GHz bands provide many more non-overlapping channels and support wider channel widths such as 40, 80, and 160 MHz.',
        'Wider channels increase potential throughput, but in congested environments they can create more overlap and worse overall behaviour instead of better performance.',
      ],
      examples: [
        'A device at the edge of a house may still see 2.4 GHz while the matching 5 GHz SSID fades first.',
        'An access point set to 160 MHz in a crowded office can perform worse than a narrower configuration because it consumes too much spectrum in a noisy environment.',
        'Choosing channels 1, 6, and 11 on 2.4 GHz is a classic way to reduce overlap between nearby networks.',
      ],
      misconceptions: [
        '"5 GHz is always better than 2.4 GHz." It is often faster, but range and wall penetration still matter.',
        '"The widest channel is always the best configuration." It depends on congestion and the surrounding RF environment.',
        '"A strong signal means the Wi-Fi design is healthy." Strong signal can still coexist with bad channel overlap or heavy utilisation.',
      ],
      recap: [
        '2.4 GHz favors reach, 5 GHz favors speed, and 6 GHz favors cleaner modern spectrum.',
        'Channels and channel width are part of real design, not just defaults the router picks behind the scenes.',
        'Wireless optimisation usually means balancing coverage, congestion, and channel strategy together.',
      ],
      referenceItems: [
        {
          label: '2.4 GHz',
          value: 'Range with congestion',
          detail: 'Often best reach, but also the most crowded band.',
        },
        {
          label: '5 GHz',
          value: 'More spectrum',
          detail: 'Better throughput and more channels, but shorter range than 2.4 GHz.',
        },
        {
          label: '6 GHz',
          value: 'Cleaner modern band',
          detail: 'Strong performance for new clients, especially with wider channels and less legacy baggage.',
        },
      ],
      connections: [
        {
          label: 'Home and small-business planning',
          href: '/topics/planning-a-basic-home-and-small-business-network#secure-and-configure-the-core-network',
          note: 'The planning page shows where frequency and channel choices fit into a real deployment workflow.',
        },
      ],
    },
    {
      id: 'wi-fi-analyzers-turn-signal-complaints-into-evidence',
      title: 'Wi-Fi Analysers Turn Signal Complaints Into Evidence',
      strapline:
        'Wireless troubleshooting gets much easier once the environment stops being invisible.',
      overview:
        'A Wi-Fi analyser shows nearby networks, bands, standards, channel widths, transmit power, signal strength, congestion, and utilisation. That turns vague complaints like "the Wi-Fi is bad in this room" into measurable design information.',
      whyItMatters:
        'Without analyser data, wireless changes are often guesswork. With it, you can decide whether the problem is weak coverage, high channel utilisation, a suboptimal band choice, or simply too much overlap with nearby access points.',
      howItWorks: [
        'An analyser can display which SSIDs are visible on 2.4 GHz, 5 GHz, and 6 GHz.',
        'It can reveal the Wi-Fi standard the access point is broadcasting with, such as Wi-Fi 4 or Wi-Fi 6.',
        'It can show which channel is being used, how wide that channel is, and how busy the channel appears to be.',
        'Analyser data can also expose signal strength and coverage differences between two access points or between two bands from the same access point.',
        'The point is not only troubleshooting. It also helps with optimisation by showing when a different channel or width would make the network cleaner.',
      ],
      examples: [
        'If the analyser shows heavy activity on a 2.4 GHz channel but the 5 GHz channel is lightly used, moving capable devices to 5 GHz can improve the user experience.',
        'If a Wi-Fi analyser shows that a 40 MHz channel is congested, reducing the width may give better real performance than keeping the wider setting.',
        'If a nearby SSID is strong on the same channel as yours, the complaint may be channel contention rather than weak signal.',
      ],
      misconceptions: [
        '"A Wi-Fi analyser is only for specialists." It is one of the clearest tools for explaining everyday wireless problems.',
        '"If the access point is broadcasting, there is nothing more to inspect." Signal and spectrum use still determine whether that broadcast is actually useful.',
        '"Wireless optimisation just means adding more power." More power can create more overlap and noise if the channel plan is poor.',
      ],
      recap: [
        'Analysers reveal what the radio environment is doing instead of leaving you to guess.',
        'Useful data includes channel, width, utilisation, standard, and signal strength.',
        'The best wireless fix often comes from cleaner spectrum decisions rather than from new hardware.',
      ],
      connections: [
        {
          label: 'Networking tools lesson',
          href: '/topics/networking-tools#wireless-and-packet-analysis-tools-help-you-see-the-problem',
          note: 'Use the tools page if you want analyser work placed beside cable testers, loopback plugs, and network TAPs.',
        },
      ],
    },
    {
      id: 'bluetooth-nfc-and-rfid-solve-different-wireless-jobs',
      title: 'Bluetooth, NFC, and RFID Solve Different Wireless Jobs',
      strapline:
        'Once Wi-Fi is clear, the rest of the wireless landscape becomes much easier to place.',
      overview:
        'Bluetooth, NFC, and RFID are common because they solve very different problems from Wi-Fi. Bluetooth focuses on short-range, low-power personal connectivity. NFC focuses on very close interactions. RFID focuses on radio-based identification and tracking without direct line of sight.',
      whyItMatters:
        'These protocols appear constantly in real life, and they are easy exam points because the use cases are so distinct once you stop bundling them together. They also matter in security and support work because each one has different range, power, and trust assumptions.',
      howItWorks: [
        'Bluetooth operates in the 2.4 GHz range and is popular because it enables short-range wireless communication with low power usage.',
        'Bluetooth Low Energy reduces power use further, which makes it useful for battery-powered peripherals and accessories.',
        'NFC enables communication at extremely short range, often around 10 centimetres or less.',
        'NFC interactions can involve active powered devices, such as a phone or payment reader, and passive devices, such as contactless cards.',
        'RFID tags store data that can be captured by a reader over radio without needing the direct optical alignment that a barcode scanner requires.',
        'Because RFID does not need line of sight, it is useful in logistics, manufacturing, warehousing, and tracking scenarios.',
      ],
      examples: [
        'Wireless headphones and game controllers are classic Bluetooth devices.',
        'A contactless payment card or phone wallet uses NFC because the interaction is meant to happen only at extremely close range.',
        'An RFID tag on a product moving through a warehouse can be read without manually lining it up like a barcode.',
      ],
      misconceptions: [
        '"Bluetooth is just slow Wi-Fi." It is designed for different power and pairing goals.',
        '"NFC is simply a weaker version of Bluetooth." NFC is intentionally very short range because the interaction model is different.',
        '"RFID and barcodes are basically the same." Both identify items, but RFID does not require direct visual line of sight.',
      ],
      recap: [
        'Bluetooth is for low-power short-range personal communication.',
        'NFC is for extremely close interactions such as tap-to-pay.',
        'RFID is for identification and tracking through radio-based tag reading.',
      ],
      interactive: {
        type: 'quiz',
        title: 'Check the wireless fit',
        intro:
          'Use these questions to confirm that you can match the wireless technology to the real job instead of treating every radio feature like Wi-Fi.',
        questions: [
          {
            prompt:
              'Which Wi-Fi band usually provides the best reach through obstacles, even though it is also the most crowded?',
            options: [
              {
                label: '2.4 GHz',
                isCorrect: true,
                feedback:
                  'Correct. 2.4 GHz usually travels farther and penetrates obstacles better, but it is also the most congested band.',
              },
              {
                label: '5 GHz',
                isCorrect: false,
                feedback:
                  '5 GHz often provides better throughput, but it generally does not reach as far as 2.4 GHz.',
              },
              {
                label: '6 GHz',
                isCorrect: false,
                feedback:
                  '6 GHz provides cleaner modern spectrum, but it is not the best answer when the question is about longest reach through obstacles.',
              },
            ],
          },
          {
            prompt:
              'Which wireless technology is the best fit for a contactless payment card or phone tap at a checkout terminal?',
            options: [
              {
                label: 'NFC',
                isCorrect: true,
                feedback:
                  'Correct. NFC is built for extremely short-range interactions such as tap-to-pay.',
              },
              {
                label: 'Bluetooth',
                isCorrect: false,
                feedback:
                  'Bluetooth is more about short-range personal connectivity than intentional near-touch transactions.',
              },
              {
                label: 'RFID',
                isCorrect: false,
                feedback:
                  'RFID is a tag-reading technology, but the tap-to-pay interaction described here is the classic NFC example.',
              },
            ],
          },
          {
            prompt:
              'Why can a Wi-Fi analyser recommend reducing channel width in a busy environment?',
            options: [
              {
                label:
                  'Because a narrower channel can reduce overlap and contention when the wider channel is creating too much noise',
                isCorrect: true,
                feedback:
                  'Correct. The widest channel is not always the best choice when nearby networks are already crowding the spectrum.',
              },
              {
                label:
                  'Because narrow channels always have higher maximum throughput than wide channels',
                isCorrect: false,
                feedback:
                  'Wider channels can support more throughput. The issue is that congestion can make that advantage backfire.',
              },
              {
                label:
                  'Because analyser tools can only work on 20 MHz channels',
                isCorrect: false,
                feedback:
                  'Analyser tools can still inspect wider channels. The recommendation is about performance tradeoffs, not a tool limitation.',
              },
            ],
          },
          {
            prompt:
              'Which statement best describes RFID?',
            options: [
              {
                label:
                  'It reads tagged items over radio without needing the direct line of sight a barcode scanner would need',
                isCorrect: true,
                feedback:
                  'Correct. That lack of direct line-of-sight requirement is one of RFIDs main practical advantages.',
              },
              {
                label:
                  'It is the normal protocol used for Wi-Fi internet access on laptops and phones',
                isCorrect: false,
                feedback:
                  'That is the role of Wi-Fi rather than RFID.',
              },
              {
                label:
                  'It is mainly used to replace Ethernet cables for desktop PCs',
                isCorrect: false,
                feedback:
                  'RFID is about identification and tracking, not replacing normal LAN access methods.',
              },
            ],
          },
        ],
      },
      connections: [
        {
          label: 'Networked hosts and IoT',
          href: '/topics/networked-hosts-and-services#iot-expands-visibility-but-raises-the-security-bar',
          note: 'Many IoT devices rely on these wireless technologies, so the host and service lesson is the next practical step.',
        },
      ],
    },
  ],
  glossary: [
    {
      id: 'mimo',
      term: 'MIMO',
      definition:
        'Multiple Input Multiple Output, a radio design that uses multiple antennas or streams to improve wireless throughput and efficiency.',
      importance:
        'It helps explain why Wi-Fi 4 was such an important step up from earlier generations.',
      sectionId: 'wi-fi-standards-show-how-wireless-capability-evolved',
    },
    {
      id: 'channel-width',
      term: 'Channel Width',
      definition:
        'The amount of spectrum a Wi-Fi channel occupies, such as 20, 40, 80, or 160 MHz.',
      importance:
        'It directly affects throughput potential and congestion tradeoffs.',
      sectionId: 'bands-and-channels-shape-range-congestion-and-throughput',
    },
    {
      id: 'wi-fi-analyzer',
      term: 'Wi-Fi Analyser',
      definition:
        'A tool that inspects nearby wireless networks and reveals details such as signal strength, channel use, standard, and utilisation.',
      importance:
        'It turns wireless troubleshooting from guesswork into evidence-driven adjustment.',
      sectionId: 'wi-fi-analyzers-turn-signal-complaints-into-evidence',
    },
    {
      id: 'bluetooth-low-energy',
      term: 'Bluetooth Low Energy',
      definition:
        'A low-power Bluetooth variant designed for battery-efficient short-range communication.',
      importance:
        'It explains why Bluetooth remains so effective in small battery-powered devices.',
      sectionId: 'bluetooth-nfc-and-rfid-solve-different-wireless-jobs',
    },
    {
      id: 'near-field-communication',
      term: 'Near Field Communication',
      definition:
        'A very short-range wireless technology used for close-proximity exchanges such as payment taps.',
      importance:
        'Its intentional short range is part of its value, especially in secure and deliberate interactions.',
      sectionId: 'bluetooth-nfc-and-rfid-solve-different-wireless-jobs',
    },
    {
      id: 'radio-frequency-identification',
      term: 'Radio Frequency Identification',
      definition:
        'A technology that reads data from tagged items over radio waves without requiring direct optical line of sight.',
      importance:
        'It is a core concept in logistics, warehousing, and many tracking workflows.',
      sectionId: 'bluetooth-nfc-and-rfid-solve-different-wireless-jobs',
    },
  ],
  revision: {
    summary:
      'This topic is easiest to remember by separating wireless jobs: Wi-Fi for network access, Bluetooth for low-power personal connectivity, NFC for very close exchanges, and RFID for tag-based identification. Inside Wi-Fi itself, remember that standards evolved from older single-band options into modern multi-band families where 2.4 GHz favors reach, 5 GHz favors speed, and 6 GHz opens cleaner spectrum for newer clients.',
    memoryFramework: [
      'Start with purpose: access, pairing, tap, or tag reading.',
      'Read Wi-Fi standards as a progression: a and b, then g, then Wi-Fi 4, 5, 6, 6E, and 7.',
      'Remember 2.4 GHz for reach and congestion, 5 GHz for stronger throughput, and 6 GHz for cleaner modern spectrum.',
      'Remember that channels and width are real design choices, not just background defaults.',
      'Use analysers to validate channel use, standard, utilisation, and signal strength.',
      'Keep Bluetooth, NFC, and RFID separate by range and intent.',
    ],
    checklist: [
      'I can explain why wireless networking includes more than Wi-Fi.',
      'I can describe the broad progression from 802.11a and b to Wi-Fi 7.',
      'I can compare 2.4 GHz, 5 GHz, and 6 GHz by range, congestion, and client support.',
      'I can explain why wider channels are not always the best real-world choice.',
      'I can explain what a Wi-Fi analyser helps me see.',
      'I can distinguish Bluetooth, NFC, and RFID by their use cases.',
      'I can explain why a contactless card, earbuds, and a warehouse tag reader should not be described as the same wireless technology.',
    ],
    questions: [
      'Why can a device still see 2.4 GHz after losing its 5 GHz connection in another room?',
      'Why is theoretical Wi-Fi speed a poor substitute for real environment testing?',
      'Why can a newer Wi-Fi standard still underperform if the channel plan is poor?',
      'Why is Bluetooth a better fit than Wi-Fi for many battery-powered accessories?',
      'Why is NFC intentionally built for such short range?',
      'What practical advantage does RFID have over barcodes in many workflows?',
    ],
    pitfalls: [
      'Treating every wireless technology as if it is just a different flavor of Wi-Fi.',
      'Confusing theoretical throughput numbers with expected real-world performance.',
      'Assuming the widest channel width is automatically the best choice.',
      'Ignoring channel congestion and nearby networks when tuning access points.',
      'Forgetting that 6 GHz requires compatible newer devices to matter.',
    ],
  },
  relatedTopicSlugs: [
    'network-types-and-internet-connections',
    'networking-tools',
    'planning-a-basic-home-and-small-business-network',
  ],
};
