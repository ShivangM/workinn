import updateOrder from '@/actions/order/updateOrder';
import { Order } from '@/interfaces/order';
import React, { useEffect, useTransition } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { stripHtml } from 'string-strip-html';
import InputWithFieldError from '../Common/Form/InputWithFieldError';
import ModalConfirmButton from '../Common/ModalConfirmButton';
import ModalRejectButton from '../Common/ModalRejectButton';
import WYSIWYGEditor from '../Common/WYSIWYGEditor';
import AddMilestone from './AddMilestone';

type Props = {
  order: Order;
};

const SellerEdit = ({ order }: Props) => {
  const [loading, startTransaction] = useTransition();
  const methods = useForm<Order>();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = methods;

  useEffect(() => {
    if (order) {
      reset(order);
    }
  }, [order, reset]);

  const handleReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<Order> = async (data) => {
    if (!order.id) return;

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
    <div>
      <FormProvider {...methods}>
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={({ field }) => (
              <InputWithFieldError
                label="Description"
                errors={errors}
                name="description"
                labelClassName="text-lg font-medium text-gray-700"
              >
                <WYSIWYGEditor
                  placeholder="Write description about your service...."
                  {...field}
                />
              </InputWithFieldError>
            )}
            name="sellersBrief.summary"
            control={control}
            rules={{
              validate: {
                required: (v) =>
                  (v && stripHtml(v).result.length > 0) ||
                  'Description is required',
                maxLength: (v) =>
                  (v && stripHtml(v).result.length <= 2000) ||
                  'Maximum character limit is 2000',
              },
            }}
          />

          <AddMilestone />

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
        </form>
      </FormProvider>
    </div>
  );
};

export default SellerEdit;
