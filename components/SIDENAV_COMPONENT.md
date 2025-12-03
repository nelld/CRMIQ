# SideNav Component

## Quick Reference

### Files Created
- `sidenav.html` - Component HTML template
- `sidenav.css` - Component styles
- `components.js` - Added `initSideNav()` method

### Basic Usage

```html
<!-- Add container -->
<div id="sidenav-container"></div>

<!-- Add class to main content -->
<main class="has-sidenav">
    <!-- Your content -->
</main>
```

```javascript
// Initialize
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
        }
    ]
});
```

### Features
✅ Collapsible (desktop)  
✅ Responsive (mobile slide-in)  
✅ Groups & dividers  
✅ Badges  
✅ Submenus  
✅ Active states  
✅ Smooth animations  

### Full Documentation
📚 See `SIDENAV_USAGE.md` in project root for complete documentation

### Example
🎯 See `html/sidenav-example.html` for working demo

