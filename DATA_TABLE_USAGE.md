# Data Table Component Usage Guide

The Data Table component is a flexible, feature-rich table component for displaying and managing tabular data.

## Features

- ✅ Searchable data
- ✅ Sortable columns
- ✅ Custom cell rendering
- ✅ Checkboxes for row selection
- ✅ Optional header actions
- ✅ Row click handlers
- ✅ Action menu per row
- ✅ Badge counter
- ✅ Responsive design
- ✅ Clean, modern styling

## Setup

### 1. Include Required Files

Add these to your HTML `<head>`:

```html
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="components/components.css">
<link rel="stylesheet" href="components/data-table.css">
```

Add the component JavaScript before closing `</body>`:

```html
<script src="components/components-standalone.js"></script>
```

### 2. Add Container

Add a container div where you want the table to appear:

```html
<div id="data-table-container"></div>
```

### 3. Initialize the Component

```javascript
document.addEventListener('DOMContentLoaded', () => {
    CRMComponents.initDataTable({
        containerId: 'data-table-container',
        columns: columns,           // Array of column definitions
        data: data,                 // Array of data objects
        badgeLabel: 'Items',        // Label for the count badge
        headerActions: [],          // Optional header action buttons
        onRowClick: (row, index) => {},     // Optional row click handler
        onActionClick: (row, index, btn) => {} // Optional action menu handler
    });
});
```

## Column Configuration

### Basic Column

```javascript
{
    key: 'name',              // Key in data object
    label: 'Name',            // Header label
    sortable: true            // Optional, default true
}
```

### Checkbox Column

```javascript
{
    type: 'checkbox'          // Special type for selection checkboxes
}
```

### Actions Column

```javascript
{
    type: 'actions',          // Special type for action menu
    label: 'Actions'          // Optional label
}
```

### Column with Custom Render

```javascript
{
    key: 'assignee',
    label: 'Assignee',
    sortable: true,
    render: (value, row) => {
        return `
            <div class="cell-multiline">
                <a href="#">${value}</a>
                <div class="text-muted text-sm">${row.subtitle}</div>
            </div>
        `;
    }
}
```

## Cell Styling Classes

### Multi-line Cells

```html
<div class="cell-multiline">
    <a href="#">Primary Text</a>
    <div class="text-muted text-sm">Secondary Text</div>
</div>
```

### Status Badges

Use standard badge classes from the design system (always use -lighten60 variant):

```html
<span class="badge badge-pill badge-success-lighten60">Approved</span>
<span class="badge badge-pill badge-info-lighten60">In Progress</span>
<span class="badge badge-pill badge-warning-lighten60">Scheduled</span>
<span class="badge badge-pill badge-secondary-lighten60">Pending</span>
```

### Priority Badges

Use standard badge classes from the design system (always use -lighten60 variant):

```html
<span class="badge badge-pill badge-danger-lighten60">Urgent</span>
<span class="badge badge-pill badge-danger-lighten60">High</span>
<span class="badge badge-pill badge-warning-lighten60">Medium</span>
<span class="badge badge-pill badge-info-lighten60">Low</span>
```

**Note:** Always use the `-lighten60` variant for consistent, softer badge colors throughout the application.

**Available badge colors:** primary, secondary, success, info, warning, danger, orange, dark  
**Color variants:** -lighten60, -lighten30, -darken30, -darken60

For outline badges, use `badge-outline-{color}` instead of `badge-{color}`.

### Date/Time Display

```html
<div class="cell-multiline">
    <div class="date-display">Feb 12, 2016</div>
    <div class="text-muted text-sm">12:24 PM</div>
</div>
```

### Category Display

```html
<div class="cell-multiline">
    <div class="category-main">Electrical</div>
    <div class="text-muted text-sm">Wiring</div>
</div>
```

## Header Actions

Add optional action buttons that appear in the table header:

```javascript
headerActions: [
    {
        id: 'assign',
        label: 'Assign',
        icon: 'fas fa-user-plus',
        onClick: () => {
            console.log('Assign action clicked');
            // Your header action logic here
        }
    },
    {
        id: 'export',
        label: 'Export',
        icon: 'fas fa-download',
        onClick: () => {
            // Export logic
        }
    }
]
```

To disable header actions, set `headerActions: []` or omit it.

