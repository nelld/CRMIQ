# Data Table Component Rules

## Styling Guidelines

### 1. Links (`<a>` tags)

**NEVER** define colors for links (`<a>` tags) in the data table component CSS. Link colors are defined globally in the base CSS files and should always be inherited.

❌ **DON'T:**
```css
.cell-primary {
    color: #2563eb;
}

a {
    color: blue;
}
```

✅ **DO:**
```html
<!-- Links will inherit color from global styles -->
<a href="#">Link Text</a>
```

**Rationale:** The application has global link styling defined in `base.css` or `styles.css`. Data table links should inherit these styles to maintain consistency across the entire application.

---

### 2. Text Sizing and Color

**ALWAYS** use standard utility classes for text sizing and muted text. **NEVER** create custom classes for these common stylings.

#### Use Standard Classes:
- **`text-sm`** - For smaller text (secondary information, subtitles, etc.)
- **`text-muted`** - For muted/gray text color

❌ **DON'T:**
```css
/* Don't create custom classes for common text styling */
.cell-secondary {
    color: #6b7280;
    font-size: 13px;
}

.time-display {
    color: #6b7280;
    font-size: 13px;
}

.category-sub {
    color: #92400e;
    font-size: 13px;
}
```

✅ **DO:**
```html
<!-- Use standard utility classes -->
<div class="cell-multiline">
    <a href="#">James Bond</a>
    <div class="text-muted text-sm">Agent 007</div>
</div>

<div class="cell-multiline">
    <div class="date-display">Feb 12, 2016</div>
    <div class="text-muted text-sm">12:24 PM</div>
</div>
```

**Rationale:** 
- Standard utility classes are already defined globally with consistent styling
- Reduces CSS bloat and maintenance overhead
- Ensures consistency across the entire application
- Makes code more readable and predictable

---

### 3. Badges

**ALWAYS** use standard badge classes from the design system. **NEVER** create custom badge classes.

#### Use Standard Classes:
- **Filled badges**: `badge badge-pill badge-{color}-lighten60`
- **Outline badges**: `badge badge-pill badge-outline-{color}-lighten60`

**Important:** Always use the `-lighten60` variant for consistent, softer badge colors.

**Available colors:** primary, secondary, success, info, warning, danger, orange, dark  
**Variants:** -lighten60, -lighten30, -darken30, -darken60

❌ **DON'T:**
```css
/* Don't create custom badge classes */
.status-badge {
    padding: 4px 10px;
    background: #d1fae5;
    color: #065f46;
}

.priority-badge {
    padding: 4px 12px;
    background: #dc2626;
}
```

❌ **DON'T:**
```html
<!-- Don't use base colors without lighten60 -->
<span class="badge badge-pill badge-success">Approved</span>
<span class="badge badge-pill badge-danger">High</span>
```

✅ **DO:**
```html
<!-- Always use -lighten60 variant -->
<span class="badge badge-pill badge-success-lighten60">Approved</span>
<span class="badge badge-pill badge-danger-lighten60">High Priority</span>
<span class="badge badge-pill badge-info-lighten60">Info</span>
<span class="badge badge-pill badge-outline-warning-lighten60">Warning</span>
```

**Rationale:** Using `-lighten60` variants ensures visual consistency with softer, more accessible colors across the entire application and reduces CSS maintenance.

---

### 4. Main Container (Page Level)

**ALWAYS** add `mx-auto p-6` classes to `<main>` elements for consistent page layout.

**Important:** The `<main>` tag is a **page-level element**, not part of component code. It should be in your HTML page (e.g., `test-dashboard.html`), not in component files.

❌ **DON'T:**
```html
<!-- In your page HTML -->
<main>
    <div id="content"></div>
</main>
```

✅ **DO:**
```html
<!-- In your page HTML -->
<main class="mx-auto p-6">
    <div id="content"></div>
</main>
```

**Note:** Always use these classes, even for full-width layouts like data tables:

```html
<!-- Full-width layout example -->
<body>
    <div id="app-header-container"></div>
    <div id="page-header-container"></div>
    
    <main class="mx-auto p-6">
        <div id="data-table-container"></div>
    </main>
</body>
```

**Rationale:** The `mx-auto` (margin: auto horizontal) and `p-6` (padding) classes provide consistent spacing and centering across all pages in the application. This is a page-level concern, not a component concern.

---

### General Styling Rules

1. **Inheritance First**: Always check if styles are already defined globally before adding component-specific styles
2. **Use Standard Classes**: For common stylings (text size, colors, spacing, badges), use standard utility classes
3. **No Color Overrides**: Don't override colors that are set at the application level
4. **Consistency**: Table components should match the look and feel of the rest of the application
5. **Minimal Styling**: Only add styles that are specific to table functionality, not general UI elements

## Implementation Notes

- When creating custom cell renderers that include links, use plain `<a>` tags without additional classes for color
- For secondary/smaller text, use `text-muted text-sm` classes instead of creating custom classes
- If special styling is needed for table-specific elements, use structural classes (like `.cell-multiline`) rather than text/color classes
- Test the table to ensure it matches the styling of the rest of the application

