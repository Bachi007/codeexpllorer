import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';

interface CourseFilterProps {
  onFilterChange: (filters: { rating: number; duration: string; tags: string[] }) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilterChange }) => {
  const [rating, setRating] = useState(0);
  const [duration, setDuration] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTagChange = (tag: string) => {
    setTags(prevTags =>
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({ rating, duration, tags });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="p-4 shadow-md bg-card text-card-foreground font-inter">
        <CardHeader>
          <h2 className="text-2xl font-brenet-regular mb-4">Filter Courses</h2>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block font-bequest text-muted-foreground">Rating</label>
            <select
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="mt-1 block font-inter w-full p-2 border rounded-md bg-background text-foreground"
            >
              <option value={0}>All Ratings</option>
              <option value={1}>1 Star & Up</option>
              <option value={2}>2 Stars & Up</option>
              <option value={3}>3 Stars & Up</option>
              <option value={4}>4 Stars & Up</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bequest text-muted-foreground">Duration</label>
            <select
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md bg-background text-foreground"
            >
              <option value="">All Durations</option>
              <option value="short">Short (&lt; 5 hours)</option>
              <option value="medium">Medium (5-20 hours)</option>
              <option value="long">Long (&gt; 20 hours)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bequest text-muted-foreground">Tags</label>
            <div className="flex flex-col mt-1">
              {['Java', 'Python', 'JavaScript', 'React', 'Node.js'].map(tag => (
                <label key={tag} className="inline-flex items-center mb-2">
                  <Checkbox
                    checked={tags.includes(tag)}
                    onCheckedChange={() => handleTagChange(tag)}
                    className="mr-2"
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleApplyFilters}
            className="mt-4 px-4 py-2 font-bequest bg-primary text-primary-foreground rounded-md hover:bg-primary-dark w-full"
          >
            Apply Filters
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseFilter;
