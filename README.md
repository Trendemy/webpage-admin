# Trendemy Admin Dashboard

This repository contains the admin dashboard for Trendemy. It's built with React + Vite and uses Tailwind CSS for styling.

## ⚠️ Branch Information
- `main` - Production branch. All changes here are automatically deployed to production.
- Please create feature branches from `main` for development.

## 🚀 Quick Start

### Local Development

1. **Prerequisites**
   - Node.js 20.x or later
   - npm 9.x or later

2. **Install Dependencies**
   ```bash
   npm ci
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

### 🐳 Docker Development

1. **Build Development Image**
   ```bash
   docker build --target development -t admin:dev .
   ```

2. **Run Development Container**
   ```bash
   docker run -p 5173:5173 -v $(pwd):/app admin:dev
   ```
   The application will be available at `http://localhost:5173`

### 🚀 Docker Production

1. **Build Production Image**
   ```bash
   docker build --target production -t admin:prod .
   ```

2. **Run Production Container**
   ```bash
   docker run -p 3000:80 admin:prod
   ```
   The application will be available at `http://localhost:3000`

## 🔄 CI/CD Pipeline

- Pushing to `main` triggers automatic deployment
- Images are built and pushed to AWS ECR
- Deployment happens automatically to production EC2
- Production URL: http://[EC2-IP]:3000

## 📝 Development Guidelines

1. **Branch Naming**
   - Feature: `feature/your-feature-name`
   - Bugfix: `bugfix/issue-description`
   - Hotfix: `hotfix/urgent-fix`

2. **Commit Messages**
   - Use clear, descriptive commit messages
   - Start with a verb (add, fix, update, etc.)

3. **Pull Requests**
   - Create PR against `main` branch
   - Ensure all tests pass
   - Get code review before merging

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

This project uses:
- Tailwind CSS for styling
- PostCSS for processing CSS
- ESLint for code quality

## 📦 Environment Variables

Create a `.env` file in the root directory:
```env
# Add your environment variables here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
