'use client'
import { useTransition, useEffect, useState } from 'react'
import { Category, Service, ServiceCategory, ServiceInput, SubCategory } from "@/interfaces/service";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import updateService from '@/actions/dashboard/updateService';
import addService from '@/actions/dashboard/addService';
import InputWithFieldError from '../Common/Form/InputWithFieldError';
import WYSIWYGEditor from '../Common/WYSIWYGEditor';
// @ts-ignore
import { stripHtml } from "string-strip-html";
import Dropzone from './Dropzone';
import ModalConfirmButton from '../Common/ModalConfirmButton';
import ModalRejectButton from '../Common/ModalRejectButton';
import AsyncSelect from 'react-select/async';
import loadCategoryOptions from '@/utils/loadCategoryOptions';
import loadServiceCategoryOptions from '@/utils/loadServiceCategoryOptions';
import loadSubCategoryOptions from '@/utils/loadSubCategoryOptions';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import uploadImage from '@/utils/uploadFile';
import { SingleValue } from 'react-select';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

type Props = {
    service?: Service
    category?: Category
    subCategory?: SubCategory
    serviceCategory?: ServiceCategory
}

const AddServiceForm = ({ service, category, serviceCategory, subCategory }: Props) => {
    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
        control,
        watch,
    } = useForm<ServiceInput>();

    const { isConnected, address } = useAccount();

    const [loading, startTransaction] = useTransition();

    useEffect(() => {
        if (service) {
            reset(service);
            setTags(service.tags);
        }
    }, [service, reset]);

    const onSubmit: SubmitHandler<ServiceInput> = async (data) => {
        data.tags = tags;

        if (isConnected) {
            data.sellerWalletAddress = address;
        }
        const imagesUrl: string[] = [];
        const serviceId = service ? service.id : await addService(data);

        if (data.images) {
            let imageIndex = 0;
            for (const image of data.images as File[]) {
                const imageUrl = await uploadImage(image, `/services/${serviceId}/images/image-${++imageIndex}`);
                imagesUrl.push(imageUrl);
            }
        }

        data.images = imagesUrl;

        try {
            await updateService(serviceId, data);
        } catch (error) {
            console.error('Error in updating service:', error);
        }

        handleReset();
    };


    const handleReset = () => {
        reset();
        setTags([]);
    };

    const selectedCategoryId = watch('categoryId');
    const selectedSubCategoryId = watch('subCategoryId');
    const price = watch('price');

    const { fields, append, remove } = useFieldArray({
        name: "faqs",
        control,
        rules: {
            required: true,
            minLength: 1,
        }
    });

    // Ensure at least one FAQ is always displayed
    if (fields.length === 0) {
        append({ question: '', answer: '' });
    }

    const [tags, setTags] = useState<string[]>([]);

    const handleAddTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    }

    const {
        ethToINRPrice,
        inrToUSDPrice
    } = useCurrencyConversion();

    return (
        <div className='bg-white rounded-xl p-8 h-full w-full' >
            <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold capitalize' >Add a Service</h3>
            <div className="py-10">
                <form className='space-y-10' onSubmit={handleSubmit(onSubmit)}>
                    <InputWithFieldError
                        label="Name"
                        errors={errors}
                        name="name"
                        labelClassName='text-lg font-medium text-gray-700'
                    >
                        <input
                            type="text"
                            className="form-input placeholder:gray-400"
                            placeholder="I will do... (Ex: I will create a website for you)"
                            {...register('name', {
                                required: 'Name is required',
                                maxLength: {
                                    value: 100,
                                    message: 'Name cannot be more than 100 characters',
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Name cannot be less than 10 characters',
                                },
                            })}
                        />
                    </InputWithFieldError>

                    <Controller
                        render={({ field }) =>
                            <InputWithFieldError
                                label="Description"
                                errors={errors}
                                name="description"
                                labelClassName='text-lg font-medium text-gray-700'
                            >
                                <WYSIWYGEditor placeholder='Write description about your service....' {...field} />
                            </InputWithFieldError>
                        }
                        name="description"
                        control={control}
                        rules={{
                            validate: {
                                required: (v) =>
                                    (v && stripHtml(v).result.length > 0) ||
                                    "Description is required",
                                maxLength: (v) =>
                                    (v && stripHtml(v).result.length <= 2000) ||
                                    "Maximum character limit is 2000",
                            },
                        }}
                    />

                    <InputWithFieldError
                        label="Images"
                        errors={errors}
                        name="images"
                        labelClassName='text-lg font-medium text-gray-700'
                    >
                        <Dropzone control={control} name="images" />
                    </InputWithFieldError>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Controller
                            name="categoryId"
                            control={control}
                            rules={{ required: 'Category is required' }}
                            render={({ field: { onChange, ref } }) => (
                                <InputWithFieldError
                                    label="Category"
                                    errors={errors}
                                    name="category"
                                    labelClassName='text-lg font-medium text-gray-700'
                                >
                                    <AsyncSelect
                                        ref={ref}
                                        defaultValue={category}
                                        isMulti={false}
                                        onChange={(val: SingleValue<Category>) => onChange(val?.id)}
                                        loadOptions={loadCategoryOptions}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        defaultOptions={true}
                                    />
                                </InputWithFieldError>
                            )}
                        />

                        {
                            selectedCategoryId ?
                                <Controller
                                    name="subCategoryId"
                                    control={control}
                                    rules={{ required: 'Sub Category is required' }}
                                    render={({ field: { onChange, ref } }) => (
                                        <InputWithFieldError
                                            label="Sub Category"
                                            errors={errors}
                                            name="subCategory"
                                            labelClassName='text-lg font-medium text-gray-700'
                                        >
                                            <AsyncSelect
                                                ref={ref}
                                                defaultValue={subCategory}
                                                isMulti={false}
                                                onChange={(val: SingleValue<SubCategory>) => onChange(val?.id)}
                                                loadOptions={(inputValue) => loadSubCategoryOptions(selectedCategoryId, inputValue)}
                                                getOptionLabel={(option) => option.name}
                                                getOptionValue={(option) => option.id}
                                                defaultOptions={true}
                                            />
                                        </InputWithFieldError>
                                    )}
                                /> : null
                        }

                        {
                            selectedCategoryId && selectedSubCategoryId ?
                                <Controller
                                    name="serviceCategoryId"
                                    control={control}
                                    rules={{ required: 'Service Category is required' }}
                                    render={({ field: { onChange, ref } }) => (
                                        <InputWithFieldError
                                            label="Service Category"
                                            errors={errors}
                                            name="serviceCategory"
                                            labelClassName='text-lg font-medium text-gray-700'
                                        >
                                            <AsyncSelect
                                                ref={ref}
                                                defaultValue={serviceCategory}
                                                isMulti={false}
                                                onChange={(val: SingleValue<ServiceCategory>) => onChange(val?.id)}
                                                loadOptions={(inputValue) => loadServiceCategoryOptions(selectedCategoryId, selectedSubCategoryId, inputValue)}
                                                getOptionLabel={(option) => option.name}
                                                getOptionValue={(option) => option.id}
                                                defaultOptions={true}
                                            />
                                        </InputWithFieldError>
                                    )}
                                /> : null
                        }

                    </div>

                    <div className='space-y-4' >
                        <label className="ml-2 text-lg font-medium text-gray-700">Accept Crypto</label>
                        <ConnectButton />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Controller
                            name="price"
                            control={control}
                            rules={{ required: 'Price is required' }}
                            render={() => (
                                <InputWithFieldError
                                    label="Price in Rs."
                                    errors={errors}
                                    name="price"
                                    labelClassName='text-lg font-medium text-gray-700'
                                >
                                    <input
                                        type="number"
                                        className="form-input placeholder:gray-400"
                                        placeholder="Price"
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: {
                                                value: 1,
                                                message: 'Price cannot be less than 1',
                                            },
                                        })}
                                    />
                                </InputWithFieldError>
                            )}
                        />

                        <InputWithFieldError
                            label="International Price in $"
                            errors={errors}
                            name="internationalPrice"
                            labelClassName='text-lg font-medium text-gray-700'
                        >
                            <input
                                type="number"
                                disabled
                                className="form-input placeholder:gray-400"
                                placeholder="Price"
                                value={price * inrToUSDPrice}
                            />
                        </InputWithFieldError>

                        {
                            isConnected ?
                                <InputWithFieldError
                                    label="Crypto Price in ETH"
                                    errors={errors}
                                    name="cryptoPrice"
                                    labelClassName='text-lg font-medium text-gray-700'
                                >
                                    <input
                                        type="number"
                                        disabled
                                        className="form-input placeholder:gray-400"
                                        placeholder="Price"
                                        value={price / ethToINRPrice}
                                    />
                                </InputWithFieldError>
                                : null
                        }
                    </div>

                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-700">FAQs</label>

                        {/* Render existing FAQs */}
                        {fields.map((faq, index) => (
                            <div key={faq.id} className="space-y-4">
                                <InputWithFieldError
                                    label={`Question ${index + 1}`}
                                    errors={errors}
                                    name={`faqs[${index}].question`}
                                >
                                    <input
                                        type="text"
                                        className="form-input placeholder:gray-400"
                                        {...register(`faqs[${index}].question` as any, {
                                            required: `Question ${index + 1} is required`,
                                        })}
                                    />
                                </InputWithFieldError>

                                <InputWithFieldError
                                    label={`Answer ${index + 1}`}
                                    errors={errors}
                                    name={`faqs[${index}].answer`}
                                >
                                    <textarea
                                        className="form-input placeholder:gray-400"
                                        {...register(`faqs[${index}].answer` as any, {
                                            required: `Answer ${index + 1} is required`,
                                        })}
                                    />
                                </InputWithFieldError>

                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Remove FAQ
                                </button>
                            </div>
                        ))}

                        {/* Button to add a new FAQ */}
                        <div className="">
                            <button
                                type="button"
                                onClick={() => append({ question: '', answer: '' })}
                                className="text-green-500 hover:underline"
                            >
                                Add FAQ
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-700">Tags</label>
                        <div className="flex flex-wrap items-center">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 mt-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md"
                                >
                                    {tag}
                                    <button
                                        type='button'
                                        className="ml-2 focus:outline-none"
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                                        x
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Type and press enter to add tags"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTag(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                    </div>

                    <div className="mt-4 flex items-center space-x-4">
                        <ModalRejectButton
                            onReject={handleReset}
                            title="Reset"
                            loading={loading}
                        />

                        <ModalConfirmButton
                            onConfirm={() => startTransaction(handleSubmit(onSubmit))}
                            title={
                                loading
                                    ? service
                                        ? 'Saving...'
                                        : 'Adding...'
                                    : service
                                        ? 'Save'
                                        : 'Add'
                            }
                            loading={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddServiceForm