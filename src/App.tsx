import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { GrantDiscovery } from './components/GrantDiscovery';
import { ApplicationBuilder } from './components/ApplicationBuilder';
import { ReviewDashboard } from './components/ReviewDashboard';
import { DocumentVault } from './components/DocumentVault';
import { AIAssistant } from './components/AIAssistant';
import { Button } from './components/ui/button';
import { Menu, X } from 'lucide-react';

type ViewType = 'dashboard' | 'discovery' | 'application' | 'review' | 'vault';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [showAssistant, setShowAssistant] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'discovery':
        return <GrantDiscovery onNavigate={setCurrentView} />;
      case 'application':
        return <ApplicationBuilder />;
      case 'review':
        return <ReviewDashboard />;
      case 'vault':
        return <DocumentVault />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white">G</span>
                </div>
                <span className="text-slate-900">GrantFlow AI</span>
              </button>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setCurrentView('discovery')}
                  className={`text-sm transition-colors ${
                    currentView === 'discovery' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Find Grants
                </button>
                <button
                  onClick={() => setCurrentView('application')}
                  className={`text-sm transition-colors ${
                    currentView === 'application' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  My Applications
                </button>
                <button
                  onClick={() => setCurrentView('review')}
                  className={`text-sm transition-colors ${
                    currentView === 'review' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Review
                </button>
                <button
                  onClick={() => setCurrentView('vault')}
                  className={`text-sm transition-colors ${
                    currentView === 'vault' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Documents
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Sign In
              </Button>
              <Button size="sm" className="hidden md:flex bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setCurrentView('discovery');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded"
                >
                  Find Grants
                </button>
                <button
                  onClick={() => {
                    setCurrentView('application');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded"
                >
                  My Applications
                </button>
                <button
                  onClick={() => {
                    setCurrentView('review');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded"
                >
                  Review
                </button>
                <button
                  onClick={() => {
                    setCurrentView('vault');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded"
                >
                  Documents
                </button>
                <div className="flex gap-2 px-4 py-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Sign In
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderView()}
      </main>

      {/* Floating AI Assistant Button */}
      <AIAssistant 
        isOpen={showAssistant} 
        onToggle={() => setShowAssistant(!showAssistant)} 
      />
    </div>
  );
}
