import { dnsAndDhcpTopic } from './topics/dnsAndDhcp';
import { commonNetworkProtocolsAndPortsTopic } from './topics/commonNetworkProtocolsAndPorts';
import { advancedDnsRecordsTopic } from './topics/advancedDnsRecords';
import { firewallRulesAndAclsTopic } from './topics/firewallRulesAndAcls';
import { natPatAndPortForwardingTopic } from './topics/natPatAndPortForwarding';
import { networkTroubleshootingWorkflowTopic } from './topics/networkTroubleshootingWorkflow';
import { networkingHardwareTopic } from './topics/networkingHardware';
import { networkedHostsAndServicesTopic } from './topics/networkedHostsAndServices';
import { networkTypesAndInternetConnectionsTopic } from './topics/networkTypesAndInternetConnections';
import { networkingToolsTopic } from './topics/networkingTools';
import { planningHomeAndSmallBusinessNetworksTopic } from './topics/planningHomeAndSmallBusinessNetworks';
import { routingBasicsTopic } from './topics/routingBasics';
import { subnettingAndCidrTopic } from './topics/subnettingAndCidr';
import { tcpAndUdpProtocolsTopic } from './topics/tcpAndUdpProtocols';
import { ipv6AddressesTopic } from './topics/ipv6Addresses';
import { ipv4AddressesTopic } from './topics/ipv4Addresses';
import { introToIpAddressingTopic } from './topics/introToIpAddressing';
import { wirelessSecurityTopic } from './topics/wirelessSecurity';
import { wirelessNetworkingTechnologiesTopic } from './topics/wirelessNetworkingTechnologies';
import { whyNetworkingIsImportantTopic } from './topics/whyNetworkingIsImportant';
import type {
  GlossaryTerm,
  SectionInteractive,
  StudyExample,
  StudyTopic,
} from './schema';

export type IndexedGlossaryTerm = GlossaryTerm & {
  topicSlug: string;
  topicTitle: string;
  topicHref: string;
};

export type ModuleGroup = {
  id: string;
  title: string;
  summary: string;
  topics: StudyTopic[];
};

export type SearchResultKind = 'topic' | 'section' | 'glossary';

export type SearchResult = {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  preview: string;
  href: string;
  score: number;
};

export const topics: StudyTopic[] = [
  whyNetworkingIsImportantTopic,
  introToIpAddressingTopic,
  ipv4AddressesTopic,
  subnettingAndCidrTopic,
  ipv6AddressesTopic,
  dnsAndDhcpTopic,
  routingBasicsTopic,
  natPatAndPortForwardingTopic,
  tcpAndUdpProtocolsTopic,
  commonNetworkProtocolsAndPortsTopic,
  firewallRulesAndAclsTopic,
  networkingHardwareTopic,
  networkTypesAndInternetConnectionsTopic,
  wirelessNetworkingTechnologiesTopic,
  wirelessSecurityTopic,
  networkedHostsAndServicesTopic,
  networkingToolsTopic,
  planningHomeAndSmallBusinessNetworksTopic,
  advancedDnsRecordsTopic,
  networkTroubleshootingWorkflowTopic,
];

export const getTopicBySlug = (slug: string) =>
  topics.find((topic) => topic.slug === slug);

export const glossaryTerms: IndexedGlossaryTerm[] = topics
  .flatMap((topic) =>
    topic.glossary.map((term) => {
      const topicHref = term.sectionId
        ? `/topics/${topic.slug}#${term.sectionId}`
        : `/topics/${topic.slug}`;

      return {
        ...term,
        topicSlug: topic.slug,
        topicTitle: topic.title,
        topicHref,
      };
    }),
  )
  .sort((left, right) => left.term.localeCompare(right.term));

