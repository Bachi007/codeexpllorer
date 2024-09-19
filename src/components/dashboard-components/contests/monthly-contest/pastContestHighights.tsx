import { Carousel, CarouselItem } from '@/components/ui/carousel';
import React from 'react';

const PastContestHighlights = () => (
  <Carousel>
    <CarouselItem>
      <img src="https://images.unsplash.com/photo-1589571894960-20bbe2828a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Highlight 1" />
    </CarouselItem>
    <CarouselItem>
      <img src="https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Highlight 2" />
    </CarouselItem>
    <CarouselItem>
      <img src="https://images.unsplash.com/photo-1573164574239-6a8f3e97ae60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Highlight 3" />
    </CarouselItem>
  </Carousel>
);

export default PastContestHighlights;
