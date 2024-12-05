'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

export function LandingPageComponent() {
  const [email, setEmail] = useState('')
  const ctaRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the email submission
    console.log('Submitted email:', email)
    // Navigate to the diagram generator page
    router.push('/diagram-generator')
  }

  const scrollToCTA = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#cta') {
      scrollToCTA()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">craftflow.AI</h1>
          <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-100" onClick={scrollToCTA}>Get Started</Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Create Software Architecture Diagrams with AI</h2>
          <p className="text-xl text-white mb-8">Transform your ideas into visual masterpieces with just a few words. Join our waitlist to be the first to experience it!</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Microservices', 'Event-Driven', 'Layered Architecture'].map((title, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                {index === 0 ? (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1731320337209-t0xyRzBbBtQxMQUGzBx9xRAlQGIFpf.gif"
                    alt="Microservices Architecture Diagram showing API interactions and best practices"
                    width={400}
                    height={200}
                    className="w-full h-48 object-contain bg-white"
                  />
                ) : (index === 1 ? (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Understanding-the-Event-driven-Architecture.jpg-qbxZ5SD63mPbB8Wv2EK601kjrhxWP0.jpeg"
                    alt="Event-Driven Architecture Diagram showing system interactions through an event broker"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/layered%20architecture.jpg-gLUd4F60f5v8nP58wpN5btTLevQ7l7.jpeg"
                    alt="Layered Architecture Diagram showing different architectural layers and their interactions"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                ))}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{title} Architecture</h3>
                  <p className="text-gray-600">Generate complex {title.toLowerCase()} diagrams with ease using craftflow.AI</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Describe", icon: "💬" },
              { title: "Generate", icon: "🤖" },
              { title: "Refine", icon: "✨" }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">
                  {index === 0 && "Describe your architecture in plain English"}
                  {index === 1 && "Our AI generates a detailed diagram"}
                  {index === 2 && "Refine and customize your diagram"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section ref={ctaRef} className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join the Waitlist</h2>
          <form onSubmit={handleSubmit} className="flex justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mr-2 bg-white text-purple-600"
            />
            <Button type="submit" className="bg-yellow-400 text-purple-600 hover:bg-yellow-300">
              Join Waitlist
            </Button>
          </form>
        </section>
      </main>

      <footer className="bg-purple-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 craftflow.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}