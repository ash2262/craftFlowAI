'use client'

import { useState, useCallback } from 'react'
import ReactFlow, { 
  Node, 
  Edge, 
  addEdge, 
  Background, 
  Controls, 
  NodeChange, 
  EdgeChange, 
  Connection,
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const initialNodes: Node[] = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 200, y: 200 }, data: { label: 'Node 2' } },
]

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', animated: true }]

export default function DiagramGenerator() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [prompt, setPrompt] = useState('')

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds))
  }, [])

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
  }, [])

  const handleGenerateDiagram = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 300, y: Math.random() * 300 }
    }
    setNodes((nds) => [...nds, newNode])
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <div className="w-full lg:w-1/3 p-4 lg:p-6 overflow-auto">
        <Card className="bg-white bg-opacity-90 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl font-bold text-purple-800">Generate Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your architecture..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="mb-4 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            <Button 
              onClick={handleGenerateDiagram} 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-2 lg:py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Generate Diagram
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full p-4 lg:p-6">
        <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-right"
            style={{ background: 'black' }}
          >
            <Background color="#444" gap={16} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}