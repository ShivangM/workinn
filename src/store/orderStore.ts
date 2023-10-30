import { Order } from '@/interfaces/order';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface OrderState {
  order: Order | null;
  cancelOrderModalOpen: boolean;
  toggelCancelOrderModal: (order: Order | null) => void;

  editOrder: boolean;
  toggleEditOrder: () => void;
}

const initialState = {
  order: null,
  cancelOrderModalOpen: false,
  editOrder: false,
};

const useOrderStore = create<OrderState>()(
  devtools((set) => ({
    ...initialState,
    toggelCancelOrderModal: (order: Order | null) =>
      set((state) => ({
        ...state,
        order,
        cancelOrderModalOpen: !state.cancelOrderModalOpen,
      })),

    toggleEditOrder: () =>
      set((state) => ({
        editOrder: !state.editOrder,
      })),
  }))
);

export default useOrderStore;
