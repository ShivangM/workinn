'use client';
import InputWithFieldError from '@/components/Common/Form/InputWithFieldError';
import { Education } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useTransition } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import Select from 'react-select';
import addEducation from '@/actions/profile/educations/addEducation';
import updateEducation from '@/actions/profile/educations/updateEducation';
import yearOptions from '@/constants/yearOptions';
import titleOptions from '@/constants/degree-titles.json';
import CountrySelect from '@/components/Common/Form/CountrySelect';
import ModalRejectButton from '@/components/Common/ModalRejectButton';
import ModalConfirmButton from '@/components/Common/ModalConfirmButton';

const AddEducationModal = () => {
  const [addEducationModalOpen, toggleAddEducationModal, education] =
    useProfileStore((state) => [
      state.addEducationModalOpen,
      state.toggleAddEducationModal,
      state.education,
    ]);

  const methods = useForm<Education>();
  const {
    handleSubmit,
    reset,
    control,
    register,
    formState: { errors },
  } = methods;

  const [loading, startTransaction] = useTransition();

  useEffect(() => {
    if (education) {
      reset(education);
    }

    return () => {
      reset({
        major: '',
        school: '',
      });
    };
  }, [education, reset]);

  const onSubmit: SubmitHandler<Education> = async (data) => {
    education
      ? await updateEducation(education.id, data)
      : await addEducation(data);

    toggleAddEducationModal(null);
    reset();
  };

  return (
    <Transition appear show={addEducationModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggleAddEducationModal(null)}
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
                  {education ? `Edit ${education.school}` : 'Add Education'}
                </Dialog.Title>

                <FormProvider {...methods}>
                  <form className="mt-2 py-4 space-y-6">
                    <CountrySelect />

                    <InputWithFieldError
                      label="Major"
                      errors={errors}
                      name="major"
                    >
                      <div className="flex items-center w-full">
                        <Controller
                          name="title"
                          control={control}
                          render={({ field: { onChange, ref } }) => (
                            <Select
                              ref={ref}
                              defaultValue={
                                education
                                  ? titleOptions.find(
                                      (l) => l.value === education.title
                                    )
                                  : undefined
                              }
                              onChange={(val) => onChange(val?.value)}
                              options={titleOptions}
                              isSearchable={false}
                            />
                          )}
                        />

                        <input
                          type="text"
                          className="form-input placeholder:gray-400 outline-none !rounded-r-lg"
                          placeholder="Major (e.g. Computer Science)"
                          {...register('major', {
                            required: 'Major is required',
                            maxLength: {
                              value: 50,
                              message:
                                'Major cannot be more than 50 characters',
                            },
                            minLength: {
                              value: 2,
                              message: 'Major cannot be less than 2 characters',
                            },
                          })}
                        />
                      </div>
                    </InputWithFieldError>

                    <InputWithFieldError
                      label="School"
                      errors={errors}
                      name="School"
                    >
                      <input
                        type="text"
                        className="form-input placeholder:gray-400"
                        placeholder="School (e.g. University of Toronto)"
                        {...register('school', {
                          required: 'School is required',
                          maxLength: {
                            value: 50,
                            message: 'School cannot be more than 50 characters',
                          },
                          minLength: {
                            value: 2,
                            message: 'School cannot be less than 2 characters',
                          },
                        })}
                      />
                    </InputWithFieldError>

                    <Controller
                      name="yearOfGraduation"
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
                              education
                                ? yearOptions.find(
                                    (l) =>
                                      l.label === education.yearOfGraduation
                                  )
                                : undefined
                            }
                            onChange={(val) => onChange(val?.value)}
                            options={yearOptions}
                          />
                        </InputWithFieldError>
                      )}
                    />
                  </form>
                </FormProvider>

                <div className="mt-4 flex items-center space-x-4">
                  <ModalRejectButton
                    onReject={() => toggleAddEducationModal(null)}
                    title="Cancel"
                    loading={loading}
                  />

                  <ModalConfirmButton
                    onConfirm={() => startTransaction(handleSubmit(onSubmit))}
                    title={
                      loading
                        ? education
                          ? 'Saving...'
                          : 'Adding...'
                        : education
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

export default AddEducationModal;
