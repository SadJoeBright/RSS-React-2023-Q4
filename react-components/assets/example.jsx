import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from "react";

// Theme context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Fake API
const fakeDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initialProjects = [
  {
    id: "p1",
    name: "React Dashboard",
    description: "Admin dashboard with charts, tables and filters.",
    tags: ["react", "charts", "admin"],
    status: "In Progress",
  },
  {
    id: "p2",
    name: "Design System",
    description: "Component library with reusable UI primitives.",
    tags: ["design-system", "ui", "storybook"],
    status: "Completed",
  },
  {
    id: "p3",
    name: "API Gateway",
    description: "Backend-for-frontend with caching and rate limiting.",
    tags: ["node", "api", "bff"],
    status: "Planning",
  },
];

async function fetchProjects(query) {
  await fakeDelay(300);
  if (!query) {
    return initialProjects;
  }
  const q = query.toLowerCase();
  return initialProjects.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}

// Utility hooks
function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function useAsync(asyncFn, deps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    asyncFn()
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { loading, error, data };
}

// Presentational components
const Badge = ({ children }) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.15rem 0.5rem",
        borderRadius: "999px",
        fontSize: "0.7rem",
        fontWeight: 600,
        backgroundColor: "rgba(110, 118, 129, 0.1)",
        color: "#57606a",
        marginRight: "0.25rem",
      }}
    >
      {children}
    </span>
  );
};

const Chip = ({ label }) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "0.15rem 0.45rem",
        borderRadius: "999px",
        fontSize: "0.7rem",
        fontWeight: 500,
        border: "1px solid rgba(110, 118, 129, 0.4)",
        color: "#57606a",
        marginRight: "0.25rem",
        marginBottom: "0.25rem",
      }}
    >
      {label}
    </span>
  );
};

const Card = ({ children }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      style={{
        borderRadius: "12px",
        padding: "1rem",
        border: isDark ? "1px solid #30363d" : "1px solid #d0d7de",
        backgroundColor: isDark ? "#161b22" : "#ffffff",
        boxShadow: isDark
          ? "0 0 0 1px rgba(1,4,9,0.1)"
          : "0 1px 0 rgba(208,215,222,0.5)",
        marginBottom: "0.75rem",
      }}
    >
      {children}
    </div>
  );
};

const Button = ({ children, onClick, variant = "primary" }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const base = {
    borderRadius: "999px",
    border: "1px solid transparent",
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: "0.35rem 0.9rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  let style;
  if (variant === "primary") {
    style = {
      ...base,
      backgroundColor: "#2da44e",
      borderColor: "rgba(27,31,36,0.15)",
      color: "#ffffff",
    };
  } else if (variant === "outline") {
    style = {
      ...base,
      backgroundColor: isDark ? "#0d1117" : "#f6f8fa",
      borderColor: isDark ? "#30363d" : "#d0d7de",
      color: isDark ? "#c9d1d9" : "#24292f",
    };
  } else {
    style = base;
  }

  return (
    <button type="button" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

const Input = ({ value, onChange, placeholder }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "0.5rem 0.75rem",
        borderRadius: "6px",
        border: isDark ? "1px solid #30363d" : "1px solid #d0d7de",
        backgroundColor: isDark ? "#0d1117" : "#ffffff",
        color: isDark ? "#c9d1d9" : "#24292f",
        fontSize: "0.9rem",
      }}
    />
  );
};

// Project card
const ProjectCard = ({ project }) => {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: 600,
              color: "#0969da",
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              margin: "0.25rem 0 0.5rem",
              fontSize: "0.85rem",
              color: "#57606a",
            }}
          >
            {project.description}
          </p>
        </div>
        <div style={{ marginLeft: "1rem", whiteSpace: "nowrap" }}>
          <Badge>{project.status}</Badge>
        </div>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        {project.tags.map((tag) => (
          <Chip key={tag} label={tag} />
        ))}
      </div>
    </Card>
  );
};

// Layout components
const Page = ({ children }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1.5rem",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        backgroundColor: isDark ? "#0d1117" : "#f6f8fa",
        color: isDark ? "#c9d1d9" : "#24292f",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>{children}</div>
    </div>
  );
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "999px",
            backgroundColor: "#238636",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontWeight: 700,
            marginRight: "0.75rem",
          }}
        >
          R
        </div>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "1.05rem",
            }}
          >
            React Projects
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: isDark ? "#8b949e" : "#57606a",
            }}
          >
            Minimal dashboard with GitHub-inspired design
          </div>
        </div>
      </div>
      <Button variant="outline" onClick={toggleTheme}>
        {isDark ? "Switch to light" : "Switch to dark"}
      </Button>
    </header>
  );
};

