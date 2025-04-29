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

  // Email domain options
  const emailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'company.com'];

  // Định nghĩa màu sắc theo giới tính
  const maleColors = ['2196F3', '3F51B5', '1976D2', '0D47A1', '01579B', '006064', '004D40'];
  const femaleColors = ['E91E63', 'F06292', 'AD1457', 'EC407A', 'D81B60', 'C2185B', '880E4F'];

  const result = [];

  for (let i = 4; i < count + 4; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${middleName} ${lastName}`;

    // Generate email based on name
    const normalizedLastName = lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedFirstName = firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const email = `${normalizedLastName}.${normalizedFirstName}${Math.floor(Math.random() * 1000)}@${domain}`;

    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const experience = experiences[Math.floor(Math.random() * experiences.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const jobCode = jobCodes[Math.floor(Math.random() * jobCodes.length)];

    // Xác định giới tính dựa vào tên đệm và tên cuối
    const isFemale = middleName === 'Thị' || ['Lan', 'Linh', 'Mai', 'Thảo', 'Hoa'].includes(lastName);

    // Chọn màu phù hợp với giới tính
    const colors = isFemale ? femaleColors : maleColors;
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Tạo URL cho avatar
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff&size=256&bold=true&font-size=0.5`;

    result.push({
      id: i.toString(),
      name,
      email,
      position,
      location,
      experience,
      status,
      avatarUrl,
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
    email: 'thao.nguyen@gmail.com',
    position: 'Nhân viên TELESALE',
    location: 'Hồ Chí Minh',
    experience: 'Hơn 1 năm kinh nghiệm',
    status: 'pending',
    avatarUrl: 'https://ui-avatars.com/api/?name=Nguyễn+Thanh+Thảo&background=E91E63&color=fff&size=256&bold=true&font-size=0.5',
    jobCode: 'TD001'
  },
  {
    id: '2',
    name: 'Nguyễn Quang Mạnh',
    email: 'manh.nguyen@company.com',
    position: 'Nhân viên TELESALE',
    location: 'Hồ Chí Minh',
    experience: 'Hơn 5 năm kinh nghiệm',
    status: 'approved',
    avatarUrl: 'https://ui-avatars.com/api/?name=Nguyễn+Quang+Mạnh&background=2196F3&color=fff&size=256&bold=true&font-size=0.5',
    jobCode: 'TD001'
  },
  {
    id: '3',
    name: 'Lê Kim Hoa',
    email: 'hoa.le@yahoo.com',
    position: 'Nhân viên TELESALE',
    location: 'Hồ Chí Minh',
    experience: 'Ít hơn 1 năm kinh nghiệm',
    status: 'rejected',
    avatarUrl: 'https://ui-avatars.com/api/?name=Lê+Kim+Hoa&background=F06292&color=fff&size=256&bold=true&font-size=0.5',
    jobCode: 'TD001'
  },
];

// Generate additional candidates (27 more to make a total of 30)
export const candidates = [
  ...originalCandidates,
  ...generateCandidates(27)
];
