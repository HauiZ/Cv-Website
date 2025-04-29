import { delay } from './utils';

// Mock data for employers
const mockEmployers = [
  {
    id: 1,
    email: 'employer1@example.com',
    companyName: 'Tech Solutions Inc',
    directorName: 'Nguyễn Văn Anh',
    phone: '0912345678',
    companyScale: '100_to_499',
    taxCode: '1234567890',
    foundingDate: '2010-05-15',
    province: 'hcm',
    district: 'quan1',
    address: '123 Nguyen Hue, District 1, HCMC',
    website: 'https://techsolutions.example.com',
    logo: 'https://via.placeholder.com/150?text=Logo',
    industry: 'it',
    status: 'active',
    contactName: 'Lê Thị Bình',
    contactPhone: '0987654321',
    contactEmail: 'contact@techsolutions.example.com'
  },
  {
    id: 2,
    email: 'employer2@example.com',
    companyName: 'Finance Group',
    directorName: 'Trần Văn Cường',
    phone: '0923456789',
    companyScale: '25_to_99',
    taxCode: '0987654321',
    foundingDate: '2015-08-20',
    province: 'hn',
    district: 'hoankiem',
    address: '45 Ly Thai To, Hoan Kiem, Hanoi',
    website: 'https://financegroup.example.com',
    logo: 'https://via.placeholder.com/150?text=Finance',
    industry: 'finance',
    status: 'active',
    contactName: 'Pham Thi Dung',
    contactPhone: '0912345987',
    contactEmail: 'contact@financegroup.example.com'
  }
];

// Mock industries data
const mockIndustries = [
  { value: 'it', label: 'Công nghệ thông tin' },
  { value: 'finance', label: 'Tài chính - Ngân hàng' },
  { value: 'education', label: 'Giáo dục - Đào tạo' },
  { value: 'manufacturing', label: 'Sản xuất' },
  { value: 'retail', label: 'Bán lẻ' },
  { value: 'healthcare', label: 'Y tế - Dược phẩm' },
  { value: 'construction', label: 'Xây dựng' },
  { value: 'tourism', label: 'Du lịch - Khách sạn' }
];

// Mock provinces data
const mockProvinces = [
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'hn', label: 'Hà Nội' },
  { value: 'dn', label: 'Đà Nẵng' },
  { value: 'hph', label: 'Hải Phòng' },
  { value: 'ct', label: 'Cần Thơ' }
];

// Mock districts data by province
const mockDistricts = {
  hcm: [
    { value: 'quan1', label: 'Quận 1', provinceId: 'hcm' },
    { value: 'quan2', label: 'Quận 2', provinceId: 'hcm' },
    { value: 'quan3', label: 'Quận 3', provinceId: 'hcm' },
    { value: 'quan4', label: 'Quận 4', provinceId: 'hcm' },
    { value: 'quan5', label: 'Quận 5', provinceId: 'hcm' }
  ],
  hn: [
    { value: 'hoankiem', label: 'Hoàn Kiếm', provinceId: 'hn' },
    { value: 'donganh', label: 'Đông Anh', provinceId: 'hn' },
    { value: 'caugiay', label: 'Cầu Giấy', provinceId: 'hn' },
    { value: 'hoangmai', label: 'Hoàng Mai', provinceId: 'hn' },
    { value: 'tayho', label: 'Tây Hồ', provinceId: 'hn' }
  ],
  dn: [
    { value: 'haichau', label: 'Hải Châu', provinceId: 'dn' },
    { value: 'sontra', label: 'Sơn Trà', provinceId: 'dn' },
    { value: 'nguhanhson', label: 'Ngũ Hành Sơn', provinceId: 'dn' }
  ],
  hph: [
    { value: 'hongbang', label: 'Hồng Bàng', provinceId: 'hph' },
    { value: 'ngoquyen', label: 'Ngô Quyền', provinceId: 'hph' }
  ],
  ct: [
    { value: 'ninhkieu', label: 'Ninh Kiều', provinceId: 'ct' },
    { value: 'binhthuy', label: 'Bình Thủy', provinceId: 'ct' }
  ]
};

