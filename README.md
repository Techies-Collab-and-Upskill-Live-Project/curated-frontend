Here’s the updated `README.md` file for the **CuratED Frontend**, reflecting everything we’ve discussed so far and removing the testing section as requested:

---

# CuratED – Frontend

CuratED is a web application that connects students with curated digital learning resources across various academic disciplines. This repository hosts the frontend codebase built with modern React (Next.js 14), Tailwind CSS, and reusable components for performance and maintainability.

---

## 🔧 Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS with custom theming
* **Component Architecture:** Reusable components (`InputField`, `Button`, etc.)
* **State Management:** React `useState`, `useEffect` (local state, no external state library used yet)
* **Form Validation:** `validator` package
* **Authentication UI:** Sign Up and Login forms

---



## ✨ Features Implemented

### 🔐 Sign-Up Form

* Collects: First name, Last name, Email, Password, Confirm Password
* Password strength validation using `validator.isStrongPassword`:

  * Min 8 characters
  * At least 1 uppercase, 1 lowercase, 1 number, and 1 special character
* Real-time feedback if password is weak or doesn't match
* Terms and Conditions checkbox (validated before submission)
* Accessible and responsive layout

### 🧩 Custom InputField Component

A shared input component used across forms. Supports:

* `label`, `value`, `onChange`, `isValid`, `type`, `required`
* `containerClass` for layout flexibility

### ✅ Validation Logic

All inputs are validated live:

* **Email:** Regex check via `validator`
* **Password:** Strength validation
* **Confirm Password:** Match validation
* **Checkbox:** Ensures terms are accepted

---

## 🎨 Styling

* Built with **Tailwind CSS**
* Custom colors and box shadows defined in `tailwind.config.js`
* Box shadow example used:

  ```js
  boxShadow: {
    'custom-shadow': '0px 4px 15px 0px #E2725B1A'
  }
  ```
* Form sections are mobile-responsive

---

## 🔄 User Feedback

* Inline error messages:

  * Weak password
  * Password mismatch
  * Invalid email
* Input `isValid` state updates border colors dynamically

---

## 🔗 Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-org/curated-frontend.git
   cd curated-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

---

## ✅ Next Steps

* Add authentication functionality (API connection)
* Integrate toast notifications
* Finalize full navigation and dashboard layout
* Add global error handling and form submission state
* Implement testing (Jest, React Testing Library, Playwright)

---

