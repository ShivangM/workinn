'use client';
import InputWithFieldError from '@/components/Common/Form/InputWithFieldError';
import { Skill } from '@/interfaces/user';
import useProfileStore from '@/store/profileStore';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ModalRejectButton from '@/components/Common/ModalRejectButton';
import ModalConfirmButton from '@/components/Common/ModalConfirmButton';
import Select from 'react-select';
import addSkill from '@/actions/profile/skills/addSkill';
import updateSkill from '@/actions/profile/skills/updateSkill';
import skillLevels from '@/constants/skill-levels.json';

const AddSkillModal = () => {
  const [addSkillModalOpen, toggleAddSkillModal, skill] = useProfileStore(
    (state) => [state.addSkillModalOpen, state.toggleAddSkillModal, state.skill]
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    register,
  } = useForm<Skill>();

  useEffect(() => {
    if (skill) {
      reset(skill);
    }

    return () => {
      reset({
        name: '',
      });
    };
  }, [skill, reset]);

  const [loading, startTransaction] = useTransition();

  const onSubmit: SubmitHandler<Skill> = async (data) => {
    skill ? await updateSkill(skill.id, data) : await addSkill(data);
    toggleAddSkillModal(null);
    reset();
  };

  return (
    <Transition appear show={addSkillModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggleAddSkillModal(null)}
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
                  {skill ? `Edit ${skill.name}` : 'Add Skill'}
                </Dialog.Title>

                <form className="mt-2 py-4 space-y-6">
                  <InputWithFieldError label="Name" errors={errors} name="name">
                    <input
                      type="text"
                      placeholder='e.g. "React"'
                      className="form-input placeholder:gray-400"
                      disabled={!!skill}
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

                  <Controller
                    name="level"
                    control={control}
                    render={({ field: { onChange, ref } }) => (
                      <InputWithFieldError
                        label="Level"
                        errors={errors}
                        name="level"
                      >
                        <Select
                          ref={ref}
                          defaultValue={
                            skill
                              ? skillLevels.find((l) => l.value === skill.level)
                              : null
                          }
                          onChange={(val) => onChange(val?.value)}
                          options={skillLevels}
                        />
                      </InputWithFieldError>
                    )}
                  />
                </form>

                <div className="mt-4 flex items-center space-x-4">
                  <ModalRejectButton
                    onReject={() => toggleAddSkillModal(null)}
                    title="Cancel"
                    loading={loading}
                  />

                  <ModalConfirmButton
                    onConfirm={() => startTransaction(handleSubmit(onSubmit))}
                    title={
                      loading
                        ? skill
                          ? 'Saving...'
                          : 'Adding...'
                        : skill
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

export default AddSkillModal;
