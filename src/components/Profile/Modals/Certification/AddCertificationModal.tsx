'use client';
import InputWithFieldError from '@/components/Common/Form/InputWithFieldError';
import { Certification } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ModalConfirmButton from '../../../Common/ModalConfirmButton';
import ModalRejectButton from '../../../Common/ModalRejectButton';
import Select from 'react-select';
import addCertification from '@/actions/profile/certifications/addCertification';
import updateCertification from '@/actions/profile/certifications/updateCertification';
import yearOptions from '@/constants/yearOptions';

const AddCertificationModal = () => {
  const [
    addCertificationModalOpen,
    toggleAddCertificationModal,
    certification,
  ] = useProfileStore((state) => [
    state.addCertificationModalOpen,
    state.toggleAddCertificationModal,
    state.certification,
  ]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
  } = useForm<Certification>();

  const [loading, startTransaction] = useTransition();

  useEffect(() => {
    if (certification) {
      reset(certification);
    }

    return () => {
      reset({
        name: '',
        organization: '',
      });
    };
  }, [certification, reset]);

  const onSubmit: SubmitHandler<Certification> = async (data) => {
    certification
      ? await updateCertification(certification.id, data)
      : await addCertification(data);
    toggleAddCertificationModal(null);
    reset();
  };

  return (
    <Transition appear show={addCertificationModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggleAddCertificationModal(null)}
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
                  {certification
                    ? `Edit ${certification.name}`
                    : 'Add Certification'}
                </Dialog.Title>

                <form className="mt-2 py-4 space-y-6">
                  <InputWithFieldError label="Name" errors={errors} name="name">
                    <input
                      type="text"
                      placeholder='e.g. "AWS Certified Cloud Practitioner"'
                      className="form-input placeholder:gray-400"
                      {...register('name', {
                        required: 'Name is required',
                        maxLength: {
                          value: 50,
                          message: 'Name cannot be more than 50 characters',
                        },
                        minLength: {
                          value: 2,
                          message: 'Name cannot be less than 2 characters',
                        },
                      })}
                    />
                  </InputWithFieldError>

                  <InputWithFieldError
                    label="Organization"
                    errors={errors}
                    name="organization"
                  >
                    <input
                      type="text"
                      className="form-input placeholder:gray-400"
                      placeholder='e.g. "Amazon Web Services"'
                      {...register('organization', {
                        required: 'Organization is required',
                        maxLength: {
                          value: 50,
                          message:
                            'Organization cannot be more than 50 characters',
                        },
                        minLength: {
                          value: 2,
                          message:
                            'Organization cannot be less than 2 characters',
                        },
                      })}
                    />
                  </InputWithFieldError>

                  <Controller
                    name="year"
                    control={control}
                    render={({ field: { onChange, ref } }) => (
                      <InputWithFieldError
                        label="Year"
                        errors={errors}
                        name="year"
                      >
                        <Select
                          ref={ref}
                          defaultValue={
                            certification
                              ? yearOptions.find(
                                  (l) => l.label === certification.year
                                )
                              : null
                          }
                          onChange={(val) => onChange(val?.value)}
                          options={yearOptions}
                        />
                      </InputWithFieldError>
                    )}
                  />
                </form>

                <div className="mt-4 flex items-center space-x-4">
                  <ModalRejectButton
                    onReject={() => toggleAddCertificationModal(null)}
                    title="Cancel"
                    loading={loading}
                  />

                  <ModalConfirmButton
                    onConfirm={() => startTransaction(handleSubmit(onSubmit))}
                    title={
                      loading
                        ? certification
                          ? 'Saving...'
                          : 'Adding...'
                        : certification
                        ? 'Save'
                        : 'Add'
                    }
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

export default AddCertificationModal;
