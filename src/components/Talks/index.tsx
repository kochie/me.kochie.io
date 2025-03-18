import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Talk {
  title: string
  date: string
  event: string
  description: string | string[]
  video?: string
  slides?: string
}

const talks: Talk[] = [
  {
    title: 'What we learnt building our AI product',
    date: '2024-09-11',
    event: 'DDD By Night',
    description:
      "Our company built an AI product and released it to customers! That was an immense undertaking and we learnt a lot about building software and some of the pros and cons that occur when taking an idea into the real world. We'll discuss some of the technical and business challenges we faced and how we solved them.",
    video: 'https://www.youtube.com/watch?v=YeH90OBy_cM',
    slides: "/What_We_Learnt_Building_Our_AI_Product.pdf"
  },
  {
    title: 'AI Data Security Risks',
    date: '2025-03-18',
    event: 'Programmable',
    description: [
      'With generative AI tools rapidly integrating into every corner of the enterprise, security risks are evolving faster than ever. As developers, you’re on the frontlines of this revolution—tasked with safeguarding sprawling, unstructured data that traditional security methods can’t handle.',
      'Join us to reveal the hidden vulnerabilities that GenAI exposes, from accidental data leaks to misconfigured permissions lurking in knowledge bases. We’ll dive into real-world examples, share cutting-edge security strategies, and introduce tools that can fortify your data defenses, letting you harness AI’s power without compromising security. Prepare to rethink what it means to protect enterprise data in the AI era!',
    ],
    slides: '/AI_Data_Security_Risks.pdf',
  },
]

export default function TalksSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-10 mb-6 " id="talks">
          My Talks
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {talks.map((talk, index) => (
            <Card
              key={index}
              id={talk.title.replace(/\s/g, '-').toLowerCase()}
              className="flex flex-col group bg-gray-300 dark:bg-gray-700 border-0 scroll-mt-7"
            >
              <CardHeader>
                <CardTitle>{talk.title}</CardTitle>
                <CardDescription>
                  {talk.event} - {new Date(talk.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                {Array.isArray(talk.description) ? (
                  talk.description.map((desc) => <p key={desc}>{desc}</p>)
                ) : (
                  <p>{talk.description}</p>
                )}
              </CardContent>
              <CardFooter className='space-x-2'>
                {talk.video && (
                  <Button asChild>
                    <a
                      href={talk.video}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Talk
                    </a>
                  </Button>
                )}
                {talk.slides && (
                  <Button asChild>
                    <a
                      href={talk.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Slides
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
