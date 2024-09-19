import { type SchemaTypeDefinition } from 'sanity';
import course from './schemas/course';
import chapter from './schemas/chapter';
import topic from './schemas/topic';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [course, chapter, topic],
};
