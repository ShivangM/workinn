'use client';
import cancelOrder from '@/actions/order/cancelOrder';
import ModalConfirmButton from '@/components/Common/ModalConfirmButton';
import ModalRejectButton from '@/components/Common/ModalRejectButton';
import useOrderStore from '@/store/orderStore';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useTransition } from 'react';

type Props = {};

const CancelOrderModal = (props: Props) => {
  const [toggelCancelOrderModal, cancelOrderModalOpen, order] = useOrderStore(
    (state) => [
      state.toggelCancelOrderModal,
      state.cancelOrderModalOpen,
      state.order,
    ]
  );

  const [loading, startTransaction] = useTransition();

  const handleDelete = async () => {
    if (!order) {
      throw new Error('Order to cancel not found');
    }

    await cancelOrder(order.id);
    toggelCancelOrderModal(null);
  };

  return (
    <Transition appear show={cancelOrderModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={() => toggelCancelOrderModal(null)}
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
                  Delete Service
                </Dialog.Title>

                <p className="my-2 text-gray-600">
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-gray-900 ">
                    Order #{order?.id}
                  </span>
                  ?
                </p>

                <div className="mt-4 flex items-center space-x-4">
                  <ModalRejectButton
                    onReject={() => toggelCancelOrderModal(null)}
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

export default CancelOrderModal;
