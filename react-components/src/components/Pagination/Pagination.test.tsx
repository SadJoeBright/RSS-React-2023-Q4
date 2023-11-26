// // import { fireEvent, render, renderHook, screen } from '@testing-library/react';
// // import { it, describe, expect } from 'vitest';
// // import { BrowserRouter } from 'react-router-dom';
// // import { ReactNode } from 'react';
// // import { AppProvider, useAppContext } from '../../context/appContext';

// // interface TestWrapperProps {
// //   children: ReactNode;
// // }

// // function TestWrapper({ children }: TestWrapperProps): JSX.Element {
// //   return (
// //     <BrowserRouter>
// //       <AppProvider>{children}</AppProvider>
// //     </BrowserRouter>
// //   );
// // }

// // describe('Pagination test', () => {
// //   it('component updates URL query parameter when page changes', () => {
// //     function wrapper({ children }: TestWrapperProps): JSX.Element {
// //       return <TestWrapper>{children}</TestWrapper>;
// //     }

// //     render(
// //       <BrowserRouter>
// //         <AppProvider>{/* <App /> */}</AppProvider>
// //       </BrowserRouter>
// //     );

// //     const nextPageButton = screen.getByTestId('nextPageButton');
// //     fireEvent.click(nextPageButton);

// //     const { result } = renderHook(() => useAppContext(), {
// //       wrapper,
// //     });

// //     const { currentPage } = result.current;
// //     const urlSearchParams = new URLSearchParams(window.location.search);
// //     const pageQueryParam = urlSearchParams.get('page');

// //     expect(pageQueryParam).toBe(currentPage.toString());
// //   });

// //   it('navigate to the first page', () => {
// //     function wrapper({ children }: TestWrapperProps): JSX.Element {
// //       return <TestWrapper>{children}</TestWrapper>;
// //     }
// //     render(
// //       <BrowserRouter>
// //         <AppProvider>{/* <App /> */}</AppProvider>
// //       </BrowserRouter>
// //     );
// //     const firsPageButton = screen.getByTestId('firstPageButton');
// //     fireEvent.click(firsPageButton);

// //     const { result } = renderHook(() => useAppContext(), {
// //       wrapper,
// //     });

// //     const { currentPage } = result.current;

// //     expect(currentPage).toBe(1);
// //   });
// // });

// import { fireEvent, render, screen } from '@testing-library/react';
// import { describe, it } from 'vitest';
// import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
// // import PagesBar from '../components/pages-bar/PagesBar';
// // import mockPageState from './mock/mock-page-state';
// import createMockRouter from '../../__test__/mock/mock-router';

// describe('Page bur component', () => {
//   it('Updates URL query parameter when page changes', async () => {
//     const router = createMockRouter({
//       query: {
//         pageNumber: String(mockPageState.pageNumber),
//         pageSize: String(mockPageState.pageSize),
//       },
//     });

//     render(
//       <RouterContext.Provider value={router}>
//         <PagesBar
//           pageState={mockPageState}
//           changePageClickCallback={() => {}}
//         />
//       </RouterContext.Provider>
//     );

//     const pageNumber = screen.getByRole('page-number');
//     const paginationNextBtn = screen.getByRole('next-page-button');

//     expect(pageNumber).toHaveTextContent(String(mockPageState.pageNumber));
//     fireEvent.click(paginationNextBtn);
//     expect(router.push).toBeCalledWith({
//       query: {
//         pageNumber: mockPageState.pageNumber + 1,
//         pageSize: mockPageState.pageSize,
//       },
//     });
//   });
// });
