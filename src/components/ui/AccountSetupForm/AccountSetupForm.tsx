import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAccountInfo } from '../../../store/reducers/formRegistrationSlice';
import ButtonReg from '../../buttons/ButtonReg/ButtonReg';
import Form from '../../Form';
import FormTitle from '../../FormTitle';
import SelectLabelAbove from '../../SelectLabelAbove';
import TextFieldLabelAbove from '../../TextFieldLabelAbove';

import style from './AccountSetupForm.module.css';

const AccountSetupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = data => {
    const phone = data.code + data.tel;

    dispatch(
      setAccountInfo({
        user_info: {
          first_name: data.fname,
          last_name: data.lname,
          phone,
        },
        license: {
          license_number: +data.license,
        },
        country: {
          country: data.country,
        },
      }),
    );

    navigate('/business-profile', { replace: true });

    reset();
  };

  return (
    <div className={style.formWrapper}>
      <div className={style.formContainer}>
        <FormTitle
          step="Step 1/3"
          title="Account Info"
          text="This information will not be published. The data will only be used to create your account"
        />

        <Form
          action="src/components/ui/AccountSetupForm/AccountSetupForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.addName}>
            <TextFieldLabelAbove
              register={register('fname', {
                required: 'Field is required',
                minLength: {
                  value: 2,
                  message: 'Name should have at least a 2 symbols',
                },
              })}
              error={errors?.fname?.message}
              title="First name"
              name="fname"
              type="text"
              placeholder="John"
            />

            <TextFieldLabelAbove
              register={register('lname', {
                required: 'Field is required',
                minLength: {
                  value: 2,
                  message: 'Name should have at least a 2 symbols',
                },
              })}
              error={errors?.lname?.message}
              title="Last name"
              name="lname"
              type="text"
              placeholder="Johnson"
            />
          </div>

          <SelectLabelAbove
            register={register('country', {
              required: 'Field is required',
            })}
            error={errors?.country?.message}
            name="country"
            title="Country of company registration"
            placeholder="Select"
            options={['USA', 'Germany', 'Brazil', 'France']}
          />

          <div className={style.phoneNumber}>
            <SelectLabelAbove
              register={register('code')}
              name="countryCode"
              title="Personal phone number"
              options={['+90', '+44', '+77', '+1']}
            />

            <div className={style.marginFix}>
              <TextFieldLabelAbove
                register={register('tel', {
                  required: true,
                })}
                error={errors?.tel?.message}
                name="tel"
                type="tel"
                placeholder="(XXX) XXX - XX - XX"
              />
            </div>
          </div>

          <TextFieldLabelAbove
            register={register('license', {
              required: 'Field is required',
              minLength: {
                value: 9,
                message: 'Min length is 9',
              },
            })}
            error={errors?.license?.message}
            title="License or entrepreneur number"
            name="license"
            type="number"
            placeholder="000 – 00 – 0000"
          />

          <p className={style.licenseReminder}>
            Use the number of any document authorizing the sale
          </p>

          <ButtonReg type="submit" value="Continue" isValid={!isValid} />
        </Form>
      </div>
    </div>
  );
};

export default AccountSetupForm;
