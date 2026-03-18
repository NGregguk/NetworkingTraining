import { dnsAndDhcpTopic } from './topics/dnsAndDhcp';
import { ipv6AddressesTopic } from './topics/ipv6Addresses';
import { ipv4AddressesTopic } from './topics/ipv4Addresses';
import { introToIpAddressingTopic } from './topics/introToIpAddressing';
import { whyNetworkingIsImportantTopic } from './topics/whyNetworkingIsImportant';
import type { GlossaryTerm, StudyTopic } from './schema';

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

export const topics: StudyTopic[] = [
  whyNetworkingIsImportantTopic,
  introToIpAddressingTopic,
  ipv4AddressesTopic,
  ipv6AddressesTopic,
  dnsAndDhcpTopic,
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

export const totalSections = topics.reduce(
  (count, topic) => count + topic.sections.length,
  0,
);

export const totalRevisionQuestions = topics.reduce(
  (count, topic) => count + topic.revision.questions.length,
  0,
);
