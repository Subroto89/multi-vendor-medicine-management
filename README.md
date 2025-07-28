Medi-Mart: Your Online Medicine Store
Welcome to Medi-Mart, a comprehensive online platform designed to streamline the process of buying and selling medicines. This full-stack application provides a secure and intuitive experience for users, sellers, and administrators, ensuring efficient medicine management, secure transactions, and valuable health information.

Live Demo
Live Site URL: https://medi-mart-cure.web.app 

Admin Credentials (for demonstration/testing)
Username (Email): subrotosarker1988@gmail.com

 Password: Subroto@89

Key Features
Robust User Authentication & Authorization:

Secure user registration and login.

Distinct roles for Admins, Sellers, and General Users, each with tailored dashboards and access permissions.

Comprehensive Medicine Management for Sellers:

Sellers can easily add new medicines, providing details like name, category, generic name, company, price, and stock quantity.

Intuitive interface to view, edit, restock, and delete their listed medicines.

Paginated display of medicines for efficient management.

Seamless Medicine Browsing & Purchasing for Users:

Browse a wide range of medicines categorized for easy navigation.

Powerful search functionality to quickly find specific medicines.

Detailed product pages with essential information.

Secure shopping cart and streamlined checkout process.

Flexible Payment Options:

Support for online payment methods (e.g., Stripe, SSLCommerz - if implemented).

Convenient Cash on Delivery (COD) option for eligible orders.

User Order Tracking & Invoice Generation:

Users can view their complete order history and track the status of their purchases.

Ability to download professional, high-quality PDF invoices for each order using react-pdf/renderer.

Centralized Admin Dashboard:

A powerful control panel for administrators to oversee the entire platform.

Manage users, review payments, oversee banner advertisements, and generate sales reports.

Admin Payment Management:

View all payment transactions, filter by status (e.g., pending COD, paid).

Ability to manually mark COD payments as "Paid" and update order statuses.

Dynamic Banner Advertisement Management:

Admins can manage and approve banner advertisements displayed prominently on the homepage.

Advanced Sales Report Generation:

Admins can generate detailed sales reports, filterable by date range.

Export sales data to high-quality PDF documents using react-pdf/renderer or CSV format.

Engaging Health Blog Section:

A dedicated section on the homepage featuring informative articles on health and wellness.

Paginated display of blog posts for easy browsing.

Dedicated pages for full blog post details.

Customer Review & Testimonial System:

A prominent "What Our Customers Say" section on the homepage showcasing positive feedback.

Authenticated users can submit reviews for their purchased items/orders, building trust and credibility.

Responsive and Modern UI:

Built with Tailwind CSS, ensuring a clean, modern, and fully responsive user interface across all devices (desktop, tablet, mobile).

Efficient Data Management:

Leverages TanStack Query for efficient data fetching, caching, and synchronization, providing a fast and smooth user experience.

Utilizes re-title for dynamic and consistent page titles across the application.

Technologies Used
Frontend: React.js, Tailwind CSS, React Hook Form, React Datepicker, React Icons, SweetAlert2, TanStack Query, React Router DOM, re-title, @react-pdf/renderer.

Backend: Node.js, Express.js, MongoDB (with Mongoose/MongoDB Driver), JWT (JSON Web Tokens) for authentication.

Setup Instructions
Clone the repositories:

git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-Subroto89
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-Subroto89

Backend Setup (medi-mart-server):

Navigate into the medi-mart-server directory.

Install dependencies: npm install

Create a .env file and configure your MongoDB URI, JWT secret, etc.

DB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key
PORT=5000

Run the server: npm start (or node index.js)

Frontend Setup (medi-mart-client):

Navigate into the medi-mart-client directory.

Install dependencies: npm install

Ensure your axiosSecure instance points to your backend URL (e.g., http://localhost:5000).

Run the client: npm run dev
