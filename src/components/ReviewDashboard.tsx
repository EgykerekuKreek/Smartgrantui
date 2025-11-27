import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronDown,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  FileText,
  Building2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

const mockApplications = [
  {
    id: 1,
    applicant: "Green Future Initiative",
    projectTitle: "Solar Energy for Rural Communities",
    submittedDate: "2025-11-18",
    requestedAmount: "$125,000",
    aiScore: 92,
    status: "under-review",
    category: "Environment",
    reviewer: "Unassigned",
    completeness: 100
  },
  {
    id: 2,
    applicant: "TechBridge Foundation",
    projectTitle: "AI-Powered Climate Modeling Platform",
    submittedDate: "2025-11-20",
    requestedAmount: "$250,000",
    aiScore: 95,
    status: "under-review",
    category: "Technology",
    reviewer: "Sarah Johnson",
    completeness: 100
  },
  {
    id: 3,
    applicant: "Community Health Network",
    projectTitle: "Mobile Health Clinics for Underserved Areas",
    submittedDate: "2025-11-15",
    requestedAmount: "$180,000",
    aiScore: 88,
    status: "approved",
    category: "Healthcare",
    reviewer: "Michael Chen",
    completeness: 100
  },
  {
    id: 4,
    applicant: "Youth Education Alliance",
    projectTitle: "STEM Learning Centers in Low-Income Schools",
    submittedDate: "2025-11-17",
    requestedAmount: "$95,000",
    aiScore: 85,
    status: "under-review",
    category: "Education",
    reviewer: "Unassigned",
    completeness: 100
  },
  {
    id: 5,
    applicant: "Urban Arts Collective",
    projectTitle: "Public Art Program for City Revitalization",
    submittedDate: "2025-11-14",
    requestedAmount: "$65,000",
    aiScore: 73,
    status: "rejected",
    category: "Arts",
    reviewer: "Emma Davis",
    completeness: 95
  },
  {
    id: 6,
    applicant: "Clean Water Project",
    projectTitle: "Water Filtration Systems for Developing Regions",
    submittedDate: "2025-11-19",
    requestedAmount: "$200,000",
    aiScore: 90,
    status: "under-review",
    category: "Environment",
    reviewer: "Unassigned",
    completeness: 100
  }
];

export function ReviewDashboard() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-100 text-emerald-700 border-0">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-0">Rejected</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-100 text-blue-700 border-0">Under Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  const stats = [
    { label: "Total Applications", value: "156", change: "+12%", icon: FileText, color: "blue" },
    { label: "Under Review", value: "42", change: "+8%", icon: Clock, color: "amber" },
    { label: "Approved", value: "89", change: "+15%", icon: CheckCircle, color: "emerald" },
    { label: "Avg AI Score", value: "87", change: "+3%", icon: TrendingUp, color: "purple" }
  ];

  const getStatColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'amber': return 'bg-amber-100 text-amber-600';
      case 'emerald': return 'bg-emerald-100 text-emerald-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-1">Review Dashboard</h2>
        <p className="text-slate-600">Evaluate and manage grant applications with AI-powered insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <div className="text-2xl mb-1">{stat.value}</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change} from last month
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatColor(stat.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by applicant, project, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 mt-4">
          <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full">
            All Applications
          </button>
          <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200">
            High Priority
          </button>
          <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200">
            Unassigned
          </button>
          <button className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200">
            My Reviews
          </button>
        </div>
      </Card>

      {/* Applications Table */}
      <Card>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm">Applications</h3>
            <Badge variant="secondary">{mockApplications.length}</Badge>
          </div>
          {selectedApplications.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                {selectedApplications.length} selected
              </span>
              <Button size="sm" variant="outline">
                Assign Reviewer
              </Button>
              <Button size="sm" variant="outline">
                Bulk Action
              </Button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded border-slate-300" />
                </TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Project Title</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    AI Score
                    <Sparkles className="w-3 h-3 text-purple-600" />
                  </div>
                </TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-slate-50">
                  <TableCell>
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300"
                      checked={selectedApplications.includes(app.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedApplications([...selectedApplications, app.id]);
                        } else {
                          setSelectedApplications(selectedApplications.filter(id => id !== app.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <div className="text-sm">{app.applicant}</div>
                        <div className="text-xs text-slate-500">{app.category}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="text-sm truncate">{app.projectTitle}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getScoreBadge(app.aiScore)}`}>
                      <Star className="w-3 h-3 fill-current" />
                      {app.aiScore}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{app.requestedAmount}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(app.status)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">
                      {new Date(app.submittedDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm ${app.reviewer === 'Unassigned' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {app.reviewer}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing 1-6 of 156 applications
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Insights Panel */}
      <Card className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="mb-2">AI Review Insights</h3>
            <p className="text-slate-600 mb-4">
              Based on analysis of 156 applications, here are key insights to help prioritize your reviews:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl text-purple-600 mb-1">12</div>
                <div className="text-sm text-slate-600">High-scoring unassigned</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl text-blue-600 mb-1">8</div>
                <div className="text-sm text-slate-600">Approaching deadline</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl text-emerald-600 mb-1">3</div>
                <div className="text-sm text-slate-600">Ready for decision</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
