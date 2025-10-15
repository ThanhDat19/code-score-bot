import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Code2, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const TestCaseGuide = () => {
  return (
    <Card className="border-2 shadow-elevated animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Info className="w-6 h-6 text-primary" />
          Hướng dẫn cấu trúc Test Case
        </CardTitle>
        <CardDescription>
          File test case cần tuân theo format chuẩn để hệ thống có thể chấm điểm chính xác
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format Explanation */}
        <Alert className="bg-primary/5 border-primary/20">
          <FileCheck className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            File test case gồm nhiều test, mỗi test có <strong>input</strong> và <strong>output</strong> mong đợi
          </AlertDescription>
        </Alert>

        {/* Format Structure */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Code2 className="w-5 h-5 text-accent" />
            Cấu trúc chuẩn:
          </h3>
          
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <pre className="text-sm font-mono overflow-x-auto">
{`[TEST 1]
INPUT:
5
OUTPUT:
120

[TEST 2]
INPUT:
3 4
OUTPUT:
7

[TEST 3]
INPUT:
10
20
OUTPUT:
30`}
            </pre>
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Quy tắc:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Mỗi test bắt đầu bằng <code className="bg-muted px-1.5 py-0.5 rounded text-primary">[TEST n]</code> (n là số thứ tự)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>Phần input bắt đầu bằng <code className="bg-muted px-1.5 py-0.5 rounded text-primary">INPUT:</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Phần output bắt đầu bằng <code className="bg-muted px-1.5 py-0.5 rounded text-primary">OUTPUT:</code></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>Input và output có thể nhiều dòng</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">5.</span>
              <span>Giữa các test cách nhau ít nhất 1 dòng trống</span>
            </li>
          </ul>
        </div>

        {/* Example with explanation */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Ví dụ chi tiết (Tính giai thừa):</h3>
          <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Test 1:</strong> Input là 5, output mong đợi là 120 (5! = 120)
              </p>
              <pre className="text-xs font-mono bg-card p-2 rounded">
{`[TEST 1]
INPUT:
5
OUTPUT:
120`}
              </pre>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Test 2:</strong> Input là 0, output mong đợi là 1 (0! = 1)
              </p>
              <pre className="text-xs font-mono bg-card p-2 rounded">
{`[TEST 2]
INPUT:
0
OUTPUT:
1`}
              </pre>
            </div>
          </div>
        </div>

        {/* Alternative Format */}
        <Alert className="bg-accent/5 border-accent/20">
          <Info className="h-4 w-4 text-accent" />
          <AlertDescription className="text-sm">
            <strong>Format khác được hỗ trợ:</strong> Nếu mỗi dòng chẵn là input, dòng lẻ là output (không có header), 
            hệ thống sẽ tự động nhận diện.
            <pre className="mt-2 text-xs bg-card p-2 rounded">
{`5
120
0
1`}
            </pre>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
