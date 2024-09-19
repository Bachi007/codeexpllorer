export default {
    name: 'topic',
    type: 'document',
    title: 'Topic',
    fields: [
      { name: 'topicName', type: 'string', title: 'Topic Name' },
      { name: 'topicType', type: 'string', title: 'Topic Type' },
      { name: 'topicContent', type: 'array', of: [{ type: 'block' }], title: 'Topic Content' },
    ],
  };
  