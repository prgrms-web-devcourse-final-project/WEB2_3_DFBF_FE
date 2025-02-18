import React from 'react';

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 ">
      <div className="max-w-[600px] w-full bg-black/50 h-screen flex justify-center items-center px-5">
        {children}
      </div>
    </div>
  );
}

export default Modal;