// Mock recruitment news data
const mockRecruitmentNews = [
  {
    id: 1,
    title: 'Tuyển dụng Frontend Developer',
    description: 'Chúng tôi đang tìm kiếm Frontend Developer với kinh nghiệm React',
    company: 'Tech Solutions Inc',
    companyId: 1,
    salary: '15-20 triệu',
    location: 'TP. Hồ Chí Minh',
    requirements: ['React', 'JavaScript', 'HTML/CSS'],
    benefits: ['Lương thưởng cạnh tranh', 'Môi trường làm việc quốc tế'],
    deadline: '2025-05-30',
    status: 'active',
    createdAt: '2025-04-01'
  },
  {
    id: 2,
    title: 'Tuyển dụng Backend Developer',
    description: 'Tìm kiếm Backend Developer với kinh nghiệm Node.js',
    company: 'Finance Group',
    companyId: 2,
    salary: '20-25 triệu',
    location: 'Hà Nội',
    requirements: ['Node.js', 'Express', 'MongoDB'],
    benefits: ['Chế độ bảo hiểm tốt', 'Thưởng cuối năm hấp dẫn'],
    deadline: '2025-06-15',
    status: 'active',
    createdAt: '2025-04-05'
  }
];

// Mock user applications
const mockApplications = [
  {
    id: 1,
    userId: 1,
    recruitmentNewsId: 1,
    cvUrl: 'https://example.com/cv1.pdf',
    status: 'pending',
    appliedAt: '2025-04-10'
  },
  {
    id: 2,
    userId: 1,
    recruitmentNewsId: 2,
    cvUrl: 'https://example.com/cv2.pdf',
    status: 'accepted',
    appliedAt: '2025-04-12'
  }
];

// Mock CV templates
const mockCVTemplates = [
  {
    id: 1,
    name: 'Template 1',
    description: 'Modern professional CV template',
    previewUrl: 'https://example.com/template1.jpg',
    downloadUrl: 'https://example.com/template1.docx'
  },
  {
    id: 2,
    name: 'Template 2',
    description: 'Creative CV template for designers',
    previewUrl: 'https://example.com/template2.jpg',
    downloadUrl: 'https://example.com/template2.docx'
  }
];

/**
 * Mock Authentication API
 */
export const mockAuthApi = {
  login: async (email, password, roleName) => {
    await delay(800);

    if (email === 'employer@example.com' && password === 'password') {
      return {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          name: 'Employer User',
          email: 'employer@example.com',
          role: roleName || 'recruiter'
        }
      };
    }

    if (email === 'candidate@example.com' && password === 'password') {
      return {
        token: 'mock-jwt-token',
        user: {
          id: 2,
          name: 'Candidate User',
          email: 'candidate@example.com',
          role: roleName || 'candidate'
        }
      };
    }

    throw {
      status: 401,
      message: 'Tên đăng nhập hoặc mật khẩu không đúng',
      errors: {}
    };
  },

  logout: async () => {
    await delay(300);
    return { success: true };
  },

  registerCandidate: async (userData) => {
    await delay(800);
    return {
      id: 99,
      email: userData.email,
      name: userData.userName || 'New Candidate',
      role: 'candidate',
      createdAt: new Date().toISOString()
    };
  },

  registerRecruiter: async (userData) => {
    await delay(800);
    return {
      id: 100,
      email: userData.email,
      companyName: userData.BusinessName || 'New Company',
      role: 'recruiter',
      createdAt: new Date().toISOString()
    };
  },

  getProfile: async () => {
    await delay(300);
    const userInfo = localStorage.getItem('user_info');
    if (!userInfo) {
      throw {
        status: 401,
        message: 'Not authenticated',
        errors: {}
      };
    }

    const user = JSON.parse(userInfo);
    if (user.role === 'recruiter') {
      // Return employer profile
      return mockEmployers[0];
    } else {
      // Return candidate profile
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: '0901234567',
        address: 'Ho Chi Minh City',
        role: 'candidate'
      };
    }
  },

  changePassword: async (passwordData) => {
    await delay(500);

    if (passwordData.oldPassword !== 'password') {
      throw {
        status: 400,
        message: 'Mật khẩu cũ không đúng',
        errors: {
          oldPassword: 'Mật khẩu cũ không đúng'
        }
      };
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      throw {
        status: 400,
        message: 'Mật khẩu mới không khớp',
        errors: {
          confirmNewPassword: 'Mật khẩu mới không khớp'
        }
      };
    }

    return { success: true, message: 'Đổi mật khẩu thành công' };
  },

  changeProfile: async (profileData) => {
    await delay(800);
    return {
      ...profileData,
      updatedAt: new Date().toISOString()
    };
  }
};

