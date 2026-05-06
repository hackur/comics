import React, { useCallback } from 'react'
import { ComicSource } from '@comics-platform/comic-core'

interface ComicDropzoneProps {
  onFileSelect: (sources: ComicSource[]) => void
  className?: string
}

export function ComicDropzone({ onFileSelect, className = '' }: ComicDropzoneProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const sources: ComicSource[] = files.map(file => ({
      kind: 'file' as const,
      file
    }))
    onFileSelect(sources)
  }, [onFileSelect])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const sources: ComicSource[] = files.map(file => ({
      kind: 'file' as const,
      file
    }))
    onFileSelect(sources)
  }, [onFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return (
    <div
      className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="space-y-4">
        <div className="text-4xl">📚</div>
        <div>
          <p className="text-lg font-medium text-gray-900">
            Drop your comic files here
          </p>
          <p className="text-sm text-gray-500">
            Supports CBR, CBZ, CBT, and image folders
          </p>
        </div>
        <div>
          <label className="inline-block">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
              Browse Files
            </span>
            <input
              type="file"
              multiple
              accept=".cbr,.cbz,.cbt,.rar,.zip,.tar,.pdf,image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  )
}