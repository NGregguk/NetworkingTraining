import { useMemo, useState } from 'react';
import type {
  QuizQuestion,
  SectionInteractive as SectionInteractiveData,
} from '../content/schema';
import InlineFormattedText from './InlineFormattedText';

type SectionInteractiveProps = {
  interactive: SectionInteractiveData;
};

type ParsedMask =
  | {
      error: string;
      isValid: false;
    }
  | {
      isValid: true;
      octets: number[];
      prefixLength: number;
    };

type IPv4Analysis =
  | {
      error: string;
      isValid: false;
    }
  | {
      isValid: true;
      addressType: string;
      binarySplit: string;
      broadcastAddress: string;
      hostValue: string;
      networkAddress: string;
      prefixLength: number;
      usableRange: string;
    };

type ParsedIpv6 =
  | {
      error: string;
      isValid: false;
    }
  | {
      isValid: true;
      expanded: string;
      shortened: string;
      leadingZeroTrims: number;
      zeroRunLength: number;
    };

type IPv4Challenge = {
  address: string;
  mask: string;
  focus: string;
};

type IPv6Challenge = {
  focus: string;
  value: string;
};

const ipv4ChallengeBank: IPv4Challenge[] = [
  {
    address: '192.168.14.83',
    mask: '255.255.255.0',
    focus: 'Private /24 split',
  },
  {
    address: '10.44.7.193',
    mask: '/16',
    focus: 'Large private range with a /16 boundary',
  },
  {
    address: '172.20.57.142',
    mask: '/20',
    focus: 'Private 172 range with a non-octet boundary',
  },
  {
    address: '203.0.113.62',
    mask: '/27',
    focus: 'Documentation-range public example with a smaller host pool',
  },
  {
    address: '198.51.100.145',
    mask: '/28',
    focus: 'Tighter public-style subnet with very few usable hosts',
  },
  {
    address: '169.254.88.14',
    mask: '/16',
    focus: 'APIPA or link-local troubleshooting example',
  },
  {
    address: '192.0.2.201',
    mask: '/30',
    focus: 'Point-to-point style subnet with only two usable hosts',
  },
];

const ipv6ChallengeBank: IPv6Challenge[] = [
  {
    value: '2001:0db8:0000:0000:0000:ff00:0042:8329',
    focus: 'Expanded address with a long zero run',
  },
  {
    value: '2001:db8:0:0:8d3:0:0:0',
    focus: 'Partially shortened form that still compresses further',
  },
  {
    value: '2001:0db8:0000:0001:0000:0000:0000:00aa',
    focus: 'Expanded form with several removable leading zeros',
  },
  {
    value: '2001:db8:1234:0:0:0:567:89ab',
    focus: 'Mixed non-zero blocks with one compressible run',
  },
  {
    value: 'fe80:0000:0000:0000:021c:7eff:fe2a:0042',
    focus: 'Link-local style address with heavy leading-zero trimming',
  },
  {
    value: '2001:0db8:00a3:0000:0000:8a2e:0370:7334',
    focus: 'Address where both trimming and double-colon rules apply',
  },
  {
    value: '2001:db8::1',
    focus: 'Already compressed short form that must expand correctly',
  },
  {
    value: '2001:0db8:0000:0000:abcd:0000:0000:0042',
    focus: 'Separated zero runs where only the longest can use ::',
  },
];

function pickRandomChallenge<T extends { focus: string }>(
  bank: T[],
  currentFocus: string,
) {
  if (bank.length <= 1) {
    return bank[0];
  }

  let next = bank[Math.floor(Math.random() * bank.length)];

  while (next.focus === currentFocus) {
    next = bank[Math.floor(Math.random() * bank.length)];
  }

  return next;
}

function parseIpv4Address(value: string) {
  const parts = value
    .trim()
    .split('.')
    .map((part) => part.trim());

  if (parts.length !== 4) {
    return undefined;
  }

  const octets = parts.map((part) => Number(part));

  if (
    octets.some(
      (octet, index) =>
        parts[index] === '' ||
        !Number.isInteger(octet) ||
        octet < 0 ||
        octet > 255,
    )
  ) {
    return undefined;
  }

  return octets;
}

