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
    .required('This field is required. Provide a value')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=]).{8,}$/,
      'Password must contain at least 8 characters, including 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special character'
    ),

  confirmPassword: yup
    .string()
    .required('This field is required. Provide a value')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  country: yup.string().required('This field is required. Provide a value'),

  gender: yup.string().required('Please select your gender'),

  image: yup
    .mixed()
    .required('Please upload image')
    .test('fileFormat', 'Only JPEG and PNG files are allowed', (value) => {
      if (value && (value as FileList)[0]) {
        const supportedFormats = ['image/jpeg', 'image/png'];
        return supportedFormats.includes((value as FileList)[0].type);
      }
      return true;
    })
    .test('fileSize', 'File size must be less than 3MB', (value) => {
      if (value && (value as FileList)[0]) {
        return (value as FileList)[0].size <= 3145728;
      }
      return true;
    })
    .required('Please upload image'),

  // image: yup
  //   .mixed()
  //   .required('You must select an image')
  //   .test('fileFormat', 'Invalid file format', (value) => {
  //     if(value &&
  //       (value as FileList)[0] &&
  //       ['image/jpeg', 'image/png'].includes((value as FileList)[0].type);
  //   })
  //   .test(
  //     'fileSize',
  //     'File is too big',
  //     (value) =>
  //       value &&
  //       (value as FileList)[0] &&
  //       (value as FileList)[0].size <= 200 * 200
  //   )
  //   .required('File no choose'),

  // image: yup
  //   .mixed<FileList>()
  //   .required('You need to provide a file')
  //   .test('fileSize', 'File size must be less than 3MB', (value) => {
  //     if (value && value[0] && value[0].size) {
  //       return value[0].size <= 3145728;
  //     }
  //     return true;
  //   })
  //   // .test(
  //   //   'type',
  //   //   'Only JPEG, BMP, PNG, PDF, and DOC files are allowed',
  //   //   (value) => {
  //   //     return (
  //   //       value &&
  //   //       value[0] &&
  //   //       (value[0].type === 'image/jpeg' ||
  //   //         value[0].type === 'image/bmp' ||
  //   //         value[0].type === 'image/png' ||
  //   //         value[0].type === 'application/pdf' ||
  //   //         value[0].type === 'application/msword')
  //   //     );
  //   //   }
  //   // )
  //   .test('fileFormat', 'Only JPEG and PNG files are allowed', (value) => {
  //     if (value && value[0] && value[0].type) {
  //       const supportedFormats = ['image/jpeg', 'image/png'];
  //       return supportedFormats.includes(value[0].type);
  //     }
  //     return true;
  //   }),

  termsAndConditions: yup
    .string()
    .required('Please accept the terms and conditions')
    .oneOf(['true'], 'Please accept the terms and conditions'),
});

export default validationSchema;
