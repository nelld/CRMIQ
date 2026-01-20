# SideNav Component - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Add the HTML Container

```html
<body>
    <!-- App Header -->
    <div id="app-header-container"></div>
    
    <!-- Side Navigation -->
    <div id="sidenav-container"></div>
    
    <!-- Main Content - Add 'has-sidenav' class -->
    <main class="has-sidenav">
        <!-- Your content here -->
    </main>
</body>
```

### Step 2: Include Required Files

```html
<head>
    <!-- Existing files -->
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/styles.css">
    
    <!-- Components CSS (includes sidenav.css) -->
    <link rel="stylesheet" href="../components/components.css">
</head>

<!-- Before closing </body> -->
<script src="../components/components.js"></script>
```

### Step 3: Initialize the Component

```javascript
document.addEventListener('DOMContentLoaded', async () => {
    await CRMComponents.initSideNav({
        items: [
            {
                icon: 'fas fa-home',
                label: 'Dashboard',
                href: '#dashboard',
                id: 'dashboard',
                active: true
            },
            {
                icon: 'fas fa-users',
                label: 'Contacts',
                href: '#contacts',
                id: 'contacts',
                badge: '5'
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
                    }
                ]
            }
        ]
    });
});
```

## ✨ That's It!

Your side navigation is now ready to use.

## 🎯 Try the Demo

Open `html/sidenav-example.html` in your browser to see a working example with all features.

## 📱 Mobile Support

On mobile devices (≤ 768px), add a hamburger menu button:

```html
<button onclick="CRMComponents.toggleMobileSideNav()">
    <i class="fas fa-bars"></i>
</button>
```

## 🎨 Common Customizations

### Change Width
```css
.sidenav {
    width: 280px; /* Default: 240px */
}
```

### Change Active Color
```css
.sidenav-item.active {
    background-color: #your-color;
    border-left-color: #your-accent;
}
```

### Start Collapsed
```javascript
await CRMComponents.initSideNav({
    collapsed: true,  // Start in collapsed state
    items: [/* ... */]
});
```

## 📚 Need More Help?

- **Full Documentation**: `SIDENAV_USAGE.md`
- **Implementation Details**: `SIDENAV_SUMMARY.md`
- **Quick Reference**: `components/SIDENAV_COMPONENT.md`
- **Working Example**: `html/sidenav-example.html`

## 💡 Common Item Types

```javascript
// Regular item
{ icon: 'fas fa-home', label: 'Home', href: '#home', id: 'home' }

// Item with badge
{ icon: 'fas fa-bell', label: 'Notifications', href: '#notifs', badge: '3' }

// Divider
{ type: 'divider' }

// Group
{
    type: 'group',
    title: 'Section Name',
    items: [/* ... */]
}

// Item with submenu
{
    icon: 'fas fa-folder',
    label: 'Projects',
    submenu: [
        { icon: 'fas fa-circle', label: 'Active', href: '#active' }
    ]
}
```

## 🔧 Integration with Other Components

```javascript
await CRMComponents.initAll({
    appHeader: true,
    sideNav: {
        items: [/* ... */]
    },
    pageHeader: {
        title: 'My Page'
    },
    tabs: {
        tabs: ['Tab 1', 'Tab 2']
    }
});
```

---

**Created**: December 3, 2025  
**Status**: ✅ Ready to use  
**Version**: 1.0