/**
 * Mock Employer API
 */
export const mockEmployerApi = {
  getAll: async (params = {}) => {
    await delay(500);

    // Simple filtering by status
    let filteredEmployers = [...mockEmployers];
    if (params.status) {
      filteredEmployers = filteredEmployers.filter(e => e.status === params.status);
    }

    // Simple search
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredEmployers = filteredEmployers.filter(e =>
        e.companyName.toLowerCase().includes(searchLower) ||
        e.email.toLowerCase().includes(searchLower)
      );
    }

    return {
      data: filteredEmployers,
      total: filteredEmployers.length,
      page: parseInt(params.page || 1),
      limit: parseInt(params.limit || 10)
    };
  },

  getById: async (id) => {
    await delay(300);

    const employer = mockEmployers.find(e => e.id === parseInt(id));
    if (!employer) {
      throw {
        status: 404,
        message: 'Không tìm thấy thông tin nhà tuyển dụng',
        errors: {}
      };
    }

    return employer;
  },

  create: async (employerData) => {
    await delay(1000);

    const newEmployer = {
      id: mockEmployers.length + 1,
      ...employerData,
      createdAt: new Date().toISOString()
    };

    mockEmployers.push(newEmployer);
    return newEmployer;
  },

  update: async (id, employerData) => {
    await delay(1000);

    const index = mockEmployers.findIndex(e => e.id === parseInt(id));
    if (index === -1) {
      throw {
        status: 404,
        message: 'Không tìm thấy thông tin nhà tuyển dụng',
        errors: {}
      };
    }

    const updatedEmployer = {
      ...mockEmployers[index],
      ...employerData,
      updatedAt: new Date().toISOString()
    };

    mockEmployers[index] = updatedEmployer;
    return updatedEmployer;
  },

  delete: async (id) => {
    await delay(500);

    const index = mockEmployers.findIndex(e => e.id === parseInt(id));
    if (index === -1) {
      throw {
        status: 404,
        message: 'Không tìm thấy thông tin nhà tuyển dụng',
        errors: {}
      };
    }

    mockEmployers.splice(index, 1);
    return { success: true };
  }
};

/**
 * Mock Upload API
 */
export const mockUploadApi = {
  uploadFile: async (url, file) => {
    await delay(1500);

    // Generate mock URL or document ID
    return {
      url: `https://images.example.com/${Date.now()}-${file.name}`,
      documentId: `doc-${Date.now()}`,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type
    };
  },

  uploadCV: async (file, jobId) => {
    await delay(1500);

    return {
      success: true,
      message: 'Ứng tuyển thành công',
      application: {
        id: mockApplications.length + 1,
        recruitmentNewsId: jobId,
        cvUrl: `https://cvs.example.com/${Date.now()}-${file.name}`,
        status: 'pending',
        appliedAt: new Date().toISOString()
      }
    };
  },

  uploadImage: async (file) => {
    return mockUploadApi.uploadFile('/mock-upload-image', file);
  }
};

/**
 * Mock Recruitment News API
 */
