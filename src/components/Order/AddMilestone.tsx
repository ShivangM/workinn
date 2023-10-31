import { Milestone, MilestoneInput, Order } from '@/interfaces/order.d';
import { ProjectFile } from '@/interfaces/typing';
import React, { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { stripHtml } from 'string-strip-html';
import Dropzone from '../Common/Dropzone';
import InputWithFieldError from '../Common/Form/InputWithFieldError';
import WYSIWYGEditor from '../Common/WYSIWYGEditor';

const initialMilestone: MilestoneInput = {
  amount: 0,
  description: '',
  deadline: '',
  title: '',
  files: [],
};

const AddMilestone = () => {
  const {
    formState: { errors },
    control,
    register,
  } = useFormContext<Order>();

  const { fields, append, remove } = useFieldArray({
    name: 'sellersBrief.milestones',
    control,
    rules: {
      required: true,
      minLength: 1,
    },
  });

  const [files, setFiles] = useState<ProjectFile[]>([]);

  const handleAppend = (data: MilestoneInput) => {
    data.files = files;
    append(data as Milestone);
    setFiles([]);
  };

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">
        Milestones
      </label>

      {/* Render existing Milestone */}
      {fields.map((mileston, index) => (
        <div key={mileston.id} className="space-y-4">
          <InputWithFieldError
            label={`Title Mileston ${index + 1}`}
            errors={errors}
            name={`sellersBrief.milestones[${index}].title`}
          >
            <input
              type="text"
              placeholder="Ex. Milestone 1"
              className="form-input placeholder:gray-400"
              {...register(`sellersBrief.milestones[${index}].title` as any, {
                required: `Milestone ${index + 1} Title is required`,
              })}
            />
          </InputWithFieldError>

          <Controller
            render={({ field }) => (
              <InputWithFieldError
                label="Description"
                errors={errors}
                name="sellersBrief.milestones[${index}].description"
                labelClassName="text-lg font-medium text-gray-700"
              >
                <WYSIWYGEditor
                  placeholder="Write description about your service...."
                  {...field}
                />
              </InputWithFieldError>
            )}
            name={`sellersBrief.milestones[${index}].description` as any}
            control={control}
            rules={{
              validate: {
                required: (v) =>
                  (v && stripHtml(v).result.length > 0) ||
                  'Description is required',
                maxLength: (v) =>
                  (v && stripHtml(v).result.length <= 2000) ||
                  'Maximum character limit is 2000',
              },
            }}
          />

          <InputWithFieldError
            label={`Amount Mileston ${index + 1}`}
            errors={errors}
            name={`sellersBrief.milestones[${index}].amount`}
          >
            <input
              type="number"
              className="form-input placeholder:gray-400"
              {...register(`sellersBrief.milestones[${index}].amount` as any, {
                required: `Milestone ${index + 1} Amount is required`,
              })}
            />
          </InputWithFieldError>

          <InputWithFieldError
            label={`Deadline Mileston ${index + 1}`}
            errors={errors}
            name={`sellersBrief.milestones[${index}].deadline`}
          >
            <input
              type="date"
              className="form-input placeholder:gray-400"
              {...register(
                `sellersBrief.milestones[${index}].deadline` as any,
                {
                  required: `Milestone ${index + 1} Deadline is required`,
                }
              )}
            />
          </InputWithFieldError>

          <InputWithFieldError
            label="Files"
            errors={errors}
            name="images"
            labelClassName="text-lg font-medium text-gray-700"
          >
            <Dropzone
              files={files}
              setFiles={setFiles}
              deleteAllowed
              maxFiles={5}
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
                'video/*': ['.mp4', '.avi', '.mkv', '.mov'],
                'audio/*': ['.mp3', '.wav', '.ogg'],
                'application/pdf': ['.pdf'],
                'application/msword': ['.doc'],
                'application/vnd.ms-excel': ['.xls'],
                'application/vnd.ms-powerpoint': ['.ppt'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                  ['.docx'],
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                  ['.xlsx'],
                'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                  ['.pptx'],
                'application/zip': ['.zip'],
                'text/plain': ['.txt'],
                'application/x-rar-compressed': ['.rar'],
                'application/x-7z-compressed': ['.7z'],
              }}
            />
          </InputWithFieldError>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove Milestone
          </button>
        </div>
      ))}

      {/* Button to add a new Milestone */}
      <div className="">
        <button
          type="button"
          onClick={() => handleAppend(initialMilestone)}
          className="btn"
        >
          Add Milestone
        </button>
      </div>
    </div>
  );
};

export default AddMilestone;
