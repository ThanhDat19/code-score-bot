import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from "lucide-react";
import type { TestResult } from "@/pages/Index";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ResultsTableProps {
  results: TestResult[];
}

export const ResultsTable = ({ results }: ResultsTableProps) => {
  const [openRows, setOpenRows] = useState<string[]>([]);

  const toggleRow = (filename: string) => {
    setOpenRows(prev => 
      prev.includes(filename) 
        ? prev.filter(f => f !== filename)
        : [...prev, filename]
    );
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "partial":
        return <AlertCircle className="w-5 h-5 text-warning" />;
    }
  };

  const getStatusBadge = (status: TestResult["status"]) => {
    const variants = {
      pass: "bg-success/10 text-success border-success/20",
      fail: "bg-destructive/10 text-destructive border-destructive/20",
      partial: "bg-warning/10 text-warning border-warning/20",
    };

    const labels = {
      pass: "Đạt",
      fail: "Không đạt",
      partial: "Một phần",
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const avgScore = results.length > 0 
    ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(1)
    : 0;

  return (
    <Card className="border-2 shadow-elevated animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="w-6 h-6 text-accent" />
              Kết quả chấm điểm
            </CardTitle>
            <CardDescription>
              Tổng {results.length} file đã chấm
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{avgScore}</div>
            <div className="text-sm text-muted-foreground">Điểm TB</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12"></TableHead>
                <TableHead className="font-semibold">Tên file</TableHead>
                <TableHead className="font-semibold text-center">Điểm</TableHead>
                <TableHead className="font-semibold text-center">Test đạt</TableHead>
                <TableHead className="font-semibold text-center">Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <Collapsible key={result.filename} open={openRows.includes(result.filename)}>
                  <TableRow className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <CollapsibleTrigger 
                        onClick={() => toggleRow(result.filename)}
                        className="hover:bg-muted rounded p-1"
                      >
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            openRows.includes(result.filename) ? "rotate-180" : ""
                          }`} 
                        />
                      </CollapsibleTrigger>
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      <span className="font-mono">{result.filename}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-xl font-bold text-primary">
                        {result.score}/{result.totalTests}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-muted-foreground">
                        {result.passedTests}/{result.totalTests}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(result.status)}
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <TableRow>
                      <TableCell colSpan={5} className="bg-muted/20 p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm mb-3">Chi tiết từng test case:</h4>
                          <div className="space-y-1 font-mono text-sm">
                            {result.details.map((detail, idx) => (
                              <div 
                                key={idx}
                                className={`p-2 rounded ${
                                  detail.includes("Passed") 
                                    ? "bg-success/10 text-success" 
                                    : "bg-destructive/10 text-destructive"
                                }`}
                              >
                                {detail}
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
