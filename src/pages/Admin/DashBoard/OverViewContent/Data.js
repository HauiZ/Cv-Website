// Mock data provider to use instead of real API calls
export const mockData = {
  users: [
    { id: 1, email: "user1@example.com", logo: "/logo.png", joinedAt: "2023-01-01" },
    { id: 2, email: "user2@example.com", logo: "/logo.png", joinedAt: "2023-01-15" },
  ],
  candidates: [
    { id: 101, email: "candidate1@example.com", logo: "/logo.png", joinedAt: "2023-02-01" },
    { id: 102, email: "candidate2@example.com", logo: "/logo.png", joinedAt: "2023-02-15" },
  ],
  recruiters: [
    { id: 201, email: "recruiter1@example.com", logo: "/logo.png", joinedAt: "2023-03-01" },
    { id: 202, email: "recruiter2@example.com", logo: "/logo.png", joinedAt: "2023-03-15" },
  ],
  news: [
    { id: 301, email: "news1@example.com", logo: "/logo.png", joinedAt: "2023-04-01" },
    { id: 302, email: "news2@example.com", logo: "/logo.png", joinedAt: "2023-04-15" },
  ]
};