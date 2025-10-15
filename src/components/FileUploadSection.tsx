import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileCode, FileCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FileUploadSectionProps {
  onGrade: (cppFiles: File[], testFile: File) => void;
  isGrading: boolean;
}

export const FileUploadSection = ({ onGrade, isGrading }: FileUploadSectionProps) => {
  const [cppFiles, setCppFiles] = useState<File[]>([]);
  const [testFile, setTestFile] = useState<File | null>(null);
  const cppInputRef = useRef<HTMLInputElement>(null);
  const testInputRef = useRef<HTMLInputElement>(null);

  const handleCppFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.name.endsWith('.cpp'));
    
    if (validFiles.length !== files.length) {
      toast.error("Chỉ chấp nhận file .cpp");
    }
    
    setCppFiles(validFiles);
    if (validFiles.length > 0) {
      toast.success(`Đã chọn ${validFiles.length} file C++`);
    }
  };

  const handleTestFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTestFile(file);
      toast.success("Đã chọn file test case");
    }
  };

  const handleGrade = () => {
    if (cppFiles.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 file C++");
      return;
    }
    if (!testFile) {
      toast.error("Vui lòng chọn file test case");
      return;
    }
    
    onGrade(cppFiles, testFile);
  };

  return (
    <Card className="border-2 shadow-elevated animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Upload className="w-6 h-6 text-primary" />
          Upload Files
        </CardTitle>
        <CardDescription>
          Tải lên các file C++ và file test case để bắt đầu chấm điểm
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* C++ Files Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <FileCode className="w-4 h-4 text-primary" />
            File C++ (có thể chọn nhiều file)
          </label>
          <div 
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary hover:bg-secondary/50 transition-all cursor-pointer"
            onClick={() => cppInputRef.current?.click()}
          >
            <input
              ref={cppInputRef}
              type="file"
              multiple
              accept=".cpp"
              onChange={handleCppFiles}
              className="hidden"
            />
            <FileCode className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {cppFiles.length > 0 
                ? `Đã chọn ${cppFiles.length} file: ${cppFiles.map(f => f.name).join(", ")}`
                : "Click để chọn file .cpp"}
            </p>
          </div>
        </div>

        {/* Test Case Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-accent" />
            File Test Case
          </label>
          <div 
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent hover:bg-secondary/50 transition-all cursor-pointer"
            onClick={() => testInputRef.current?.click()}
          >
            <input
              ref={testInputRef}
              type="file"
              accept=".txt,.in,.out"
              onChange={handleTestFile}
              className="hidden"
            />
            <FileCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {testFile 
                ? `Đã chọn: ${testFile.name}`
                : "Click để chọn file test case (.txt, .in, .out)"}
            </p>
          </div>
        </div>

        {/* Grade Button */}
        <Button 
          onClick={handleGrade}
          disabled={isGrading || cppFiles.length === 0 || !testFile}
          className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-elevated"
          size="lg"
        >
          {isGrading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Đang chấm điểm...
            </>
          ) : (
            <>
              <GraduationCap className="w-5 h-5 mr-2" />
              Bắt đầu chấm điểm
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

// Missing import
import { GraduationCap } from "lucide-react";
