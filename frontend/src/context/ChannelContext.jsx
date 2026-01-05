import React, { createContext, useEffect, useState, useCallback } from "react";

export const ChannelContext = createContext();

const GUEST_CHANNEL = {
  name: "Guest User",
  handle: "@guest",
  description: "Welcome guest!",
  email: "",
  phone: "",
  dp: "",
  banner: "",
  watermark: "",
  links: [],
  socialLinks: [],
};

const ADMIN_CHANNEL = {
  name: "Brooke Cooper",
  handle: "@brooke-cooper",
  description: "Web Developer & Content Creator",
  email: "brooke@example.com",
  phone: "123-456-7890",
  dp: "https://i.pravatar.cc/150?img=3",
  banner: "https://source.unsplash.com/1200x300/?technology",
  watermark: "https://via.placeholder.com/80x80?text=WM",
  links: [],
  socialLinks: [],
};

const LS_USERS_KEY = "users";
const LS_LOGGED_IN_KEY = "isLoggedIn";
const LS_CHANNEL_KEY = "channel";

// Hash password using SHA-256 (returns hex string)
async function hashPassword(password) {
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return `plain:${password}`;
}

export const ChannelProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_USERS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to read users from localStorage", err);
    }

    // default admin user (passwordHash placeholder will be hashed on mount)
    return [
      {
        ...ADMIN_CHANNEL,
        passwordHash: "admin", // placeholder -> will be hashed by effect
      },
    ];
  });

  const [channel, setChannel] = useState(() => {
    try {
      const storedLoggedIn = localStorage.getItem(LS_LOGGED_IN_KEY);
      const storedChannel = localStorage.getItem(LS_CHANNEL_KEY);
      if (storedLoggedIn === "true" && storedChannel) {
        return JSON.parse(storedChannel);
      }
    } catch (err) {
      console.error("Failed to read channel from localStorage", err);
    }
    return GUEST_CHANNEL;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(LS_LOGGED_IN_KEY) === "true";
    } catch (err) {
      return false;
    }
  });

  const [signupDraft, setSignupDraft] = useState(null);

  // Persist users to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
    } catch (err) {
      console.error("Failed to save users", err);
    }
  }, [users]);

  // Ensure admin placeholder password is hashed on mount
  useEffect(() => {
    (async () => {
      if (!users || users.length === 0) return;
      let changed = false;
      const newUsers = await Promise.all(
        users.map(async (u) => {
          if (u.passwordHash === "admin") {
            const ph = await hashPassword("admin");
            changed = true;
            return { ...u, passwordHash: ph };
          }
          return u;
        })
      );
      if (changed) {
        setUsers(newUsers);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync channel + login to localStorage
  useEffect(() => {
    try {
      if (isLoggedIn) {
        localStorage.setItem(LS_LOGGED_IN_KEY, "true");
        localStorage.setItem(LS_CHANNEL_KEY, JSON.stringify(channel));
      } else {
        localStorage.removeItem(LS_LOGGED_IN_KEY);
        localStorage.removeItem(LS_CHANNEL_KEY);
      }
    } catch (err) {
      // ignore
    }
  }, [isLoggedIn, channel]);

  // ========== SIGNUP ==========
  const signup = useCallback(
    async (signupData) => {
      try {
        const email = (signupData.email || "").trim().toLowerCase();
        const password = signupData.password || "";

        if (!email || !password) {
          return { success: false, message: "Email and password required." };
        }

        const existing = users.find((u) => (u.email || "").toLowerCase() === email);
        if (existing) {
          return { success: false, message: "User with this email already exists." };
        }

        const passwordHash = await hashPassword(password);

        const newUser = {
          ...signupData,
          email,
          passwordHash,
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setChannel(newUser);
        setIsLoggedIn(true);
        return { success: true, message: "Signup successful" };
      } catch (err) {
        console.error("Signup failed", err);
        return { success: false, message: "Signup error occurred" };
      }
    },
    [users]
  );

  // ========== LOGIN ==========
  // identifier: email or handle or 'admin'
  // password: plain text password
  const login = useCallback(
    async (identifier, password) => {
      try {
        const idRaw = (identifier || "").toString().trim();
        const pwRaw = (password || "").toString();

        // If caller didn't provide identifier/password, return helpful failure
        if (!idRaw || !pwRaw) {
          return { success: false, message: "Please provide email/handle and password." };
        }

        // Shortcut: admin login using identifier 'admin' and password 'admin'
        if (idRaw === "admin" && pwRaw === "admin") {
          // find admin in users by email
          let adminUser = users.find((u) => (u.email || "").toLowerCase() === ADMIN_CHANNEL.email.toLowerCase());
          if (!adminUser) {
            // create admin user with hashed password
            const passwordHash = await hashPassword("admin");
            adminUser = { ...ADMIN_CHANNEL, passwordHash };
            setUsers((prev) => [...prev, adminUser]);
          }
          setChannel(adminUser);
          setIsLoggedIn(true);
          return { success: true, message: "Login successful (admin)." };
        }

        // Determine if identifier is an email (contains @) or a handle
        let user;
        if (idRaw.includes("@")) {
          const email = idRaw.toLowerCase();
          user = users.find((u) => (u.email || "").toLowerCase() === email);
        } else {
          // allow passing handle with or without leading '@'
          const handle = idRaw.startsWith("@") ? idRaw.toLowerCase() : `@${idRaw.toLowerCase()}`;
          user = users.find((u) => (u.handle || "").toLowerCase() === handle || (u.handle || "").toLowerCase() === idRaw.toLowerCase());
        }

        if (!user) {
          return { success: false, message: "No user found with these credentials." };
        }

        const passwordHash = await hashPassword(pwRaw);
        if (user.passwordHash !== passwordHash) {
          return { success: false, message: "Incorrect password." };
        }

        // success: set channel to the exact user object stored (so dp, banner etc. match)
        setChannel(user);
        setIsLoggedIn(true);
        return { success: true, message: "Login successful." };
      } catch (err) {
        console.error("Login error", err);
        return { success: false, message: "Login error occurred" };
      }
    },
    [users]
  );

  // ========== LOGOUT ==========
  const logout = useCallback(() => {
    setChannel(GUEST_CHANNEL);
    setIsLoggedIn(false);
    try {
      localStorage.removeItem(LS_LOGGED_IN_KEY);
      localStorage.removeItem(LS_CHANNEL_KEY);
    } catch (err) {
      console.error("Logout error", err);
    }
  }, []);

  // ========== UPDATE CHANNEL ==========
  const updateChannel = useCallback(
    (updatedData) => {
      setChannel((prev) => {
        const updated = { ...prev, ...updatedData };

        if (isLoggedIn && updated.email) {
          setUsers((prevUsers) => {
            const idx = prevUsers.findIndex(
              (u) => (u.email || "").toLowerCase() === (updated.email || "").toLowerCase()
            );
            if (idx === -1) return prevUsers;
            const updatedUser = {
              ...prevUsers[idx],
              ...updated,
              passwordHash: prevUsers[idx].passwordHash,
            };
            const newUsers = [...prevUsers];
            newUsers[idx] = updatedUser;
            try {
              localStorage.setItem(LS_USERS_KEY, JSON.stringify(newUsers));
            } catch (err) {
              console.error("Failed to persist updated users", err);
            }
            return newUsers;
          });
        }

        try {
          localStorage.setItem(LS_CHANNEL_KEY, JSON.stringify(updated));
        } catch (err) {
          console.error("Failed to persist channel", err);
        }
        return updated;
      });
    },
    [isLoggedIn]
  );

  // ========== LIST USERS (safe) ==========
  const listUsers = useCallback(() => {
    return users.map(({ passwordHash, ...rest }) => rest);
  }, [users]);

  return (
    <ChannelContext.Provider
      value={{
        channel,
        setChannel, // exposing setter so components can set channel directly when needed
        isLoggedIn,
        login,
        logout,
        signup,
        updateChannel,
        signupDraft,
        setSignupDraft,
        listUsers,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

