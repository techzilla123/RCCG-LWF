import { useState, useEffect } from 'react';
import { CloseIcon } from './Icons';

interface KeywordTag {
  text: string;
  color: 'blue' | 'green' | 'red';
}

const colorStyles = {
  blue: 'bg-blue-100 border-blue-300',
  green: 'bg-green-100 border-emerald-200',
  red: 'bg-red-100 border-red-300',
};

export const KeywordTags = () => {
  const [tags, setTags] = useState<KeywordTag[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedColor, setSelectedColor] = useState<KeywordTag['color']>('blue');

  // Load tags from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('productTags');
    if (stored) {
      setTags(JSON.parse(stored));
    }
  }, []);

  // Save tags to localStorage on change
  useEffect(() => {
    localStorage.setItem('productTags', JSON.stringify(tags));
  }, [tags]);

  const addTag = () => {
    if (!newTag.trim()) return;
    setTags([...tags, { text: newTag.trim(), color: selectedColor }]);
    setNewTag('');
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, i) => i !== indexToRemove));
  };

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
          onChange={(e) => setSelectedColor(e.target.value as KeywordTag['color'])}
          className="border border-neutral-300 rounded-md text-sm px-2"
        >
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
        >
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
  );
};
