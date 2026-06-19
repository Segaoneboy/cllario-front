import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type DemoIdpStatus = 'empty' | 'docs_uploaded' | 'draft_ready' | 'sent_to_hr' | 'approved';

export type DemoIdpDraft = {
  title: string;
  employeeEmail: string;
  targetRole: string;
  summary: string;
  focus: string[];
  sprints: {
    title: string;
    period: string;
    tasks: string[];
  }[];
};

interface DemoIdpState {
  status: DemoIdpStatus;
  uploadedDocs: string[];
  competencyMatrixFileName: string | null;
  employeeExperience: string;
  employeeGoals: string;
  draft: DemoIdpDraft | null;
  uploadCompetencyMatrix: (fileName: string) => void;
  createDraft: (payload: {experience: string; goals: string}) => void;
  sendDraftToHr: () => void;
  approveDraft: () => void;
  resetDemo: () => void;
}

const middleDraft = (experience: string, goals: string): DemoIdpDraft => ({
  title: 'ИПР: рост до Middle Frontend Developer',
  employeeEmail: 'employ@cllario.tech',
  targetRole: 'Middle Frontend Developer',
  summary: `Черновик сформирован на основе опыта сотрудника и цели роста до middle-уровня. Основной фокус: самостоятельное ведение задач, качество решений, коммуникация с командой и уверенная работа с продуктовым контекстом.`,
  focus: [
    'Самостоятельно декомпозировать задачи и оценивать риски',
    'Усилить качество React/TypeScript решений и ревью',
    'Научиться связывать технические решения с бизнес-целями',
    'Подготовиться к регулярному наставничеству junior-разработчиков',
  ],
  sprints: [
    {
      title: 'Спринт 1. База middle-уровня',
      period: '1-2 недели',
      tasks: [
        'Разобрать матрицу компетенций Middle Frontend Developer',
        'Составить список пробелов по React, TypeScript и архитектуре компонентов',
        'Согласовать с HR и тимлидом 2 рабочих задачи для практики',
      ],
    },
    {
      title: 'Спринт 2. Самостоятельная фича end-to-end',
      period: '3-6 недель',
      tasks: [
        'Взять задачу от постановки до релиза без детального сопровождения',
        'Подготовить техническое решение и описать trade-offs',
        'Провести самопроверку качества: типы, состояния, ошибки, edge cases',
      ],
    },
    {
      title: 'Спринт 3. Коммуникация и ревью',
      period: '7-9 недель',
      tasks: [
        'Провести 2 code review для junior-разработчика',
        'Собрать обратную связь от тимлида по самостоятельности',
        'Описать итоги роста и обновить следующий цикл ИПР',
      ],
    },
  ],
});

export const useDemoIdpStore = create<DemoIdpState>()(
  persist(
    (set, get) => ({
      status: 'empty',
      uploadedDocs: [],
      competencyMatrixFileName: null,
      employeeExperience: '',
      employeeGoals: '',
      draft: null,
      uploadCompetencyMatrix: (fileName) => set({
        status: 'docs_uploaded',
        uploadedDocs: [fileName],
        competencyMatrixFileName: fileName,
      }),
      createDraft: ({experience, goals}) => set({
        status: 'draft_ready',
        employeeExperience: experience,
        employeeGoals: goals,
        draft: middleDraft(experience, goals),
      }),
      sendDraftToHr: () => {
        if(get().draft){
          set({status: 'sent_to_hr'});
        }
      },
      approveDraft: () => {
        if(get().draft){
          set({status: 'approved'});
        }
      },
      resetDemo: () => set({
        status: 'empty',
        uploadedDocs: [],
        competencyMatrixFileName: null,
        employeeExperience: '',
        employeeGoals: '',
        draft: null,
      }),
    }),
    {
      name: 'cllarioDemoIdp',
    },
  ),
);
