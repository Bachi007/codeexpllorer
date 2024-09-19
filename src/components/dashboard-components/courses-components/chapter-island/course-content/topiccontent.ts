import { z } from 'zod';

const TopicSchema = z.object({
  story: z.string(),
  introduction: z.string(),
  mainStory: z.string(),
  interactiveElements: z.object({
    question: z.string(),
    codingExercise: z.string(),
    decisionPoint: z.string(),
    debuggingScenario: z.string()
  }),
  conclusion: z.string(),
  whatDidYouLearn: z.array(z.string()),
  challenge: z.string(),
  nextStep: z.string(),
});

const topicContent = {
  story: 'The Web Wizard\'s Apprentice',
  introduction: 'Meet Emma, a curious 13-year-old who loves playing games and exploring the internet. She\'s always wondered how websites are created and how they work. One day, she discovers a mysterious website that leads her to a hidden world of coding, where she meets a wise and witty Web Wizard named Zephyr. Zephyr explains that he\'s been waiting for her, as she\'s about to embark on a thrilling adventure to learn the secrets of Web Development.',
  mainStory: 'Zephyr takes Emma on a journey through the magical realm of coding. Their first challenge is to understand what Web Development is. Zephyr explains, "Web Development is the process of creating websites and applications that people can access through the internet. Think of it as building a magical portal that connects people to the world! There are two main parts: the front-end, which is what users see and interact with, and the back-end, which is how the website works behind the scenes."\n\nEmma learns that the front-end includes HTML, CSS, and JavaScript. Zephyr shows her a simple example: "HTML is like the skeleton of a webpage, CSS is the clothes and accessories that make it look nice, and JavaScript adds the magic to make it interactive."',
  interactiveElements: {
    question: 'Can you think of your favorite website? What do you like most about it?',
    codingExercise: 'Let\'s start with the basics. Can you help Zephyr create a simple HTML page? Type the code: `<html><body><h1>Hello, world!</h1></body></html>`.',
    decisionPoint: 'Should Emma choose to build a website for her favorite hobby or for her school project? Choose wisely to proceed!',
    debuggingScenario: 'Oops! Emma accidentally typed `<h1Hello, world!</h1>`. Can you help her fix the mistake?',
  },
  conclusion: 'After successfully creating a basic webpage, Emma feels more confident. Zephyr praises her efforts and explains how they will continue to build on this foundation in their next lesson. Emma is excited to learn more about CSS and JavaScript to make her website look cool and interactive.\n\nZephyr encourages Emma, "Keep practicing, and soon you\'ll be creating amazing websites of your own!"',
  whatDidYouLearn: [
    'Web Development is the process of creating websites and applications that people can access through the internet.',
    'There are two main parts: front-end (what users see and interact with) and back-end (how the website works behind the scenes).',
    'The front-end includes HTML, CSS, and JavaScript.'
  ],
  challenge: 'Try creating a simple HTML page with the code: `<html><body><h1>Hello, world!</h1></body></html>`. What do you think will happen when you open the page in a web browser?',
  nextStep: 'Join Zephyr and Emma on their next adventure to learn more about CSS and JavaScript!'
};

export default topicContent;
export { TopicSchema };
