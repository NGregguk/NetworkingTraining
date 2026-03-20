export type StudyLink = {
  label: string;
  href: string;
  note: string;
};

export type ReferenceItem = {
  label: string;
  value: string;
  detail: string;
};

export type StudyExample =
  | string
  | {
      type: 'code';
      intro?: string;
      code: string;
      outro?: string;
      language?: string;
    };

export type QuizOption = {
  label: string;
  feedback: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  prompt: string;
  supportingCode?: string;
  options: QuizOption[];
};

export type SectionInteractive =
  | {
      type: 'ipv4-lab';
      title: string;
      intro: string;
      defaultAddress: string;
      defaultMask: string;
    }
  | {
      type: 'ipv6-lab';
      title: string;
      intro: string;
      defaultValue: string;
    }
  | {
      type: 'quiz';
      title: string;
      intro: string;
      questions: QuizQuestion[];
    };

export type StudySection = {
  id: string;
  title: string;
  strapline: string;
  overview: string;
  whyItMatters: string;
  howItWorks: string[];
  examples: StudyExample[];
  misconceptions: string[];
  recap: string[];
  referenceItems?: ReferenceItem[];
  interactive?: SectionInteractive;
  connections?: StudyLink[];
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  importance: string;
  sectionId?: string;
};

export type StudyTrackId = 'networking' | 'cyber-security';

export type StudyTrack = {
  id: StudyTrackId;
  title: string;
  summary: string;
};

export type RevisionPack = {
  summary: string;
  memoryFramework: string[];
  checklist: string[];
  questions: string[];
  pitfalls: string[];
};

export type StudyTopic = {
  slug: string;
  title: string;
  trackId?: StudyTrackId;
  module: {
    id: string;
    title: string;
    summary: string;
  };
  level: string;
  estimatedStudyTime: string;
  sourceFile: string;
  updatedOn: string;
  summary: string;
  heroNote: string;
  tags: string[];
  learningObjectives: string[];
  sections: StudySection[];
  glossary: GlossaryTerm[];
  revision: RevisionPack;
  relatedTopicSlugs: string[];
};
