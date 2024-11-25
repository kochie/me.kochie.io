import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Talk {
  title: string
  date: string
  event: string
  description: string
  link?: string
}

const talks: Talk[] = [
  {
    title: "What we learnt building our AI product",
    date: "2024-09-11",
    event: "DDD By Night",
    description: "Our company built an AI product and released it to customers! That was an immense undertaking and we learnt a lot about building software and some of the pros and cons that occur when taking an idea into the real world. We'll discuss some of the technical and business challenges we faced and how we solved them.",
    link: "https://www.youtube.com/watch?v=YeH90OBy_cM"
  },
]


export default function TalksSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-gray-900 dark:text-white font-bold text-2xl mt-10 mb-6">My Talks</h2>
        <div className="grid grid-cols-1 gap-6">
          {talks.map((talk, index) => (
            <Card key={index} className="flex flex-col group bg-gray-300 dark:bg-gray-700 border-0">
              <CardHeader>
                <CardTitle>{talk.title}</CardTitle>
                <CardDescription>{talk.event} - {new Date(talk.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{talk.description}</p>
              </CardContent>
              <CardFooter>
                {talk.link && (
                  <Button asChild>
                    <a href={talk.link} target="_blank" rel="noopener noreferrer">Watch Talk</a>
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
