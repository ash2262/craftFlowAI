'use client'

import dynamic from 'next/dynamic'

const DiagramGenerator = dynamic(() => import('@/components/DiagramGenerator'), { ssr: false })

export default function DiagramGeneratorPage() {
  return <DiagramGenerator />
}