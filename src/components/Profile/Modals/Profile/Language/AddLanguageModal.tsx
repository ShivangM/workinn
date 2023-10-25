'use client';
import InputWithFieldError from '@/components/Common/Form/InputWithFieldError';
import { Language } from '@/interfaces/user';
import useProfileStore from '@/store/profile';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useTransition } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ModalConfirmButton from '../../ModalConfirmButton';
import ModalRejectButton from '../../ModalRejectButton';
import AsyncSelect from 'react-select/async';
import Select, { OptionProps } from 'react-select';
import addLanguage from '@/actions/profile/languages/addLanguage';
import languageLevels from '@/constants/language-levels.json';
import updateLanguage from '@/actions/profile/languages/updateLanguage';
import debounce from 'lodash.debounce';
import fetchLanguageOptions from '@/lib/profile/fetchLanguageOptions';

const AddLanguageModal = () => {
  const [addLanguageModalOpen, toggleAddLanguageModal, language] =
    useProfileStore((state) => [
      state.addLanguageModalOpen,
      state.toggleAddLanguageModal,
      state.language,
    ]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Language>();

  const [loading, startTransaction] = useTransition();

  useEffect(() => {
    if (language) {
      reset(language);
    }
  }, [language, reset]);

  const onSubmit: SubmitHandler<Language> = async (data) => {
    language
      ? await updateLanguage(language.id, data)
      : await addLanguage(data);

    toggleAddLanguageModal(null);
    reset();
  };

  const promiseLanguageOptions = (inputValue: string, callback: (res: Language[]) => void) => {
    try {
      fetchLanguageOptions(inputValue).then((res) => {
        callback(res);
      });
    } catch (error) {
      // Todo: Handle error
    }
  };

  const loadLanguageOptions = debounce(promiseLanguageOptions, 300);

  return (
    <Transition appear show={addLanguageModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggleAddLanguageModal(null)}
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
                  {language ? `Edit ${language.name}` : 'Add Language'}
                </Dialog.Title>

                <form className="mt-2 py-4 space-y-6">
                  <Controller
                    name="id"
                    control={control}
                    render={({ field: { onChange, ref } }) => (
                      <InputWithFieldError
                        label="Language"
                        errors={errors}
                        name="id"
                      >
                        <AsyncSelect
                          ref={ref}
                          defaultValue={language}
                          isDisabled={!!language}
                          isMulti={false}
                          onChange={(val) => onChange((val as Language).id)}
                          loadOptions={loadLanguageOptions}
                          getOptionLabel={(option) => option.name}
                          components={{
                            Option: ({ data, innerProps, innerRef }: OptionProps<Language>) => {
                              return (
                                <div className='cursor-pointer' ref={innerRef} {...innerProps}>
                                  <div className="flex py-2 px-4 items-center space-x-2">
                                    <div className="text-sm">
                                      <p className='text-gray-900 font-medium'>{data.name}</p>
                                      <p className='text-gray-500'>{data.nativeName}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            },
                          }}
                        />
                      </InputWithFieldError>
                    )}
                  />

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
                            language
                              ? languageLevels.find(
                                (l) => l.value === language.level
                              )
                              : null
                          }
                          onChange={(val) => onChange(val?.value)}
                          options={languageLevels}
                        />
                      </InputWithFieldError>
                    )}
                  />
                </form>

                <div className="mt-4 flex items-center space-x-4">
                  <ModalRejectButton
                    onReject={() => toggleAddLanguageModal(null)}
                    title="Cancel"
                    loading={loading}
                  />

                  <ModalConfirmButton
                    onConfirm={() => startTransaction(handleSubmit(onSubmit))}
                    title={
                      loading
                        ? language
                          ? 'Saving...'
                          : 'Adding...'
                        : language
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

export default AddLanguageModal;