## Event Handlers

### Row Click Handler

Called when a row is clicked (excludes checkbox and action button clicks):

```javascript
onRowClick: (row, index) => {
    console.log('Clicked row:', row);
    console.log('Row index:', index);
    // Navigate to detail page, open modal, etc.
}
```

### Action Menu Handler

Called when the action menu button (three dots) is clicked:

```javascript
onActionClick: (row, index, button) => {
    console.log('Action clicked for:', row);
    console.log('Button element:', button);
    // Show context menu, dropdown, etc.
}
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Data Table Example</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="base.css">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="components/components.css">
    <link rel="stylesheet" href="components/data-table.css">
</head>
<body>
    <div id="app-header-container"></div>
    <div id="page-header-container"></div>
    
    <main class="container mx-auto p-6">
        <div id="data-table-container"></div>
    </main>
    
    <script src="components/components-standalone.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Sample data
            const data = [
                {
                    name: 'John Doe',
                    role: 'Manager',
                    email: 'john@example.com',
                    status: 'Active',
                    priority: 'High'
                },
                {
                    name: 'Jane Smith',
                    role: 'Developer',
                    email: 'jane@example.com',
                    status: 'Active',
                    priority: 'Medium'
                }
            ];
            
            // Column definitions
            const columns = [
                {
                    type: 'checkbox'
                },
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true,
                    render: (value, row) => {
                        return `
                            <div class="cell-multiline">
                                <a href="#">${value}</a>
                                <div class="text-muted text-sm">${row.role}</div>
                            </div>
                        `;
                    }
                },
                {
                    key: 'email',
                    label: 'Email',
                    sortable: true
                },
                {
                    key: 'status',
                    label: 'Status',
                    sortable: true,
                    render: (value) => {
                        let badgeClass = 'badge-secondary';
                        if (value === 'Active') badgeClass = 'badge-success';
                        return `<span class="badge badge-pill ${badgeClass}">${value}</span>`;
                    }
                },
                {
                    key: 'priority',
                    label: 'Priority',
                    sortable: true,
                    render: (value) => {
                        let badgeClass = 'badge-secondary';
                        if (value === 'High') badgeClass = 'badge-danger';
                        else if (value === 'Medium') badgeClass = 'badge-warning';
                        else if (value === 'Low') badgeClass = 'badge-info';
                        return `<span class="badge badge-pill ${badgeClass}">${value}</span>`;
                    }
                },
                {
                    type: 'actions',
                    label: 'Actions'
                }
            ];
            
            // Initialize components
            CRMComponents.initAll({
                appHeader: true,
                pageHeader: {
                    title: 'Users',
                    actionsHtml: `<button class="btn btn-primary">Add User</button>`
                }
            });
            
            // Initialize table
            CRMComponents.initDataTable({
                containerId: 'data-table-container',
                columns: columns,
                data: data,
                badgeLabel: 'Users',
                headerActions: [
                    {
                        id: 'export',
                        label: 'Export',
                        icon: 'fas fa-download',
                        onClick: () => {
                            alert('Exporting users');
                        }
                    }
                ],
                onRowClick: (row) => {
                    console.log('Row clicked:', row);
                },
                onActionClick: (row) => {
                    alert(`Actions for ${row.name}`);
                }
            });
        });
    </script>
</body>
</html>
```

## Customization

### Custom Badge Colors

The badge count is blue by default. To customize, override in your CSS:

```css
.table-badge {
    background: #10b981; /* Green */
}
```

### Custom Table Styling

Override any table styles:

```css
.data-table thead {
    background: #1e40af; /* Darker blue header */
    color: white;
}

.data-table tbody tr:hover {
    background: #eff6ff; /* Light blue hover */
}
```

### Adjust Column Widths

Target specific columns:

```css
.data-table th:nth-child(2) {
    min-width: 200px;
}
```

## Search Functionality

The search box automatically filters all visible columns based on the search term. The badge count updates to show filtered results.

## Tips

1. **Use custom render functions** for complex cell content (badges, links, multi-line text)
2. **Keep header actions optional** - only add them when needed
3. **Use semantic class names** for custom styling
4. **Test with large datasets** - the table is responsive and scrollable
5. **Provide meaningful callback handlers** for better user experience

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

