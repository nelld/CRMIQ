# Accordion Component

A reusable, collapsible accordion component with smooth animations and clean styling.

## Files
- `accordion.html` - HTML structure and example usage
- `accordion.css` - Component styles (imported via `components.css`)

## Basic Usage

```html
<div class="accordion">
    <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion('section-1')">
            <i class="fas fa-chevron-right" id="icon-section-1"></i>
            <span style="font-weight: 600; font-size: 14px;">Section Title <span style="font-size: 12px; color: #6b7280; font-weight: 400;">(count)</span></span>
        </div>
        <div class="accordion-body" id="content-section-1">
            <!-- Your content here -->
        </div>
    </div>
</div>
```

## JavaScript Function

Include this function to handle accordion toggling:

```javascript
function toggleAccordion(sectionId) {
    const content = document.getElementById('content-' + sectionId);
    const icon = document.getElementById('icon-' + sectionId);
    const header = icon ? icon.closest('.accordion-header') : null;
    
    if (content && icon) {
        content.classList.toggle('show');
        
        if (content.classList.contains('show')) {
            icon.style.transform = 'rotate(90deg)';
            if (header) header.classList.add('expanded');
        } else {
            icon.style.transform = 'rotate(0deg)';
            if (header) header.classList.remove('expanded');
        }
    }
}
```

## Features

✅ **Collapsible sections** - Click header to expand/collapse
✅ **Smooth animations** - Chevron rotates on expand
✅ **No gaps when collapsed** - Headers stack directly on each other
✅ **Hover effects** - Background color changes on hover
✅ **Clean borders** - Smart border handling for first/last items

## CSS Classes

### Main Classes
- `.accordion` - Container for all accordion items
- `.accordion-item` - Individual accordion section
- `.accordion-header` - Clickable header area
- `.accordion-body` - Collapsible content area
- `.accordion-body.show` - Content visible state

### Variants
- `.accordion-compact` - Less padding for compact layouts
- `.accordion-borderless` - Remove outer border

## Styling

### Colors
- Header background: `#f9fafb`
- Hover background: `#f3f4f6`
- Chevron color: `#0072ce` (Yardi Blue)
- Border color: `#e5e7eb`

### Spacing
- Header padding: `12px 16px`
- Body padding: `16px`
- Chevron margin: `8px` (right)

## Example: Multiple Sections

```html
<div class="accordion">
    <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion('fees')">
            <i class="fas fa-chevron-right" id="icon-fees"></i>
            <span style="font-weight: 600; font-size: 14px;">Property Fees <span style="font-size: 12px; color: #6b7280; font-weight: 400;">(4)</span></span>
        </div>
        <div class="accordion-body" id="content-fees">
            <table class="data-table">
                <!-- Fee table content -->
            </table>
        </div>
    </div>
    
    <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion('custom')">
            <i class="fas fa-chevron-right" id="icon-custom"></i>
            <span style="font-weight: 600; font-size: 14px;">Custom Fees <span style="font-size: 12px; color: #6b7280; font-weight: 400;">(2)</span></span>
        </div>
        <div class="accordion-body" id="content-custom">
            <table class="data-table">
                <!-- Custom fee content -->
            </table>
        </div>
    </div>
</div>
```

## Important Notes

1. **Unique IDs**: Each section must have unique IDs for the icon (`icon-{id}`) and content (`content-{id}`)
2. **Function name**: The `onclick` attribute should call `toggleAccordion('{id}')` with the matching ID
3. **Chevron icon**: Use Font Awesome's `fa-chevron-right` class
4. **Header text**: Wrap title and count in separate spans for proper styling

## Integration

The accordion component is automatically available when you include:

```html
<link rel="stylesheet" href="../components/components.css">
```

This imports `accordion.css` along with other component styles.

