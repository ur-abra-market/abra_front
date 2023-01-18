export function generateResponseError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Password was entered incorrectly';
    case 'EMAIL_EXISTS':
      return 'There is already a user with this Email';
    case 'WRONG_CREDENTIALS':
      return 'Error for invalid email or invalid  password';
    case 'INCORRECT_SUBDOMAIN':
      return 'Select supplier or seller status';
    case 'CATEGORY_NOT_FOUND':
      return 'Category not found';
    case 'PRODUCT_NOT_FOUND':
      return 'Product not found';
    case 'NO_PRODUCTS':
      return 'Not products';
    case 'NO_SEARCHES':
      return 'Not found';
    default:
      return 'Something wrong. Please try again';
  }
}