export const mockRecruitmentNewsApi = {
  getAll: async (params = {}) => {
    await delay(400);

    let filteredNews = [...mockRecruitmentNews];

    // Filter by status if provided
    if (params.status) {
      filteredNews = filteredNews.filter(n => n.status === params.status);
    }

    // Filter by company if provided
    if (params.companyId) {
      filteredNews = filteredNews.filter(n => n.companyId === parseInt(params.companyId));
    }

    // Search by title
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredNews = filteredNews.filter(n =>
        n.title.toLowerCase().includes(searchLower) ||
        n.description.toLowerCase().includes(searchLower)
      );
    }

    return {
      data: filteredNews,
      total: filteredNews.length,
      page: parseInt(params.page || 1),
      limit: parseInt(params.limit || 10)
    };
  },

  getById: async (id) => {
    await delay(300);

    const news = mockRecruitmentNews.find(n => n.id === parseInt(id));
    if (!news) {
      throw {
        status: 404,
        message: 'Không tìm thấy tin tuyển dụng',
        errors: {}
      };
    }

    return news;
  },

  create: async (newsData) => {
    await delay(800);

    const newNews = {
      id: mockRecruitmentNews.length + 1,
      ...newsData,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    mockRecruitmentNews.push(newNews);
    return newNews;
  },

  update: async (id, newsData) => {
    await delay(800);

    const index = mockRecruitmentNews.findIndex(n => n.id === parseInt(id));
    if (index === -1) {
      throw {
        status: 404,
        message: 'Không tìm thấy tin tuyển dụng',
        errors: {}
      };
    }

    const updatedNews = {
      ...mockRecruitmentNews[index],
      ...newsData,
      updatedAt: new Date().toISOString()
    };

    mockRecruitmentNews[index] = updatedNews;
    return updatedNews;
  }
};

/**
 * Mock Common API
 */
export const mockCommonApi = {
  getAreaInfo: async () => {
    await delay(200);

    // Flatten the districts for easier use
    const allDistricts = [];
    Object.keys(mockDistricts).forEach(provinceId => {
      allDistricts.push(...mockDistricts[provinceId]);
    });

    return {
      provinces: mockProvinces,
      districts: allDistricts,
      industries: mockIndustries
    };
  },

  getAllCompanies: async () => {
    await delay(300);

    return mockEmployers.map(employer => ({
      id: employer.id,
      companyName: employer.companyName,
      logo: employer.logo,
      industry: employer.industry,
      province: employer.province,
      district: employer.district
    }));
  },

  getCompanyById: async (id) => {
    await delay(300);

    const company = mockEmployers.find(e => e.id === parseInt(id));
    if (!company) {
      throw {
        status: 404,
        message: 'Không tìm thấy thông tin công ty',
        errors: {}
      };
    }

    return company;
  },

  getUserApplications: async () => {
    await delay(300);

    // Enrich applications with job data
    return mockApplications.map(app => {
      const job = mockRecruitmentNews.find(job => job.id === app.recruitmentNewsId);
      return {
        ...app,
        job: job || { title: 'Unknown Job' }
      };
    });
  },

  getCVTemplates: async () => {
    await delay(300);
    return mockCVTemplates;
  },

  getCVTemplateById: async (id) => {
    await delay(200);

    const template = mockCVTemplates.find(t => t.id === parseInt(id));
    if (!template) {
      throw {
        status: 404,
        message: 'Không tìm thấy mẫu CV',
        errors: {}
      };
    }

    return template;
  },

  getNotifications: async () => {
    await delay(200);

    return [
      {
        id: 1,
        title: 'Ứng tuyển thành công',
        content: 'Bạn đã ứng tuyển thành công vị trí Frontend Developer tại Tech Solutions Inc',
        isRead: false,
        createdAt: '2025-04-10T10:30:00Z'
      },
      {
        id: 2,
        title: 'Phỏng vấn',
        content: 'Bạn được mời phỏng vấn vị trí Backend Developer tại Finance Group',
        isRead: true,
        createdAt: '2025-04-12T09:15:00Z'
      }
    ];
  }
};
