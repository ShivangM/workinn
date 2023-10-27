'use client';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useTransition } from 'react';
import useDashboardStore from '@/store/dashboardStore';
import ModalRejectButton from '@/components/Common/ModalRejectButton';
import ModalConfirmButton from '@/components/Common/ModalConfirmButton';
import toggelServiceStatus from '@/actions/dashboard/toggelServiceStatus';

const ToggelServiceStatusModal = () => {
    const [
        toggelServiceStatusModalOpen,
        toggleServiceStatusModal,
        service,
    ] = useDashboardStore((state) => [
        state.toggelServiceStatusModalOpen,
        state.toggleServiceStatusModal,
        state.service,
    ]);

    const [loading, startTransaction] = useTransition();

    const handlePause = async () => {
        if (!service) {
            throw new Error('Service to pause not found');
        }

        await toggelServiceStatus(service.id);
        toggleServiceStatusModal(null);
    };

    return (
        <Transition appear show={toggelServiceStatusModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[100]"
                onClose={() => toggleServiceStatusModal(null)}
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
                                    {service?.isPaused ? "Resume" : "Pause"} Service
                                </Dialog.Title>

                                <p className="my-2 text-gray-600">
                                    Are you sure you want to {service?.isPaused ? "resume" : "pause"}{' '}
                                    <span className="font-semibold text-gray-900 ">
                                        {service?.name}
                                    </span>
                                    ?
                                </p>

                                <div className="mt-4 flex items-center space-x-4">
                                    <ModalRejectButton
                                        onReject={() => toggleServiceStatusModal(null)}
                                        title="Cancel"
                                        loading={loading}
                                    />

                                    <ModalConfirmButton
                                        onConfirm={() => startTransaction(handlePause)}
                                        title={loading ? 'Updating...' : service?.isPaused ? "Resume" : "Pause"}
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

export default ToggelServiceStatusModal;
