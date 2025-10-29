# CRM IQ Components Usage Guide

This document explains how to use the reusable component system for consistent styling across all pages.

## Overview

The component system includes:
- **App Header** - Main navigation header with logo and menu
- **Breadcrumb** - Navigation breadcrumb trail
- **Page Header** - Page title and actions section
- **Tabs** - Horizontal tab navigation

## Setup

### 1. Include Required Files in Your HTML

Add these to your `<head>` section:

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="styles.css?v=190">
<link rel="stylesheet" href="components/components.css">
```

Add this before the closing `</body>` tag:

```html
<script src="components/components.js"></script>
```

### 2. Add Component Containers

Add empty container divs where you want components to appear:

```html
<body>
    <!-- App Header -->
    <div id="app-header-container"></div>
    
    <!-- Breadcrumb (optional) -->
    <div id="breadcrumb-container"></div>
    
    <!-- Page Header -->
    <div id="page-header-container"></div>
    
    <!-- Tabs (optional) -->
    <div id="tabs-container"></div>
    
    <!-- Your page content -->
    <main class="container mx-auto p-6">
        <!-- Content here -->
    </main>
</body>
```

### 3. Initialize Components

Add a script to initialize the components after the page loads:

```html
<script>
    // Initialize components when DOM is ready
    document.addEventListener('DOMContentLoaded', async () => {
        await CRMComponents.initAll({
            appHeader: true,
            breadcrumb: {
                containerId: 'breadcrumb-container',
                data: 'Home|Search|Page Name'
            },
            pageHeader: {
                containerId: 'page-header-container',
                title: 'Your Page Title',
                subtitle: 'Optional subtitle text',
                badges: [
                    { text: 'Current', color: 'green' },
                    { text: 'Primary', color: 'gray' }
                ],
                actionsHtml: `
                    <button class="btn btn-light">
                        <i class="fas fa-icon"></i>
                        <span>Button Text</span>
                    </button>
                `,
                hasBreadcrumb: true  // Set to false if no breadcrumb
            },
            tabs: {
                containerId: 'tabs-container',
                tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
                activeIndex: 0,
                hasBreadcrumb: true,  // Set to false if no breadcrumb
                onChange: (index, tabName) => {
                    console.log('Tab changed:', tabName);
                    // Your tab change logic here
                }
            }
        });
    });
</script>
```

## Component Details

### App Header

**Usage:**
```html
<div id="app-header-container"></div>

<script>
    CRMComponents.initAppHeader('app-header-container');
</script>
```

The app header includes:
- CRM IQ logo
- Navigation menu (Dashboards, Reports, Communications)
- Search bar
- Add New button
- Calendar and Calculator buttons
- User profile section

### Breadcrumb

**Usage:**
```html
<div id="breadcrumb-container"></div>

<script>
    CRMComponents.initBreadcrumb('breadcrumb-container', 'Home|Search|Page Name');
