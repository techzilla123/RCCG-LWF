"use client"

import { useState, useEffect } from "react"
import { CloseIcon } from "./Icons"

interface KeywordTag {
  text: string
  color: "blue" | "green" | "red"
}

interface KeywordTagsProps {
  onChange?: (tags: KeywordTag[]) => void
  initialKeywords?: string[] // Add this prop to accept initial keywords
}

const colorStyles = {
  blue: "bg-blue-100 border-blue-300",
  green: "bg-green-100 border-emerald-200",
  red: "bg-red-100 border-red-300",
}

export const KeywordTags = ({ onChange, initialKeywords }: KeywordTagsProps) => {
  const [tags, setTags] = useState<KeywordTag[]>([])
  const [newTag, setNewTag] = useState("")
  const [selectedColor, setSelectedColor] = useState<KeywordTag["color"]>("blue")
  const [isInitialized, setIsInitialized] = useState(false)

  // Load tags from localStorage or initialKeywords on mount
  useEffect(() => {
    if (isInitialized) return

    let tagsToLoad: KeywordTag[] = []

    // First, try to load from localStorage
    const stored = localStorage.getItem("productTags")
    if (stored) {
      try {
        tagsToLoad = JSON.parse(stored)
      } catch {
        console.warn("Failed to parse productTags from localStorage")
      }
    }

    // If no localStorage data and we have initialKeywords, use those
    if (tagsToLoad.length === 0 && initialKeywords && initialKeywords.length > 0) {
      tagsToLoad = initialKeywords.map((keyword) => ({ text: keyword, color: "blue" as const }))
    }

    if (tagsToLoad.length > 0) {
      setTags(tagsToLoad)
    }

    setIsInitialized(true)
  }, [initialKeywords, isInitialized])

  // Save tags to localStorage and notify parent on change
  useEffect(() => {
    if (!isInitialized) return // Don't save during initialization

    localStorage.setItem("productTags", JSON.stringify(tags))
    onChange?.(tags)
  }, [tags, onChange, isInitialized])

  const addTag = () => {
    if (!newTag.trim()) return

    const updated = [...tags, { text: newTag.trim(), color: selectedColor }]
    setTags(updated)
    setNewTag("")
  }

  const removeTag = (indexToRemove: number) => {
    const updated = tags.filter((_, i) => i !== indexToRemove)
    setTags(updated)
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base text-black">Keywords</label>
      {/* Input to add tag */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter keyword"
          className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
        />
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value as KeywordTag["color"])}
          className="border border-neutral-300 rounded-md text-sm px-2"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
        <button type="button" onClick={addTag} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md">
          Add
        </button>
      </div>

      {/* Display tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={`flex items-center px-2 py-1.5 text-sm text-black rounded border ${colorStyles[tag.color]}`}
          >
            <span className="mr-2">{tag.text}</span>
            <button onClick={() => removeTag(index)}>
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
