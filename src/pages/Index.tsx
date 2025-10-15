import { useState } from "react";
import { FileUploadSection } from "@/components/FileUploadSection";
import { ResultsTable } from "@/components/ResultsTable";
import { TestCaseGuide } from "@/components/TestCaseGuide";
import { GraduationCap } from "lucide-react";

export interface TestResult {
  filename: string;
  score: number;
  totalTests: number;
  passedTests: number;
  details: string[];
  status: "pass" | "fail" | "partial";
}

const Index = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isGrading, setIsGrading] = useState(false);

  const handleGrade = async (cppFiles: File[], testFile: File) => {
    setIsGrading(true);
    
    // Simulate grading process (will be replaced with actual implementation)
    setTimeout(() => {
      const mockResults: TestResult[] = cppFiles.map((file) => ({
        filename: file.name,
        score: Math.floor(Math.random() * 10) + 1,
        totalTests: 10,
        passedTests: Math.floor(Math.random() * 10) + 1,
        details: [
          "Test case 1: Passed ✓",
          "Test case 2: Failed ✗ - Expected 42, got 43",
          "Test case 3: Passed ✓",
        ],
        status: Math.random() > 0.5 ? "pass" : Math.random() > 0.5 ? "fail" : "partial",
      }));
      
      setResults(mockResults);
      setIsGrading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-elevated">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                C++ Auto Grader
              </h1>
              <p className="text-sm text-muted-foreground">Chấm điểm tự động các file C++</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side - Upload and Results */}
          <div className="lg:col-span-2 space-y-8">
            <FileUploadSection 
              onGrade={handleGrade}
              isGrading={isGrading}
            />
            
            {results.length > 0 && (
              <ResultsTable results={results} />
            )}
          </div>

          {/* Right side - Guide */}
          <div className="lg:col-span-1">
            <TestCaseGuide />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
