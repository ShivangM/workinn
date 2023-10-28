import React from 'react';
import { useFormContext } from 'react-hook-form';

const AddTags = () => {
  const { setValue, watch } = useFormContext();

  const tags: string[] = watch('tags', []);

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag.toLowerCase())) {
      setValue('tags', [...tags, tag.toLowerCase()]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      'tags',
      tags.filter((t: string) => t !== tag)
    );
  };

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">Tags</label>
      <div className="flex flex-wrap items-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 mt-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md"
          >
            #{tag}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleRemoveTag(tag)}
            >
              x
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="form-input"
        placeholder="Type and press enter to add tags"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </div>
  );
};

export default AddTags;
