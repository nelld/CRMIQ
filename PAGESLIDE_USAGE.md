# Pageslide Component Usage Guide

The pageslide component is a slide-out panel that appears from the right side of the screen. It features a header, body, and footer section, with flexible sizing options.

## Setup

The pageslide component is automatically initialized in `unit-pricing-dashboard.html`. The component container is already added at the end of the body:

```html
<!-- Pageslide Container -->
<div id="pageslide-container"></div>

<script>
    // Initialize pageslide component
    CRMComponents.initPageslide('pageslide-container');
</script>
```

## Opening a Pageslide

Use the `openPageslide()` function with an options object:

```javascript
openPageslide({
    title: 'Edit Property',
    size: 'md',  // Options: 'sm', 'md', 'lg', 'xl', 'full'
    content: `
        <div class="form-group">
            <label class="form-label">Property Name</label>
            <input type="text" class="form-input" value="Loblolly Pine Villas">
        </div>
        <div class="form-group">
            <label class="form-label">Property Code</label>
            <input type="text" class="form-input" value="lq01">
        </div>
    `,
    footer: `
        <button class="btn btn-light" onclick="closePageslide()">Cancel</button>
        <button class="btn btn-primary" onclick="saveProperty()">Save Changes</button>
    `
});
```

## Size Options

- `sm` - 400px wide
- `md` - 600px wide (default)
- `lg` - 800px wide
- `xl` - 1000px wide
- `full` - 100% width

## Closing the Pageslide

The pageslide can be closed in multiple ways:

1. **Close button** - Click the X button in the header
2. **Cancel button** - Click the Cancel button in the footer
3. **Overlay click** - Click outside the pageslide on the dark overlay
4. **ESC key** - Press the Escape key
5. **Programmatically** - Call `closePageslide()`

```javascript
closePageslide();
```

## Example: Opening from a Button Click

Add a button anywhere on your page:

```html
<button class="btn btn-primary" onclick="openEditForm()">
    Edit Property
</button>
```

Add the JavaScript function:

```javascript
function openEditForm() {
    openPageslide({
        title: 'Edit Property',
        size: 'lg',
        content: `
            <div class="form-group">
                <label class="form-label">Property Name</label>
                <input type="text" class="form-input" id="property-name">
            </div>
        `,
        footer: `
            <button class="btn btn-light" onclick="closePageslide()">Cancel</button>
            <button class="btn btn-primary" onclick="handleSave()">Save</button>
        `
    });
}

function handleSave() {
    // Your save logic here
    console.log('Saving...');
    closePageslide();
}
```

## Example: Opening from Table Row Action

```javascript
// In your table row
<button class="row-action" onclick="editProperty('${propertyId}')">
    <i class="fas fa-edit"></i>
</button>

// JavaScript function
function editProperty(propertyId) {
    // Fetch property data
    const property = getPropertyById(propertyId);
    
    openPageslide({
        title: `Edit ${property.name}`,
        size: 'lg',
        content: generateEditForm(property),
        footer: `
            <button class="btn btn-light" onclick="closePageslide()">Cancel</button>
            <button class="btn btn-primary" onclick="updateProperty('${propertyId}')">
                Update Property
            </button>
        `
    });
}
```

## Styling

The pageslide component uses styles from `components/components.css`. The component is fully styled and ready to use. Custom styling can be added by targeting these classes:

- `.pageslide-overlay` - The dark background overlay
- `.pageslide` - The main pageslide container
- `.pageslide-header` - The header section
- `.pageslide-title` - The title text
- `.pageslide-close` - The close button
- `.pageslide-body` - The body content area
- `.pageslide-footer` - The footer section

## Tips

1. **Dynamic Content**: You can use template literals to create dynamic content based on data
2. **Form Integration**: The pageslide body works great with form controls
3. **Custom Footer**: Customize the footer buttons based on your needs
4. **Responsive**: On mobile devices, all sizes automatically become full-width
5. **Z-Index**: The pageslide has a high z-index (9999/10000) to appear above all content

