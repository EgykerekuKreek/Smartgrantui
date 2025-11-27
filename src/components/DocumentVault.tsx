import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  Upload,
  Download,
  Eye,
  Trash2,
  Share2,
  Lock,
  Unlock,
  FileText,
  File,
  Image,
  Grid3x3,
  List,
  Calendar,
  Filter,
  MoreVertical,
  FolderOpen,
  Shield,
  Clock,
  User
} from 'lucide-react';

const mockDocuments = [
  {
    id: 1,
    name: "IRS_501c3_Letter.pdf",
    type: "pdf",
    size: "245 KB",
    uploadedBy: "Sarah Johnson",
    uploadedDate: "2025-11-20",
    expirationDate: "2026-11-20",
    status: "active",
    category: "Legal Documents",
    accessLevel: "Private",
    downloads: 12,
    sharedWith: 3
  },
  {
    id: 2,
    name: "Annual_Report_2024.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedBy: "Michael Chen",
    uploadedDate: "2025-11-18",
    expirationDate: "2025-12-31",
    status: "expiring-soon",
    category: "Financial Reports",
    accessLevel: "Team",
    downloads: 45,
    sharedWith: 8
  },
  {
    id: 3,
    name: "Budget_Proposal_2025.xlsx",
    type: "spreadsheet",
    size: "89 KB",
    uploadedBy: "Emma Davis",
    uploadedDate: "2025-11-15",
    expirationDate: "2026-06-30",
    status: "active",
    category: "Financial Documents",
    accessLevel: "Public",
    downloads: 23,
    sharedWith: 15
  },
  {
    id: 4,
    name: "Board_Meeting_Minutes_Nov.docx",
    type: "document",
    size: "156 KB",
    uploadedBy: "Sarah Johnson",
    uploadedDate: "2025-11-19",
    expirationDate: "2027-11-19",
    status: "active",
    category: "Governance",
    accessLevel: "Private",
    downloads: 5,
    sharedWith: 2
  },
  {
    id: 5,
    name: "Project_Timeline.png",
    type: "image",
    size: "423 KB",
    uploadedBy: "Alex Turner",
    uploadedDate: "2025-11-17",
    expirationDate: "2026-11-17",
    status: "active",
    category: "Project Documents",
    accessLevel: "Team",
    downloads: 18,
    sharedWith: 6
  },
  {
    id: 6,
    name: "Grant_Application_Draft.pdf",
    type: "pdf",
    size: "678 KB",
    uploadedBy: "Emma Davis",
    uploadedDate: "2025-11-12",
    expirationDate: "2025-11-30",
    status: "expiring-soon",
    category: "Applications",
    accessLevel: "Team",
    downloads: 31,
    sharedWith: 7
  }
];

export function DocumentVault() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'spreadsheet':
        return <File className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const getFileIconColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-600';
      case 'document':
        return 'bg-blue-100 text-blue-600';
      case 'spreadsheet':
        return 'bg-emerald-100 text-emerald-600';
      case 'image':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Active</Badge>;
      case 'expiring-soon':
        return <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Expiring Soon</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-700 border-0 text-xs">Expired</Badge>;
      default:
        return null;
    }
  };

  const getAccessIcon = (level: string) => {
    switch (level) {
      case 'Private':
        return <Lock className="w-3 h-3" />;
      case 'Team':
        return <Shield className="w-3 h-3" />;
      case 'Public':
        return <Unlock className="w-3 h-3" />;
      default:
        return <Lock className="w-3 h-3" />;
    }
  };

  const categories = ["All Documents", "Legal Documents", "Financial Reports", "Applications", "Governance", "Project Documents"];

  const stats = [
    { label: "Total Documents", value: "247", icon: FileText },
    { label: "Storage Used", value: "8.4 GB", icon: FolderOpen },
    { label: "Shared Documents", value: "89", icon: Share2 },
    { label: "Expiring Soon", value: "12", icon: Clock }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-1">Document Vault</h2>
        <p className="text-slate-600">Secure file management with expiration tracking and access controls</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <div className="text-2xl">{stat.value}</div>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Toolbar */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 border-l border-slate-200 ${viewMode === 'grid' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-1.5 text-sm whitespace-nowrap bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 first:bg-blue-50 first:text-blue-700"
            >
              {category}
            </button>
          ))}
        </div>
      </Card>

      {/* Documents List/Grid */}
      {viewMode === 'list' ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-sm">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </th>
                  <th className="text-left p-4 text-sm">Name</th>
                  <th className="text-left p-4 text-sm">Category</th>
                  <th className="text-left p-4 text-sm">Size</th>
                  <th className="text-left p-4 text-sm">Access</th>
                  <th className="text-left p-4 text-sm">Status</th>
                  <th className="text-left p-4 text-sm">Expires</th>
                  <th className="text-left p-4 text-sm">Uploaded By</th>
                  <th className="text-right p-4 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300"
                        checked={selectedDocs.includes(doc.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDocs([...selectedDocs, doc.id]);
                          } else {
                            setSelectedDocs(selectedDocs.filter(id => id !== doc.id));
                          }
                        }}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileIconColor(doc.type)}`}>
                          {getFileIcon(doc.type)}
                        </div>
                        <div>
                          <div className="text-sm">{doc.name}</div>
                          <div className="text-xs text-slate-500">
                            {doc.downloads} downloads
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600">{doc.category}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600">{doc.size}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        {getAccessIcon(doc.accessLevel)}
                        <span>{doc.accessLevel}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-600">
                        {new Date(doc.expirationDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                          <User className="w-3 h-3 text-slate-600" />
                        </div>
                        <span className="text-sm text-slate-600">{doc.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing 1-6 of 247 documents
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
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockDocuments.map((doc) => (
            <Card key={doc.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileIconColor(doc.type)}`}>
                  {getFileIcon(doc.type)}
                </div>
                <button className="p-1 hover:bg-slate-100 rounded">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <h4 className="text-sm mb-1 truncate">{doc.name}</h4>
              <p className="text-xs text-slate-500 mb-3">{doc.size} • {doc.category}</p>
              
              <div className="flex items-center justify-between mb-3">
                {getStatusBadge(doc.status)}
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  {getAccessIcon(doc.accessLevel)}
                  <span>{doc.accessLevel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <Calendar className="w-3 h-3" />
                <span>Expires {new Date(doc.expirationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>

              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Access Logs Section */}
      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm">Recent Access Activity</h3>
          <Button variant="ghost" size="sm" className="text-xs">
            View All Logs
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { user: "Sarah Johnson", action: "Downloaded", file: "IRS_501c3_Letter.pdf", time: "2 hours ago" },
            { user: "Michael Chen", action: "Shared", file: "Annual_Report_2024.pdf", time: "5 hours ago" },
            { user: "Emma Davis", action: "Uploaded", file: "Budget_Proposal_2025.xlsx", time: "1 day ago" }
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm">
                    <span>{log.user}</span>
                    <span className="text-slate-600"> {log.action.toLowerCase()} </span>
                    <span className="text-blue-600">{log.file}</span>
                  </div>
                  <div className="text-xs text-slate-500">{log.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
