import React from 'react';

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center ">
      <div className="max-w-[600px] w-full bg-white/70 h-screen flex justify-center items-center px-5">
        {children}
      </div>
    </div>
  );
}

export default Overlay;