function parseMask(value: string): ParsedMask {
  const trimmed = value.trim();

  if (!trimmed) {
    return {
      error: 'Enter a subnet mask such as 255.255.255.0 or /24.',
      isValid: false,
    };
  }

  if (trimmed.startsWith('/')) {
    const prefixLength = Number(trimmed.slice(1));

    if (
      !Number.isInteger(prefixLength) ||
      prefixLength < 0 ||
      prefixLength > 32
    ) {
      return {
        error: 'Prefix length must stay between /0 and /32.',
        isValid: false,
      };
    }

    const binaryMask = `${'1'.repeat(prefixLength)}${'0'.repeat(32 - prefixLength)}`;
    const octets = binaryMask.match(/.{8}/g)?.map((octet) => parseInt(octet, 2));

    if (!octets) {
      return {
        error: 'The subnet mask could not be interpreted.',
        isValid: false,
      };
    }

    return {
      isValid: true,
      octets,
      prefixLength,
    };
  }

  const octets = parseIpv4Address(trimmed);

  if (!octets) {
    return {
      error: 'Enter a valid dotted mask such as 255.255.255.0.',
      isValid: false,
    };
  }

  const binaryMask = octets
    .map((octet) => octet.toString(2).padStart(8, '0'))
    .join('');

  if (!/^1*0*$/.test(binaryMask)) {
    return {
      error: 'Use a contiguous subnet mask. Mixed 1 and 0 blocks are not valid here.',
      isValid: false,
    };
  }

  const zeroIndex = binaryMask.indexOf('0');
  const prefixLength = zeroIndex === -1 ? 32 : zeroIndex;

  return {
    isValid: true,
    octets,
    prefixLength,
  };
}

function octetsToIpv4String(octets: number[]) {
  return octets.join('.');
}

function octetsToUint32(octets: number[]) {
  return (
    (((octets[0] << 24) >>> 0) |
      (octets[1] << 16) |
      (octets[2] << 8) |
      octets[3]) >>>
    0
  );
}

function uint32ToOctets(value: number) {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ];
}

function classifyIpv4Address(octets: number[]) {
  if (octets[0] === 10) {
    return 'Private';
  }

  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) {
    return 'Private';
  }

  if (octets[0] === 192 && octets[1] === 168) {
    return 'Private';
  }

  if (octets[0] === 169 && octets[1] === 254) {
    return 'Link-local / APIPA';
  }

  if (octets[0] === 127) {
    return 'Loopback';
  }

  return 'Public or externally routable';
}

function groupBinaryBits(bits: string) {
  if (!bits) {
    return 'none';
  }

  return bits.match(/.{1,8}/g)?.join(' ') ?? bits;
}

function analyzeIpv4(address: string, mask: string): IPv4Analysis {
  const addressOctets = parseIpv4Address(address);

  if (!addressOctets) {
    return {
      error: 'Enter a valid IPv4 address such as 192.168.123.132.',
      isValid: false,
    };
  }

  const parsedMask = parseMask(mask);

  if (!parsedMask.isValid) {
    return parsedMask;
  }

  const networkOctets = addressOctets.map(
    (octet, index) => octet & parsedMask.octets[index],
  );
  const networkAddress = octetsToIpv4String(networkOctets);
  const addressBits = addressOctets
    .map((octet) => octet.toString(2).padStart(8, '0'))
    .join('');
  const networkBits = addressBits.slice(0, parsedMask.prefixLength);
  const hostBits = addressBits.slice(parsedMask.prefixLength);
  const hostValue = hostBits ? parseInt(hostBits, 2).toString() : '0';
  const binarySplit = `${groupBinaryBits(networkBits)} | ${groupBinaryBits(hostBits)}`;
  const addressType = classifyIpv4Address(addressOctets);
  const maskInt = octetsToUint32(parsedMask.octets);
  const networkInt = octetsToUint32(networkOctets);
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const broadcastAddress = octetsToIpv4String(uint32ToOctets(broadcastInt));

  let usableRange = 'Single-host route';

  if (parsedMask.prefixLength <= 30) {
    const firstHost = octetsToIpv4String(uint32ToOctets((networkInt + 1) >>> 0));
    const lastHost = octetsToIpv4String(
      uint32ToOctets((broadcastInt - 1) >>> 0),
    );
    usableRange = `${firstHost} - ${lastHost}`;
  } else if (parsedMask.prefixLength === 31) {
    usableRange = 'Point-to-point special case';
  }

  return {
    isValid: true,
    addressType,
    binarySplit,
    broadcastAddress,
    hostValue,
    networkAddress,
    prefixLength: parsedMask.prefixLength,
    usableRange,
  };
}

