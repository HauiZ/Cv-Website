// Mock backend cho API gửi mail
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Lấy __dirname trong ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create temp directory for email logs
const EMAIL_LOG_DIR = path.join(__dirname, 'temp', 'email-logs');
if (!fs.existsSync(EMAIL_LOG_DIR)) {
  fs.mkdirSync(EMAIL_LOG_DIR, { recursive: true });
}

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increased limit for attachments

// Utility to log emails for debugging
const logEmail = (emailData) => {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `email_${timestamp}_${Math.floor(Math.random() * 1000)}.json`;
    const filePath = path.join(EMAIL_LOG_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(emailData, null, 2));
    return filePath;
  } catch (error) {
    console.error('Error logging email:', error);
    return null;
  }
};

// Mock gửi mail
app.post('/api/mail/send', (req, res) => {
  const { to, subject, body, isHtml, attachments } = req.body;

  // Validate required fields
  if (!to || !subject || !body) {
    return res.status(400).json({ message: 'Thiếu thông tin bắt buộc: người nhận, tiêu đề hoặc nội dung email' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).json({ message: 'Địa chỉ email không hợp lệ' });
  }

  // Log email for debugging
  const loggedEmailPath = logEmail({
    timestamp: new Date().toISOString(),
    to,
    subject,
    body,
    isHtml: isHtml || false,
    attachmentsCount: attachments?.length || 0
  });

  // Giả lập gửi mail thành công (80% thành công, 20% thất bại để test xử lý lỗi)
  setTimeout(() => {
    const shouldSucceed = Math.random() < 0.8;

    if (shouldSucceed) {
      res.json({
        message: `Mail đã gửi thành công đến ${to}`,
        emailId: `mock-email-${Date.now()}`,
        loggedEmailPath: loggedEmailPath ? path.basename(loggedEmailPath) : null
      });
    } else {
      // Random server errors for testing error handling
      const errorTypes = [
        { code: 500, message: 'Lỗi máy chủ khi gửi email' },
        { code: 429, message: 'Đã vượt quá giới hạn số lượng email có thể gửi' },
        { code: 400, message: 'Định dạng email không hợp lệ' }
      ];

      const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
      res.status(randomError.code).json({ message: randomError.message });
    }
  }, 1000);
});

// API to get all sent emails (for testing purposes)
app.get('/api/mail/logs', (req, res) => {
  try {
    if (!fs.existsSync(EMAIL_LOG_DIR)) {
      return res.json({ emails: [] });
    }

    const files = fs.readdirSync(EMAIL_LOG_DIR)
      .filter(file => file.startsWith('email_') && file.endsWith('.json'))
      .sort()
      .reverse();

    const emails = files.slice(0, 20).map(file => {
      try {
        const content = fs.readFileSync(path.join(EMAIL_LOG_DIR, file), 'utf8');
        return JSON.parse(content);
      } catch (err) {
        return { error: `Could not read file ${file}` };
      }
    });

    res.json({ emails });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving email logs', error: error.message });
  }
});

// API to get a specific email log
app.get('/api/mail/logs/:filename', (req, res) => {
  try {
    const filename = req.params.filename;

    // Security check to prevent directory traversal
    if (filename.includes('..') || !filename.startsWith('email_') || !filename.endsWith('.json')) {
      return res.status(400).json({ message: 'Invalid filename' });
    }

    const filePath = path.join(EMAIL_LOG_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Email log not found' });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving email log', error: error.message });
  }
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log('Mail backend server running on port', PORT);
});
