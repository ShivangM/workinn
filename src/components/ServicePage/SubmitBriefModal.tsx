'use client';
import createOrder from '@/actions/order/createOrder';
import { BuyerBrief } from '@/interfaces/order';
import { ProjectFile } from '@/interfaces/typing';
import useServiceStore from '@/store/serviceStore';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Dropzone from '../Common/Dropzone';
import InputWithFieldError from '../Common/Form/InputWithFieldError';
import ModalConfirmButton from '../Common/ModalConfirmButton';
import ModalRejectButton from '../Common/ModalRejectButton';
import WYSIWYGEditor from '../Common/WYSIWYGEditor';

const SubmitBriefModal = () => {
  const [submitBriefModalOpen, toggleSubmitBriefModal, service] =
    useServiceStore((state) => [
      state.submitBriefModalOpen,
      state.toggleSubmitBriefModal,
      state.service,
    ]);

  const [loading, startTransaction] = useTransition();
  const methods = useForm<BuyerBrief>();

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

  const onSubmit: SubmitHandler<BuyerBrief> = async (data) => {
    if (!service) return;
    data.projectFiles = await files;

    try {
      await createOrder(data, service.ownerId, service.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      handleReset();
      toggleSubmitBriefModal(null);
    }

    toast.success(
      'Brief submitted successfully, please wait for the freelancer to respond.'
    );
  };

  return (
    <Transition appear show={submitBriefModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggleSubmitBriefModal(null)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Submit Brief
                </Dialog.Title>

                <p className="my-2 text-sm text-gray-600">
                  Write brief description about your project, what are the
                  requirments, what are the goals, what are the deadlines, etc.
                  This will help the freelancer to understand your project
                  better. You can also attach files.
                </p>

                <form
                  className="space-y-8 py-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <InputWithFieldError
                    label="Project Title"
                    errors={errors}
                    name="projectTitle"
                  >
                    <input
                      type="text"
                      placeholder="Title of your project"
                      className="form-input placeholder:gray-400 outline-none !rounded-r-lg"
                      {...register('projectTitle', {
                        required: 'Project Title is required',
                        maxLength: {
                          value: 100,
                          message:
                            'Project Title cannot be more than 100 characters',
                        },
                        minLength: {
                          value: 10,
                          message:
                            'Project Title cannot be less than 10 characters',
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
                    name="projectDescription"
                    control={control}
                    rules={{
                      required: 'Description is required',
                      maxLength: {
                        value: 10000,
                        message:
                          'Description cannot be more than 10000 characters',
                      },
                      minLength: {
                        value: 10,
                        message:
                          'Description cannot be less than 10 characters',
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
                      {...register('projectDeadline', {
                        required: 'Project Deadline is required',
                        min: {
                          value: new Date(Date.now() + 24 * 60 * 60 * 1000)
                            .toISOString()
                            .split('T')[0],
                          message:
                            'Project Deadline cannot be less than one day',
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
                      {...register('projectBudget', {
                        required: 'Budget is required (in INR)',
                        min: {
                          value: service?.price || 0,
                          message:
                            'Budget cannot be less than service base price (ie. ₹' +
                            service?.price +
                            ')',
                        },
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
                    onReject={() => toggleSubmitBriefModal(null)}
                    title="Cancel"
                    loading={loading}
                  />

                  <ModalConfirmButton
                    onConfirm={() => startTransaction(handleSubmit(onSubmit))}
                    title={loading ? 'Submiting...' : 'Submit'}
                    loading={loading}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SubmitBriefModal;
