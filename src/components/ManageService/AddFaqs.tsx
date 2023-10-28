import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import InputWithFieldError from '../Common/Form/InputWithFieldError';

const AddFaqs = () => {
  const {
    formState: { errors },
    control,
    register,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'faqs',
    control,
    rules: {
      required: true,
      minLength: 1,
    },
  });

  // Ensure at least one FAQ is always displayed
  if (fields.length === 0) {
    append({ question: '', answer: '' });
  }

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">FAQs</label>

      {/* Render existing FAQs */}
      {fields.map((faq, index) => (
        <div key={faq.id} className="space-y-4">
          <InputWithFieldError
            label={`Question ${index + 1}`}
            errors={errors}
            name={`faqs[${index}].question`}
          >
            <input
              type="text"
              placeholder="Ex. Source File Provided?"
              className="form-input placeholder:gray-400"
              {...register(`faqs[${index}].question` as any, {
                required: `Question ${index + 1} is required`,
              })}
            />
          </InputWithFieldError>

          <InputWithFieldError
            label={`Answer ${index + 1}`}
            errors={errors}
            name={`faqs[${index}].answer`}
          >
            <textarea
              placeholder="Ex. Yes, I will provide the source file for free."
              className="form-input placeholder:gray-400"
              {...register(`faqs[${index}].answer` as any, {
                required: `Answer ${index + 1} is required`,
              })}
            />
          </InputWithFieldError>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove FAQ
          </button>
        </div>
      ))}

      {/* Button to add a new FAQ */}
      <div className="">
        <button
          type="button"
          onClick={() => append({ question: '', answer: '' })}
          className="btn"
        >
          Add FAQ
        </button>
      </div>
    </div>
  );
};

export default AddFaqs;