export const modules: ModuleGroup[] = Object.values(
  topics.reduce<Record<string, ModuleGroup>>((accumulator, topic) => {
    const existing = accumulator[topic.module.id];

    if (existing) {
      existing.topics.push(topic);
      return accumulator;
    }

    accumulator[topic.module.id] = {
      id: topic.module.id,
      title: topic.module.title,
      summary: topic.module.summary,
      topics: [topic],
    };

    return accumulator;
  }, {}),
);

function sanitizeSearchText(value: string) {
  return value.replace(/[*_`>#[\]]/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeSearchText(value: string) {
  return sanitizeSearchText(value)
    .toLowerCase()
    .replace(/[^a-z0-9:/.\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function flattenExampleText(example: StudyExample) {
  if (typeof example === 'string') {
    return example;
  }

  return [example.intro, example.code, example.outro].filter(Boolean).join(' ');
}

function flattenInteractiveText(interactive?: SectionInteractive) {
  if (!interactive) {
    return '';
  }

  if (interactive.type === 'quiz') {
    return [
      interactive.title,
      interactive.intro,
      ...interactive.questions.flatMap((question) => [
        question.prompt,
        question.supportingCode,
        ...question.options.flatMap((option) => [option.label, option.feedback]),
      ]),
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    interactive.title,
    interactive.intro,
    interactive.type === 'ipv4-lab'
      ? `${interactive.defaultAddress} ${interactive.defaultMask}`
      : interactive.defaultValue,
  ]
    .filter(Boolean)
    .join(' ');
}

type SearchIndexDocument = Omit<SearchResult, 'score'> & {
  normalizedPreview: string;
  normalizedSubtitle: string;
  normalizedText: string;
  normalizedTitle: string;
  titleWords: Set<string>;
};

const searchIndex: SearchIndexDocument[] = topics.flatMap((topic) => {
  const topicDocument: SearchIndexDocument = {
    id: `topic-${topic.slug}`,
    kind: 'topic',
    title: topic.title,
    subtitle: `${topic.module.title} topic`,
    preview: topic.summary,
    href: `/topics/${topic.slug}`,
    normalizedTitle: normalizeSearchText(topic.title),
    normalizedSubtitle: normalizeSearchText(`${topic.module.title} ${topic.level}`),
    normalizedPreview: normalizeSearchText(topic.summary),
    normalizedText: normalizeSearchText(
      [
        topic.title,
        topic.summary,
        topic.heroNote,
        topic.module.title,
        topic.module.summary,
        topic.level,
        topic.estimatedStudyTime,
        topic.updatedOn,
        ...topic.tags,
        ...topic.learningObjectives,
      ].join(' '),
    ),
    titleWords: new Set(normalizeSearchText(topic.title).split(' ').filter(Boolean)),
  };

  const sectionDocuments = topic.sections.map((section) => ({
    id: `section-${topic.slug}-${section.id}`,
    kind: 'section' as const,
    title: section.title,
    subtitle: `${topic.title} section`,
    preview: section.overview,
    href: `/topics/${topic.slug}#${section.id}`,
    normalizedTitle: normalizeSearchText(section.title),
    normalizedSubtitle: normalizeSearchText(
      `${topic.title} ${topic.module.title} ${section.strapline}`,
    ),
    normalizedPreview: normalizeSearchText(section.overview),
    normalizedText: normalizeSearchText(
      [
        section.title,
        section.strapline,
        section.overview,
        section.whyItMatters,
        ...section.howItWorks,
        ...section.examples.map(flattenExampleText),
        ...section.misconceptions,
        ...section.recap,
        ...(section.referenceItems?.flatMap((item) => [
          item.label,
          item.value,
          item.detail,
        ]) ?? []),
        ...(section.connections?.flatMap((connection) => [
          connection.label,
          connection.note,
        ]) ?? []),
        flattenInteractiveText(section.interactive),
        topic.title,
        topic.module.title,
      ].join(' '),
    ),
    titleWords: new Set(normalizeSearchText(section.title).split(' ').filter(Boolean)),
  }));

  const glossaryDocuments = topic.glossary.map((term) => {
    const linkedSectionTitle = term.sectionId
      ? topic.sections.find((section) => section.id === term.sectionId)?.title
      : undefined;

    return {
      id: `glossary-${topic.slug}-${term.id}`,
      kind: 'glossary' as const,
      title: term.term,
      subtitle: `Glossary · ${topic.title}`,
      preview: term.definition,
      href: term.sectionId
        ? `/topics/${topic.slug}#${term.sectionId}`
        : `/topics/${topic.slug}`,
      normalizedTitle: normalizeSearchText(term.term),
      normalizedSubtitle: normalizeSearchText(
        `glossary ${topic.title} ${linkedSectionTitle ?? ''}`,
      ),
      normalizedPreview: normalizeSearchText(term.definition),
      normalizedText: normalizeSearchText(
        [
          term.term,
          term.definition,
          term.importance,
          topic.title,
          topic.module.title,
          linkedSectionTitle,
        ]
          .filter(Boolean)
          .join(' '),
      ),
      titleWords: new Set(normalizeSearchText(term.term).split(' ').filter(Boolean)),
    };
  });

  return [topicDocument, ...sectionDocuments, ...glossaryDocuments];
});

