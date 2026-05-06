import { ComicDropzone } from '@comics-platform/comic-react'
import { ComicSource } from '@comics-platform/comic-core'

export default function Home() {
  const handleFileSelect = (sources: ComicSource[]) => {
    console.log('Selected files:', sources)
    // TODO: Process the comic files
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Comic Reader Platform</h1>
        <p className="text-lg mb-8">
          Upload and read your comic books directly in your browser.
          Supports CBR, CBZ, CBT, and image folders.
        </p>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="mb-4">Drop your comic files here or click to browse.</p>
          <ComicDropzone onFileSelect={handleFileSelect} />
        </div>
      </div>
    </main>
  )
}