import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { 
  CheckCircle2, 
  Circle, 
  Upload, 
  FileText, 
  AlertCircle,
  Save,
  Send,
  Eye,
  X
} from 'lucide-react';
import { Badge } from './ui/badge';

const requirementSections = [
  {
    id: 'basic',
    title: 'Basic Information',
    completed: true,
    items: [
      { id: 'org-name', label: 'Organization Name', completed: true },
      { id: 'contact', label: 'Primary Contact', completed: true },
      { id: 'ein', label: 'EIN/Tax ID', completed: true }
    ]
  },
  {
    id: 'project',
    title: 'Project Details',
    completed: false,
    items: [
      { id: 'title', label: 'Project Title', completed: true },
      { id: 'summary', label: 'Executive Summary', completed: true },
      { id: 'objectives', label: 'Objectives & Goals', completed: false },
      { id: 'methodology', label: 'Methodology', completed: false }
    ]
  },
  {
    id: 'budget',
    title: 'Budget & Financials',
    completed: false,
    items: [
      { id: 'amount', label: 'Requested Amount', completed: true },
      { id: 'breakdown', label: 'Budget Breakdown', completed: false },
      { id: 'financials', label: 'Financial Statements', completed: false }
    ]
  },
  {
    id: 'documents',
    title: 'Supporting Documents',
    completed: false,
    items: [
      { id: 'irs-letter', label: '501(c)(3) Letter', completed: true },
      { id: 'board-list', label: 'Board of Directors List', completed: false },
      { id: 'references', label: 'References', completed: false }
    ]
  }
];

const uploadedDocuments = [
  { id: 1, name: 'IRS_501c3_Letter.pdf', size: '245 KB', uploaded: '2025-11-20' },
  { id: 2, name: 'Annual_Report_2024.pdf', size: '1.2 MB', uploaded: '2025-11-20' },
  { id: 3, name: 'Budget_Proposal.xlsx', size: '89 KB', uploaded: '2025-11-21' }
];

export function ApplicationBuilder() {
  const [activeSection, setActiveSection] = useState('project');
  const [dragActive, setDragActive] = useState(false);

  const completedItems = requirementSections.flatMap(s => s.items).filter(i => i.completed).length;
  const totalItems = requirementSections.flatMap(s => s.items).length;
  const completionPercentage = (completedItems / totalItems) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="mb-1">Tech Innovation Fund 2025</h2>
            <p className="text-slate-600">National Science Foundation</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Application Progress</span>
            <span className="text-sm text-slate-600">{completedItems} of {totalItems} completed</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="mt-2 text-xs text-slate-600">
            {completionPercentage < 100 ? 'Complete all required sections to submit' : 'Ready to submit!'}
          </div>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Requirements Checklist */}
        <aside className="lg:w-80 shrink-0">
          <Card className="p-4">
            <h3 className="text-sm mb-4">Requirements Checklist</h3>
            <div className="space-y-4">
              {requirementSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {section.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="text-sm">{section.title}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {section.items.filter(i => i.completed).length}/{section.items.length}
                    </Badge>
                  </button>
                  
                  {activeSection === section.id && (
                    <div className="ml-7 mt-2 space-y-2">
                      {section.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center gap-2 text-sm py-1"
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                          )}
                          <span className={item.completed ? 'text-slate-600' : 'text-slate-900'}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-xs text-blue-900">
                  <div className="mb-1">Deadline: Dec 15, 2025</div>
                  <div className="text-blue-700">22 days remaining</div>
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main Editor Area */}
        <div className="flex-1 space-y-6">
          {/* Form Section */}
          <Card className="p-6">
            <h3 className="mb-4">Project Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="Enter a clear, descriptive title for your project"
                  defaultValue="AI-Powered Climate Modeling Platform"
                  className="border-emerald-200 focus:border-emerald-500"
                />
                <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Looks good!
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Executive Summary <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  placeholder="Provide a concise overview of your project (250-500 words)"
                  rows={6}
                  defaultValue="Our project aims to develop an AI-powered climate modeling platform that leverages machine learning to predict environmental changes with unprecedented accuracy. This innovative solution will help policymakers and researchers make data-driven decisions to combat climate change."
                  className="border-emerald-200 focus:border-emerald-500"
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" />
                    Well written!
                  </div>
                  <span className="text-slate-500">287 / 500 words</span>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Objectives & Goals <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  placeholder="List your project's key objectives and measurable goals"
                  rows={8}
                  className="border-amber-200"
                />
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                  <AlertCircle className="w-3 h-3" />
                  This field is required. AI suggests: Include 3-5 specific, measurable objectives.
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Methodology <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  placeholder="Describe your approach, methods, and implementation plan"
                  rows={8}
                  className="border-slate-200"
                />
                <div className="mt-1 text-xs text-slate-500">
                  Describe the steps you'll take to achieve your objectives
                </div>
              </div>
            </div>
          </Card>

          {/* Document Upload Zone */}
          <Card className="p-6">
            <h3 className="mb-4">Supporting Documents</h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-slate-600" />
              </div>
              <div className="mb-2">
                <span className="text-blue-600">Click to upload</span> or drag and drop
              </div>
              <div className="text-sm text-slate-500">
                PDF, DOC, DOCX, XLS, XLSX (max 10MB)
              </div>
              <Button className="mt-4" variant="outline" size="sm">
                Browse Files
              </Button>
            </div>

            {/* Uploaded Documents List */}
            {uploadedDocuments.length > 0 && (
              <div className="mt-6">
                <div className="text-sm mb-3">Uploaded Documents ({uploadedDocuments.length})</div>
                <div className="space-y-2">
                  {uploadedDocuments.map((doc) => (
                    <div 
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm">{doc.name}</div>
                          <div className="text-xs text-slate-500">
                            {doc.size} • Uploaded {new Date(doc.uploaded).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* AI Suggestions Card */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white text-sm">AI</span>
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">AI Suggestion</div>
                <p className="text-sm text-slate-600 mb-3">
                  Your methodology section could be strengthened by adding specific timelines and milestones. 
                  Would you like me to suggest a project timeline template?
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Show Template
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
