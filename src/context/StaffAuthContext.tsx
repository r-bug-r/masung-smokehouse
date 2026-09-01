import React, { createContext, useContext, useState } from 'react';

interface StaffUser {
  id: string;
  name: string;
  role: 'cashier' | 'pitmaster' | 'manager' | 'kitchen';
}

interface StaffAuthContextType {
  isStaffAuthenticated: boolean;
  staffUser: StaffUser | null;
  loginStaff: (staffId: string, pin: string) => { success: boolean; error?: string };
  logoutStaff: () => void;
}

const StaffAuthContext = createContext<StaffAuthContextType | undefined>(undefined);

const STAFF_ACCOUNTS: Record<string, { pin: string; user: StaffUser }> = {
  'SUPERADMIN': {
    pin: 'masung2026',
    user: { id: 'SUPERADMIN', name: 'Executive Superadmin & Pitmaster', role: 'manager' }
  },
  'ADMIN': {
    pin: 'masung2026',
    user: { id: 'ADMIN', name: 'General Administrator', role: 'manager' }
  },
  'MANAGER': {
    pin: '8888',
    user: { id: 'MANAGER', name: 'General Manager', role: 'manager' }
  },
  'STAFF-01': {
    pin: '1925',
    user: { id: 'STAFF-01', name: 'Pitmaster Dave', role: 'pitmaster' }
  },
  'CASHIER-01': {
    pin: '1234',
    user: { id: 'CASHIER-01', name: 'Front Counter Cashier', role: 'cashier' }
  }
};

const STORAGE_KEY = 'masung_staff_session';

export const StaffAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [staffUser, setStaffUser] = useState<StaffUser | null>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const isStaffAuthenticated = !!staffUser;

  const loginStaff = (staffId: string, pin: string): { success: boolean; error?: string } => {
    const cleanId = staffId.trim().toUpperCase();
    const cleanPin = pin.trim();

    // Check exact or case-insensitive match across all accounts
    const matchedKey = Object.keys(STAFF_ACCOUNTS).find(
      key => key.toUpperCase() === cleanId
    );
    const account = matchedKey ? STAFF_ACCOUNTS[matchedKey] : undefined;

    if (!account) {
      return { success: false, error: 'Staff ID not recognized. Contact management.' };
    }

    if (account.pin !== cleanPin) {
      return { success: false, error: 'Incorrect Staff PIN or Security Code.' };
    }

    setStaffUser(account.user);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(account.user));
    return { success: true };
  };

  const logoutStaff = () => {
    setStaffUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StaffAuthContext.Provider value={{ isStaffAuthenticated, staffUser, loginStaff, logoutStaff }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

export const useStaffAuth = (): StaffAuthContextType => {
  const context = useContext(StaffAuthContext);
  if (!context) {
    throw new Error('useStaffAuth must be used within a StaffAuthProvider');
  }
  return context;
};
