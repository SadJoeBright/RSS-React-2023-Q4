import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .test({
      name: 'name',
      test(value) {
        if (this.parent.name && this.parent.name.length > 0) {
          return /^[А-ЯЁA-Z][а-яёa-z]*$/.test(value as string);
        }
        return true;
      },
      message: 'The first letter must be in upper case',
    })
    .required('This field is required. Provide a value'),

  age: yup
    .number()
    .typeError('This field is required. Provide a value')
    .positive(`Should be positive`),

  email: yup
    .string()
    .email('Invalid email')
    .required('This field is required. Provide a value'),

  password: yup
    .string()
    .required('This field is required. Provide a value')
    .matches(/^(?=.*[a-zа-я])/, 'Password must contain one Lowercase letter')
    .matches(/^(?=.*[A-ZА-Я])/, 'Password must contain one Uppercase letter')
    .matches(/^(?=.*[0-9])/, 'Password must contain one Number')
    .matches(
      /^(?=.*[!@#%&$^*()?><|+=])/,
      'Password must contain one Special character'
    ),

  confirmPassword: yup
    .string()
    .required('This field is required. Provide a value')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  country: yup.string().required('This field is required. Provide a value'),

  gender: yup.string().required('Please select your gender'),

  image: yup
    .mixed<FileList>()
    .test('fileFormat', 'Only JPEG and PNG files are allowed', (value) => {
      if (value && value[0]) {
        const supportedFormats = ['image/jpeg', 'image/png'];
        return supportedFormats.includes(value[0].type);
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 1MB', (value) => {
      if (value && value[0]) {
        return value[0].size <= 1024000;
      }
      return true;
    })
    .test('isRequired', 'Please upload image', (value) => {
      return value && (value as FileList)[0] !== undefined;
    })
    .required('Please, upload image'),

  termsAndConditions: yup
    .string()
    .required('Please accept the terms and conditions')
    .oneOf(['true'], 'Please accept the terms and conditions'),
});

export default validationSchema;
