import React from 'react';

// Define the help content for different sections of the admin panel
export const helpContent: Record<string, { title: string; content: React.ReactNode; subsections?: Record<string, { title: string; content: React.ReactNode }> }> = {
  // Main admin dashboard help
  admin: {
    title: 'Admin Dashboard Help',
    content: (
      <>
        <h3>Welcome to the Admin Dashboard</h3>
        <p>
          This dashboard provides an overview of your website content and quick access to all administrative functions.
        </p>

        <h4>Getting Started</h4>
        <p>
          Use the sidebar navigation to access different sections of the admin panel:
        </p>
        <ul>
          <li><strong>Dashboard</strong> - Overview of site statistics and recent content</li>
          <li><strong>Projects</strong> - Manage your portfolio projects</li>
          <li><strong>Categories</strong> - Organize projects into categories</li>
          <li><strong>Pages</strong> - Manage static pages</li>
          <li><strong>Users</strong> - Manage user accounts (admin only)</li>
        </ul>

        <h4>Recent Activity</h4>
        <p>
          The dashboard shows your recently edited projects and pages for quick access.
          Click on any item to edit it directly.
        </p>

        <h4>Need More Help?</h4>
        <p>
          Each section has its own help content. Click the help icon (?) in any section to view specific guidance.
        </p>
      </>
    )
  },

  // Projects section help
  projects: {
    title: 'Projects Help',
    content: (
      <>
        <h3>Managing Projects</h3>
        <p>
          The Projects section allows you to create, edit, and organize your portfolio projects.
        </p>

        <h4>Project List</h4>
        <p>
          The main projects page displays all your projects with key information:
        </p>
        <ul>
          <li><strong>Title</strong> - The name of the project</li>
          <li><strong>Category</strong> - The category the project belongs to</li>
          <li><strong>Status</strong> - Published or Draft</li>
          <li><strong>Actions</strong> - Edit, View, or Delete the project</li>
        </ul>

        <h4>Creating a New Project</h4>
        <p>
          Click the &quot;Add Project&quot; button to create a new project. You&apos;ll need to provide:
        </p>
        <ul>
          <li><strong>Title</strong> - The project name (required)</li>
          <li><strong>Slug</strong> - URL-friendly version of the title (auto-generated but can be customized)</li>
          <li><strong>Description</strong> - A brief summary of the project</li>
          <li><strong>Category</strong> - Select from existing categories or create a new one</li>
          <li><strong>Content</strong> - Detailed project information using the rich text editor</li>
          <li><strong>Images</strong> - Main image and gallery images</li>
        </ul>

        <h4>Project Images</h4>
        <p>
          Each project can have:
        </p>
        <ul>
          <li><strong>Main Image</strong> - Featured at the top of the project page</li>
          <li><strong>Gallery Images</strong> - Additional images shown in a gallery format</li>
        </ul>
        <p>
          Images are automatically optimized for web display. For best results, use high-quality images with a 16:9 aspect ratio.
        </p>

        <h4>Publishing Projects</h4>
        <p>
          Toggle the &quot;Published&quot; switch to control whether a project is visible on the public website.
          Draft projects are only visible in the admin panel.
        </p>
      </>
    ),
    // Project subsections
    subsections: {
      // Individual project editing page
      '[id]': {
        title: 'Project Editor Help',
        content: (
          <>
            <h3>Project Editor</h3>
            <p>
              The project editor allows you to create or edit a project's details.
            </p>

            <h4>Basic Information</h4>
            <ul>
              <li><strong>Title</strong> - The project name (required)</li>
              <li><strong>Slug</strong> - URL-friendly version of the title (auto-generated but can be customized)</li>
              <li><strong>Description</strong> - A brief summary shown in project listings</li>
              <li><strong>Year Completed</strong> - When the project was finished</li>
            </ul>

            <h4>Images</h4>
            <p>
              Upload images for your project:
            </p>
            <ul>
              <li><strong>Main Image</strong> - The primary image shown at the top of the project page</li>
              <li><strong>Gallery Images</strong> - Additional images shown in a gallery format</li>
            </ul>
            <p>
              <em>Tip: For best results, use images with a 16:9 aspect ratio and at least 1200px width.</em>
            </p>

            <h4>Content Editor</h4>
            <p>
              The rich text editor allows you to format your content with:
            </p>
            <ul>
              <li>Headings, paragraphs, and lists</li>
              <li>Bold, italic, and underlined text</li>
              <li>Links to other pages or external websites</li>
              <li>Embedded images and alignment options</li>
            </ul>

            <h4>Category Selection</h4>
            <p>
              Assign your project to a category to organize it in the portfolio section.
              You can select an existing category or create a new one directly from this dropdown.
            </p>

            <h4>Publishing</h4>
            <p>
              Toggle the &quot;Published&quot; switch to control whether the project is visible on the public website.
              You can save projects as drafts while you work on them.
            </p>

            <h4>Preview</h4>
            <p>
              Use the &quot;Preview&quot; button to see how your project will look on the public website before publishing.
            </p>
          </>
        )
      },
      // Project images page
      images: {
        title: 'Project Images Help',
        content: (
          <>
            <h3>Managing Project Images</h3>
            <p>
              This page allows you to manage the gallery images for your project.
            </p>

            <h4>Uploading Images</h4>
            <p>
              Click the &quot;Upload Images&quot; button to add new images to the project gallery.
              You can select multiple images at once.
            </p>

            <h4>Image Management</h4>
            <p>
              For each image in the gallery:
            </p>
            <ul>
              <li>Hover over an image to see the delete option</li>
              <li>Click the trash icon to remove an image from the gallery</li>
            </ul>

            <h4>Image Optimization</h4>
            <p>
              All uploaded images are automatically optimized for web display.
              For best results:
            </p>
            <ul>
              <li>Use high-quality images (at least 1200px wide)</li>
              <li>Prefer 16:9 aspect ratio for consistency</li>
              <li>Use JPG or PNG formats</li>
            </ul>

            <h4>Image Order</h4>
            <p>
              Images are displayed in the order they were uploaded.
              To change the order, you&apos;ll need to delete and re-upload images.
            </p>
          </>
        )
      }
    }
  },

  // Categories section help
  categories: {
    title: 'Categories Help',
    content: (
      <>
        <h3>Managing Categories</h3>
        <p>
          Categories help organize your projects into logical groups for easier navigation.
        </p>

        <h4>Category Structure</h4>
        <p>
          Categories can have a hierarchical structure:
        </p>
        <ul>
          <li><strong>Parent Categories</strong> - Top-level categories (e.g., &quot;Architecture&quot;)</li>
          <li><strong>Child Categories</strong> - Subcategories that belong to a parent (e.g., &quot;Residential&quot; under &quot;Architecture&quot;)</li>
        </ul>
        <p>
          This hierarchy is reflected in the website navigation and URL structure.
        </p>

        <h4>Creating Categories</h4>
        <p>
          Click the &quot;Add Category&quot; button to create a new category. You&apos;ll need to provide:
        </p>
        <ul>
          <li><strong>Name</strong> - The category name (required)</li>
          <li><strong>Slug</strong> - URL-friendly version of the name (auto-generated but can be customized)</li>
          <li><strong>Parent Category</strong> - Optional parent category for hierarchical organization</li>
        </ul>

        <h4>Category Management</h4>
        <p>
          For each category, you can:
        </p>
        <ul>
          <li><strong>Edit</strong> - Modify the name, slug, or parent category</li>
          <li><strong>Delete</strong> - Remove the category (only if it has no projects or child categories)</li>
        </ul>

        <h4>Best Practices</h4>
        <ul>
          <li>Use clear, descriptive category names</li>
          <li>Limit nesting to 2-3 levels for better usability</li>
          <li>Be consistent with naming conventions</li>
          <li>Consider the user's perspective when organizing categories</li>
        </ul>

        <h4>Category Limitations</h4>
        <p>
          Keep in mind these limitations:
        </p>
        <ul>
          <li>You cannot delete a category that contains projects</li>
          <li>You cannot delete a category that has child categories</li>
          <li>A category cannot be its own parent (no circular references)</li>
          <li>Only top-level categories can be selected as parents (to prevent deep nesting)</li>
        </ul>
      </>
    )
  },

  // Pages section help
  pages: {
    title: 'Pages Help',
    content: (
      <>
        <h3>Managing Pages</h3>
        <p>
          The Pages section allows you to create and manage static pages for your website.
        </p>

        <h4>Page Types</h4>
        <p>
          You can create different types of pages:
        </p>
        <ul>
          <li><strong>Standard Pages</strong> - Regular content pages</li>
          <li><strong>Landing Pages</strong> - Special pages with custom layouts</li>
          <li><strong>Redirect Pages</strong> - Pages that redirect to another URL</li>
        </ul>

        <h4>Creating a New Page</h4>
        <p>
          Click the &quot;Add Page&quot; button to create a new page. You&apos;ll need to provide:
        </p>
        <ul>
          <li><strong>Title</strong> - The page name (required)</li>
          <li><strong>Slug</strong> - URL-friendly version of the title (auto-generated but can be customized)</li>
          <li><strong>Description</strong> - A brief summary of the page</li>
          <li><strong>Content</strong> - The main page content using the rich text editor</li>
          <li><strong>Featured Image</strong> - Optional header image for the page</li>
          <li><strong>Page Type</strong> - The type of page you're creating</li>
          <li><strong>Parent Page</strong> - Optional parent page for hierarchical organization</li>
        </ul>

        <h4>Page Hierarchy</h4>
        <p>
          Pages can have a hierarchical structure similar to categories:
        </p>
        <ul>
          <li><strong>Parent Pages</strong> - Top-level pages</li>
          <li><strong>Child Pages</strong> - Subpages that belong to a parent</li>
        </ul>
        <p>
          This hierarchy is reflected in the URL structure (e.g., /parent-page/child-page).
        </p>

        <h4>SEO Settings</h4>
        <p>
          Each page has SEO settings you can configure:
        </p>
        <ul>
          <li><strong>Meta Title</strong> - The title shown in search results (defaults to page title)</li>
          <li><strong>Meta Description</strong> - The description shown in search results</li>
        </ul>

        <h4>Publishing Pages</h4>
        <p>
          Toggle the &quot;Published&quot; switch to control whether a page is visible on the public website.
          Draft pages are only visible in the admin panel.
        </p>
      </>
    ),
    // Page subsections
    subsections: {
      // Individual page editing
      '[id]': {
        title: 'Page Editor Help',
        content: (
          <>
            <h3>Page Editor</h3>
            <p>
              The page editor allows you to create or edit a page's content and settings.
            </p>

            <h4>Basic Information</h4>
            <ul>
              <li><strong>Title</strong> - The page name (required)</li>
              <li><strong>Slug</strong> - URL-friendly version of the title</li>
              <li><strong>Description</strong> - A brief summary of the page</li>
            </ul>

            <h4>Content Editor</h4>
            <p>
              The rich text editor allows you to format your content with:
            </p>
            <ul>
              <li>Headings, paragraphs, and lists</li>
              <li>Bold, italic, and underlined text</li>
              <li>Links to other pages or external websites</li>
              <li>Embedded images and alignment options</li>
              <li>Tables for structured data</li>
            </ul>

            <h4>Featured Image</h4>
            <p>
              Upload a featured image to be displayed at the top of the page.
              For best results, use an image with a 16:9 aspect ratio and at least 1200px width.
            </p>

            <h4>Page Settings</h4>
            <ul>
              <li><strong>Page Type</strong> - Standard, Landing, or Redirect</li>
              <li><strong>Parent Page</strong> - Optional parent for hierarchical organization</li>
              <li><strong>Sort Order</strong> - Controls the order in navigation menus</li>
            </ul>

            <h4>SEO Settings</h4>
            <ul>
              <li><strong>Meta Title</strong> - Title shown in search results (defaults to page title)</li>
              <li><strong>Meta Description</strong> - Description shown in search results</li>
            </ul>

            <h4>Publishing</h4>
            <p>
              Toggle the &quot;Published&quot; switch to control whether the page is visible on the public website.
              You can save pages as drafts while you work on them.
            </p>

            <h4>Preview</h4>
            <p>
              Use the &quot;Preview&quot; button to see how your page will look on the public website before publishing.
            </p>
          </>
        )
      }
    }
  },

  // Users section help
  users: {
    title: 'Users Help',
    content: (
      <>
        <h3>Managing Users</h3>
        <p>
          The Users section allows administrators to manage user accounts for the admin panel.
        </p>

        <h4>User Roles</h4>
        <p>
          The system supports different user roles with varying permissions:
        </p>
        <ul>
          <li><strong>Administrator</strong> - Full access to all features</li>
          <li><strong>Editor</strong> - Can create and edit content but cannot manage users</li>
          <li><strong>Author</strong> - Can create content but can only edit their own content</li>
        </ul>

        <h4>Creating Users</h4>
        <p>
          Click the &quot;Add User&quot; button to create a new user account. You&apos;ll need to provide:
        </p>
        <ul>
          <li><strong>Name</strong> - The user&apos;s full name</li>
          <li><strong>Email</strong> - The user&apos;s email address (used for login)</li>
          <li><strong>Password</strong> - Initial password (user can change later)</li>
          <li><strong>Role</strong> - The user&apos;s permission level</li>
        </ul>

        <h4>User Management</h4>
        <p>
          For each user, you can:
        </p>
        <ul>
          <li><strong>Edit</strong> - Modify the user&apos;s details or role</li>
          <li><strong>Reset Password</strong> - Generate a new password for the user</li>
          <li><strong>Disable/Enable</strong> - Temporarily disable access without deleting the account</li>
          <li><strong>Delete</strong> - Permanently remove the user account</li>
        </ul>

        <h4>Security Best Practices</h4>
        <ul>
          <li>Assign the minimum necessary permissions to each user</li>
          <li>Regularly review user accounts and remove unused ones</li>
          <li>Encourage users to use strong, unique passwords</li>
          <li>Disable accounts instead of deleting them if temporary removal is needed</li>
        </ul>
      </>
    )
  }
};
