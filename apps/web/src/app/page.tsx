export default function Home() {
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
          {/* ComicDropzone component will go here */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Comic upload area coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  )
}