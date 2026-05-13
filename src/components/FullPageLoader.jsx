import { Loader2 } from "lucide-react";

const FullPageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Loader2 className="animate-spin text-white" size={40} />
    </div>
  );
};

export default FullPageLoader;
