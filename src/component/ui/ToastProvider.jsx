// "use client";
// import { Toaster } from "react-hot-toast";

// export default function ToastProvider() {
//   return (
//     <Toaster
//       position="top-center"
//       toastOptions={{
//         duration: 3000,
//         style: {
//           background: "transparent",
//           boxShadow: "none",
//           padding: 0,
//           margin: 0,
//           maxWidth: "100%",
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//         },
//       }}
//       containerStyle={{
//         top: 16,
//         left: 16,
//         right: 16,
//         zIndex: 10000,
//       }}
//     />
//   );
// }




"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      containerClassName="lg:hidden"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "8px",
          padding: 0,
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
          minWidth: 0,
        },
      }}
      containerStyle={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        padding: "24px",
        zIndex: 10000,
      }}
    />
  );
}