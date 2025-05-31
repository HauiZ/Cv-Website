// src/utils/fontAwesomeLib.js (hoặc /lib)

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faLock,
  faUser,
  faBuildingUser,
  faPhone,
  faEye,
  faEyeSlash,
  faSearch,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";

// Thêm icon vào thư viện một lần
library.add(faEnvelope, faLock, faUser, faBuildingUser, faPhone, faEye, faEyeSlash);

// Export icon để dùng khi cần
export { faEnvelope, faLock, faUser, faBuildingUser, faPhone, faEye, faEyeSlash };
