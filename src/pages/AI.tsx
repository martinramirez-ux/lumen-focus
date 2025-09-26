import { AIInsights } from "@/components/dashboard/AIInsights";

const AI = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
        <AIInsights />
      </div>
    </div>
  );
};

export default AI;