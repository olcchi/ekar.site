interface projectsType {
  projectName: string
  description: string
  repoLink: string
  previewLink: string
}

type Projects<T> = T[]

export const projects: Projects<projectsType> = [
  {
    projectName: 'Gallery',
    description: 'My personal gallery.',
    repoLink: 'https://github.com/olcchi/Gallery',
    previewLink: 'https://gallery.ekar.site',
  },
  {
    projectName: 'Hug',
    description: 'Use ChatGPT to relieve your frustration.',
    repoLink: 'https://github.com/olcchi/hug',
    previewLink: 'https://hug.ekar.site',
  },
  {
    projectName: 'Aggr',
    description: 'An aggregated search engine with multiple search engines.',
    repoLink: 'https://github.com/olcchi/Aggr',
    previewLink: 'https://aggr.ekar.site',
  },
  {
    projectName: 'ekar.site',
    description: 'The personal website you are browsing at this moment.',
    repoLink: 'https://github.com/olcchi/ekar.site',
    previewLink: 'https://ekar.site',
  },
]
