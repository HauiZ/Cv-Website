// Helper function to generate additional candidates
const generateCandidates = (count) => {
  const positions = [
    'Nhân viên TELESALE',
    'Nhân viên Marketing',
    'Chuyên viên IT',
    'Kế toán viên',
    'Nhân viên kinh doanh'
  ];

  const locations = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Nha Trang'];

  const experiences = [
    'Ít hơn 1 năm kinh nghiệm',
    'Hơn 1 năm kinh nghiệm',
    'Hơn 2 năm kinh nghiệm',
    'Hơn 3 năm kinh nghiệm',
    'Hơn 5 năm kinh nghiệm'
  ];

  const statuses = ['pending', 'approved', 'rejected'];

  const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Võ', 'Đặng', 'Bùi', 'Đỗ'];
  const middleNames = ['Văn', 'Thị', 'Hữu', 'Đức', 'Quang', 'Thanh', 'Minh', 'Hoài', 'Kim', 'Đình'];
  const lastNames = ['Anh', 'Bình', 'Cường', 'Dũng', 'Hà', 'Hiếu', 'Hoa', 'Hùng', 'Lan', 'Linh', 'Mai', 'Nam', 'Phương', 'Thảo', 'Tùng'];

  const jobCodes = ['TD001', 'MKT22', 'IT003', 'KT045', 'KD100'];

  const result = [];

  for (let i = 4; i < count + 4; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${middleName} ${lastName}`;

    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const experience = experiences[Math.floor(Math.random() * experiences.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const jobCode = jobCodes[Math.floor(Math.random() * jobCodes.length)];

    // Use a consistent but varied avatar based on the ID
    const gender = i % 2 === 0 ? 'men' : 'women';
    const avatarIndex = (i % 70) + 1;

    result.push({
      id: i.toString(),
      name,
      position,
      location,
      experience,
      status,
      avatarUrl: `https://randomuser.me/api/portraits/${gender}/${avatarIndex}.jpg`,
      jobCode
    });
  }

  return result;
};

// Original candidates
const originalCandidates = [
  {
    id: '1',
    name: 'Nguyễn Thanh Thảo',
    position: 'Nhân viên TELESALE',
    location: 'Hồ Chí Minh',
    experience: 'Hơn 1 năm kinh nghiệm',
    status: 'pending',
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    jobCode: 'TD001'
  },
  {
    id: '2',
    name: 'Nguyễn Quang Mạnh',
    position: 'Nhân viên TELESALE',
    location: 'Hồ Chí Minh',
    experience: 'Hơn 5 năm kinh nghiệm',
    status: 'approved',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    jobCode: 'TD001'
  },
  {
    id: '3',
    name: 'Lê Kim Hoa',
    position: 'Nhân viên TELESALE',
    location: 'Hồ Chí Minh',
    experience: 'Ít hơn 1 năm kinh nghiệm',
    status: 'rejected',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    jobCode: 'TD001'
  },
];

// Generate additional candidates (27 more to make a total of 30)
export const candidates = [
  ...originalCandidates,
  ...generateCandidates(27)
];