const searchKindPriority: Record<SearchResultKind, number> = {
  topic: 0,
  section: 1,
  glossary: 2,
};

function scoreSearchDocument(
  document: SearchIndexDocument,
  normalizedQuery: string,
  queryTerms: string[],
) {
  let score = 0;

  if (document.normalizedTitle === normalizedQuery) {
    score += 420;
  } else if (document.normalizedTitle.startsWith(normalizedQuery)) {
    score += 260;
  } else if (document.normalizedTitle.includes(normalizedQuery)) {
    score += 180;
  }

  if (document.normalizedSubtitle.includes(normalizedQuery)) {
    score += 85;
  }

  if (document.normalizedPreview.includes(normalizedQuery)) {
    score += 65;
  }

  if (document.normalizedText.includes(normalizedQuery)) {
    score += 35;
  }

  for (const term of queryTerms) {
    let matched = false;

    if (document.titleWords.has(term)) {
      score += 72;
      matched = true;
    } else if (document.normalizedTitle.includes(term)) {
      score += 46;
      matched = true;
    }

    if (document.normalizedSubtitle.includes(term)) {
      score += 24;
      matched = true;
    }

    if (document.normalizedPreview.includes(term)) {
      score += 16;
      matched = true;
    }

    if (document.normalizedText.includes(term)) {
      score += 10;
      matched = true;
    }

    if (!matched) {
      return -1;
    }
  }

  if (document.kind === 'topic') {
    score += 8;
  } else if (document.kind === 'section') {
    score += 4;
  }

  return score;
}

export function searchSite(query: string, limit = 10): SearchResult[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const queryTerms = Array.from(
    new Set(normalizedQuery.split(' ').filter(Boolean)),
  );

  return searchIndex
    .map((document) => {
      const score = scoreSearchDocument(document, normalizedQuery, queryTerms);

      if (score < 0) {
        return undefined;
      }

      return {
        id: document.id,
        kind: document.kind,
        title: document.title,
        subtitle: document.subtitle,
        preview: document.preview,
        href: document.href,
        score,
      };
    })
    .filter((result): result is SearchResult => Boolean(result))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (searchKindPriority[left.kind] !== searchKindPriority[right.kind]) {
        return searchKindPriority[left.kind] - searchKindPriority[right.kind];
      }

      return left.title.localeCompare(right.title);
    })
    .slice(0, limit);
}

export const totalSections = topics.reduce(
  (count, topic) => count + topic.sections.length,
  0,
);

export const totalRevisionQuestions = topics.reduce(
  (count, topic) => count + topic.revision.questions.length,
  0,
);
