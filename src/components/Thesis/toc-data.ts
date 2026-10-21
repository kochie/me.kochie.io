export interface ContentsEntry {
  title: string
  children?: string[]
}

// Titles must match the markdown headings in page.mdx exactly — anchors are
// derived from the heading text by slugify().
export const CONTENTS: ContentsEntry[] = [
  { title: 'Executive Summary' },
  { title: 'Significant Contributions' },
  { title: '1 Introduction' },
  {
    title: '2 Theory and Background',
    children: [
      '2.1 Floating Point Numbers',
      '2.2 Non Linear Functions',
      '2.3 Mathematical Optimisation',
      '2.4 Deep Learning',
      '2.5 Programming',
      '2.6 Optimisation via Binary and Ternary Quantisation',
    ],
  },
  {
    title: '3 Torch Implementation',
    children: [
      '3.1 Outline',
      '3.2 Development and Programming',
      '3.3 Challenges and Solutions',
    ],
  },
  {
    title: '4 TensorFlow Implementation',
    children: [
      '4.1 Outline',
      '4.2 Research and Results',
      '4.3 Improvements and Adaptations',
    ],
  },
  {
    title: '5 Results and Analysis',
    children: [
      '5.1 Network Error Rates',
      '5.2 Network Training and Testing Accuracies',
      '5.3 Batch and Filesize Comparisons',
      '5.4 Analysis',
    ],
  },
  { title: '6 Conclusion' },
  { title: 'References' },
]
