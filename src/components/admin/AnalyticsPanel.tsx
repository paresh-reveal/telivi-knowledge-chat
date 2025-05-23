
import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// Mock data for analytics
const usageData = [
  { date: '2023-05-01', tokens: 2500, queries: 120 },
  { date: '2023-05-02', tokens: 3200, queries: 145 },
  { date: '2023-05-03', tokens: 2800, queries: 130 },
  { date: '2023-05-04', tokens: 3600, queries: 160 },
  { date: '2023-05-05', tokens: 4100, queries: 180 },
  { date: '2023-05-06', tokens: 3800, queries: 170 },
  { date: '2023-05-07', tokens: 2900, queries: 135 },
  { date: '2023-05-08', tokens: 3500, queries: 155 },
  { date: '2023-05-09', tokens: 4300, queries: 190 },
  { date: '2023-05-10', tokens: 4000, queries: 175 },
  { date: '2023-05-11', tokens: 3700, queries: 165 },
  { date: '2023-05-12', tokens: 4200, queries: 185 },
  { date: '2023-05-13', tokens: 3900, queries: 172 },
  { date: '2023-05-14', tokens: 3100, queries: 140 },
];

const userUsageData = [
  { name: 'John Doe', tokens: 12500, queries: 520 },
  { name: 'Jane Smith', tokens: 9800, queries: 410 },
  { name: 'Michael Brown', tokens: 15300, queries: 620 },
  { name: 'Sarah Johnson', tokens: 7200, queries: 310 },
  { name: 'Mark Wilson', tokens: 5400, queries: 240 },
];

const knowledgeSourceData = [
  { name: 'Confluence', value: 45 },
  { name: 'Jira', value: 25 },
  { name: 'SharePoint', value: 20 },
  { name: 'GitHub', value: 10 },
];

const queryTypeData = [
  { name: 'Technical Documentation', value: 35 },
  { name: 'Project Management', value: 25 },
  { name: 'HR Policies', value: 15 },
  { name: 'Sales Materials', value: 15 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsPanel = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState('week');

  // Filter data based on selected time range
  const filteredData = usageData.slice(-getTimeRangeDays(timeRange));

  function getTimeRangeDays(range: string) {
    switch (range) {
      case 'day': return 1;
      case 'week': return 7;
      case 'month': return 30;
      case 'year': return 365;
      default: return 7;
    }
  }

  // Get total usage stats
  const totalTokens = filteredData.reduce((sum, day) => sum + day.tokens, 0);
  const totalQueries = filteredData.reduce((sum, day) => sum + day.queries, 0);
  const avgTokensPerQuery = totalQueries > 0 ? Math.round(totalTokens / totalQueries) : 0;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Analytics</h2>
        
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-44 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tokens Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTokens.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQueries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +8% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Tokens per Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTokensPerQuery.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +3% from previous {timeRange}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="usage">
        <TabsList className="mb-6">
          <TabsTrigger value="usage">Usage Trends</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="sources">Knowledge Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>
                Token usage and query volume over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00C49F" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return format(date, 'MMM dd');
                      }}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="tokens" 
                      stroke="#0088FE" 
                      fillOpacity={1} 
                      fill="url(#colorTokens)" 
                      yAxisId="left"
                      name="Tokens"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="queries" 
                      stroke="#00C49F" 
                      fillOpacity={1} 
                      fill="url(#colorQueries)" 
                      yAxisId="right"
                      name="Queries"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>
                Token usage and queries by user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="tokens" 
                      fill="#0088FE" 
                      yAxisId="left"
                      name="Tokens"
                    />
                    <Bar 
                      dataKey="queries" 
                      fill="#00C49F" 
                      yAxisId="right"
                      name="Queries"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Source Distribution</CardTitle>
                <CardDescription>
                  Percentage of queries by knowledge source
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={knowledgeSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {knowledgeSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Query Type Distribution</CardTitle>
                <CardDescription>
                  Percentage of queries by content type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={queryTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {queryTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPanel;
