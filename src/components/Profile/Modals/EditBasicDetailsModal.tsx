'use client';
import InputWithFieldError from '@/components/Common/Form/InputWithFieldError';
import { BasicDetails } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState, useTransition } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ImagePicker from '@/components/Common/Form/ImagePicker';
import updateBasicDetails from '@/actions/profile/updateBasicDetails';
import CountrySelect from '@/components/Common/Form/CountrySelect';
import ModalRejectButton from '@/components/Common/ModalRejectButton';
import ModalConfirmButton from '@/components/Common/ModalConfirmButton';
import { auth } from '@/utils/firebase';

const EditBasicDetailsModal = () => {
  const [editBasicDetailsModalOpen, toggleEditBasicDetailsModal, basicDetails] =
    useProfileStore((state) => [
      state.editBasicDetailsModalOpen,
      state.toggleEditBasicDetailsModal,
      state.basicDetails,
    ]);

  const methods = useForm<BasicDetails>();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (basicDetails) reset(basicDetails);
  }, [basicDetails, reset]);

  const [loading, startTransaction] = useTransition();

  const onSubmit: SubmitHandler<BasicDetails> = async (data) => {
    await updateBasicDetails(data);
    toggleEditBasicDetailsModal(null);
    reset();
  };

  const userId = auth.currentUser?.uid;

  return (
    <Transition appear show={editBasicDetailsModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggleEditBasicDetailsModal(null)}
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
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Basic Details
                </Dialog.Title>

                <FormProvider {...methods}>
                  <form className="mt-2 py-4 space-y-6">
                    <ImagePicker path={`users/${userId}/profile`} />

                    <InputWithFieldError
                      label="Name"
                      errors={errors}
                      name="displayName"
                    >
                      <input
                        type="text"
                        {...register('displayName', {
                          required: 'Display name is required',
                          maxLength: {
                            value: 20,
                            message:
                              'Display name cannot be more than 20 characters',
                          },
                          minLength: {
                            value: 3,
                            message:
                              'Display name cannot be less than 3 characters',
                          },
                        })}
                        className="form-input placeholder:gray-400"
                        placeholder='e.g. "John Doe"'
                      />
                    </InputWithFieldError>

                    <InputWithFieldError
                      label="Title"
                      errors={errors}
                      name="title"
                    >
                      <input
                        type="text"
                        {...register('title', {
                          maxLength: {
                            value: 30,
                            message: 'Title cannot be more than 30 characters',
                          },
                          minLength: {
                            value: 3,
                            message: 'Title cannot be less than 3 characters',
                          },
                        })}
                        className="form-input placeholder:gray-400"
                        placeholder='e.g. "Software Engineer"'
                      />
                    </InputWithFieldError>

                    <InputWithFieldError
                      label="Description"
                      errors={errors}
                      name="description"
                    >
                      <textarea
                        {...register('description', {
                          maxLength: {
                            value: 500,
                            message:
                              'Desciption cannot be more than 500 characters',
                          },
                          minLength: {
                            value: 3,
                            message:
                              'Description cannot be less than 3 characters',
                          },
                        })}
                        className="form-input"
                        placeholder='e.g. "I am a software engineer with 5 years of experience in the field. I am passionate about building products that make a difference in peoples lives."'
                      />
                    </InputWithFieldError>

                    <CountrySelect />
                  </form>
                </FormProvider>

                <div className="mt-4 flex items-center space-x-4">
                  <ModalRejectButton
                    onReject={() => toggleEditBasicDetailsModal(null)}
                    title="Cancel"
                    loading={loading}
                  />

                  <ModalConfirmButton
                    onConfirm={() => startTransaction(handleSubmit(onSubmit))}
                    title={loading ? 'Saving...' : 'Save'}
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

export default EditBasicDetailsModal;
