import * as yup from 'yup';

interface FileObject {
  name: string;
  size: number;
  type: string;
}

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
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=]).{8,}$/,
      'Password must contain at least 8 characters, including 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special character'
    )
    .required('This field is required. Provide a value'),

  confirmPassword: yup
    .string()
    .required('This field is required. Provide a value')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  country: yup.string().required('This field is required. Provide a value'),

  gender: yup
    .string()
    .required('Please select your gender')
    .oneOf(['male', 'female']),

  image: yup
    .mixed<FileObject>()
    .required('Please upload image')
    .test('fileFormat', 'Only JPEG and PNG files are allowed', (value) => {
      if (value && value.type) {
        const supportedFormats = ['image/jpeg', 'image/png'];
        return supportedFormats.includes(value.type);
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 3MB', (value) => {
      if (value && value.size) {
        return value.size <= 3145728;
      }
      return true;
    }),

  termsAndConditions: yup
    .string()
    .required('Please accept the terms and conditions')
    .oneOf(['true'], 'Please accept the terms and conditions'),
});

export default validationSchema;