function expandIpv6(value: string): ParsedIpv6 {
  const trimmed = value.trim().toLowerCase();

  if (!trimmed) {
    return {
      error: 'Enter an IPv6 address in expanded or shortened form.',
      isValid: false,
    };
  }

  if (trimmed.includes('.')) {
    return {
      error: 'This lab focuses on standard hexadecimal IPv6 form, not embedded IPv4 notation.',
      isValid: false,
    };
  }

  if (!/^[0-9a-f:]+$/.test(trimmed)) {
    return {
      error: 'Use only hexadecimal characters and colons in this IPv6 lab.',
      isValid: false,
    };
  }

  const doubleColonCount = trimmed.match(/::/g)?.length ?? 0;

  if (doubleColonCount > 1) {
    return {
      error: 'An IPv6 address can only use one double colon compression.',
      isValid: false,
    };
  }

  const hasCompression = trimmed.includes('::');
  const [leftSide = '', rightSide = ''] = hasCompression
    ? trimmed.split('::')
    : [trimmed, ''];

  const leftGroups = leftSide ? leftSide.split(':') : [];
  const rightGroups = hasCompression && rightSide ? rightSide.split(':') : [];
  const rawGroups = [...leftGroups, ...rightGroups];

  if (
    rawGroups.some(
      (group) =>
        group.length === 0 ||
        group.length > 4 ||
        !/^[0-9a-f]+$/.test(group),
    )
  ) {
    return {
      error: 'Each IPv6 block in this lab must contain between 1 and 4 hexadecimal characters.',
      isValid: false,
    };
  }

  if ((!hasCompression && rawGroups.length !== 8) || (hasCompression && rawGroups.length >= 8)) {
    return {
      error: 'IPv6 must expand to exactly 8 blocks once the compressed zeros are restored.',
      isValid: false,
    };
  }

  const zeroFillCount = hasCompression ? 8 - rawGroups.length : 0;
  const groups = [
    ...leftGroups,
    ...Array.from({ length: zeroFillCount }, () => '0'),
    ...rightGroups,
  ].map((group) => group.padStart(4, '0'));

  if (groups.length !== 8) {
    return {
      error: 'The address could not be expanded into 8 blocks.',
      isValid: false,
    };
  }

  const trimmedGroups = groups.map((group) => group.replace(/^0+/, '') || '0');
  const leadingZeroTrims = groups.reduce(
    (count, group, index) => count + Number(group !== trimmedGroups[index]),
    0,
  );

  let longestRunStart = -1;
  let longestRunLength = 0;
  let currentRunStart = -1;
  let currentRunLength = 0;

  trimmedGroups.forEach((group, index) => {
    if (group === '0') {
      if (currentRunStart === -1) {
        currentRunStart = index;
      }

      currentRunLength += 1;

      if (currentRunLength > longestRunLength) {
        longestRunStart = currentRunStart;
        longestRunLength = currentRunLength;
      }

      return;
    }

    currentRunStart = -1;
    currentRunLength = 0;
  });

  let shortened = trimmedGroups.join(':');

  if (longestRunLength >= 2) {
    const left = trimmedGroups.slice(0, longestRunStart).join(':');
    const right = trimmedGroups
      .slice(longestRunStart + longestRunLength)
      .join(':');

    if (!left && !right) {
      shortened = '::';
    } else if (!left) {
      shortened = `::${right}`;
    } else if (!right) {
      shortened = `${left}::`;
    } else {
      shortened = `${left}::${right}`;
    }
  }

  return {
    isValid: true,
    expanded: groups.join(':'),
    shortened,
    leadingZeroTrims,
    zeroRunLength: longestRunLength,
  };
}

