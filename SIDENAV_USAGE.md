# SideNav Component Usage

## Overview
The SideNav component provides a collapsible left navigation menu for your CRM IQ pages. It features smooth animations, responsive behavior, and support for nested menus.

## Files
- `components/sidenav.html` - Component HTML template
- `components/sidenav.css` - Component styles
- `components/components.js` - Initialization logic (initSideNav method)

## Basic Setup

### 1. Add Container to HTML
```html
<!-- Side Navigation Container -->
<div id="sidenav-container"></div>

<!-- Main Content (add class to adjust for sidenav) -->
<main class="has-sidenav">
    <!-- Your content here -->
</main>
```

### 2. Include Component Assets
```html
<link rel="stylesheet" href="../components/components.css">
<script src="../components/components.js"></script>
```

### 3. Initialize Component
```javascript
// Initialize with configuration
await CRMComponents.initSideNav({
    containerId: 'sidenav-container',
    collapsed: false,
    toggleButton: true,
    activeIndex: 0,
    items: [
        {
            icon: 'fas fa-home',
            label: 'Dashboard',
            href: '#dashboard',
            id: 'dashboard'
        },
        {
            icon: 'fas fa-users',
            label: 'Contacts',
            href: '#contacts',
            badge: '5',
            id: 'contacts'
        },
        {
            type: 'divider'
        },
        {
            type: 'group',
            title: 'Settings',
            items: [
                {
                    icon: 'fas fa-cog',
                    label: 'Preferences',
                    href: '#preferences',
                    id: 'preferences'
                },
                {
                    icon: 'fas fa-user',
                    label: 'Profile',
                    href: '#profile',
                    id: 'profile'
                }
            ]
        }
    ],
    onChange: (index, id, element) => {
        console.log('Navigation changed:', index, id);
    }
});
```

## Configuration Options

### Main Config Object
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | `'sidenav-container'` | ID of the container element |
| `collapsed` | boolean | `false` | Initial collapsed state |
| `toggleButton` | boolean | `true` | Show collapse/expand toggle button |
| `activeIndex` | number/string | `0` | Initially active item index |
| `onChange` | function | `null` | Callback when navigation item is clicked |
| `items` | array | `[]` | Navigation items configuration |

### Navigation Item Options

#### Regular Item
```javascript
{
    icon: 'fas fa-home',      // Font Awesome icon class
    label: 'Dashboard',        // Display text
    href: '#dashboard',        // Link URL
    id: 'dashboard',          // Unique identifier
    active: false,            // Initially active
    badge: '5'                // Optional badge text/number
}
```

#### Group Item
```javascript
{
    type: 'group',
    title: 'Section Name',    // Optional group title
    items: [
        // Array of regular items
    ]
}
```

#### Divider
```javascript
{
    type: 'divider'
}
```

#### Item with Submenu
```javascript
{
    icon: 'fas fa-folder',
    label: 'Projects',
    id: 'projects',
    submenu: [
        {
            icon: 'fas fa-circle',
            label: 'Active Projects',
            href: '#active',
            id: 'active-projects'
        },
        {
            icon: 'fas fa-circle',
            label: 'Archived',
            href: '#archived',
            id: 'archived-projects'
        }
    ]
}
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page with SideNav</title>
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../components/components.css">
</head>
<body>
    <!-- App Header -->
    <div id="app-header-container"></div>

    <!-- Side Navigation -->
    <div id="sidenav-container"></div>

    <!-- Main Content -->
    <main class="has-sidenav" style="padding: 24px;">
        <h1>Page Content</h1>
        <p>Your content here...</p>
    </main>

    <script src="../components/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            // Initialize components
            await CRMComponents.initAll({
                appHeader: true,
                sideNav: {
                    items: [
                        {
                            icon: 'fas fa-home',
                            label: 'Dashboard',
                            href: '#dashboard',
                            id: 'dashboard',
                            active: true
                        },
                        {
                            icon: 'fas fa-chart-line',
                            label: 'Analytics',
                            href: '#analytics',
                            id: 'analytics',
                            badge: 'NEW'
                        },
                        {
                            icon: 'fas fa-users',
                            label: 'Contacts',
                            href: '#contacts',
                            id: 'contacts',
                            badge: '12'
                        },
                        {
                            type: 'divider'
                        },
                        {
                            type: 'group',
                            title: 'Management',
                            items: [
                                {
                                    icon: 'fas fa-building',
                                    label: 'Properties',
                                    href: '#properties',
                                    id: 'properties'
                                },
                                {
                                    icon: 'fas fa-dollar-sign',
                                    label: 'Pricing',
                                    href: '#pricing',
                                    id: 'pricing'
                                }
                            ]
                        },
                        {
                            type: 'group',
                            title: 'Settings',
                            items: [
                                {
                                    icon: 'fas fa-cog',
                                    label: 'Preferences',
                                    href: '#preferences',
                                    id: 'preferences'
                                },
                                {
                                    icon: 'fas fa-user',
                                    label: 'Profile',
                                    href: '#profile',
                                    id: 'profile'
                                }
                            ]
                        }
                    ],
                    onChange: (index, id) => {
                        console.log('Navigated to:', id);
                    }
                }
            });
        });
    </script>
</body>
</html>
```

