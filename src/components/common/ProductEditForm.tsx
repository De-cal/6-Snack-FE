// 의논 후 상품 수정 기능은 현재로써는 사용하지 않기로 결정했습니다. 추후에 활용도를 생각해서 파일을 남겨두겠습니다.

// import React, { useState, FC, FormEvent } from "react";
// import Image from "next/image";

// type TProductEditFormProps = Record<string, never>;

// const ProductEditForm: FC<TProductEditFormProps> = () => {
//   const [productName, setProductName] = useState<string>("코카콜라");
//   const [price, setPrice] = useState<string>("2,000");
//   const [productLink, setProductLink] = useState<string>("www.codeit.kr");
//   const [beverageType, setBeverageType] = useState<string>("음료");
//   const [subBeverageType, setSubBeverageType] = useState<string>("청량 · 탄산 음료");
//   const [image, setImage] = useState<string | null>("/coca-cola.png"); // image can be string or null

//   const handleImageRemove = () => {
//     setImage(null); // Or set to a default placeholder image
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here, e.g., send data to an API
//     console.log({
//       productName,
//       price,
//       productLink,
//       beverageType,
//       subBeverageType,
//       image,
//     });
//     alert("상품이 수정되었습니다!");
//   };

//   return (
//     // Replaced bg-gray-100 with bg-primary-50 for consistency
//     <div className="min-h-screen bg-primary-50 flex items-center justify-center p-4">
//       {/* Retained bg-white, which is now explicitly mapped in your config */}
//       <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//         {/* Changed text color to primary-950 for consistency */}
//         <h2 className="text-xl font-bold text-center mb-6 text-primary-950">상품 수정</h2>

//         {/* Product Image Section */}
//         <div className="mb-6 flex justify-center items-center relative">
//           {image ? (
//             <>
//               <img
//                 src={image}
//                 alt="Product"
//                 // Replaced border-gray-300 with border-primary-300
//                 className="w-24 h-24 object-contain border border-primary-300 rounded-md"
//               />
//               <button
//                 onClick={handleImageRemove}
//                 // Replaced bg-gray-800 with bg-primary-800
//                 // Text-white remains as is, confirmed by config
//                 className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-800 text-white rounded-full p-1"
//                 aria-label="Remove image"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </>
//           ) : (
//             <div
//               // Replaced border-gray-300 with border-primary-300
//               // Replaced bg-gray-50 with bg-primary-50
//               // Replaced text-gray-400 with text-primary-400
//               className="w-24 h-24 flex items-center justify-center border border-primary-300 rounded-md bg-primary-50 text-primary-400"
//             >
//               No Image
//             </div>
//           )}
//         </div>

//         {/* Category Dropdowns */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {/* Beverage Type */}
//           <div>
//             <label htmlFor="beverageType" className="sr-only">
//               음료 유형
//             </label>
//             <div className="relative">
//               <select
//                 id="beverageType"
//                 value={beverageType}
//                 onChange={(e) => setBeverageType(e.target.value)}
//                 // Replaced border-gray-300 with border-primary-300
//                 // Replaced focus:ring-blue-500 with focus:ring-secondary-500
//                 // Replaced focus:border-blue-500 with focus:border-secondary-500
//                 className="block w-full px-4 py-2 border border-primary-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm appearance-none pr-8"
//               >
//                 <option>음료</option>
//                 {/* Add more options as needed */}
//               </select>
//               {/* Replaced text-gray-700 with text-primary-700 */}
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-700">
//                 <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Sub Beverage Type */}
//           <div>
//             <label htmlFor="subBeverageType" className="sr-only">
//               세부 음료 유형
//             </label>
//             <div className="relative">
//               <select
//                 id="subBeverageType"
//                 value={subBeverageType}
//                 onChange={(e) => setSubBeverageType(e.target.value)}
//                 // Replaced border-gray-300 with border-primary-300
//                 // Replaced focus:ring-blue-500 with focus:ring-secondary-500
//                 // Replaced focus:border-blue-500 with focus:border-secondary-500
//                 className="block w-full px-4 py-2 border border-primary-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm appearance-none pr-8"
//               >
//                 <option>청량 · 탄산 음료</option>
//                 {/* Add more options as needed */}
//               </select>
//               {/* Replaced text-gray-700 with text-primary-700 */}
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary-700">
//                 <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path
//                     fillRule="evenodd"
//                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Name */}
//         <div className="mb-4">
//           <label htmlFor="productName" className="block text-sm font-medium text-primary-700 sr-only">
//             상품명
//           </label>
//           <input
//             type="text"
//             id="productName"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             // Replaced border-gray-300 with border-primary-300
//             // Replaced placeholder-gray-400 with placeholder-primary-400
//             // Replaced focus:ring-blue-500 with focus:ring-secondary-500
//             // Replaced focus:border-blue-500 with focus:border-secondary-500
//             className="mt-1 block w-full px-3 py-2 border border-primary-300 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
//             placeholder="상품명"
//           />
//         </div>

//         {/* Price */}
//         <div className="mb-4">
//           <label htmlFor="price" className="block text-sm font-medium text-primary-700 sr-only">
//             가격
//           </label>
//           <input
//             type="text"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             // Replaced border-gray-300 with border-primary-300
//             // Replaced placeholder-gray-400 with placeholder-primary-400
//             // Replaced focus:ring-blue-500 with focus:ring-secondary-500
//             // Replaced focus:border-blue-500 with focus:border-secondary-500
//             className="mt-1 block w-full px-3 py-2 border border-primary-300 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
//             placeholder="가격"
//           />
//         </div>

//         {/* Product Link */}
//         <div className="mb-6">
//           <label htmlFor="productLink" className="block text-sm font-medium text-primary-700 sr-only">
//             제품 링크
//           </label>
//           <input
//             type="text"
//             id="productLink"
//             value={productLink}
//             onChange={(e) => setProductLink(e.target.value)}
//             // Replaced border-gray-300 with border-primary-300
//             // Replaced placeholder-gray-400 with placeholder-primary-400
//             // Replaced focus:ring-blue-500 with focus:ring-secondary-500
//             // Replaced focus:border-blue-500 with focus:border-secondary-500
//             className="mt-1 block w-full px-3 py-2 border border-primary-300 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
//             placeholder="제품 링크"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between space-x-4">
//           <button
//             type="button"
//             onClick={() => console.log("취소")}
//             // Replaced border-gray-300 with border-primary-300
//             // Replaced text-gray-700 with text-primary-700
//             // Retained bg-white, confirmed by config
//             // Replaced hover:bg-gray-50 with hover:bg-primary-50
//             // Replaced focus:ring-gray-500 with focus:ring-primary-500
//             className="flex-1 py-2 px-4 border border-primary-300 rounded-md shadow-sm text-sm font-medium text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//           >
//             취소
//           </button>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             // Retained border-transparent
//             // Retained text-white
//             // Replaced bg-gray-800 with bg-primary-800
//             // Replaced hover:bg-gray-900 with hover:bg-primary-900
//             // Replaced focus:ring-gray-900 with focus:ring-primary-900
//             className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900"
//           >
//             수정하기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductEditForm;
