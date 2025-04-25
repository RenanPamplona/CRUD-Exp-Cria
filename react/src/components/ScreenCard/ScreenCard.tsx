import React from "react";

const ScreenCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen max-h-screen bg-slate-200 grid place-items-center">
      <div className="relative bg-white p-8 rounded-md flex flex-col gap-6 min-w-xl my-4 max-h-[90vh]">
        {children}

        <span className="text-xs text-muted-foreground absolute right-1 bottom-1">
          by Renan Pamplona
        </span>
      </div>
    </div>
  );
};

export default ScreenCard;