function IPv4Lab({
  interactive,
}: {
  interactive: Extract<SectionInteractiveData, { type: 'ipv4-lab' }>;
}) {
  const [address, setAddress] = useState(interactive.defaultAddress);
  const [mask, setMask] = useState(interactive.defaultMask);
  const [focus, setFocus] = useState('Worked example');
  const [showAnswer, setShowAnswer] = useState(true);
  const analysis = useMemo(() => analyzeIpv4(address, mask), [address, mask]);

  return (
    <article className="section-panel interactive-panel">
      <div className="interactive-header">
        <p className="eyebrow">Interactive Practice</p>
        <h3>{interactive.title}</h3>
        <p className="section-caption">
          <InlineFormattedText text={interactive.intro} />
        </p>
      </div>

      <div className="interactive-grid">
        <label className="interactive-field">
          <span className="interactive-label">IPv4 address</span>
          <input
            className="interactive-input"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            spellCheck={false}
          />
        </label>
        <label className="interactive-field">
          <span className="interactive-label">Subnet mask or prefix</span>
          <input
            className="interactive-input"
            type="text"
            value={mask}
            onChange={(event) => setMask(event.target.value)}
            spellCheck={false}
          />
        </label>
      </div>

      <div className="interactive-actions interactive-actions-between">
        <div className="interactive-action-group">
          <button
            type="button"
            className="interactive-action"
            onClick={() => {
              const challenge = pickRandomChallenge(ipv4ChallengeBank, focus);
              setAddress(challenge.address);
              setMask(challenge.mask);
              setFocus(challenge.focus);
              setShowAnswer(false);
            }}
          >
            Randomize challenge
          </button>
          <button
            type="button"
            className="interactive-action"
            onClick={() => {
              setAddress(interactive.defaultAddress);
              setMask(interactive.defaultMask);
              setFocus('Worked example');
              setShowAnswer(true);
            }}
          >
            Reset example
          </button>
          {!showAnswer && (
            <button
              type="button"
              className="interactive-action"
              onClick={() => setShowAnswer(true)}
            >
              Show answer
            </button>
          )}
        </div>
        <p className="interactive-status">
          {showAnswer
            ? `Current focus: ${focus}.`
            : `Challenge mode: ${focus}. Work it out before revealing the answer.`}
        </p>
      </div>

      {showAnswer ? analysis.isValid ? (
        <>
          <div className="interactive-results">
            <article className="interactive-result-card">
              <p className="interactive-result-label">Prefix</p>
              <p className="interactive-result-value">/{analysis.prefixLength}</p>
            </article>
            <article className="interactive-result-card">
              <p className="interactive-result-label">Network address</p>
              <p className="interactive-result-value">{analysis.networkAddress}</p>
            </article>
            <article className="interactive-result-card">
              <p className="interactive-result-label">Host value</p>
              <p className="interactive-result-value">{analysis.hostValue}</p>
            </article>
            <article className="interactive-result-card">
              <p className="interactive-result-label">Broadcast</p>
              <p className="interactive-result-value">{analysis.broadcastAddress}</p>
            </article>
            <article className="interactive-result-card">
              <p className="interactive-result-label">Usable range</p>
              <p className="interactive-result-value">{analysis.usableRange}</p>
            </article>
            <article className="interactive-result-card">
              <p className="interactive-result-label">Address type</p>
              <p className="interactive-result-value">{analysis.addressType}</p>
            </article>
          </div>
          <div className="interactive-code">
            <p className="interactive-label">Network bits | Host bits</p>
            <pre className="interactive-code-block">
              <code>{analysis.binarySplit}</code>
            </pre>
          </div>
        </>
      ) : (
        <p className="interactive-error">{analysis.error}</p>
      ) : (
        <p className="interactive-status">
          The answer is hidden so you can identify the network, host portion,
          and address type yourself first.
        </p>
      )}
    </article>
  );
}

function IPv6Lab({
  interactive,
}: {
  interactive: Extract<SectionInteractiveData, { type: 'ipv6-lab' }>;
}) {
  const [value, setValue] = useState(interactive.defaultValue);
  const [focus, setFocus] = useState('Worked example');
  const [showAnswer, setShowAnswer] = useState(true);
  const parsed = useMemo(() => expandIpv6(value), [value]);

  return (
    <article className="section-panel interactive-panel">
      <div className="interactive-header">
        <p className="eyebrow">Interactive Practice</p>
        <h3>{interactive.title}</h3>
        <p className="section-caption">
          <InlineFormattedText text={interactive.intro} />
        </p>
      </div>

      <label className="interactive-field">
        <span className="interactive-label">IPv6 address</span>
        <input
          className="interactive-input"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          spellCheck={false}
        />
      </label>

      <div className="interactive-actions interactive-actions-between">
        <div className="interactive-action-group">
          <button
            type="button"
            className="interactive-action"
            onClick={() => {
              const challenge = pickRandomChallenge(ipv6ChallengeBank, focus);
              setValue(challenge.value);
              setFocus(challenge.focus);
              setShowAnswer(false);
            }}
          >
            Randomize challenge
          </button>
          <button
            type="button"
            className="interactive-action"
            onClick={() => {
              setValue(interactive.defaultValue);
              setFocus('Worked example');
              setShowAnswer(true);
            }}
          >
            Reset example
          </button>
          {!showAnswer && (
            <button
              type="button"
              className="interactive-action"
              onClick={() => setShowAnswer(true)}
            >
              Show answer
            </button>
          )}
        </div>
        <p className="interactive-status">
          {showAnswer
            ? `Current focus: ${focus}.`
            : `Challenge mode: ${focus}. Try to expand or shorten it before revealing the answer.`}
        </p>
      </div>

      {showAnswer ? parsed.isValid ? (
        <>
          <div className="interactive-code">
            <p className="interactive-label">Expanded form</p>
            <pre className="interactive-code-block">
              <code>{parsed.expanded}</code>
            </pre>
          </div>
          <div className="interactive-code">
            <p className="interactive-label">Shortest standard form</p>
            <pre className="interactive-code-block">
              <code>{parsed.shortened}</code>
            </pre>
          </div>
          <div className="interactive-results">
            <article className="interactive-result-card">
              <p className="interactive-result-label">Blocks trimmed</p>
              <p className="interactive-result-value">
                {parsed.leadingZeroTrims}
              </p>
            </article>
            <article className="interactive-result-card">
              <p className="interactive-result-label">Zero-block run</p>
              <p className="interactive-result-value">
                {parsed.zeroRunLength >= 2
                  ? `${parsed.zeroRunLength} blocks compressed`
                  : 'No double-colon compression'}
              </p>
            </article>
          </div>
        </>
      ) : (
        <p className="interactive-error">{parsed.error}</p>
      ) : (
        <p className="interactive-status">
          The answer is hidden so you can work through the compression rules
          before checking the expanded and shortest forms.
        </p>
      )}
    </article>
  );
}

