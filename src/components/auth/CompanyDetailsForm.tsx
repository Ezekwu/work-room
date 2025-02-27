import UiInput from '../ui/Input/UiInput';
import styles from 'styles/FormStyle.module.scss';
import { Option } from '../ui/Select/UiSelect';
import { companyFields } from '@/utils/constants';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import UiSelect from '../ui/Select/UiSelect';

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<FieldValues>;
}

export default function CompanyDetailsForm({ errors, register, control }: Props) {
  const companyFieldOptions: Option[] = companyFields.map((field)=>({
    label: field,
    value: field,
  }))
  return (
    <div className={styles.form__wrapper}>
      <UiInput
        register={register}
        error={errors?.company_name?.message}
        name="company_name"
        label="Your Company’s Name"
        placeholder="Company’s Name"
      />
      <UiSelect
        label="Business Direction"
        name="company_field"
        control={control}
        error={errors.company_field?.message}
        options={companyFieldOptions}
      />
    </div>
  );
}
