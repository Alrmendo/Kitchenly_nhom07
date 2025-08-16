import { useState, useEffect, createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem('user-authenticated') === 'true';
    const onboardingCompleted = localStorage.getItem('onboarding-completed') === 'true';
    
    setIsAuthenticated(authenticated);
    setIsOnboardingCompleted(onboardingCompleted);
  }, []);

  const login = (email: string, name?: string) => {
    localStorage.setItem('user-authenticated', 'true');
    localStorage.setItem('user-email', email);
    if (name) {
      localStorage.setItem('user-name', name);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user-authenticated');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-name');
    localStorage.removeItem('onboarding-completed');
    localStorage.removeItem('user-preferences');
    setIsAuthenticated(false);
    setIsOnboardingCompleted(false);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setIsOnboardingCompleted(true);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isOnboardingCompleted,
      login,
      logout,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
