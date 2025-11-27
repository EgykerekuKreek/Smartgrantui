import { Button } from './ui/button';
import { Card } from './ui/card';
import { Search, FileText, ClipboardCheck, Sparkles, TrendingUp, Clock, Shield, Zap } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: 'dashboard' | 'discovery' | 'application' | 'review' | 'vault') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI-Powered Grant Management</span>
            </div>
            <h1 className="mb-6">
              Streamline Your Grant Lifecycle with Intelligent Automation
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              From discovery to approval, our AI-powered platform matches you with the right opportunities, 
              guides your applications, and accelerates the review process.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50"
                onClick={() => onNavigate('discovery')}
              >
                <Search className="w-4 h-4 mr-2" />
                Find Grants
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => onNavigate('review')}
              >
                Post a Grant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three User Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <Card 
            className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-t-blue-600"
            onClick={() => onNavigate('discovery')}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-2">Find Grants</h3>
            <p className="text-slate-600 mb-4">
              Discover personalized grant opportunities with AI-powered matching. Get instant compatibility scores.
            </p>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
              Explore opportunities →
            </Button>
          </Card>

          <Card 
            className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-t-amber-500"
            onClick={() => onNavigate('review')}
          >
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="mb-2">Post Grant</h3>
            <p className="text-slate-600 mb-4">
              Issue grants with smart templates. Reach qualified applicants through AI-powered distribution.
            </p>
            <Button variant="ghost" className="text-amber-600 hover:text-amber-700 p-0">
              Create new grant →
            </Button>
          </Card>

          <Card 
            className="bg-white p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-t-emerald-600"
            onClick={() => onNavigate('review')}
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <ClipboardCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="mb-2">Review Applications</h3>
            <p className="text-slate-600 mb-4">
              Evaluate submissions with AI-generated insights, scores, and summaries for faster decision-making.
            </p>
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 p-0">
              Start reviewing →
            </Button>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4">Why Choose GrantFlow AI?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Built for foundations, nonprofits, and companies who want to streamline their grant processes 
            with cutting-edge AI technology.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="mb-2">AI-Powered Matching</h4>
            <p className="text-slate-600 text-sm">
              Intelligent algorithms connect the right grants with the right applicants
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="mb-2">Increase Success Rate</h4>
            <p className="text-slate-600 text-sm">
              Real-time guidance and validation improve application quality
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="mb-2">Save Time</h4>
            <p className="text-slate-600 text-sm">
              Automate repetitive tasks and accelerate the review process
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="mb-2">Secure & Compliant</h4>
            <p className="text-slate-600 text-sm">
              Enterprise-grade security with full audit trails and access controls
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-blue-600 mb-1">$2.4B+</div>
              <div className="text-slate-600 text-sm">Grants Managed</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 mb-1">15,000+</div>
              <div className="text-slate-600 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 mb-1">92%</div>
              <div className="text-slate-600 text-sm">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 mb-1">65%</div>
              <div className="text-slate-600 text-sm">Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 sm:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="mb-4">Ready to Transform Your Grant Process?</h2>
            <p className="text-blue-100 mb-8">
              Join thousands of organizations leveraging AI to find funding faster and make better decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
