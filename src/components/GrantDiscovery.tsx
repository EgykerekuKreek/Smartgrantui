import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  Search, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Building2,
  Filter,
  X,
  ChevronRight,
  Heart,
  ExternalLink
} from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface GrantDiscoveryProps {
  onNavigate: (view: 'application') => void;
}

const mockGrants = [
  {
    id: 1,
    title: "Tech Innovation Fund 2025",
    issuer: "National Science Foundation",
    deadline: "2025-12-15",
    amount: "$50,000 - $250,000",
    matchScore: 95,
    location: "United States",
    category: "Technology",
    description: "Supporting breakthrough innovations in AI, machine learning, and quantum computing.",
    tags: ["AI", "Research", "Technology"],
    applicants: 42
  },
  {
    id: 2,
    title: "Community Health Initiative",
    issuer: "Gates Foundation",
    deadline: "2025-11-30",
    amount: "$100,000 - $500,000",
    matchScore: 88,
    location: "Global",
    category: "Healthcare",
    description: "Funding healthcare programs that improve access to medical services in underserved communities.",
    tags: ["Healthcare", "Community", "Global"],
    applicants: 127
  },
  {
    id: 3,
    title: "Green Energy Transition Grant",
    issuer: "Department of Energy",
    deadline: "2026-01-20",
    amount: "$75,000 - $300,000",
    matchScore: 82,
    location: "United States",
    category: "Environment",
    description: "Accelerating the adoption of renewable energy solutions in urban and rural areas.",
    tags: ["Environment", "Energy", "Sustainability"],
    applicants: 68
  },
  {
    id: 4,
    title: "Arts & Culture Preservation",
    issuer: "National Endowment for the Arts",
    deadline: "2025-12-01",
    amount: "$25,000 - $100,000",
    matchScore: 79,
    location: "United States",
    category: "Arts",
    description: "Preserving cultural heritage and supporting artistic expression in local communities.",
    tags: ["Arts", "Culture", "Community"],
    applicants: 91
  },
  {
    id: 5,
    title: "Education Technology Program",
    issuer: "Chan Zuckerberg Initiative",
    deadline: "2025-12-10",
    amount: "$150,000 - $750,000",
    matchScore: 91,
    location: "North America",
    category: "Education",
    description: "Transforming education through personalized learning technology and innovative teaching methods.",
    tags: ["Education", "Technology", "Youth"],
    applicants: 156
  },
  {
    id: 6,
    title: "Small Business Recovery Fund",
    issuer: "Economic Development Administration",
    deadline: "2025-11-25",
    amount: "$10,000 - $50,000",
    matchScore: 73,
    location: "United States",
    category: "Business",
    description: "Supporting small businesses impacted by economic challenges with recovery capital.",
    tags: ["Business", "Economy", "SMB"],
    applicants: 203
  }
];

export function GrantDiscovery({ onNavigate }: GrantDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [amountRange, setAmountRange] = useState([0, 1000000]);
  const [savedGrants, setSavedGrants] = useState<number[]>([]);

  const categories = ["Technology", "Healthcare", "Environment", "Arts", "Education", "Business"];
  const locations = ["United States", "Global", "North America", "Europe"];

  const toggleSaveGrant = (grantId: number) => {
    setSavedGrants(prev => 
      prev.includes(grantId) 
        ? prev.filter(id => id !== grantId)
        : [...prev, grantId]
    );
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 bg-emerald-50";
    if (score >= 80) return "text-blue-600 bg-blue-50";
    if (score >= 70) return "text-amber-600 bg-amber-50";
    return "text-slate-600 bg-slate-50";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2>Discover Grants</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by keywords, organization, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            className="sm:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </div>

        {/* AI Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-slate-600">Suggested:</span>
          {["Climate Innovation", "Youth Programs", "AI Research"].map((suggestion) => (
            <button
              key={suggestion}
              className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <aside className="lg:w-72 shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm">Filters</h3>
                <Button variant="ghost" size="sm" className="text-xs">
                  Clear all
                </Button>
              </div>

              {/* Match Score Filter */}
              <div className="mb-6">
                <Label className="mb-3 block text-sm">Minimum Match Score</Label>
                <Slider
                  defaultValue={[70]}
                  max={100}
                  step={5}
                  className="mb-2"
                />
                <div className="text-xs text-slate-600">70% or higher</div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <Label className="mb-3 block text-sm">Category</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories(prev => 
                            checked 
                              ? [...prev, category]
                              : prev.filter(c => c !== category)
                          );
                        }}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm text-slate-700 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Funding Amount */}
              <div className="mb-6">
                <Label className="mb-3 block text-sm">Funding Amount</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="under50k" />
                    <label htmlFor="under50k" className="text-sm text-slate-700 cursor-pointer">
                      Under $50K
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="50k-250k" />
                    <label htmlFor="50k-250k" className="text-sm text-slate-700 cursor-pointer">
                      $50K - $250K
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="250k-1m" />
                    <label htmlFor="250k-1m" className="text-sm text-slate-700 cursor-pointer">
                      $250K - $1M
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="over1m" />
                    <label htmlFor="over1m" className="text-sm text-slate-700 cursor-pointer">
                      Over $1M
                    </label>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <Label className="mb-3 block text-sm">Location</Label>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox id={location} />
                      <label htmlFor={location} className="text-sm text-slate-700 cursor-pointer">
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <Label className="mb-3 block text-sm">Deadline</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="next30" />
                    <label htmlFor="next30" className="text-sm text-slate-700 cursor-pointer">
                      Next 30 days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="next90" />
                    <label htmlFor="next90" className="text-sm text-slate-700 cursor-pointer">
                      Next 90 days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="next6m" />
                    <label htmlFor="next6m" className="text-sm text-slate-700 cursor-pointer">
                      Next 6 months
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        )}

        {/* Grants Feed */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-600">
              Showing <span className="text-slate-900">{mockGrants.length}</span> personalized opportunities
            </div>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white">
              <option>Best Match</option>
              <option>Highest Amount</option>
              <option>Deadline (Soonest)</option>
              <option>Recently Posted</option>
            </select>
          </div>

          <div className="space-y-4">
            {mockGrants.map((grant) => (
              <Card key={grant.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`px-3 py-1 rounded-full text-sm ${getMatchColor(grant.matchScore)}`}>
                        {grant.matchScore}% Match
                      </div>
                      <h3 className="flex-1">{grant.title}</h3>
                      <button
                        onClick={() => toggleSaveGrant(grant.id)}
                        className="shrink-0"
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            savedGrants.includes(grant.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-slate-400 hover:text-red-500'
                          } transition-colors`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {grant.issuer}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {grant.location}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{grant.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {grant.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-slate-600">
                      <DollarSign className="w-4 h-4" />
                      {grant.amount}
                    </div>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      Due {new Date(grant.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="text-slate-500">
                      {grant.applicants} applicants
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => onNavigate('application')}
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline">
              Load More Opportunities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