// Sidebar with filters
const Sidebar = ({ statuses, activeStatus, onStatusChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <aside
      style={{
        width: "220px",
        marginRight: "1.5rem",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          color: isDark ? "#8b949e" : "#57606a",
          marginBottom: "0.4rem",
        }}
      >
        Status
      </div>
      <div>
        {["All", ...statuses].map((status) => {
          const selected =
            activeStatus === null
              ? status === "All"
              : status === activeStatus;
          return (
            <button
              key={status}
              type="button"
              onClick={() =>
                onStatusChange(status === "All" ? null : status)
              }
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.25rem 0.4rem",
                marginBottom: "0.15rem",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.85rem",
                backgroundColor: selected
                  ? isDark
                    ? "rgba(56, 139, 253, 0.15)"
                    : "rgba(9, 105, 218, 0.08)"
                  : "transparent",
                color: selected
                  ? isDark
                    ? "#58a6ff"
                    : "#0969da"
                  : isDark
                  ? "#c9d1d9"
                  : "#24292f",
              }}
            >
              {status}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

// Main content list
const ProjectList = ({ query }) => {
  const debouncedQuery = useDebouncedValue(query, 250);

  const asyncState = useAsync(
    () => fetchProjects(debouncedQuery),
    [debouncedQuery]
  );

  const { loading, error, data } = asyncState;

  if (loading && !data) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div style={{ color: "#cf222e" }}>Failed to load: {String(error)}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No projects found for this query.</div>;
  }

  return (
    <div>
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

// Activity list to fill lines and show state updates
const ActivityFeed = ({ items }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Card>
      <div
        style={{
          fontSize: "0.85rem",
          fontWeight: 600,
          marginBottom: "0.5rem",
        }}
      >
        Activity
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "0.8rem",
        }}
      >
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.25rem 0",
              borderBottom: isDark
                ? "1px solid rgba(48,54,61,0.7)"
                : "1px solid rgba(208,215,222,0.5)",
            }}
          >
            <span>{item.label}</span>
            <span
              style={{
                color: isDark ? "#8b949e" : "#57606a",
              }}
            >
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Form for adding an activity (purely client-side)
const ActivityForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <div style={{ flexGrow: 1 }}>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Log an activity..."
          />
        </div>
        <div>
          <Button>Log</Button>
        </div>
      </div>
    </form>
  );
};

// Root app component
export const App = () => {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [activities, setActivities] = useState(() => {
    return [
      { id: "a1", label: "Created project React Dashboard", time: "2h ago" },
      { id: "a2", label: "Updated Design System tokens", time: "4h ago" },
      { id: "a3", label: "Discussed API gateway caching", time: "1d ago" },
    ];
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  const filteredActivities = useMemo(() => {
    if (!query) return activities;
    const q = query.toLowerCase();
    return activities.filter((a) => a.label.toLowerCase().includes(q));
  }, [activities, query]);

  const handleAddActivity = useCallback((label) => {
    setActivities((prev) => [
      {
        id: "a-" + (prev.length + 1),
        label,
        time: "just now",
      },
      ...prev,
    ]);
  }, []);

  const statuses = useMemo(() => {
    const s = new Set(initialProjects.map((p) => p.status));
    return Array.from(s);
  }, []);

  // Derived header subtitle
  const subtitle = useMemo(() => {
    const total = initialProjects.length;
    const q = query.trim();
    if (!q) {
      return `${total} projects • GitHub-inspired dashboard`;
    }
    return `Filtering ${total} projects by "${q}"`;
  }, [query]);

  // Compose layout
  return (
    <ThemeContext.Provider value={value}>
      <Page>
        <Header />
        <div
          style={{
            marginTop: "-0.75rem",
            marginBottom: "1.25rem",
            fontSize: "0.85rem",
            color: theme === "dark" ? "#8b949e" : "#57606a",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Sidebar
            statuses={statuses}
            activeStatus={statusFilter}
            onStatusChange={setStatusFilter}
          />
          <main style={{ flexGrow: 1 }}>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  Projects
                </div>
                <div style={{ width: "260px" }}>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects..."
                  />
                </div>
              </div>
              <ProjectList query={query} statusFilter={statusFilter} />
            </Card>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
                gap: "0.75rem",
                marginTop: "0.75rem",
                marginBottom: "2rem",
              }}
            >
              <ActivityFeed items={filteredActivities} />
              <Card>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  Log activity
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: theme === "dark" ? "#8b949e" : "#57606a",
                    marginBottom: "0.5rem",
                  }}
                >
                  Use this form to log development events such as deployments,
                  refactors, or planning sessions.
                </div>
                <ActivityForm onAdd={handleAddActivity} />
              </Card>
            </div>
          </main>
        </div>
      </Page>
    </ThemeContext.Provider>
  );
};

