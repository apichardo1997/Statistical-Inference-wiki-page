export interface SubSection {
  id: string;
  title: string;
  content: string; // Markdown-like content
  equations?: { label: string; formula: string }[];
}

export interface Chapter {
  id: string;
  title: string;
  subSections: SubSection[];
}

export interface SearchResult {
  chapterId: string;
  subSectionId: string;
  title: string;
  preview: string;
}
