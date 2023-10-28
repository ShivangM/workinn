import AddServiceForm from '@/components/ManageService/AddServiceForm';
import AddServiceInstrucations from '@/components/ManageService/AddServiceInstrucations';
import React from 'react';

const page = () => {
  return (
    <div className="flex min-h-screen space-x-8">
      <AddServiceInstrucations />
      <AddServiceForm
        category={null}
        service={null}
        serviceCategory={null}
        subCategory={null}
      />
    </div>
  );
};

export default page;
