import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  saveJob: () => {},
  applyToJob: () => {},
  isJobSaved: () => false,
  isJobApplied: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if a user is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function - in a real app, this would call an API
  const login = async (email, password) => {
    // In a real app, this would validate credentials on server
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user for demo
    const mockUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'jobseeker',
      savedJobs: [],
      appliedJobs: []
    };

    // Store user info in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  // Signup function
  const signup = async (name, email, password, role) => {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      savedJobs: [],
      appliedJobs: []
    };

    // Store user info
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Save job function
  const saveJob = (jobId) => {
    if (!user) return;

    const savedJobs = user.savedJobs || [];

    // If already saved, do nothing
    if (savedJobs.includes(jobId)) return;

    // Add to saved jobs
    const updatedUser = {
      ...user,
      savedJobs: [...savedJobs, jobId]
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Apply to job function
  const applyToJob = (jobId) => {
    if (!user) return;

    const appliedJobs = user.appliedJobs || [];

    // If already applied, do nothing
    if (appliedJobs.includes(jobId)) return;

    // Add to applied jobs
    const updatedUser = {
      ...user,
      appliedJobs: [...appliedJobs, jobId]
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Check if job is saved
  const isJobSaved = (jobId) => {
    if (!user || !user.savedJobs) return false;
    return user.savedJobs.includes(jobId);
  };

  // Check if job is applied
  const isJobApplied = (jobId) => {
    if (!user || !user.appliedJobs) return false;
    return user.appliedJobs.includes(jobId);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    saveJob,
    applyToJob,
    isJobSaved,
    isJobApplied
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
