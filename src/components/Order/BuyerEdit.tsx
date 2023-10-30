'use client';
import updateOrder from '@/actions/order/updateOrder';
import { Order } from '@/interfaces/order';
import { ProjectFile } from '@/interfaces/typing';
import React, { useState, useTransition, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Dropzone from '../Common/Dropzone';
import InputWithFieldError from '../Common/Form/InputWithFieldError';
import ModalConfirmButton from '../Common/ModalConfirmButton';
import ModalRejectButton from '../Common/ModalRejectButton';
import WYSIWYGEditor from '../Common/WYSIWYGEditor';

type Props = {
  order: Order;
};

const BuyerEdit = ({ order }: Props) => {
  const [loading, startTransaction] = useTransition();
  const methods = useForm<Order>();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    control,
  } = methods;

  const [files, setFiles] = useState<ProjectFile[]>([]);

  const handleReset = () => {
    reset();
    setFiles([]);
  };

  useEffect(() => {
    if (order) {
      reset(order);
      setFiles(order.buyersBrief.projectFiles);
    }
  }, [order, reset]);

  const onSubmit: SubmitHandler<Order> = async (data) => {
    if (!order.id) return;
    data.buyersBrief.projectFiles = files;

    try {
      await updateOrder(order.id, data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      handleReset();
    }

    toast.success('Order updated successfully.');
  };

  return (
    <div className="">
      <form className="space-y-8 py-4">
        <InputWithFieldError
          label="Project Title"
          errors={errors}
          name="projectTitle"
        >
          <input
            type="text"
            placeholder="Title of your project"
            className="form-input placeholder:gray-400 outline-none !rounded-r-lg"
            {...register('buyersBrief.projectTitle', {
              required: 'Project Title is required',
              maxLength: {
                value: 100,
                message: 'Project Title cannot be more than 100 characters',
              },
              minLength: {
                value: 10,
                message: 'Project Title cannot be less than 10 characters',
              },
            })}
          />
        </InputWithFieldError>

        <Controller
          render={({ field }) => (
            <WYSIWYGEditor
              placeholder="Write description about your project...."
              {...field}
            />
          )}
          name="buyersBrief.projectDescription"
          control={control}
          rules={{
            required: 'Description is required',
            maxLength: {
              value: 10000,
              message: 'Description cannot be more than 10000 characters',
            },
            minLength: {
              value: 10,
              message: 'Description cannot be less than 10 characters',
            },
          }}
        />

        <InputWithFieldError
          label="Project Deadline"
          errors={errors}
          name="projectDeadline"
        >
          <input
            type="date"
            placeholder="Title of your project"
            className="form-input placeholder:gray-400 outline-none !rounded-r-lg"
            {...register('buyersBrief.projectDeadline', {
              required: 'Project Deadline is required',
              min: {
                value: new Date(Date.now() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split('T')[0],
                message: 'Project Deadline cannot be less than one day',
              },
            })}
          />
        </InputWithFieldError>

        <InputWithFieldError
          label="Estimate Budget"
          name="projectBudget"
          errors={errors}
        >
          <input
            type="number"
            className="form-input placeholder:gray-400 outline-none !rounded-r-lg"
            placeholder="Estimate budget for your project"
            {...register('buyersBrief.projectBudget', {
              required: 'Budget is required (in INR)',
            })}
          />
        </InputWithFieldError>

        <InputWithFieldError
          label="Attach Files"
          errors={errors}
          name="projectFiles"
        >
          <Dropzone
            setFiles={setFiles}
            files={files}
            maxFiles={5}
            deleteAllowed
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
      </form>
      <div className="mt-4 flex items-center space-x-4">
        <ModalRejectButton
          onReject={handleReset}
          title="Reset"
          loading={loading}
        />

        <ModalConfirmButton
          onConfirm={() => startTransaction(handleSubmit(onSubmit))}
          title={loading ? 'Submiting...' : 'Submit'}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BuyerEdit;
