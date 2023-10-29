'use client';
import useProfileStore from '@/store/profileStore';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useTransition } from 'react';
import ModalConfirmButton from '../../../../Common/ModalConfirmButton';
import ModalRejectButton from '../../../../Common/ModalRejectButton';
import deleteEducation from '@/actions/profile/educations/deleteEducation';

const DeleteEducationModal = () => {
  const [deleteEducationModalOpen, toggleDeleteEducationModal, education] =
    useProfileStore((state) => [
      state.deleteEducationModalOpen,
      state.toggleDeleteEducationModal,
      state.education,
    ]);

  const [loading, startTransaction] = useTransition();

  const handleDelete = async () => {
    if (!education) {
      throw new Error('Education to delete not found');
    }

    await deleteEducation(education.id);
    toggleDeleteEducationModal(null);
  };

  return (
    <Transition appear show={deleteEducationModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggleDeleteEducationModal(null)}
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
                  Delete Education {education?.school}
                </Dialog.Title>

                <div className="mt-4 flex items-center space-x-4">
                  <ModalRejectButton
                    onReject={() => toggleDeleteEducationModal(null)}
                    title="Cancel"
                    loading={loading}
                  />

                  <ModalConfirmButton
                    onConfirm={() => startTransaction(handleDelete)}
                    title={loading ? 'Deleting...' : 'Delete'}
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

export default DeleteEducationModal;
