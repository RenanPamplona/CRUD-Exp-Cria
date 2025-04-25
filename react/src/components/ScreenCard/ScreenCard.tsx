import React from "react";

const ScreenCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-h-screen bg-slate-200 grid place-items-center">
      <div className="bg-white p-8 rounded-md flex flex-col gap-6 min-w-xl my-4 max-h-[90vh]">
        {children}
      </div>
    </div>
  );
};

export default ScreenCard;