</script>
```

Or use data attribute:
```html
<div id="breadcrumb-container" data-breadcrumb="Home|Search|Page Name"></div>
```

**Parameters:**
- `containerId` - ID of the container div
- `breadcrumbData` - Pipe-separated breadcrumb items (e.g., "Home|Search|Page")

### Page Header

**Usage:**
```javascript
await CRMComponents.initPageHeader({
    containerId: 'page-header-container',
    title: 'Page Title',
    subtitle: 'Optional subtitle',
    badges: [
        { text: 'Badge Text', color: 'green' }  // Colors: green, red, yellow, blue, gray
    ],
    actionsHtml: '<button class="btn btn-primary">Action</button>',
    hasBreadcrumb: true  // Important for sticky positioning
});
```

**Parameters:**
- `containerId` - ID of the container div (default: 'page-header-container')
- `title` - Page title text (required)
- `subtitle` - Subtitle text below title (optional)
- `badges` - Array of badge objects with text and color (optional)
- `actionsHtml` - HTML string for action buttons (optional)
- `hasBreadcrumb` - Boolean, affects sticky positioning (default: false)

**Sticky Positioning:**
- If `hasBreadcrumb: true` → sticks at top: 105px
- If `hasBreadcrumb: false` → sticks at top: 0

### Tabs

**Usage:**
```javascript
await CRMComponents.initTabs({
    containerId: 'tabs-container',
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
    activeIndex: 0,
    hasBreadcrumb: false,
    onChange: (index, tabName) => {
        // Handle tab change
        console.log('Switched to:', tabName);
    }
});
```

**Parameters:**
- `containerId` - ID of the container div (default: 'tabs-container')
- `tabs` - Array of tab names (required)
- `activeIndex` - Index of initially active tab (default: 0)
- `hasBreadcrumb` - Boolean, affects sticky positioning (default: false)
- `onChange` - Callback function when tab is clicked (optional)

**Sticky Positioning:**
- If `hasBreadcrumb: true` → sticks at top: 159px
- If `hasBreadcrumb: false` → sticks at top: 54px

## Examples

### Example 1: Dashboard Page (No Breadcrumb)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="base.css">
    <link rel="stylesheet" href="styles.css?v=190">
    <link rel="stylesheet" href="components/components.css">
</head>
<body>
    <div id="app-header-container"></div>
    <div id="page-header-container"></div>
    <div id="tabs-container"></div>
    
    <main class="container mx-auto p-6">
        <div id="tab-content">Content here</div>
    </main>
    
    <script src="components/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            await CRMComponents.initAll({
                appHeader: true,
                pageHeader: {
                    title: 'Units & Pricing Dashboard',
                    actionsHtml: `
                        <button class="btn btn-light">
                            <i class="fas fa-map"></i>
                            <span>View Floor Plans</span>
                        </button>
                    `,
                    hasBreadcrumb: false
                },
                tabs: {
                    tabs: ['All Units', 'Leasing Specials', 'Unit Type Pricing'],
                    activeIndex: 0,
                    hasBreadcrumb: false,
                    onChange: (index) => {
                        // Load tab content
                    }
                }
            });
        });
    </script>
</body>
</html>
```

### Example 2: Detail Page (With Breadcrumb)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resident Details</title>
    <link rel="stylesheet" href="base.css">
    <link rel="stylesheet" href="styles.css?v=190">
    <link rel="stylesheet" href="components/components.css">
</head>
<body>
    <div id="app-header-container"></div>
    <div id="breadcrumb-container"></div>
    <div id="page-header-container"></div>
    
    <main class="container mx-auto p-6">
        <div class="content">Content here</div>
    </main>
    
    <script src="components/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            await CRMComponents.initAll({
                appHeader: true,
                breadcrumb: {
                    data: 'Home|Search|Melinda Michaels|Cityview Towers'
                },
                pageHeader: {
                    title: 'Melinda Michaels',
                    subtitle: '<span>Cityview Towers<span class="ml-1">(p0031246)</span></span>',
                    badges: [
                        { text: 'Current', color: 'green' },
                        { text: 'Primary', color: 'gray' }
                    ],
                    actionsHtml: `
                        <button class="btn btn-light">
                            <span>Actions</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    `,
                    hasBreadcrumb: true
                }
            });
        });
    </script>
</body>
</html>
```

## Benefits

1. **Consistency** - All pages use the same header, navigation, and layout
2. **Easy Updates** - Change one component file to update all pages
3. **Maintainability** - Centralized styling and structure
4. **Flexibility** - Each component can be customized per page
5. **Clean Code** - No duplicate HTML across pages

## Customization

### Custom Styling

You can add custom styles that override component styles by adding them after the component CSS:

```html
<link rel="stylesheet" href="components/components.css">
<style>
    /* Your custom overrides */
    .page-header {
        padding: 20px 16px;
    }
</style>
```

### Modifying Components

To modify a component:
1. Edit the component HTML file in `components/` directory
2. Changes will apply to all pages using that component
3. Test on multiple pages to ensure consistency

## Troubleshooting

**Components not appearing:**
- Check that `components.js` is loaded before your initialization script
- Verify container IDs match between HTML and JavaScript
- Check browser console for errors

**Sticky positioning issues:**
- Ensure `hasBreadcrumb` parameter is set correctly
- Check that `components.css` is loaded
- Verify z-index values aren't conflicting with other elements

**Styling inconsistencies:**
- Make sure all CSS files are loaded in the correct order
- Check for custom styles overriding component styles
- Clear browser cache after CSS changes

