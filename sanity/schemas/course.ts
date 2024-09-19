export default {
    name: 'course',
    type: 'document',
    title: 'Course',
    fields: [
      { name: 'courseName', type: 'string', title: 'Course Name' },
      { name: 'courseId', type: 'string', title: 'Course ID' },
      { name: 'description', type: 'text', title: 'Description' },
      { name: 'chapters', type: 'array', of: [{ type: 'reference', to: { type: 'chapter' } }], title: 'Chapters' },
      { name: 'courseImage', type: 'image', title: 'Course Image' },
      { name: 'courseDuration', type: 'string', title: 'Course Duration' },
      { name: 'coursePrice', type: 'number', title: 'Course Price' },
      { name: 'courseCategory', type: 'string', title: 'Course Category' },
      { name: 'difficulty', type: 'string', title: 'Difficulty' },
      { name: 'courseTags', type: 'array', of: [{ type: 'string' }], title: 'Course Tags' },
      { name: 'courseRating', type: 'number', title: 'Course Rating' },
      { name: 'format', type: 'string', title: 'Format' },
      { name: 'courseReviews', type: 'array', of: [{ type: 'text' }], title: 'Course Reviews' },
      { name: 'faqs', type: 'array', of: [{ type: 'text' }], title: 'FAQs' },
      { name: 'media', type: 'array', of: [{ type: 'url' }], title: 'Media' },
    ],
  };
  