## Responsive Behavior

### Desktop (> 768px)
- Side navigation is visible by default
- Can be collapsed using toggle button
- Content area adjusts automatically

### Mobile (≤ 768px)
- Side navigation is hidden off-screen by default
- Slides in when opened
- Includes overlay that closes nav when clicked
- Toggle mobile sidenav:
  ```javascript
  CRMComponents.toggleMobileSideNav('sidenav-container');
  ```

## Styling Customization

### CSS Variables
You can customize the sidenav by overriding these classes:

```css
/* Change width */
.sidenav {
    width: 280px; /* Default: 240px */
}

.sidenav.collapsed {
    width: 80px; /* Default: 60px */
}

/* Adjust main content margin */
.has-sidenav {
    margin-left: 280px;
}

/* Custom active state color */
.sidenav-item.active {
    background-color: #your-color;
    color: #your-text-color;
    border-left-color: #your-border-color;
}
```

## Features

✅ **Collapsible** - Toggle between expanded and collapsed states  
✅ **Responsive** - Mobile-friendly with slide-in behavior  
✅ **Groups** - Organize items into logical sections  
✅ **Badges** - Display counts or labels  
✅ **Submenus** - Support for nested navigation  
✅ **Smooth Animations** - Transitions and hover effects  
✅ **Active State** - Visual indication of current page  
✅ **Customizable** - Easy to style and configure  

## Methods

### Toggle Collapsed State (Desktop)
```javascript
const sidenav = document.querySelector('.sidenav');
sidenav.classList.toggle('collapsed');

const mainContent = document.querySelector('.has-sidenav');
mainContent.classList.toggle('sidenav-collapsed');
```

### Open/Close Mobile Menu
```javascript
CRMComponents.toggleMobileSideNav('sidenav-container');
```

### Update Active Item Programmatically
```javascript
// Remove active from all
document.querySelectorAll('.sidenav-item').forEach(item => {
    item.classList.remove('active');
});

// Add active to specific item
const targetItem = document.querySelector('[data-nav-id="dashboard"]');
if (targetItem) {
    targetItem.classList.add('active');
}
```

## Tips

1. **Icon Library**: Uses Font Awesome by default. Ensure it's included in your page.
2. **Active State**: Set `active: true` on the initial item or use `activeIndex` config.
3. **Badges**: Keep badge text short (1-3 characters or short words work best).
4. **Groups**: Use groups to organize related navigation items.
5. **Mobile**: Add a hamburger menu button to toggle mobile navigation.
6. **Performance**: Component uses CSS transitions for smooth animations.

## Integration with Other Components

The SideNav component works seamlessly with other CRM IQ components:

```javascript
await CRMComponents.initAll({
    appHeader: true,
    pageHeader: {
        title: 'Dashboard',
        subtitle: 'Overview'
    },
    sideNav: {
        items: [/* your items */]
    },
    tabs: {
        tabs: ['Tab 1', 'Tab 2', 'Tab 3']
    }
});
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)