function QuizQuestionCard({
  question,
  questionIndex,
  selectedIndex,
  onSelect,
}: {
  question: QuizQuestion;
  questionIndex: number;
  selectedIndex?: number;
  onSelect: (optionIndex: number) => void;
}) {
  const selectedOption =
    selectedIndex !== undefined ? question.options[selectedIndex] : undefined;

  return (
    <article className="quiz-card">
      <div className="interactive-header">
        <p className="interactive-label">Question {questionIndex + 1}</p>
        <h4>{question.prompt}</h4>
      </div>

      {question.supportingCode && (
        <pre className="interactive-code-block">
          <code>{question.supportingCode}</code>
        </pre>
      )}

      <div className="quiz-options">
        {question.options.map((option, optionIndex) => {
          const isAnswered = selectedIndex !== undefined;
          const isSelected = selectedIndex === optionIndex;
          const classNames = ['quiz-option'];

          if (isAnswered && option.isCorrect) {
            classNames.push('quiz-option-correct');
          } else if (isSelected) {
            classNames.push('quiz-option-incorrect');
          }

          return (
            <button
              key={`${question.prompt}-${option.label}`}
              type="button"
              className={classNames.join(' ')}
              onClick={() => onSelect(optionIndex)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <p
          className={
            selectedOption.isCorrect
              ? 'quiz-feedback quiz-feedback-correct'
              : 'quiz-feedback quiz-feedback-incorrect'
          }
        >
          {selectedOption.isCorrect ? 'Correct. ' : 'Not quite. '}
          {selectedOption.feedback}
        </p>
      )}
    </article>
  );
}

function QuizBlock({
  interactive,
}: {
  interactive: Extract<SectionInteractiveData, { type: 'quiz' }>;
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = interactive.questions.reduce((count, question, index) => {
    const selectedIndex = selectedAnswers[index];

    if (
      selectedIndex !== undefined &&
      question.options[selectedIndex] &&
      question.options[selectedIndex].isCorrect
    ) {
      return count + 1;
    }

    return count;
  }, 0);

  return (
    <article className="section-panel interactive-panel">
      <div className="interactive-header">
        <p className="eyebrow">Interactive Practice</p>
        <h3>{interactive.title}</h3>
        <p className="section-caption">
          <InlineFormattedText text={interactive.intro} />
        </p>
      </div>

      <div className="interactive-actions interactive-actions-between">
        <p className="interactive-score">
          Answered {answeredCount}/{interactive.questions.length} | Correct{' '}
          {correctCount}/{interactive.questions.length}
        </p>
        <button
          type="button"
          className="interactive-action"
          onClick={() => setSelectedAnswers({})}
        >
          Clear answers
        </button>
      </div>

      <div className="quiz-list">
        {interactive.questions.map((question, questionIndex) => (
          <QuizQuestionCard
            key={`${interactive.title}-${question.prompt}`}
            question={question}
            questionIndex={questionIndex}
            selectedIndex={selectedAnswers[questionIndex]}
            onSelect={(optionIndex) =>
              setSelectedAnswers((current) => ({
                ...current,
                [questionIndex]: optionIndex,
              }))
            }
          />
        ))}
      </div>
    </article>
  );
}

export default function SectionInteractive({
  interactive,
}: SectionInteractiveProps) {
  if (interactive.type === 'ipv4-lab') {
    return <IPv4Lab interactive={interactive} />;
  }

  if (interactive.type === 'ipv6-lab') {
    return <IPv6Lab interactive={interactive} />;
  }

  return <QuizBlock interactive={interactive} />;
}
