export default {
    name: 'chapter',
    type: 'document',
    title: 'Chapter',
    fields: [
      { name: 'chapterName', type: 'string', title: 'Chapter Name' },
      { name: 'content', type: 'text', title: 'Content' },
      { name: 'topics', type: 'array', of: [{ type: 'reference', to: { type: 'topic' } }], title: 'Topics' },
    ],
  };
  