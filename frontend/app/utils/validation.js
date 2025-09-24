// Required field validation
export const required = (value) => {
    if (!value || (typeof value === 'string' && value.trim().length === 0)) {
      return 'This field is required';
    }
    return true;
  };
  
  // Email validation
  export const email = (value) => {
    if (!value) return 'Email is required';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      return 'Invalid email format';
    }
    return true;
  };
  
  // Minimum length validation
  export const minLength = (value, min) => {
    if (!value || value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return true;
  };
  
  // Maximum length validation
  export const maxLength = (value, max) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return true;
  };
  
  // Exact length validation (e.g., for fixed-length codes)
  export const exactLength = (value, length) => {
    if (!value || value.length !== length) {
      return `Must be exactly ${length} characters`;
    }
    return true;
  };
  
  // Numeric validation
  export const numeric = (value) => {
    if (value && isNaN(value)) {
      return 'Must be a number';
    }
    return true;
  };
  
  // Minimum value validation (for numbers)
  export const minValue = (value, min) => {
    if (value && (isNaN(value) || Number(value) < min)) {
      return `Must be at least ${min}`;
    }
    return true;
  };
  
  // Maximum value validation (for numbers)
  export const maxValue = (value, max) => {
    if (value && (isNaN(value) || Number(value) > max)) {
      return `Must be no more than ${max}`;
    }
    return true;
  };
  
  // Alphanumeric validation
  export const alphanumeric = (value) => {
    if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
      return 'Must contain only letters and numbers';
    }
    return true;
  };
  
  // Password strength validation (example: at least one uppercase, lowercase, number, and special character)
  export const strongPassword = (value) => {
    if (!value) return 'Password is required';
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!re.test(value)) {
      return 'Password must be at least 8 characters, including one uppercase, one lowercase, one number, and one special character';
    }
    return true;
  };
  
  // URL validation
  export const url = (value) => {
    if (!value) return true; // Optional field
    const re = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!re.test(value)) {
      return 'Invalid URL format';
    }
    return true;
  };
  
  // Phone number validation (basic international format)
  export const phone = (value) => {
    if (!value) return true; // Optional field
    const re = /^\+?[\d\s-]{10,}$/;
    if (!re.test(value)) {
      return 'Invalid phone number format';
    }
    return true;
  };
  
  // Match field validation (e.g., confirm password)
  export const matchField = (value, otherValue) => {
    if (value !== otherValue) {
      return 'Fields do not match';
    }
    return true;
  };